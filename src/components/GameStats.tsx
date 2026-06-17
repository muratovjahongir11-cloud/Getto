import '../styles/GameStats.css'

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

interface GameStatsProps {
  gameState: GameState
}

function formatNumber(num: number): string {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(2) + 'B'
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(2) + 'M'
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(2) + 'K'
  }
  return Math.floor(num).toString()
}

function GameStats({ gameState }: GameStatsProps) {
  return (
    <div className="game-stats">
      <div className="stat-card balance">
        <div className="stat-label">Balance</div>
        <div className="stat-value">{formatNumber(gameState.balance)}</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-label">Per Click</div>
        <div className="stat-value">{gameState.perClick}</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-label">Clicks</div>
        <div className="stat-value">{formatNumber(gameState.clicks)}</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-label">Level</div>
        <div className="stat-value">{gameState.level}</div>
      </div>
    </div>
  )
}

export default GameStats
