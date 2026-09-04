import { Component } from 'react'
import { NetworkFallback } from './NetworkFallback.jsx'

export class NetworkErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error) {
    console.warn('Network background disabled after a WebGL error.', error)
  }

  render() {
    if (this.state.hasError) {
      return <NetworkFallback />
    }

    return this.props.children
  }
}
