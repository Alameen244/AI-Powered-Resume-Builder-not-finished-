import Button from '@mui/material/Button'

export function MagneticButton({ children, href, onClick, ariaLabel }) {
  return (
    <Button
      className="magnetic-button"
      href={href}
      onClick={onClick}
      aria-label={ariaLabel}
      variant="contained"
      disableElevation
    >
      <span>{children}</span>
      <span className="magnetic-button__icon" aria-hidden="true">
        ↗
      </span>
    </Button>
  )
}
