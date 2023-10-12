import { useEffect, useState } from 'react'

function useMouseTracker() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const updateMousePosition = (e: MouseEvent) => {
    const mouseX = e.clientX + 20
    const mouseY = e.clientY + 20
    setMousePosition({ x: mouseX, y: mouseY })
  }

  useEffect(() => {
    window.addEventListener('mousemove', updateMousePosition)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
    }
  }, [])

  return {
    mousePosition,
    setMousePosition,
    updateMousePosition,
  }
}

export default useMouseTracker
