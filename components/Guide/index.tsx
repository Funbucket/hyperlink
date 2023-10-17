import { useState, useEffect } from 'react'

interface Props {
  guideStep: 'description' | 'usage' | 'end'
  setGuideStep: (step: 'description' | 'usage' | 'end') => void
  setShowGuide: (value: boolean) => void
}

const Guide = ({ guideStep, setGuideStep, setShowGuide }: Props) => {
  const skipDescription = () => {
    setGuideStep('usage')
  }

  const skipUsage = () => {
    setGuideStep('end')
  }

  useEffect(() => {
    const descriptionTimeout = setTimeout(() => {
      if (guideStep === 'description') {
        setGuideStep('usage')
      }
    }, 6000)

    if (guideStep === 'end') {
      setShowGuide(false)
    }

    return () => {
      clearTimeout(descriptionTimeout)
    }
  }, [guideStep])

  return (
    <div className="fixed z-10 w-screen h-screen bg-white bg-opacity-50">
      <div className="flex flex-col justify-center content-center h-screen w-screen">
        <p className="text-center text-sm">
          {guideStep === 'description' && (
            <>3D 공간에서 부유하면서 다른 사람의 사진을 클릭하여 그들과 링크될 수 있습니다.</>
          )}
          {guideStep === 'usage' && (
            <>
              WASD / 방향키: 이동
              <br />
              마우스 드래그: 회전
            </>
          )}
        </p>
        {guideStep === 'description' && (
          <button className="text-blue-500 underline mt-6" onClick={skipDescription}>
            Skip
          </button>
        )}
        {guideStep === 'usage' && (
          <button className="text-blue-500 underline mt-6" onClick={skipUsage}>
            Start
          </button>
        )}
      </div>
    </div>
  )
}

export default Guide
