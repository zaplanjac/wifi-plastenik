import React from 'react';

const RainAnimation: React.FC = () => {
  // Generate exactly 7-8 raindrops with specific positions
  const raindrops = [
    { id: 1, x: 15, delay: 0, size: 4 },
    { id: 2, x: 25, delay: 0.5, size: 3 },
    { id: 3, x: 40, delay: 1, size: 5 },
    { id: 4, x: 55, delay: 0.3, size: 4 },
    { id: 5, x: 70, delay: 0.8, size: 3 },
    { id: 6, x: 80, delay: 0.2, size: 4 },
    { id: 7, x: 90, delay: 0.7, size: 3 },
    { id: 8, x: 35, delay: 1.2, size: 4 }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Falling raindrops */}
      {raindrops.map((drop) => (
        <div
          key={drop.id}
          className="absolute top-0"
          style={{
            left: `${drop.x}%`,
            animation: `rainFall 3s linear infinite`,
            animationDelay: `${drop.delay}s`
          }}
        >
          {/* Single raindrop */}
          <div
            className="bg-gradient-to-b from-blue-300/70 to-blue-500/90 rounded-full"
            style={{
              width: `${drop.size}px`,
              height: `${drop.size * 2.5}px`,
              borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%'
            }}
          />
        </div>
      ))}
      
      {/* Ground impact area */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-blue-400/20 to-transparent rounded-b-lg" />
      
      {/* CSS Animation */}
      <style jsx>{`
        @keyframes rainFall {
          0% {
            transform: translateY(-20px);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(120px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default RainAnimation;