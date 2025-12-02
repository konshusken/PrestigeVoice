import { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { AgentConfig, VoiceName } from '../types';
import { createPcmBlob, decodeAudioData, base64ToUint8Array, PCM_SAMPLE_RATE, OUTPUT_SAMPLE_RATE } from '../utils/audioUtils';

interface UseGeminiLiveProps {
  agentConfig: AgentConfig;
  selectedVoice: VoiceName;
}

export const useGeminiLive = ({ agentConfig, selectedVoice }: UseGeminiLiveProps) => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [volumeLevel, setVolumeLevel] = useState(0);

  // Refs for audio handling and state tracking
  const inputContextRef = useRef<AudioContext | null>(null);
  const outputContextRef = useRef<AudioContext | null>(null);
  const inputSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const outputNodeRef = useRef<GainNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sessionRef = useRef<Promise<any> | null>(null); 
  const streamRef = useRef<MediaStream | null>(null);
  const audioQueueRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  
  // Track mounting state to prevent updates after unmount
  const isMountedRef = useRef(true);
  
  // Ref to track active state inside callbacks where state might be stale
  const activeRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const disconnect = useCallback(async () => {
    activeRef.current = false;

    // 1. Stop Microphone Stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    // 2. Close Gemini Session
    if (sessionRef.current) {
      const currentSessionPromise = sessionRef.current;
      sessionRef.current = null; // Clear ref immediately to prevent double closure
      try {
        const session = await currentSessionPromise;
        session.close();
        console.log('Gemini session closed successfully');
      } catch (e) {
        console.error('Error closing Gemini session:', e);
      }
    }

    // 3. Disconnect Audio Nodes
    if (inputSourceRef.current) {
      try { inputSourceRef.current.disconnect(); } catch (e) {}
      inputSourceRef.current = null;
    }
    if (processorRef.current) {
      try { processorRef.current.disconnect(); } catch (e) {}
      processorRef.current = null;
    }
    
    // 4. Stop Output Audio
    audioQueueRef.current.forEach(source => {
      try { source.stop(); } catch (e) {}
    });
    audioQueueRef.current.clear();

    // 5. Close Contexts
    if (inputContextRef.current && inputContextRef.current.state !== 'closed') {
      try { await inputContextRef.current.close(); } catch (e) {}
      inputContextRef.current = null;
    }
    if (outputContextRef.current && outputContextRef.current.state !== 'closed') {
      try { await outputContextRef.current.close(); } catch (e) {}
      outputContextRef.current = null;
    }

    if (isMountedRef.current) {
      setIsActive(false);
      setIsConnecting(false);
      setVolumeLevel(0);
    }
  }, []);

  const connect = useCallback(async () => {
    if (!process.env.API_KEY) {
      setError("API Key not found in environment.");
      return;
    }

    try {
      if (isMountedRef.current) {
        setIsConnecting(true);
        setError(null);
      }

      // Initialize Audio Contexts
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: PCM_SAMPLE_RATE });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: OUTPUT_SAMPLE_RATE });
      
      // Ensure contexts are running (vital for some browsers)
      if (inputCtx.state === 'suspended') await inputCtx.resume();
      if (outputCtx.state === 'suspended') await outputCtx.resume();

      inputContextRef.current = inputCtx;
      outputContextRef.current = outputCtx;
      nextStartTimeRef.current = outputCtx.currentTime;

      // Output Gain (Volume)
      const outputGain = outputCtx.createGain();
      outputGain.connect(outputCtx.destination);
      outputNodeRef.current = outputGain;

      // Get Microphone Stream
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Initialize Gemini Client
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      // Start Session
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: selectedVoice } },
          },
          systemInstruction: agentConfig.systemInstruction,
        },
        callbacks: {
          onopen: () => {
            console.log('Gemini Live Session Opened');
            if (isMountedRef.current) {
              setIsActive(true);
              setIsConnecting(false);
            }
            activeRef.current = true;

            // Setup Input Processing
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              // Use ref to check status to avoid stale closure issues
              if (!activeRef.current) return;
              
              const inputData = e.inputBuffer.getChannelData(0);
              
              // Simple volume meter
              let sum = 0;
              for (let i = 0; i < inputData.length; i++) {
                sum += inputData[i] * inputData[i];
              }
              const rms = Math.sqrt(sum / inputData.length);
              if (isMountedRef.current) {
                setVolumeLevel(Math.min(rms * 5, 1));
              }

              const pcmBlob = createPcmBlob(inputData);
              
              // Send to Gemini
              sessionPromise.then(session => {
                // Double check session is still active in our logic
                if (activeRef.current) {
                   session.sendRealtimeInput({ media: pcmBlob });
                }
              });
            };

            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
            
            inputSourceRef.current = source;
            processorRef.current = scriptProcessor;
          },
          onmessage: async (msg: LiveServerMessage) => {
            if (!activeRef.current) return;

            const serverContent = msg.serverContent;
            
            // Handle Audio Output
            const base64Audio = serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio && outputContextRef.current && outputContextRef.current.state !== 'closed') {
              const ctx = outputContextRef.current;
              
              try {
                // Sync start time
                nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
                
                const audioBuffer = await decodeAudioData(
                  base64ToUint8Array(base64Audio), 
                  ctx, 
                  OUTPUT_SAMPLE_RATE
                );

                const source = ctx.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(outputNodeRef.current!);
                
                source.addEventListener('ended', () => {
                  audioQueueRef.current.delete(source);
                });

                source.start(nextStartTimeRef.current);
                audioQueueRef.current.add(source);
                
                nextStartTimeRef.current += audioBuffer.duration;
              } catch (decodeErr) {
                 console.error("Audio decode error", decodeErr);
              }
            }

            // Handle Interruptions
            if (serverContent?.interrupted) {
              console.log('Model interrupted');
              audioQueueRef.current.forEach(s => {
                  try { s.stop(); } catch(e){}
              });
              audioQueueRef.current.clear();
              if (outputContextRef.current) {
                 nextStartTimeRef.current = outputContextRef.current.currentTime;
              }
            }
          },
          onclose: () => {
            console.log('Session closed');
            disconnect();
          },
          onerror: (err) => {
            console.error('Session error', err);
            if (isMountedRef.current) {
              setError("Connection error occurred.");
            }
            disconnect();
          }
        }
      });
      
      sessionRef.current = sessionPromise;

    } catch (err: any) {
      console.error(err);
      if (isMountedRef.current) {
        setError(err.message || "Failed to connect");
        setIsConnecting(false);
      }
      disconnect();
    }
  }, [agentConfig, selectedVoice, disconnect]);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect, agentConfig.type]);

  return {
    isActive,
    isConnecting,
    error,
    volumeLevel,
    connect,
    disconnect
  };
};