const Lights = () => {
  return (
    <>
      <ambientLight color={'white'} intensity={3} />
      <directionalLight color={'white'} position={[1, 0, 2]} intensity={1} />
    </>
  )
}

export default Lights
