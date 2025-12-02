import React from 'react';
import { VoiceName } from '../types';
import { Mic2 } from 'lucide-react';

interface VoiceSelectorProps {
  selectedVoice: VoiceName;
  onVoiceChange: (voice: VoiceName) => void;
  disabled?: boolean;
}

const voices = Object.values(VoiceName);

const VoiceSelector: React.FC<VoiceSelectorProps> = ({ selectedVoice, onVoiceChange, disabled }) => {
  return (
    <div className="flex items-center gap-3 bg-white/10 p-2 rounded-lg border border-white/10 backdrop-blur-sm">
      <Mic2 className="w-5 h-5 text-indigo-400" />
      <div className="flex flex-col">
        <label className="text-xs text-indigo-200 uppercase font-semibold tracking-wider mb-1">
          Voice Persona
        </label>
        <div className="flex gap-2">
          {voices.map((voice) => (
            <button
              key={voice}
              onClick={() => onVoiceChange(voice)}
              disabled={disabled}
              className={`
                px-3 py-1 text-sm rounded transition-all duration-200
                ${selectedVoice === voice 
                  ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 font-medium' 
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {voice}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VoiceSelector;