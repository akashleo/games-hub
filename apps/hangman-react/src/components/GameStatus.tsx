import React from 'react';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';

interface GameStatusProps {
  gameState: 'playing' | 'won' | 'lost';
  word: string;
  onReset: () => void;
}

export const GameStatus: React.FC<GameStatusProps> = ({ gameState, word, onReset }) => {
  if (gameState === 'playing') {
    return null;
  }

  const isWon = gameState === 'won';
  
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
          The word was: <span className="text-blue-800">{word}</span>
        </p>
        
        <button
          onClick={onReset}
          className={`
            bg-gradient-to-r from-blue-500 to-purple-600 text-white
            px-8 py-3 rounded-lg font-semibold text-lg
            hover:from-blue-600 hover:to-purple-700
            transform hover:scale-105 transition-all duration-200
            focus:outline-none focus:ring-4 focus:ring-blue-300
            flex items-center gap-2 mx-auto
          `}
        >
          <RotateCcw className="w-5 h-5" />
          Play Again
        </button>
      </div>
    </div>
  );
};