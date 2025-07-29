<script lang="ts">
  import { game, type CellValue } from './game.svelte';

  let { 
    value, 
    index, 
    isWinning 
  }: { 
    value: CellValue, 
    index: number, 
    isWinning: boolean 
  } = $props();

  const isClickable = $derived(game.status === 'playing' && !value);
</script>

<button 
  class="cell" 
  class:clickable={isClickable}
  class:winning={isWinning}
  class:x={value === 'X'}
  class:o={value === 'O'}
  aria-label={`Cell ${index + 1}`}
  on:click={() => game.makeMove(index)}
  disabled={!isClickable}
>
  {value}
</button>

<style>
  .cell {
    width: 80px;
    height: 80px;
    border: none;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.9);
    font-size: 2rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .cell:disabled {
    cursor: not-allowed;
  }

  .cell.clickable:hover {
    background: rgba(255, 255, 255, 1);
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }

  .cell.clickable:active {
    transform: translateY(0);
  }

  .cell.x {
    color: #3B82F6;
    background: rgba(59, 130, 246, 0.1);
  }

  .cell.o {
    color: #EF4444;
    background: rgba(239, 68, 68, 0.1);
  }

  .cell.winning {
    background: #10B981;
    color: white;
    animation: pulse 1s infinite;
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }

  @media (max-width: 600px) {
    .cell {
      width: 70px;
      height: 70px;
      font-size: 1.5rem;
    }
  }
</style>