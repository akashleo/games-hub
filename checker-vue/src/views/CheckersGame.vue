<template>
  <div class="game-container">
    <div class="game-header">
      <h2>Checkers Game</h2>
      <div class="game-info">
        <div class="current-player">
          <span class="player-indicator" :class="currentPlayer">{{ currentPlayer === 'red' ? 'Red' : 'Black' }} Player's Turn</span>
        </div>
        <div class="score">
          <div class="score-item">
            <span class="score-label red">Red:</span>
            <span class="score-value">{{ redPieces }}</span>
          </div>
          <div class="score-item">
            <span class="score-label black">Black:</span>
            <span class="score-value">{{ blackPieces }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="board-container">
      <div class="board" ref="boardRef">
        <div
          v-for="(row, rowIndex) in board"
          :key="rowIndex"
          class="board-row"
        >
          <div
            v-for="(cell, colIndex) in row"
            :key="colIndex"
            class="board-cell"
            :class="{
              dark: (rowIndex + colIndex) % 2 === 1,
              light: (rowIndex + colIndex) % 2 === 0,
              selected: selectedSquare && selectedSquare.row === rowIndex && selectedSquare.col === colIndex,
              'valid-move': validMoves.some(move => move.row === rowIndex && move.col === colIndex),
              'must-capture': mustCaptureSquares.some(square => square.row === rowIndex && square.col === colIndex)
            }"
            @click="handleSquareClick(rowIndex, colIndex)"
          >
            <div
              v-if="cell"
              class="piece"
              :class="{
                red: cell.color === 'red',
                black: cell.color === 'black',
                king: cell.isKing,
                selected: selectedSquare && selectedSquare.row === rowIndex && selectedSquare.col === colIndex
              }"
            >
              <span v-if="cell.isKing" class="crown">♔</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="gameWinner" class="game-over">
      <div class="winner-announcement">
        <h3>🎉 {{ gameWinner }} Wins! 🎉</h3>
        <button @click="resetGame" class="reset-button">Play Again</button>
      </div>
    </div>

    <div class="game-controls">
      <button @click="resetGame" class="control-button">Reset Game</button>
      <div v-if="gameStatus" class="game-status">{{ gameStatus }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCheckersGame } from '../composables/useCheckersGame'

const {
  board,
  currentPlayer,
  selectedSquare,
  validMoves,
  mustCaptureSquares,
  gameWinner,
  gameStatus,
  handleSquareClick,
  resetGame,
  redPieces,
  blackPieces
} = useCheckersGame()

const boardRef = ref<HTMLElement>()

onMounted(() => {
  // Any initialization logic can go here
})
</script>

<style scoped>
.game-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.game-header {
  text-align: center;
  margin-bottom: 2rem;
}

.game-header h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #e74c3c, #2c3e50);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.game-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.current-player {
  font-size: 1.2rem;
  font-weight: 600;
}

.player-indicator {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  color: white;
}

.player-indicator.red {
  background: linear-gradient(45deg, #e74c3c, #c0392b);
}

.player-indicator.black {
  background: linear-gradient(45deg, #2c3e50, #34495e);
}

.score {
  display: flex;
  gap: 2rem;
}

.score-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.score-label {
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  color: white;
}

.score-label.red {
  background: #e74c3c;
}

.score-label.black {
  background: #2c3e50;
}

.score-value {
  font-size: 1.1rem;
  font-weight: bold;
}

.board-container {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.board {
  display: grid;
  grid-template-rows: repeat(8, 1fr);
  gap: 0;
  border: 4px solid #34495e;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  background: #34495e;
}

.board-row {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 0;
}

.board-cell {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.board-cell.dark {
  background-color: #8b4513;
}

.board-cell.light {
  background-color: #deb887;
}

.board-cell.selected {
  background-color: #f39c12 !important;
  box-shadow: inset 0 0 0 3px #e67e22;
}

.board-cell.valid-move {
  background-color: #2ecc71 !important;
  position: relative;
}

.board-cell.valid-move::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
  animation: pulse 2s infinite;
}

.board-cell.must-capture {
  box-shadow: inset 0 0 0 3px #e74c3c;
  animation: glow 1.5s ease-in-out infinite alternate;
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(1); opacity: 0.7; }
}

@keyframes glow {
  from { box-shadow: inset 0 0 0 3px #e74c3c; }
  to { box-shadow: inset 0 0 0 3px #e74c3c, 0 0 20px #e74c3c; }
}

.piece {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  border: 2px solid transparent;
}

.piece.red {
  background: linear-gradient(45deg, #e74c3c, #c0392b);
  color: #fff;
}

.piece.black {
  background: linear-gradient(45deg, #2c3e50, #34495e);
  color: #fff;
}

.piece.king {
  border: 2px solid gold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3), 0 0 15px rgba(255, 215, 0, 0.5);
}

.piece:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
}

.piece.selected {
  transform: scale(1.15);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4), 0 0 20px rgba(243, 156, 18, 0.6);
}

.crown {
  color: gold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  font-size: 1.2rem;
}

.game-over {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.winner-announcement {
  background: white;
  padding: 3rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.5s ease-out;
}

.winner-announcement h3 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  background: linear-gradient(45deg, #f39c12, #e74c3c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

@keyframes slideIn {
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.reset-button {
  background: linear-gradient(45deg, #e74c3c, #c0392b);
  font-size: 1.2rem;
  padding: 1rem 2rem;
}

.game-controls {
  text-align: center;
  margin-top: 2rem;
}

.control-button {
  background: linear-gradient(45deg, #34495e, #2c3e50);
  margin-bottom: 1rem;
}

.game-status {
  font-size: 1.1rem;
  color: #e74c3c;
  font-weight: 600;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .game-container {
    padding: 1rem;
  }
  
  .game-info {
    flex-direction: column;
    gap: 1rem;
  }
  
  .board-cell {
    width: 45px;
    height: 45px;
  }
  
  .piece {
    width: 35px;
    height: 35px;
    font-size: 1.2rem;
  }
  
  .crown {
    font-size: 1rem;
  }
}
</style>