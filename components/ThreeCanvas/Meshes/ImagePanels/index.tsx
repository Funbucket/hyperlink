import { useEffect } from 'react'
import { DoubleSide, SphereGeometry, TextureLoader, Vector3 } from 'three'
import { ThreeEvent, useLoader } from '@react-three/fiber'
import {
  calcWidthHeightSegments,
  chunkFloat32Array,
  getRandomPositionConsideringPanels,
  getRandomUniqueElements,
} from '~/utils'
import User from '~/types/User'
import { useHoveredUserStore } from '~/stores/hoveredUser'
import { usePanelPositionStore } from '~/stores/panelPosition'
import { useMeshesStore } from '~/stores/meshes'
import gsap from 'gsap'

interface Props {
  users: User[]
  setHoverOnPanel(value: boolean): void
}

const ImagePanels = ({ users, setHoverOnPanel }: Props) => {
  const { siteUrl, dispatchHoveredUser } = useHoveredUserStore((state) => ({
    siteUrl: state.siteUrl,
    dispatchHoveredUser: state.dispatchHoveredUser,
  }))

  const { positionArray, positionType, dispatchPositionArray } = usePanelPositionStore((state) => ({
    positionArray: state.positionArray,
    positionType: state.positionType,
    dispatchPositionArray: state.dispatchPositionArray,
  }))

  const { meshArray } = useMeshesStore((state) => ({
    meshArray: state.mesh.current,
  }))

  // 구 모양 좌표
  const radius = 1
  const segments = calcWidthHeightSegments(users.length)
  const sphereGeometry = new SphereGeometry(radius, segments, segments)
  const spherePositionArray = new Float32Array(sphereGeometry.attributes.position.array)
  const chunkedSpherePositionArray = chunkFloat32Array(spherePositionArray, 3, radius)
  const selectedSpherePositionArray = getRandomUniqueElements(chunkedSpherePositionArray, users.length)

  // 무작위 좌표
  const randomPositionArray = []
  for (let i = 0; i < chunkedSpherePositionArray.length; i++) {
    randomPositionArray.push(getRandomPositionConsideringPanels(users.length))
  }
  const selectedRandomPositionArray = getRandomUniqueElements(randomPositionArray, users.length)

  useEffect(() => {
    dispatchPositionArray(selectedRandomPositionArray)
    switch (positionType) {
      case 'random':
        dispatchPositionArray(selectedRandomPositionArray)
        break
      case 'sphere':
        dispatchPositionArray(selectedSpherePositionArray)
        break
    }
  }, [positionType])

  return (
    <>
      {users.map((user: User, index: number) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [texture] = useLoader(TextureLoader, [user.imageUrl])

        // const handleMeshUpdate = (self: any) => {
        //   if (positionType === 'random') {
        //     console.log('random position')
        //     gsap.to(self.rotation, {
        //       duration: 2,
        //       x: 0,
        //       y: self.rotation.y,
        //       z: 0,
        //       onUpdate: () => {
        //         self.lookAt(new Vector3(0, self.position.y, 0))
        //       },
        //     })
        //   } else {
        //     console.log('sphere position')
        //     gsap.to(self.rotation, {
        //       duration: 2,
        //       x: 0,
        //       y: 0,
        //       z: 0,
        //       onUpdate: () => {
        //         self.lookAt(new Vector3(0, 0, 0))
        //       },
        //     })
        //   }
        // }
        const handleMeshUpdate = (self: any) => {
          if (positionType === 'random') {
            self.lookAt(new Vector3(0, self.position.y, 0))
          } else {
            self.lookAt(new Vector3(0, 0, 0))
          }
        }

        const handleMeshPointerOver = (e: ThreeEvent<PointerEvent>) => {
          dispatchHoveredUser(e.object.userData as User)
          setHoverOnPanel(true)
          document.body.style.cursor = 'pointer'
        }

        const handleMeshPointerOut = () => {
          setHoverOnPanel(false)
          document.body.style.cursor = 'auto'
        }

        return (
          <mesh
            key={user.id}
            onClick={() => {
              window.open(`${siteUrl}`, '_blank')
            }}
            ref={(mesh) => {
              if (mesh) {
                meshArray[index] = mesh
              }
            }}
            position={positionArray[index]}
            onUpdate={handleMeshUpdate}
            onPointerOver={handleMeshPointerOver}
            onPointerOut={handleMeshPointerOut}
            userData={user}
          >
            <meshBasicMaterial attach="material" side={DoubleSide} map={texture} />
            <planeGeometry attach="geometry" args={[0.5, (0.5 / texture.image.width) * texture.image.height]} />
          </mesh>
        )
      })}
    </>
  )
}

export default ImagePanels
