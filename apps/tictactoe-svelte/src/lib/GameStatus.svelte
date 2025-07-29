<script lang="ts">
  import { game } from './game.svelte';
</script>

<div class="game-status">
  <h2 class="status-message" class:game-over={game.status !== 'playing'}>
    {game.gameMessage}
  </h2>
  
  <button class="reset-button" on:click={game.resetGame}>
    {game.status === 'playing' ? 'Reset Game' : 'Play Again'}
  </button>
</div>

<style>
  .game-status {
    text-align: center;
    margin: 2rem 0;
  }

  .status-message {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #374151;
    transition: all 0.3s ease;
  }

  .status-message.game-over {
    color: #059669;
    transform: scale(1.05);
  }

  .reset-button {
    background: linear-gradient(135deg, #3B82F6, #1E40AF);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }

  .reset-button:hover {
    background: linear-gradient(135deg, #2563EB, #1D4ED8);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
  }

  .reset-button:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    .status-message {
      font-size: 1.25rem;
    }
    
    .reset-button {
      padding: 10px 20px;
      font-size: 0.9rem;
    }
  }
</style>