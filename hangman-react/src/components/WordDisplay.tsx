import React from 'react';

interface WordDisplayProps {
  word: string;
  guessedLetters: string[];
  isRevealed?: boolean;
}

export const WordDisplay: React.FC<WordDisplayProps> = ({ 
  word, 
  guessedLetters, 
  isRevealed = false 
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {word.split('').map((letter, index) => {
        const isGuessed = guessedLetters.includes(letter);
        const shouldShow = isGuessed || isRevealed;
        
        return (
          <div
            key={index}
            className={`
              w-12 h-16 border-b-4 border-blue-400 flex items-center justify-center
              text-2xl font-bold transition-all duration-300 transform
              ${shouldShow ? 'scale-110 text-blue-600' : 'text-transparent'}
              ${shouldShow && isGuessed ? 'animate-pulse' : ''}
            `}
          >
            {shouldShow ? letter : ''}
          </div>
        );
      })}
    </div>
  );
};