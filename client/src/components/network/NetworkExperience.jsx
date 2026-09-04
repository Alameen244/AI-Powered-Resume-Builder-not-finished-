import { NetworkCanvas } from './NetworkCanvas.jsx'

export function NetworkExperience({ mode, reducedMotion }) {
  return (
    <div className="network-stage" aria-hidden="true">
      <NetworkCanvas mode={mode} reducedMotion={reducedMotion} />
    </div>
  )
}
