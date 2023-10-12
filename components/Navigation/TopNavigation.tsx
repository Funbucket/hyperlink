import { useMeshesStore } from '~/stores/meshes'
import { usePanelPositionStore } from '~/stores/panelPosition'
import { gsap } from 'gsap'
import { vector3ToTweenValue } from '~/utils'

const TopNavigation = () => {
  const { positionArray, positionType, dispatchPositionType } = usePanelPositionStore((state) => ({
    positionArray: state.positionArray,
    positionType: state.positionType,
    dispatchPositionType: state.dispatchPositionType,
  }))

  const { meshArray } = useMeshesStore((state) => ({
    meshArray: state.mesh.current,
  }))

  const setPosition = () => {
    for (let i = 0; i < meshArray.length; i++) {
      // 위치 이동
      gsap.to(meshArray[i].position, {
        duration: 2,
        x: vector3ToTweenValue(positionArray[i]).x,
        y: vector3ToTweenValue(positionArray[i]).y,
        z: vector3ToTweenValue(positionArray[i]).z,
      })
    }
  }

  return (
    <div className="absolute top-5 left-1/2 z-10">
      <button
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
        hello
      </button>
    </div>
  )
}

export default TopNavigation
