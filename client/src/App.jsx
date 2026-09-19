import { useCallback, useState } from 'react'
import Home from './pages/Home/Home.jsx'
import Preloader from './components/preloader/Prealoader.jsx'

export default function App() {
  const [contentReady, setContentReady] = useState(false)
  const [showPreloader, setShowPreloader] = useState(true)

  const handleRevealStart = useCallback(() => {
    setContentReady(true)
  }, [])

  const handleComplete = useCallback(() => {
    setShowPreloader(false)
  }, [])

  return (
    <>
      {showPreloader && (
        <Preloader onRevealStart={handleRevealStart} onComplete={handleComplete} />
      )}
      <Home ready={contentReady} />
        <div style={{ visibility: showPreloader ? 'hidden' : 'visible' }}>
        {/* <future RouterOrLayout /> */}
      </div>
    </>
  )
}
