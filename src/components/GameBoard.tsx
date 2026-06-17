import '../styles/GameBoard.css'

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

interface GameBoardProps {
  gameState: GameState
  currentMultiplier: number
  onClick: () => void
  onShopClick: () => void
}

function GameBoard({ currentMultiplier, onClick, onShopClick }: GameBoardProps) {
  return (
    <div className="game-board">
      <div className="click-button-container">
        <button 
          className="click-button"
          onClick={onClick}
        >
          <span className="coin-emoji">💰</span>
        </button>
        {currentMultiplier > 1 && (
          <div className="multiplier-badge">×{currentMultiplier.toFixed(1)}</div>
        )}
      </div>
      
      <div className="button-group">
        <button className="shop-button" onClick={onShopClick}>
          🛒 Shop
        </button>
        <button className="leaderboard-button">
          🏆 Top Players
        </button>
      </div>
    </div>
  )
}

export default GameBoard
