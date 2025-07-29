<script lang="ts">
  import { game } from './game.svelte';
  import GameCell from './GameCell.svelte';

  const winningLine = $derived(game.getWinningLine());
</script>

<div class="game-board">
  {#each game.board as cell, index}
    <GameCell 
      value={cell} 
      {index} 
      isWinning={winningLine?.includes(index) ?? false}
    />
  {/each}
</div>

<style>
  .game-board {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    max-width: 300px;
    margin: 0 auto;
    padding: 16px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    .game-board {
      max-width: 280px;
      gap: 6px;
      padding: 12px;
    }
  }
</style>