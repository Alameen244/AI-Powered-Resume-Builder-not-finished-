import { useGLTF } from '@react-three/drei'
import { Suspense } from 'react'
import { networkAsset } from '../../data/assets.js'
import { NetworkNodes } from './NetworkNodes.jsx'

function LoadedModel({ url }) {
  const gltf = useGLTF(url)
  return <primitive object={gltf.scene} scale={2.2} position={[0, -0.4, -2.7]} />
}

export function NetworkModel(props) {
  return (
    <Suspense fallback={<NetworkNodes {...props} />}>
      {networkAsset.modelUrl ? <LoadedModel url={networkAsset.modelUrl} /> : <NetworkNodes {...props} />}
    </Suspense>
  )
}
