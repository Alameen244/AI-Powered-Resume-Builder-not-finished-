import { useState } from 'react'
import Home from './pages/Home/Home.jsx'
import Preloader from './components/preloader/Prealoader.jsx'

export default function App() {
   const [loading, setLoading] = useState(true);
  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      < Home />
        <div style={{ visibility: loading ? "hidden" : "visible" }}>
        {/* <future RouterOrLayout /> */}
      </div>
    </>
  )
}
