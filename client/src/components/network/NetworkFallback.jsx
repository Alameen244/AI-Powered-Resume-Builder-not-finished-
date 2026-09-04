export function NetworkFallback() {
  return (
    <div className="network-stage network-stage--fallback" aria-hidden="true">
      <div className="network-fallback">
        <span className="network-fallback__core" />
        <span className="network-fallback__node network-fallback__node--a" />
        <span className="network-fallback__node network-fallback__node--b" />
        <span className="network-fallback__node network-fallback__node--c" />
        <span className="network-fallback__node network-fallback__node--d" />
      </div>
    </div>
  )
}
