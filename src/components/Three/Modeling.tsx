import { Box } from '@mui/material'
import { Canvas } from '@react-three/fiber'
import { useSelector } from 'react-redux'
import { stateType, detailType } from '../../types'
import { Peg, HollowCylinder } from './Details'

const styles = {
  position: 'absolute',
  left: '240px',
  top: '48px',
  width: 'calc(100% - 240px)',
  height: 'calc(100% - 48px)'
}

const Modeling = () => {
  const assembleItems = useSelector((state: stateType) => state.details.assembleItems)
  const activeAssembleItem = useSelector((state: stateType) => state.details.activeAssembleItem)
  const assembleItem = activeAssembleItem > -1 && assembleItems[activeAssembleItem] as detailType[]

  return (
    <Box sx={styles}>
      {/* {
        (assembleItem && assembleItem.length !== 0) && (
        
        )
      } */}
      <Canvas
        shadows
        frameloop='demand'
        camera={{ position: [20, 15, 10], fov: 20 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Peg position={[0, 1, 0]} />
        {/* <HollowCylinder position={[0, -2, 1]} /> */}
      </Canvas>
    </Box>
  )
}

export default Modeling
