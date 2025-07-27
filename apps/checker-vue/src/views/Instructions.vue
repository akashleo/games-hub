<template>
  <div class="instructions-container">
    <div class="instructions-content">
      <h1>How to Play Checkers</h1>
      <p class="intro">
        Checkers, also known as draughts, is a classic board game for two players. 
        The objective is to capture all your opponent's pieces or block them so they have no legal moves left.
      </p>

      <div class="instruction-section">
        <h2><span class="step-number">1</span>Game Setup</h2>
        <div class="section-content">
          <div class="instruction-item">
            <strong>Board:</strong> Checkers is played on an 8×8 checkered board, similar to a chessboard.
          </div>
          <div class="instruction-item">
            <strong>Pieces:</strong> Each player starts with 12 pieces (red and black), placed on the dark squares of the first three rows closest to them.
          </div>
          <div class="instruction-item">
            <strong>Starting Player:</strong> Black always goes first.
          </div>
        </div>
      </div>

      <div class="instruction-section">
        <h2><span class="step-number">2</span>Basic Movement</h2>
        <div class="section-content">
          <div class="instruction-item">
            Normal pieces, called "men," move diagonally forward one square to an adjacent empty dark square and cannot move backward unless they are "kinged".
          </div>
        </div>
      </div>

      <div class="instruction-section">
        <h2><span class="step-number">3</span>Capturing Pieces</h2>
        <div class="section-content">
          <div class="instruction-item">
            You can capture an opponent's piece by jumping over it to an empty square diagonally beyond it.
          </div>
          <div class="instruction-item">
            <strong>Mandatory Captures:</strong> Capturing is mandatory, and if multiple jumps are possible, you must choose one.
          </div>
          <div class="instruction-item">
            <strong>Multiple Jumps:</strong> If a jump leads to another jump with the same piece, you must continue jumping until no more captures are possible.
          </div>
          <div class="instruction-item">
            <strong>Removal:</strong> Captured pieces are removed from the board.
          </div>
        </div>
      </div>

      <div class="instruction-section">
        <h2><span class="step-number">4</span>Kinging</h2>
        <div class="section-content">
          <div class="instruction-item">
            When a piece reaches the opponent's back row, it becomes a "king".
          </div>
          <div class="instruction-item">
            Kings are marked with a crown symbol (♔) in this game.
          </div>
          <div class="instruction-item">
            <strong>King Movement:</strong> Kings can move and capture diagonally in both forward and backward directions.
          </div>
        </div>
      </div>

      <div class="instruction-section">
        <h2><span class="step-number">5</span>Winning the Game</h2>
        <div class="section-content">
          <div class="instruction-item">
            You win by capturing all your opponent's pieces OR by blocking their pieces so they have no legal moves left.
          </div>
        </div>
      </div>

      <div class="tips-section">
        <h2>🎯 Pro Tips</h2>
        <div class="tips-grid">
          <div class="tip-card">
            <h3>Control the Center</h3>
            <p>Try to get your pieces to the center of the board for maximum mobility and control.</p>
          </div>
          <div class="tip-card">
            <h3>Protect Your Back Row</h3>
            <p>Keep some pieces in your back row to prevent easy king promotions by your opponent.</p>
          </div>
          <div class="tip-card">
            <h3>Look for Multiple Jumps</h3>
            <p>Set up your pieces to create opportunities for multiple captures in a single turn.</p>
          </div>
          <div class="tip-card">
            <h3>King Me!</h3>
            <p>Prioritize getting your pieces to the opponent's back row to create powerful kings.</p>
          </div>
        </div>
      </div>

      <div class="action-buttons">
        <router-link to="/" class="play-button">
          🎮 Start Playing
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Instructions component
</script>

<style scoped>
.instructions-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  line-height: 1.7;
}

.instructions-content {
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 3rem;
  text-align: center;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #e74c3c, #2c3e50);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.intro {
  font-size: 1.2rem;
  text-align: center;
  color: #7f8c8d;
  margin-bottom: 3rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-radius: 12px;
  border-left: 4px solid #3498db;
}

.instruction-section {
  margin-bottom: 3rem;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.instruction-section h2 {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  padding: 1.5rem 2rem;
  margin: 0;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.step-number {
  background: rgba(255, 255, 255, 0.2);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
}

.section-content {
  padding: 2rem;
  background: #f8f9fa;
}

.instruction-item {
  margin-bottom: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border-left: 4px solid #3498db;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.instruction-item:last-child {
  margin-bottom: 0;
}

.instruction-item strong {
  color: #2c3e50;
}

.tips-section {
  margin-top: 4rem;
  padding-top: 3rem;
  border-top: 2px solid #ecf0f1;
}

.tips-section h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #2c3e50;
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.tip-card {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  transition: transform 0.3s ease;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.tip-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
}

.tip-card h3 {
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.tip-card p {
  margin: 0;
  opacity: 0.9;
}

.action-buttons {
  text-align: center;
  margin-top: 3rem;
}

.play-button {
  display: inline-block;
  background: linear-gradient(45deg, #e74c3c, #c0392b);
  color: white;
  padding: 1rem 3rem;
  border-radius: 50px;
  text-decoration: none;
  font-size: 1.3rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(231, 76, 60, 0.3);
}

.play-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(231, 76, 60, 0.4);
  color: white;
}

@media (max-width: 768px) {
  .instructions-container {
    padding: 1rem;
  }
  
  .instructions-content {
    padding: 2rem;
  }
  
  h1 {
    font-size: 2rem;
  }
  
  .instruction-section h2 {
    padding: 1rem;
    font-size: 1.2rem;
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
  
  .section-content {
    padding: 1rem;
  }
  
  .tips-grid {
    grid-template-columns: 1fr;
  }
}
</style>