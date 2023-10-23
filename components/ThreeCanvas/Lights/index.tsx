import { EffectComposer, Bloom } from '@react-three/postprocessing'

const Lights = () => {
  return (
    <>
      {/* <EffectComposer disableNormalPass>
        <Bloom mipmapBlur luminanceThreshold={0.5} levels={1} intensity={0.2} />
      </EffectComposer>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color={'skyblue'} emissive={'skyblue'} emissiveIntensity={2} toneMapped={false} />
      </mesh> */}
      <ambientLight color={'white'} intensity={3} />
      <directionalLight color={'white'} position={[1, 0, 2]} intensity={1} />
    </>
  )
}

export default Lights
