import { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

const navItems = ['Builder', 'Templates', 'AI', 'Launch']

export function Navigation({ mode, onToggleMode }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <AppBar className="nav-shell" position="fixed" elevation={0}>
        <Box className="nav-pill" component="nav" aria-label="Primary">
          <a className="nav-mark" href="#top" aria-label="Go to top">
            AAKP Builder
          </a>
          <Box className="nav-links">
            {navItems.map((item) => (
              <Button key={item} href={`#${item.toLowerCase()}`}>
                {item}
              </Button>
            ))}
          </Box>
          <button className="theme-toggle" type="button" onClick={onToggleMode} aria-label="Switch color theme">
            <span>{mode === 'dark' ? 'Light' : 'Dark'}</span>
            <i aria-hidden="true" />
          </button>
          <IconButton
            className={`menu-button ${open ? 'is-open' : ''}`}
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span />
            <span />
          </IconButton>
        </Box>
      </AppBar>
      <Box className={`nav-overlay ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        {navItems.map((item, index) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            style={{ '--delay': `${110 + index * 55}ms` }}
            onClick={() => setOpen(false)}
          >
            {item}
          </a>
        ))}
      </Box>
    </>
  )
}
