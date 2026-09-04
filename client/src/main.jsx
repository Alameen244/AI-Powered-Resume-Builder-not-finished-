import { createRoot } from 'react-dom/client'
import { CssBaseline, ThemeProvider } from '@mui/material'
import App from './App.jsx'
import { theme } from './styles/theme.js'
import './styles/global.css'
import './styles/canvas.css'
import './styles/navigation.css'
import './styles/sections.css'
import './styles/ai-support.css'

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
)
