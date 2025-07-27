import React, { Suspense, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'

// Lazy load the microfrontend components
const TicTacToeApp = React.lazy(() => import('tictactoeApp/App'))
const CheckerApp = React.lazy(() => import('checkerApp/App'))
const HangmanApp = React.lazy(() => import('hangmanApp/App'))

function App() {
  const [currentGame, setCurrentGame] = useState(null)

  const games = [
    {
      id: 'tictactoe',
      name: 'Tic Tac Toe',
      description: 'Classic 3x3 grid game built with Svelte',
      component: TicTacToeApp,
      color: '#ff6b6b'
    },
    {
      id: 'checker',
      name: 'Checker Game',
      description: 'Strategic board game built with Vue.js',
      component: CheckerApp,
      color: '#4ecdc4'
    },
    {
      id: 'hangman',
      name: 'Hangman',
      description: 'Word guessing game built with React',
      component: HangmanApp,
      color: '#45b7d1'
    }
  ]

  const renderGame = (GameComponent) => (
    <div className="game-container">
      <button 
        className="back-button"
        onClick={() => setCurrentGame(null)}
      >
        ← Back to Dashboard
      </button>
      <Suspense fallback={<div className="loading">Loading game...</div>}>
        <GameComponent />
      </Suspense>
    </div>
  )

  if (currentGame) {
    const game = games.find(g => g.id === currentGame)
    return game ? renderGame(game.component) : null
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🎮 Games Hub</h1>
        <p>Microfrontend Architecture Dashboard</p>
      </header>

      <main className="main">
        <div className="games-grid">
          {games.map((game) => (
            <div 
              key={game.id} 
              className="game-card"
              style={{ '--accent-color': game.color }}
            >
              <div className="game-card-header">
                <h3>{game.name}</h3>
                <div className="game-icon">🎯</div>
              </div>
              <p className="game-description">{game.description}</p>
              <button 
                className="play-button"
                onClick={() => setCurrentGame(game.id)}
              >
                Play Now
              </button>
            </div>
          ))}
        </div>

        <div className="info-section">
          <h2>About This Architecture</h2>
          <div className="architecture-info">
            <div className="info-card">
              <h4>🏗️ Microfrontend Architecture</h4>
              <p>Each game is built as an independent application with its own technology stack</p>
            </div>
            <div className="info-card">
              <h4>⚡ Module Federation</h4>
              <p>Uses Webpack Module Federation to dynamically load and integrate different frontends</p>
            </div>
            <div className="info-card">
              <h4>🔧 Tech Stack</h4>
              <ul>
                <li>Host: React + Vite</li>
                <li>Tic Tac Toe: Svelte</li>
                <li>Checker: Vue.js</li>
                <li>Hangman: React</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>Built with ❤️ using Microfrontend Architecture</p>
      </footer>
    </div>
  )
}

export default App
