import React, { useState, useEffect } from 'react';
import { AgentConfig, VoiceName } from '../types';
import { useGeminiLive } from '../hooks/useGeminiLive';
import VoiceSelector from './VoiceSelector';
import Visualizer from './Visualizer';
import { Phone, PhoneOff, AlertCircle, Loader2 } from 'lucide-react';

interface AgentCardProps {
  config: AgentConfig;
}

const AgentCard: React.FC<AgentCardProps> = ({ config }) => {
  const [currentVoice, setCurrentVoice] = useState<VoiceName>(config.defaultVoice);
  
  // Reset voice when config type changes (e.g. switching agents)
  useEffect(() => {
    setCurrentVoice(config.defaultVoice);
  }, [config.defaultVoice]);

  const { isActive, isConnecting, error, volumeLevel, connect, disconnect } = useGeminiLive({
    agentConfig: config,
    selectedVoice: currentVoice,
  });

  const handleToggle = () => {
    if (isActive) {
      disconnect();
    } else {
      connect();
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl relative overflow-hidden group">
        {/* Background Gradient */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-700"></div>
        
        <div className="relative z-10">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-2xl font-bold text-white">{config.name}</h2>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${
                            isActive 
                            ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                            : 'bg-slate-700 text-slate-400 border-slate-600'
                        }`}>
                            {isActive ? 'Live Call' : 'Offline'}
                        </span>
                    </div>
                    <p className="text-indigo-300 font-medium">{config.role}</p>
                </div>
            </div>

            {/* Description */}
            <p className="text-slate-400 mb-8 h-12 leading-relaxed">
                {config.description}
            </p>

            {/* Controls Area */}
            <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800">
                {/* Voice Selector */}
                <div className="mb-6 overflow-x-auto pb-2">
                    <VoiceSelector 
                        selectedVoice={currentVoice}
                        onVoiceChange={setCurrentVoice}
                        disabled={isActive || isConnecting}
                    />
                </div>

                {/* Main Action Area */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Visualizer isActive={isActive} volume={volumeLevel} />
                        {isActive && (
                            <span className="text-xs text-indigo-400 animate-pulse font-mono">
                                Listening...
                            </span>
                        )}
                    </div>

                    <button
                        onClick={handleToggle}
                        disabled={isConnecting}
                        className={`
                            flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300 shadow-lg
                            ${isActive 
                                ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/25' 
                                : 'bg-white text-slate-900 hover:bg-indigo-50 shadow-white/10 hover:scale-105'
                            }
                            ${isConnecting ? 'opacity-70 cursor-wait' : ''}
                        `}
                    >
                        {isConnecting ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : isActive ? (
                            <>
                                <PhoneOff className="w-5 h-5" />
                                End Call
                            </>
                        ) : (
                            <>
                                <Phone className="w-5 h-5" />
                                Start Demo
                            </>
                        )}
                    </button>
                </div>
                
                {error && (
                    <div className="mt-4 flex items-center gap-2 text-red-400 text-sm bg-red-950/30 p-2 rounded border border-red-900/50">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <p>{error}</p>
                    </div>
                )}
            </div>
            
            <div className="mt-4 text-center">
                <p className="text-xs text-slate-500">
                    * Microhone access required for demo. AI response times may vary.
                </p>
            </div>
        </div>
    </div>
  );
};

export default AgentCard;