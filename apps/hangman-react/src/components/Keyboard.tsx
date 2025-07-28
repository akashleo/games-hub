import React from 'react';

interface KeyboardProps {
  guessedLetters: string[];
  selectedWord: string;
  onLetterClick: (letter: string) => void;
  disabled?: boolean;
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export const Keyboard: React.FC<KeyboardProps> = ({
  guessedLetters,
  selectedWord,
  onLetterClick,
  disabled = false
}) => {
  const getButtonStyle = (letter: string) => {
    if (guessedLetters.includes(letter)) {
      const isCorrect = selectedWord.includes(letter);
      return isCorrect
        ? 'bg-green-500 text-white border-green-600 cursor-not-allowed'
        : 'bg-red-500 text-white border-red-600 cursor-not-allowed';
    }
    
    return disabled
      ? 'bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed'
      : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-400 hover:scale-105 cursor-pointer';
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2">
        {ALPHABET.map((letter) => {
          const isGuessed = guessedLetters.includes(letter);
          const isDisabled = disabled || isGuessed;
          
          return (
            <button
              key={letter}
              onClick={() => !isDisabled && onLetterClick(letter)}
              disabled={isDisabled}
              className={`
                w-10 h-10 sm:w-12 sm:h-12 rounded-lg border-2 font-bold text-sm sm:text-base
                transition-all duration-200 transform
                ${getButtonStyle(letter)}
                focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
              `}
            >
              {letter}
            </button>
          );
        })}
      </div>
    </div>
  );
};