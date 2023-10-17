import { Canvas } from '@react-three/fiber'
import Lights from './Lights'
import { ImagePanels } from './Meshes'
import Controls from './Controls'
import { RoundedBox } from '@react-three/drei'
import User from '~/types/User'
import { DoubleSide } from 'three'
import { useEffect } from 'react'
import { useAnimationStore } from '~/stores/animation'

interface Props {
  users: User[]
  setHoverOnPanel: (value: boolean) => void
  setShowGuide: (value: boolean) => void
}

const ThreeCanvas = ({ users, setHoverOnPanel, setShowGuide }: Props) => {
  const { animationEnd } = useAnimationStore((state) => ({
    animationEnd: state.animationEnd,
  }))

  useEffect(() => {
    if (animationEnd) {
      const usageTimeout = setTimeout(() => {
        setShowGuide(true)
      }, 500)

      return () => {
        clearTimeout(usageTimeout)
      }
    }
  }, [animationEnd, setShowGuide])

  return (
    <Canvas>
      <Lights />
      <ImagePanels users={users} setHoverOnPanel={setHoverOnPanel} />
      <Controls />
      <RoundedBox args={[1000, 1000, 1000]} radius={100}>
        <meshLambertMaterial attach="material" side={DoubleSide} color={'#5373E2'} />
      </RoundedBox>
    </Canvas>
  )
}

export default ThreeCanvas
