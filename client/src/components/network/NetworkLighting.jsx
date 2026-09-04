export function NetworkLighting({ mode = 'dark' }) {
  const isLight = mode === 'light'

  return (
    <>
      <ambientLight intensity={isLight ? 0.62 : 0.42} />
      <directionalLight position={[4, 6, 5]} intensity={isLight ? 1.35 : 1.8} color="#ffe2a4" />
      <pointLight position={[-4, 1, 2]} intensity={isLight ? 3.5 : 5} color="#7f9b72" distance={9} />
      <pointLight position={[3, -2, 1]} intensity={isLight ? 1.8 : 2.4} color="#9d6042" distance={8} />
    </>
  )
}
