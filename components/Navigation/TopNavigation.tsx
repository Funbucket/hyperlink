import { useMeshesStore } from '~/stores/meshes'
import { usePanelPositionStore } from '~/stores/panelPosition'
import { gsap } from 'gsap'
import { vector3ToTweenValue } from '~/utils'
import { useRouter } from 'next/router'

const TopNavigation = () => {
  // const { positionArray, positionType, dispatchPositionType } = usePanelPositionStore((state) => ({
  //   positionArray: state.positionArray,
  //   positionType: state.positionType,
  //   dispatchPositionType: state.dispatchPositionType,
  // }))

  // const { meshArray } = useMeshesStore((state) => ({
  //   meshArray: state.mesh.current,
  // }))

  // const setPosition = () => {
  //   for (let i = 0; i < meshArray.length; i++) {
  //     // 위치 이동
  //     gsap.to(meshArray[i].position, {
  //       duration: 2,
  //       x: vector3ToTweenValue(positionArray[i]).x,
  //       y: vector3ToTweenValue(positionArray[i]).y,
  //       z: vector3ToTweenValue(positionArray[i]).z,
  //     })
  //   }
  // }
  const router = useRouter()
  return (
    <div className="absolute top-0 z-10 w-screen text-sm text-center mt-6">
      {/* <button
        onClick={() => {
          switch (positionType) {
            case 'random':
              dispatchPositionType('sphere')
              break
            case 'sphere':
              dispatchPositionType('random')
              break
          }
          setPosition()
        }}
      >
        hello1
      </button> */}
      <div className="flex flex-row justify-center">
        <button
          className="mr-10"
          onClick={() => {
            window.open('https://forms.gle/LSDA7PGN1Y9zc6ik8', '_blank')
          }}
        >
          Create Link
        </button>
        <button
          onClick={() => {
            router.push('/list')
          }}
        >
          List View
        </button>
      </div>
    </div>
  )
}

export default TopNavigation
