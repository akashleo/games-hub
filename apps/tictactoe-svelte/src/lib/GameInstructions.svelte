<script lang="ts">
  import { slide } from 'svelte/transition';
  let showInstructions = false;
</script>

<div class="instructions-container">
  <button 
    class="instructions-toggle" 
    on:click={() => showInstructions = !showInstructions}
  >
    {showInstructions ? 'Hide Instructions' : 'How to Play'}
  </button>
  
  {#if showInstructions}
    <div class="instructions" transition:slide>
      <h3>How to Play Tic-Tac-Toe</h3>
      <ul>
        <li>Players take turns placing X's and O's on the 3×3 grid</li>
        <li>Player X always goes first</li>
        <li>Get three of your marks in a row (horizontally, vertically, or diagonally) to win</li>
        <li>If all squares are filled and no one has won, it's a draw</li>
        <li>Click "Reset Game" or "Play Again" to start a new game</li>
      </ul>
    </div>
  {/if}
</div>

<style>
  .instructions-container {
    margin-bottom: 2rem;
    text-align: center;
  }

  .instructions-toggle {
    background: rgba(255, 255, 255, 0.1);
    color: #374151;
    border: 2px solid #E5E7EB;
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .instructions-toggle:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: #9CA3AF;
  }

  .instructions {
    margin-top: 1rem;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    text-align: left;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }

  .instructions h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: #1F2937;
    font-size: 1.1rem;
  }

  .instructions ul {
    margin: 0;
    padding-left: 1.2rem;
  }

  .instructions li {
    margin-bottom: 0.5rem;
    color: #374151;
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    .instructions {
      margin-left: 1rem;
      margin-right: 1rem;
      max-width: none;
    }
  }
</style>