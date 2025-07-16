import { writable, derived } from 'svelte/store';

export type Player = 'X' | 'O';
export type CellValue = Player | null;
export type Board = CellValue[];
export type GameStatus = 'playing' | 'won' | 'draw';

// Game state stores
export const board = writable<Board>(Array(9).fill(null));
export const currentPlayer = writable<Player>('X');
export const gameStatus = writable<GameStatus>('playing');
export const winner = writable<Player | null>(null);

// Derived store for game status message
export const gameMessage = derived(
  [gameStatus, currentPlayer, winner],
  ([$gameStatus, $currentPlayer, $winner]) => {
    if ($gameStatus === 'won' && $winner) {
      return `Player ${$winner} wins! 🎉`;
    }
    if ($gameStatus === 'draw') {
      return "It's a draw! 🤝";
    }
    return `Player ${$currentPlayer}'s turn`;
  }
);

// Win conditions
const WIN_CONDITIONS = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal
  [2, 4, 6], // Anti-diagonal
];

// Game logic functions
export function makeMove(index: number) {
  board.update(currentBoard => {
    // Check if cell is already occupied or game is over
    gameStatus.subscribe(status => {
      if (status !== 'playing' || currentBoard[index] !== null) {
        return currentBoard;
      }
    })();

    // Make the move
    currentPlayer.subscribe(player => {
      currentBoard[index] = player;
    })();

    // Check for win
    const hasWon = checkWin(currentBoard);
    if (hasWon) {
      gameStatus.set('won');
      currentPlayer.subscribe(player => {
        winner.set(player);
      })();
      return currentBoard;
    }

    // Check for draw
    if (currentBoard.every(cell => cell !== null)) {
      gameStatus.set('draw');
      return currentBoard;
    }

    // Switch player
    currentPlayer.update(player => player === 'X' ? 'O' : 'X');
    
    return currentBoard;
  });
}

function checkWin(board: Board): boolean {
  return WIN_CONDITIONS.some(condition => {
    const [a, b, c] = condition;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

export function resetGame() {
  board.set(Array(9).fill(null));
  currentPlayer.set('X');
  gameStatus.set('playing');
  winner.set(null);
}

// Helper function to get winning line for highlighting
export function getWinningLine(board: Board): number[] | null {
  for (const condition of WIN_CONDITIONS) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return condition;
    }
  }
  return null;
}