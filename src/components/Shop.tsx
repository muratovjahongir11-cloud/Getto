import '../styles/Shop.css'

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

interface ShopProps {
  gameState: GameState
  onBuyUpgrade: (type: 'autoClicker' | 'multiplier2x' | 'multiplier5x') => void
  upgradeCosts: Record<string, number>
  onClose: () => void
}

function Shop({ gameState, onBuyUpgrade, upgradeCosts, onClose }: ShopProps) {
  const canBuy = (cost: number) => gameState.balance >= cost

  return (
    <div className="shop-overlay" onClick={onClose}>
      <div className="shop-modal" onClick={(e) => e.stopPropagation()}>
        <div className="shop-header">
          <h2>🛒 Shop</h2>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>
        
        <div className="upgrades-list">
          <div className="upgrade-item">
            <div className="upgrade-info">
              <div className="upgrade-name">🤖 Auto Clicker</div>
              <div className="upgrade-description">Earns {Math.floor(gameState.perClick)} per second</div>
              <div className="upgrade-owned">Owned: {gameState.upgrades.autoClicker}</div>
            </div>
            <button 
              className={`buy-button ${canBuy(upgradeCosts.autoClicker) ? 'enabled' : 'disabled'}`}
              onClick={() => onBuyUpgrade('autoClicker')}
              disabled={!canBuy(upgradeCosts.autoClicker)}
            >
              {upgradeCosts.autoClicker}
            </button>
          </div>

          <div className="upgrade-item">
            <div className="upgrade-info">
              <div className="upgrade-name">2️⃣ 2x Multiplier</div>
              <div className="upgrade-description">Doubles click value</div>
              <div className="upgrade-owned">Level: {gameState.upgrades.multiplier2x}</div>
            </div>
            <button 
              className={`buy-button ${canBuy(upgradeCosts.multiplier2x) ? 'enabled' : 'disabled'}`}
              onClick={() => onBuyUpgrade('multiplier2x')}
              disabled={!canBuy(upgradeCosts.multiplier2x)}
            >
              {upgradeCosts.multiplier2x}
            </button>
          </div>

          <div className="upgrade-item">
            <div className="upgrade-info">
              <div className="upgrade-name">5️⃣ 5x Multiplier</div>
              <div className="upgrade-description">Multiplies click value by 5</div>
              <div className="upgrade-owned">Level: {gameState.upgrades.multiplier5x}</div>
            </div>
            <button 
              className={`buy-button ${canBuy(upgradeCosts.multiplier5x) ? 'enabled' : 'disabled'}`}
              onClick={() => onBuyUpgrade('multiplier5x')}
              disabled={!canBuy(upgradeCosts.multiplier5x)}
            >
              {upgradeCosts.multiplier5x}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shop
