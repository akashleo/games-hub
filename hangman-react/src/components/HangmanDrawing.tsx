import React from 'react';

interface HangmanDrawingProps {
  incorrectGuesses: number;
}

export const HangmanDrawing: React.FC<HangmanDrawingProps> = ({ incorrectGuesses }) => {
  const parts = [
    // Base
    <line key="base" x1="10" y1="230" x2="150" y2="230" stroke="#8B4513" strokeWidth="4" />,
    // Pole
    <line key="pole" x1="30" y1="230" x2="30" y2="20" stroke="#8B4513" strokeWidth="4" />,
    // Top beam
    <line key="beam" x1="30" y1="20" x2="120" y2="20" stroke="#8B4513" strokeWidth="4" />,
    // Noose
    <line key="noose" x1="120" y1="20" x2="120" y2="50" stroke="#8B4513" strokeWidth="4" />,
    // Head
    <circle key="head" cx="120" cy="70" r="20" stroke="#333" strokeWidth="3" fill="none" />,
    // Body
    <line key="body" x1="120" y1="90" x2="120" y2="160" stroke="#333" strokeWidth="3" />,
    // Left arm
    <line key="leftArm" x1="120" y1="110" x2="90" y2="140" stroke="#333" strokeWidth="3" />,
    // Right arm
    <line key="rightArm" x1="120" y1="110" x2="150" y2="140" stroke="#333" strokeWidth="3" />,
    // Left leg
    <line key="leftLeg" x1="120" y1="160" x2="90" y2="190" stroke="#333" strokeWidth="3" />,
    // Right leg
    <line key="rightLeg" x1="120" y1="160" x2="150" y2="190" stroke="#333" strokeWidth="3" />
  ];

  return (
    <div className="flex justify-center mb-8">
      <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-gray-200">
        <svg width="200" height="250" className="block">
          {parts.slice(0, Math.min(incorrectGuesses + 1, parts.length)).map((part, index) => (
            <g key={index} className="animate-fadeIn">
              {part}
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};