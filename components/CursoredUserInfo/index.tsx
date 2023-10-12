import { useHoveredUserStore } from '~/stores/hoveredUser'

interface Props {
  hoverOnPanel: boolean
  mousePosition: { x: number; y: number }
}

const HoveredUserInfo = ({ hoverOnPanel, mousePosition }: Props) => {
  const { userName } = useHoveredUserStore((state) => ({
    userName: state.name,
  }))

  return (
    <>
      {hoverOnPanel ? (
        <span
          style={{
            zIndex: 100,
            position: 'absolute',
            userSelect: 'none',
            transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0)`,
          }}
        >
          {userName}
        </span>
      ) : (
        <></>
      )}
    </>
  )
}

export default HoveredUserInfo
