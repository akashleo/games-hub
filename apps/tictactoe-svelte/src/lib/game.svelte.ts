

export type Player = 'X' | 'O';
export type CellValue = Player | null;
export type Board = CellValue[];
export type GameStatus = 'playing' | 'won' | 'draw';

const WIN_CONDITIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

function checkWin(board: Board): Player | null {
  for (const condition of WIN_CONDITIONS) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

// Encapsulate game state and logic using runes
function createGame() {
  let board = $state<Board>(Array(9).fill(null));
  let currentPlayer = $state<Player>('X');

  const winner = $derived(checkWin(board));

  const status: GameStatus = $derived(
    winner ? 'won' : board.every((cell: CellValue) => cell !== null) ? 'draw' : 'playing'
  );

  const gameMessage = $derived((() => {
    if (status === 'won' && winner) {
      return `Player ${winner} wins! 🎉`;
    }
    if (status === 'draw') {
      return "It's a draw! 🤝";
    }
    return `Player ${currentPlayer}'s turn`;
  })());

  function makeMove(index: number) {
    if (status !== 'playing' || board[index] !== null) {
      return;
    }
    board[index] = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }

  function resetGame() {
    board = Array(9).fill(null);
    currentPlayer = 'X';
  }
  
  function getWinningLine(): number[] | null {
    if (!winner) return null;
    for (const condition of WIN_CONDITIONS) {
        const [a, b, c] = condition;
        if (board[a] === winner && board[a] === board[b] && board[a] === board[c]) {
            return condition;
        }
    }
    return null;
  }

  return {
    get board() { return board },
    get currentPlayer() { return currentPlayer },
    get winner() { return winner },
    get status() { return status },
    get gameMessage() { return gameMessage },
    makeMove,
    resetGame,
    getWinningLine
  };
}

export const game = createGame();
