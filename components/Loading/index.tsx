import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Loading() {
  const [dotsCount, setDotsCount] = useState(1)
  const controls = useAnimation()

  useEffect(() => {
    const interval = setInterval(() => {
      setDotsCount((prevCount) => (prevCount % 3) + 1)

      controls.start({
        transition: {
          duration: 1,
        },
      })
    }, 250)

    return () => {
      clearInterval(interval)
    }
  }, [dotsCount, controls])

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      Loading
      <motion.div initial="initial" animate={controls}>
        {'.'.repeat(dotsCount)}
      </motion.div>
    </div>
  )
}
