import React from 'react';

interface VisualizerProps {
  isActive: boolean;
  volume: number; // 0 to 1
}

const Visualizer: React.FC<VisualizerProps> = ({ isActive, volume }) => {
  // Create a few bars to animate
  const bars = Array.from({ length: 5 });

  return (
    <div className="flex items-center justify-center gap-1.5 h-16 w-32">
      {bars.map((_, i) => {
        // Calculate dynamic height based on volume and index
        // We use a sine wave offset to make it look alive even when volume is steady
        const height = isActive 
            ? Math.max(4, volume * 100 * (Math.random() * 0.5 + 0.5)) 
            : 4;
            
        return (
          <div
            key={i}
            className={`w-2 rounded-full transition-all duration-100 ease-in-out ${isActive ? 'bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.5)]' : 'bg-slate-600'}`}
            style={{
              height: `${height}px`,
            }}
          />
        );
      })}
    </div>
  );
};

export default Visualizer;