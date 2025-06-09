import React from 'react';

interface RainDrop {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
}

const RainAnimation: React.FC = () => {
  // Generate random raindrops
  const raindrops: RainDrop[] = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 1 + Math.random() * 2,
    size: 2 + Math.random() * 3
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Rain drops */}
      {raindrops.map((drop) => (
        <div
          key={drop.id}
          className="absolute animate-pulse"
          style={{
            left: `${drop.x}%`,
            animationDelay: `${drop.delay}s`,
            animationDuration: `${drop.duration}s`,
            animationIterationCount: 'infinite'
          }}
        >
          {/* Rain drop */}
          <div
            className="bg-gradient-to-b from-blue-300/60 to-blue-500/80 rounded-full animate-bounce"
            style={{
              width: `${drop.size}px`,
              height: `${drop.size * 3}px`,
              animationDelay: `${drop.delay}s`,
              animationDuration: `${drop.duration}s`,
              animationIterationCount: 'infinite'
            }}
          />
          
          {/* Splash effect */}
          <div
            className="absolute top-full left-1/2 transform -translate-x-1/2"
            style={{
              animationDelay: `${drop.delay + drop.duration}s`
            }}
          >
            <div className="w-4 h-1 bg-blue-400/40 rounded-full animate-ping" />
          </div>
        </div>
      ))}
      
      {/* Ground ripples */}
      <div className="absolute bottom-0 left-0 right-0 h-8">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute bottom-0 w-6 h-6 border-2 border-blue-400/30 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: '2s',
              animationIterationCount: 'infinite'
            }}
          />
        ))}
      </div>
      
      {/* Soil texture */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-amber-900/40 to-amber-800/20 rounded-b-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 via-amber-800/30 to-amber-900/20" />
        {/* Small soil particles */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-700/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default RainAnimation;