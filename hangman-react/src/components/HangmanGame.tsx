import React, { useEffect } from 'react';
import { useMachine } from '@xstate/react';
import { hangmanMachine } from '../machines/hangmanMachine';
import { WordDisplay } from './WordDisplay';
import { Keyboard } from './Keyboard';
import { HangmanDrawing } from './HangmanDrawing';
import { GameStatus } from './GameStatus';

export const HangmanGame: React.FC = () => {
  const [state, send] = useMachine(hangmanMachine);
  const { selectedWord, guessedLetters, incorrectGuesses, maxMistakes } = state.context;

  const handleLetterGuess = (letter: string) => {
    send({ type: 'GUESS_LETTER', letter });
  };

  const handleReset = () => {
    send({ type: 'RESET_GAME' });
  };

  // Keyboard event listener for physical keyboard input
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const letter = event.key.toUpperCase();
      if (letter.match(/[A-Z]/) && letter.length === 1 && state.matches('playing')) {
        handleLetterGuess(letter);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [state]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            Hangman Game
          </h1>
          <p className="text-gray-600 text-lg">
            Guess the word letter by letter. You have {maxMistakes} wrong guesses!
          </p>
        </div>

        {/* Game Stats */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 flex items-center gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{incorrectGuesses}</div>
              <div className="text-sm text-gray-500">Wrong Guesses</div>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{maxMistakes - incorrectGuesses}</div>
              <div className="text-sm text-gray-500">Remaining</div>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{guessedLetters.length}</div>
              <div className="text-sm text-gray-500">Total Guesses</div>
            </div>
          </div>
        </div>

        {/* Hangman Drawing */}
        <HangmanDrawing incorrectGuesses={incorrectGuesses} />

        {/* Word Display */}
        <WordDisplay 
          word={selectedWord} 
          guessedLetters={guessedLetters}
          isRevealed={state.matches('lost')}
        />

        {/* Keyboard */}
        <div className="mb-8">
          <Keyboard
            guessedLetters={guessedLetters}
            word={selectedWord}
            onLetterGuess={handleLetterGuess}
            disabled={!state.matches('playing')}
          />
        </div>

        {/* Instructions */}
        <div className="text-center text-gray-500 text-sm">
          <p>Click the letters above or use your keyboard to guess!</p>
        </div>

        {/* Game Status Modal */}
        <GameStatus
          gameState={state.value as 'playing' | 'won' | 'lost'}
          word={selectedWord}
          onReset={handleReset}
        />
      </div>
    </div>
  );
};