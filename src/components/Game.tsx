import { useState, useEffect } from 'react'
import GameBoard from './GameBoard'
import GameStats from './GameStats'
import Shop from './Shop'
import '../styles/Game.css'

interface GameState {
  balance: number
  clicks: number
  perClick: number
  perSecond: number
  level: number
  upgrades: {
    autoClicker: number
    multiplier2x: number
    multiplier5x: number
  }
}

const UPGRADE_COSTS = {
  autoClicker: 100,
  multiplier2x: 500,
  multiplier5x: 2000
}

const UPGRADE_EFFECTS = {
  autoClicker: 1,
  multiplier2x: 2,
  multiplier5x: 5
}

function Game() {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem('gameState')
    if (saved) {
      return JSON.parse(saved)
    }
    return {
      balance: 0,
      clicks: 0,
      perClick: 1,
      perSecond: 0,
      level: 1,
      upgrades: {
        autoClicker: 0,
        multiplier2x: 0,
        multiplier5x: 0
      }
    }
  })

  const [showShop, setShowShop] = useState(false)

  // Save state to localStorage
  useEffect(() => {
    const saveInterval = setInterval(() => {
      localStorage.setItem('gameState', JSON.stringify(gameState))
    }, 1000)
    return () => clearInterval(saveInterval)
  }, [gameState])

  // Auto clicker generation
  useEffect(() => {
    if (gameState.upgrades.autoClicker === 0) return

    const autoClickInterval = setInterval(() => {
      const perSecond = gameState.upgrades.autoClicker * gameState.perClick
      setGameState(prev => ({
        ...prev,
        balance: prev.balance + perSecond,
        clicks: prev.clicks + gameState.upgrades.autoClicker
      }))
    }, 1000)

    return () => clearInterval(autoClickInterval)
  }, [gameState.upgrades.autoClicker, gameState.perClick])

  // Calculate current multiplier
  const currentMultiplier = 1 * 
    Math.pow(UPGRADE_EFFECTS.multiplier2x, gameState.upgrades.multiplier2x) * 
    Math.pow(UPGRADE_EFFECTS.multiplier5x, gameState.upgrades.multiplier5x)

  const handleClick = () => {
    const clickValue = gameState.perClick * currentMultiplier
    setGameState(prev => ({
      ...prev,
      balance: prev.balance + clickValue,
      clicks: prev.clicks + 1
    }))
  }

  const handleBuyUpgrade = (type: 'autoClicker' | 'multiplier2x' | 'multiplier5x') => {
    const cost = UPGRADE_COSTS[type]
    if (gameState.balance >= cost) {
      setGameState(prev => ({
        ...prev,
        balance: prev.balance - cost,
        upgrades: {
          ...prev.upgrades,
          [type]: prev.upgrades[type] + 1
        }
      }))
    }
  }

  return (
    <div className="game-container">
      <GameStats gameState={gameState} />
      <GameBoard 
        gameState={gameState}
        currentMultiplier={currentMultiplier}
        onClick={handleClick}
        onShopClick={() => setShowShop(!showShop)}
      />
      {showShop && (
        <Shop 
          gameState={gameState}
          onBuyUpgrade={handleBuyUpgrade}
          upgradeCosts={UPGRADE_COSTS}
          onClose={() => setShowShop(false)}
        />
      )}
    </div>
  )
}

export default Game
