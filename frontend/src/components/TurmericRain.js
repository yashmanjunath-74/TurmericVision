import React, { useEffect, useState } from 'react';
import './TurmericRain.css';

const TurmericRain = () => {
  const [raindrops, setRaindrops] = useState([]);

  useEffect(() => {
    // Generate floating food/turmeric elements
    const drops = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      animationDuration: `${Math.random() * 15 + 15}s`, // Very slow float (15s to 30s)
      animationDelay: `${Math.random() * -20}s`, // Negative delay so some start already on screen
      opacity: Math.random() * 0.3 + 0.7, // High opacity
      size: `${Math.random() * 40 + 30}px`, // Larger pieces
      rotation: `${Math.random() * 360}deg`
    }));
    setRaindrops(drops);
  }, []);

  return (
    <div className="turmeric-rain-container">
      {raindrops.map((drop) => (
        <div
          key={drop.id}
          className="turmeric-drop"
          style={{
            left: drop.left,
            animationDuration: drop.animationDuration,
            animationDelay: drop.animationDelay,
            opacity: drop.opacity,
            width: drop.size,
            height: drop.size,
            transform: `rotate(${drop.rotation})`
          }}
        />
      ))}
    </div>
  );
};

export default TurmericRain;
