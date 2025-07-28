import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Types
export interface HangmanState {
  selectedWord: string;
  guessedLetters: string[];
  incorrectGuesses: number;
  maxMistakes: number;
  gameStatus: 'playing' | 'won' | 'lost';
}

export type HangmanAction = 
  | { type: 'GUESS_LETTER'; letter: string }
  | { type: 'RESET_GAME' }
  | { type: 'NEW_WORD' };

// Word list
const WORDS = [
  'JAVASCRIPT', 'TYPESCRIPT', 'REACT', 'COMPUTER', 'PROGRAMMING',
  'DEVELOPER', 'FUNCTION', 'VARIABLE', 'COMPONENT', 'ALGORITHM',
  'DATABASE', 'FRONTEND', 'BACKEND', 'FRAMEWORK', 'LIBRARY',
  'INTERFACE', 'ABSTRACT', 'PROMISE', 'ASYNC', 'DEBUGGING'
];

// Helper functions
const getRandomWord = (): string => WORDS[Math.floor(Math.random() * WORDS.length)];

const isWordComplete = (word: string, guessedLetters: string[]): boolean => {
  return word.split('').every(letter => guessedLetters.includes(letter));
};

const isGameLost = (incorrectGuesses: number, maxMistakes: number): boolean => {
  return incorrectGuesses >= maxMistakes;
};

// Initial state
const initialState: HangmanState = {
  selectedWord: getRandomWord(),
  guessedLetters: [],
  incorrectGuesses: 0,
  maxMistakes: 6,
  gameStatus: 'playing'
};

// Reducer
const hangmanReducer = (state: HangmanState, action: HangmanAction): HangmanState => {
  switch (action.type) {
    case 'GUESS_LETTER': {
      const letter = action.letter.toUpperCase();
      
      // Don't process if letter already guessed
      if (state.guessedLetters.includes(letter) || state.gameStatus !== 'playing') {
        return state;
      }

      const newGuessedLetters = [...state.guessedLetters, letter];
      const isCorrectGuess = state.selectedWord.includes(letter);
      const newIncorrectGuesses = isCorrectGuess 
        ? state.incorrectGuesses 
        : state.incorrectGuesses + 1;

      // Determine new game status
      let newGameStatus: 'playing' | 'won' | 'lost' = 'playing';
      if (isWordComplete(state.selectedWord, newGuessedLetters)) {
        newGameStatus = 'won';
      } else if (isGameLost(newIncorrectGuesses, state.maxMistakes)) {
        newGameStatus = 'lost';
      }

      return {
        ...state,
        guessedLetters: newGuessedLetters,
        incorrectGuesses: newIncorrectGuesses,
        gameStatus: newGameStatus
      };
    }

    case 'RESET_GAME':
      return {
        ...initialState,
        selectedWord: getRandomWord()
      };

    case 'NEW_WORD':
      return {
        ...state,
        selectedWord: getRandomWord(),
        guessedLetters: [],
        incorrectGuesses: 0,
        gameStatus: 'playing'
      };

    default:
      return state;
  }
};

// Context
interface HangmanContextType {
  state: HangmanState;
  dispatch: React.Dispatch<HangmanAction>;
  guessLetter: (letter: string) => void;
  resetGame: () => void;
  newWord: () => void;
}

const HangmanContext = createContext<HangmanContextType | undefined>(undefined);

// Provider component
interface HangmanProviderProps {
  children: ReactNode;
}

export const HangmanProvider: React.FC<HangmanProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(hangmanReducer, initialState);

  // Action creators for convenience
  const guessLetter = (letter: string) => {
    dispatch({ type: 'GUESS_LETTER', letter });
  };

  const resetGame = () => {
    dispatch({ type: 'RESET_GAME' });
  };

  const newWord = () => {
    dispatch({ type: 'NEW_WORD' });
  };

  const value: HangmanContextType = {
    state,
    dispatch,
    guessLetter,
    resetGame,
    newWord
  };

  return (
    <HangmanContext.Provider value={value}>
      {children}
    </HangmanContext.Provider>
  );
};

// Custom hook to use the context
export const useHangman = (): HangmanContextType => {
  const context = useContext(HangmanContext);
  if (context === undefined) {
    throw new Error('useHangman must be used within a HangmanProvider');
  }
  return context;
};
