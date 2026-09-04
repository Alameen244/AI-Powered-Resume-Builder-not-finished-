import { createTheme } from '@mui/material/styles'

export const tokens = {
  colors: {
    ink: '#f4efe6',
    ash: '#b8b0a4',
    void: '#070806',
    coal: '#11130f',
    graphite: '#1b1e18',
    brass: '#c8a45d',
    moss: '#7f9b72',
    frost: '#d8e3da',
    rust: '#9d6042',
  },
  motion: {
    ease: 'cubic-bezier(0.32, 0.72, 0, 1)',
    slow: '900ms',
    medium: '520ms',
  },
}

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: tokens.colors.brass },
    secondary: { main: tokens.colors.moss },
    background: {
      default: tokens.colors.void,
      paper: tokens.colors.coal,
    },
    text: {
      primary: tokens.colors.ink,
      secondary: tokens.colors.ash,
    },
  },
  typography: {
    fontFamily: '"Geist", "Plus Jakarta Sans", system-ui, sans-serif',
    h1: {
      fontFamily: '"Clash Display", "Geist", system-ui, sans-serif',
      fontWeight: 600,
      letterSpacing: 0,
      lineHeight: 0.92,
    },
    h2: {
      fontFamily: '"Clash Display", "Geist", system-ui, sans-serif',
      fontWeight: 560,
      letterSpacing: 0,
      lineHeight: 0.98,
    },
    button: {
      textTransform: 'none',
      fontWeight: 700,
      letterSpacing: 0,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          transition: `transform ${tokens.motion.medium} ${tokens.motion.ease}, background ${tokens.motion.medium} ${tokens.motion.ease}`,
        },
      },
    },
  },
})
