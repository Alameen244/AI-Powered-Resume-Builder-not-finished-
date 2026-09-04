import { Text } from '@react-three/drei'

export function ResumePreview({ node, active }) {
  const { template } = node
  const scale = active ? 1.18 : 0.88

  return (
    <group position={node.previewOffset} scale={scale} rotation={[0.05, -0.28, 0.03]}>
      <mesh>
        <boxGeometry args={[1.55, 2.12, 0.045]} />
        <meshStandardMaterial color="#ebe4d6" roughness={0.62} metalness={0.05} />
      </mesh>
      <mesh position={[0, 0.94, 0.035]}>
        <boxGeometry args={[1.35, 0.08, 0.02]} />
        <meshStandardMaterial color={template.accent} roughness={0.45} />
      </mesh>
      <Text
        position={[-0.58, 0.62, 0.06]}
        fontSize={0.105}
        maxWidth={1.1}
        anchorX="left"
        color="#14150f"
      >
        {template.title}
      </Text>
      <Text
        position={[-0.58, 0.43, 0.06]}
        fontSize={0.055}
        maxWidth={1.1}
        anchorX="left"
        color="#4f4a3f"
      >
        {template.role}
      </Text>
      {[0.13, -0.07, -0.27, -0.47].map((y) => (
        <mesh key={y} position={[0, y, 0.055]}>
          <boxGeometry args={[1.18, 0.025, 0.012]} />
          <meshBasicMaterial color="#25271f" transparent opacity={active ? 0.55 : 0.34} />
        </mesh>
      ))}
      {template.stack.map((item, index) => (
        <Text
          key={item}
          position={[-0.54 + index * 0.36, -0.78, 0.06]}
          fontSize={0.045}
          anchorX="left"
          color={template.accent}
        >
          {item}
        </Text>
      ))}
    </group>
  )
}
