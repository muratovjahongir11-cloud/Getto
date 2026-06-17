import { useEffect } from 'react'
import Game from './components/Game'
import './App.css'

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void
        expand: () => void
        setBackgroundColor: (color: string) => void
        setHeaderColor: (color: string) => void
      }
    }
  }
}

function App() {
  useEffect(() => {
    const tg = window.Telegram?.WebApp
    if (tg) {
      tg.ready()
      tg.expand()
      tg.setBackgroundColor('#2d2d2d')
      tg.setHeaderColor('#2d2d2d')
    }
  }, [])

  return (
    <div className="app">
      <Game />
    </div>
  )
}

export default App
