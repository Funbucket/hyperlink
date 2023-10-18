import { OrbitControls } from '@react-three/drei'
import { extend, useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'
import { Vector3 } from 'three'
import { useAnimationStore } from '~/stores/animation'

extend({ OrbitControls })

const Controls = () => {
  const { camera, gl } = useThree()
  const controlsRef = useRef<any>(undefined)
  const targetDistance = 1

  const [moveForward, setMoveForward] = useState(false)
  const [moveBackward, setMoveBackward] = useState(false)
  const [moveRight, setMoveRight] = useState(false)
  const [moveLeft, setMoveLeft] = useState(false)
  const { dispatchAnimationEnd } = useAnimationStore((state) => ({
    dispatchAnimationEnd: state.dispatchAnimationEnd,
  }))

  const velocity = new Vector3()
  let prevTime = performance.now()

  const onKeyDown = function (event: KeyboardEvent) {
    switch (event.keyCode) {
      case 38: // 위쪽 화살표
      case 87: // W
        setMoveForward(true)
        break
      case 40: // 아래쪽 화살표
      case 83: // S
        setMoveBackward(true)
        break
      case 37: // 왼쪽 화살표
      case 65: // A
        setMoveRight(true)
        break
      case 39: // 오른쪽 화살표
      case 68: // D
        setMoveLeft(true)
        break
    }
  }

  const onKeyUp = function (event: KeyboardEvent) {
    switch (event.keyCode) {
      case 38: // 위쪽 화살표
      case 87: // W
        setMoveForward(false)
        break
      case 40: // 아래쪽 화살표
      case 83: // S
        setMoveBackward(false)
        break
      case 37: // 왼쪽 화살표
      case 65: // A
        setMoveRight(false)
        break
      case 39: // 오른쪽 화살표
      case 68: // D
        setMoveLeft(false)
        break
    }
  }

  useEffect(() => {
    camera.position.set(0, 0, 10)
    const animationDuration = 1.5
    const targetPosition = new Vector3(0, 0, 2)
    const initialPosition = camera.position.clone()

    const startTime = performance.now()
    const endTime = startTime + animationDuration * 1000

    const updateCameraPosition = () => {
      const now = performance.now()
      if (now < endTime) {
        const progress = (now - startTime) / (endTime - startTime)
        camera.position.lerpVectors(initialPosition, targetPosition, progress)
        requestAnimationFrame(updateCameraPosition)
      } else {
        camera.position.copy(targetPosition)
        dispatchAnimationEnd(true)
      }
    }

    updateCameraPosition()

    if (controlsRef.current) {
      controlsRef.current.target.set(0, 0, 0)
    }
  }, [camera, controlsRef, dispatchAnimationEnd])

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown, false)
    document.addEventListener('keyup', onKeyUp, false)
    return () => {
      document.removeEventListener('keydown', onKeyDown, false)
      document.removeEventListener('keyup', onKeyUp, false)
    }
  })

  useFrame((state) => {
    // 사용자의 성능에 따라 카메라를 부드럽게 이동하도록 합시다.
    const time = performance.now()
    const delta = (time - prevTime) / 1000

    velocity.z -= velocity.z * 60.0 * delta
    velocity.x -= velocity.x * 60.0 * delta

    if (moveForward) velocity.z -= 60.0 * delta
    if (moveBackward) velocity.z += 60.0 * delta
    if (moveLeft) velocity.x += 60.0 * delta
    if (moveRight) velocity.x -= 60.0 * delta

    state.camera.translateZ(velocity.z * delta)
    state.camera.translateX(velocity.x * delta)

    prevTime = time

    // 카메라가 바라 보는 방향의 목표물 위치 업데이트
    const cameraPosition = camera.position.clone()
    const cameraDirection = new Vector3(0, 0, -1)
    camera.getWorldDirection(cameraDirection)
    const targetPosition = cameraPosition.clone().add(cameraDirection.multiplyScalar(targetDistance))

    // OrbitControls의 target 업데이트
    if (controlsRef.current) {
      controlsRef.current.target.copy(targetPosition)
    }
  })

  return (
    <OrbitControls
      ref={controlsRef}
      camera={camera}
      domElement={gl.domElement}
      enableDamping={true}
      dampingFactor={0.1}
      rotateSpeed={0.5}
    />
  )
}

export default Controls
