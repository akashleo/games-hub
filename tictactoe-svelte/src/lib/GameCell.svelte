<script lang="ts">
  import type { CellValue } from '../stores/gameStore';
  import { gameStatus } from '../stores/gameStore';

  export let value: CellValue;
  export let index: number;
  export let isWinning: boolean;
  export let onClick: (index: number) => void;

  function handleClick() {
    if ($gameStatus === 'playing' && value === null) {
      onClick(index);
    }
  }

  $: isClickable = $gameStatus === 'playing' && value === null;
</script>

<button 
  class="game-cell" 
  class:clickable={isClickable}
  class:winning={isWinning}
  class:x={value === 'X'}
  class:o={value === 'O'}
  on:click={handleClick}
  disabled={!isClickable}
>
  {value || ''}
</button>

<style>
  .game-cell {
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

  .game-cell:disabled {
    cursor: not-allowed;
  }

  .game-cell.clickable:hover {
    background: rgba(255, 255, 255, 1);
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }

  .game-cell.clickable:active {
    transform: translateY(0);
  }

  .game-cell.x {
    color: #3B82F6;
    background: rgba(59, 130, 246, 0.1);
  }

  .game-cell.o {
    color: #EF4444;
    background: rgba(239, 68, 68, 0.1);
  }

  .game-cell.winning {
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

  @media (max-width: 768px) {
    .game-cell {
      width: 70px;
      height: 70px;
      font-size: 1.5rem;
    }
  }
</style>