import React from 'react';
import { HangmanGame } from './components/HangmanGame';
import { HangmanProvider } from './context/HangmanContext';

function App() {
  return (
    <HangmanProvider>
      <HangmanGame />
    </HangmanProvider>
  );
}

export default App;