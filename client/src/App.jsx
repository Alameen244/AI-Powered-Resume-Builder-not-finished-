import { useCallback, useEffect, useState } from 'react'
import Home from './pages/Home/Home.jsx'
import BuilderPage from './pages/Builder/BuilderPage.jsx'
import Preloader from './components/preloader/Prealoader.jsx'
import { ViewContext } from './context/ViewContext.jsx'

export default function App() {
  const isDirectBuilder = window.location.hash.startsWith('#builder')
  const [contentReady, setContentReady] = useState(isDirectBuilder)
  const [showPreloader, setShowPreloader] = useState(!isDirectBuilder)

  const getInitialView = () =>
    window.location.hash.startsWith('#builder') ? 'builder' : 'home'
  const [currentView, setCurrentView] = useState(getInitialView)

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash.startsWith('#builder')) {
        setCurrentView('builder')
      } else {
        setCurrentView('home')
      }
    }

    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  const navigateTo = (view) => {
    if (view === 'builder') {
      window.location.hash = '#builder'
    } else {
      window.location.hash = '#top'
    }
    setCurrentView(view)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const handleRevealStart = useCallback(() => {
    setContentReady(true)
  }, [])

  const handleComplete = useCallback(() => {
    setShowPreloader(false)
  }, [])

  return (
    <ViewContext.Provider value={{ currentView, navigateTo }}>
      {showPreloader && (
        <Preloader onRevealStart={handleRevealStart} onComplete={handleComplete} />
      )}

      {currentView === 'builder' ? (
        <div style={{ visibility: showPreloader ? 'hidden' : 'visible' }}>
          <BuilderPage onNavigate={navigateTo} />
        </div>
      ) : (
        <Home ready={contentReady} onNavigate={navigateTo} />
      )}
    </ViewContext.Provider>
  )
}
