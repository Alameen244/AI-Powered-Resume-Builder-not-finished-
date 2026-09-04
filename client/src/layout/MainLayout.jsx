import { Suspense, lazy } from 'react'
import { MouseAura } from '../components/common/MouseAura.jsx'
import { Navigation } from '../components/navigation/Navigation.jsx'
import { NetworkErrorBoundary } from '../components/network/NetworkErrorBoundary.jsx'
import { NetworkFallback } from '../components/network/NetworkFallback.jsx'

const NetworkExperience = lazy(() =>
  import('../components/network/NetworkExperience.jsx').then((module) => ({
    default: module.NetworkExperience,
  })),
)

export function MainLayout({ children, mode, onToggleMode, reducedMotion }) {
  return (
    <>
      <div className="app-backdrop" aria-hidden="true" />
      <MouseAura reducedMotion={reducedMotion} />
      <Navigation mode={mode} onToggleMode={onToggleMode} />
      <NetworkErrorBoundary>
        <Suspense fallback={<NetworkFallback />}>
          <NetworkExperience mode={mode} reducedMotion={reducedMotion} />
        </Suspense>
      </NetworkErrorBoundary>
      <main className="site-shell">{children}</main>
    </>
  )
}
