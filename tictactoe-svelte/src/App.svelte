<script lang="ts">
  import GameBoard from './lib/GameBoard.svelte';
  import GameStatus from './lib/GameStatus.svelte';
  import GameInstructions from './lib/GameInstructions.svelte';
</script>

<main>
  <div class="game-container">
    <header>
      <h1>Tic-Tac-Toe</h1>
      <p class="subtitle">Challenge a friend to the classic game!</p>
    </header>
    
    <GameInstructions />
    <GameStatus />
    <GameBoard />
    
    <footer>
      <p>Built with Svelte & TypeScript</p>
    </footer>
  </div>
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  main {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }

  .game-container {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    max-width: 500px;
    width: 100%;
  }

  header {
    text-align: center;
    margin-bottom: 2rem;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0 0 0.5rem 0;
    background: linear-gradient(135deg, #ffffff, #f8fafc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .subtitle {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.8);
    margin: 0;
    font-weight: 300;
  }

  footer {
    text-align: center;
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  footer p {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.8rem;
    margin: 0;
  }

  @media (max-width: 768px) {
    .game-container {
      padding: 1.5rem;
      margin: 1rem;
    }

    h1 {
      font-size: 2rem;
    }

    .subtitle {
      font-size: 0.9rem;
    }
  }
</style>