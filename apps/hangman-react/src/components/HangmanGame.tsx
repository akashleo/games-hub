import React, { useEffect } from 'react';
import { useHangman } from '../context/HangmanContext';
import { WordDisplay } from './WordDisplay';
import { Keyboard } from './Keyboard';
import { HangmanDrawing } from './HangmanDrawing';
import { GameStatus } from './GameStatus';

export const HangmanGame: React.FC = () => {
  const { state, guessLetter, resetGame } = useHangman();
  const { selectedWord, guessedLetters, incorrectGuesses, maxMistakes, gameStatus } = state;

  const handleLetterGuess = (letter: string) => {
    guessLetter(letter);
  };

  const handleReset = () => {
    resetGame();
  };

  // Keyboard event listener for physical keyboard input
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const letter = event.key.toUpperCase();
      if (letter.match(/[A-Z]/) && letter.length === 1 && gameStatus === 'playing') {
        handleLetterGuess(letter);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameStatus]);

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
              <div className="text-2xl font-bold text-green-600">{guessedLetters.length}</div>
              <div className="text-sm text-gray-500">Letters Guessed</div>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{incorrectGuesses}</div>
              <div className="text-sm text-gray-500">Wrong Guesses</div>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{maxMistakes - incorrectGuesses}</div>
              <div className="text-sm text-gray-500">Remaining</div>
            </div>
          </div>
        </div>

        {/* Main Game Area */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Column - Hangman Drawing */}
          <div className="flex justify-center">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <HangmanDrawing incorrectGuesses={incorrectGuesses} />
            </div>
          </div>

          {/* Right Column - Game Content */}
          <div className="space-y-6">
            {/* Word Display */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                Word to Guess
              </h2>
              <WordDisplay 
                word={selectedWord} 
                guessedLetters={guessedLetters} 
              />
            </div>

            {/* Game Status */}
            <GameStatus 
              gameStatus={gameStatus}
              selectedWord={selectedWord}
              onReset={handleReset}
            />

            {/* Keyboard */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                Click a Letter or Use Your Keyboard
              </h2>
              <Keyboard 
                guessedLetters={guessedLetters}
                selectedWord={selectedWord}
                onLetterClick={handleLetterGuess}
                disabled={gameStatus !== 'playing'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};