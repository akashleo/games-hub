import React from 'react';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';

interface GameStatusProps {
  gameStatus: 'playing' | 'won' | 'lost';
  selectedWord: string;
  onReset: () => void;
}

export const GameStatus: React.FC<GameStatusProps> = ({ gameStatus, selectedWord, onReset }) => {
  if (gameStatus === 'playing') {
    return null;
  }

  const isWon = gameStatus === 'won';
  
  return (
    <div className={`
      fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50
      transition-opacity duration-300
    `}>
      <div className={`
        bg-white rounded-2xl p-8 mx-4 max-w-md w-full text-center shadow-2xl
        transform transition-all duration-500 scale-100
        ${isWon ? 'border-t-4 border-green-500' : 'border-t-4 border-red-500'}
      `}>
        <div className="mb-6">
          {isWon ? (
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto animate-bounce" />
          ) : (
            <XCircle className="w-20 h-20 text-red-500 mx-auto animate-pulse" />
          )}
        </div>
        
        <h2 className={`
          text-3xl font-bold mb-4
          ${isWon ? 'text-green-600' : 'text-red-600'}
        `}>
          {isWon ? 'Congratulations!' : 'Game Over!'}
        </h2>
        
        <p className="text-gray-600 mb-2">
          {isWon ? 'You guessed the word!' : 'Better luck next time!'}
        </p>
        
        <p className="text-2xl font-bold text-blue-600 mb-6">
          The word was: <span className="text-blue-800">{selectedWord}</span>
        </p>
        
        <button
          onClick={onReset}
          className={`
            inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold
            transition-all duration-200 hover:scale-105 active:scale-95
            ${isWon 
              ? 'bg-green-500 hover:bg-green-600 text-white' 
              : 'bg-red-500 hover:bg-red-600 text-white'
            }
          `}
        >
          <RotateCcw className="w-5 h-5" />
          Play Again
        </button>
      </div>
    </div>
  );
};