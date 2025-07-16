import { createMachine, assign } from 'xstate';

export interface HangmanContext {
  selectedWord: string;
  guessedLetters: string[];
  incorrectGuesses: number;
  maxMistakes: number;
  currentGuess: string;
}

export type HangmanEvent = 
  | { type: 'GUESS_LETTER'; letter: string }
  | { type: 'RESET_GAME' }
  | { type: 'NEW_WORD' };

const WORDS = [
  'JAVASCRIPT', 'TYPESCRIPT', 'REACT', 'COMPUTER', 'PROGRAMMING',
  'DEVELOPER', 'FUNCTION', 'VARIABLE', 'COMPONENT', 'ALGORITHM',
  'DATABASE', 'FRONTEND', 'BACKEND', 'FRAMEWORK', 'LIBRARY',
  'INTERFACE', 'ABSTRACT', 'PROMISE', 'ASYNC', 'DEBUGGING'
];

const getRandomWord = () => WORDS[Math.floor(Math.random() * WORDS.length)];

const isWordComplete = (word: string, guessedLetters: string[]) => {
  return word.split('').every(letter => guessedLetters.includes(letter));
};

export const hangmanMachine = createMachine({
  id: 'hangman',
  initial: 'playing',
  context: {
    selectedWord: getRandomWord(),
    guessedLetters: [],
    incorrectGuesses: 0,
    maxMistakes: 6,
    currentGuess: ''
  } as HangmanContext,
  states: {
    playing: {
      entry: ['logStateEntry'],
      on: {
        GUESS_LETTER: {
          guard: ({ context, event }) => {
            const letter = event.letter.toUpperCase();
            return !context.guessedLetters.includes(letter);
          },
          target: [
            {
              target: 'won',
              actions: assign(({ context, event }) => {
                const letter = event.letter.toUpperCase();
                const newGuessedLetters = [...context.guessedLetters, letter];
                const isCorrectGuess = context.selectedWord.includes(letter);
                
                return {
                  ...context,
                  guessedLetters: newGuessedLetters,
                  incorrectGuesses: isCorrectGuess ? context.incorrectGuesses : context.incorrectGuesses + 1,
                  currentGuess: letter
                };
              }),
              guard: ({ context, event }) => {
                const letter = event.letter.toUpperCase();
                const newGuessedLetters = [...context.guessedLetters, letter];
                return isWordComplete(context.selectedWord, newGuessedLetters);
              }
            },
            {
              target: 'lost',
              actions: assign(({ context, event }) => {
                const letter = event.letter.toUpperCase();
                const newGuessedLetters = [...context.guessedLetters, letter];
                const isCorrectGuess = context.selectedWord.includes(letter);
                
                return {
                  ...context,
                  guessedLetters: newGuessedLetters,
                  incorrectGuesses: isCorrectGuess ? context.incorrectGuesses : context.incorrectGuesses + 1,
                  currentGuess: letter
                };
              }),
              guard: ({ context, event }) => {
                const letter = event.letter.toUpperCase();
                const isCorrectGuess = context.selectedWord.includes(letter);
                const newIncorrectGuesses = isCorrectGuess ? context.incorrectGuesses : context.incorrectGuesses + 1;
                return newIncorrectGuesses >= context.maxMistakes;
              }
            },
            { 
              target: 'playing',
              actions: assign(({ context, event }) => {
                const letter = event.letter.toUpperCase();
                const newGuessedLetters = [...context.guessedLetters, letter];
                const isCorrectGuess = context.selectedWord.includes(letter);
                
                return {
                  ...context,
                  guessedLetters: newGuessedLetters,
                  incorrectGuesses: isCorrectGuess ? context.incorrectGuesses : context.incorrectGuesses + 1,
                  currentGuess: letter
                };
              })
            }
          ]
        }
      }
    },
    won: {
      entry: ['logStateEntry'],
      on: {
        RESET_GAME: {
          target: 'playing',
          actions: assign(() => ({
            selectedWord: getRandomWord(),
            guessedLetters: [],
            incorrectGuesses: 0,
            maxMistakes: 6,
            currentGuess: ''
          }))
        }
      }
    },
    lost: {
      entry: ['logStateEntry'],
      on: {
        RESET_GAME: {
          target: 'playing',
          actions: assign(() => ({
            selectedWord: getRandomWord(),
            guessedLetters: [],
            incorrectGuesses: 0,
            maxMistakes: 6,
            currentGuess: ''
          }))
        }
      }
    }
  }
}, {
  actions: {
    logStateEntry: () => {
      // No-op action to ensure entry arrays are non-empty
    }
  },
  guards: {
    isWordComplete: ({ context, event }) => {
      const letter = (event as any).letter?.toUpperCase();
      const newGuessedLetters = [...context.guessedLetters, letter];
      return isWordComplete(context.selectedWord, newGuessedLetters);
    },
    isGameLost: ({ context, event }) => {
      const letter = (event as any).letter?.toUpperCase();
      const isCorrectGuess = context.selectedWord.includes(letter);
      const newIncorrectGuesses = isCorrectGuess ? context.incorrectGuesses : context.incorrectGuesses + 1;
      return newIncorrectGuesses >= context.maxMistakes;
    }
  }
});