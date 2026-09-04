export const cameraPath = [
  { progress: 0, position: [0, 1.1, 8.6], lookAt: [0, 0, -2] },
  { progress: 0.22, position: [-3.7, 1.45, 4.4], lookAt: [-4.8, 1.1, -2.8] },
  { progress: 0.48, position: [0.2, 0.2, 3.2], lookAt: [0.8, -0.4, -4.2] },
  { progress: 0.72, position: [3.5, 1.4, 3.9], lookAt: [4.4, 1, -1.6] },
  { progress: 1, position: [0, 2.4, 9.8], lookAt: [0, 0.2, -3.4] },
]

export const lerpArray = (from, to, t) => from.map((value, index) => value + (to[index] - value) * t)

export const sampleCameraPath = (progress) => {
  const nextIndex = cameraPath.findIndex((point) => point.progress >= progress)
  const next = cameraPath[Math.max(1, nextIndex)]
  const previous = cameraPath[Math.max(0, cameraPath.indexOf(next) - 1)]
  const span = next.progress - previous.progress || 1
  const localT = Math.min(1, Math.max(0, (progress - previous.progress) / span))

  return {
    position: lerpArray(previous.position, next.position, localT),
    lookAt: lerpArray(previous.lookAt, next.lookAt, localT),
  }
}
