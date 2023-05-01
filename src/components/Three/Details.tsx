import { useRef, useState, useMemo, useLayoutEffect } from 'react';
import { ThreeElements } from '@react-three/fiber';
import { Mesh, Shape, Path, CylinderGeometry } from 'three';

interface cilinderType {
  radius: number;
  height: number;
  radialSegments: number;
}
const Cylinder = ({
  radius,
  height,
  radialSegments = 30,
}: cilinderType) => {
  return <cylinderGeometry args={[radius, radius, height, radialSegments]} />
};

const Peg = (props: ThreeElements['mesh']) => {
  const ref = useRef<Mesh>(null!)
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // useFrame((state, delta) => (ref.current.rotation.x += delta))

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <ambientLight />
      <hemisphereLight intensity={0.15} groundColor={'black'} />
      <pointLight intensity={1} />
      <Cylinder radius={0.75} height={2} radialSegments={30} />
      <meshStandardMaterial color={hovered ? 'orange' : 'gray'} />
    </mesh>
  )
}

function HollowCylinderGeometry({ innerRadius = 0.5, outerRadius = 1, radialSegments = 8, height = 1, ...props }) {
  const ref = useRef<any>()
  const { arcShape, options } = useMemo(() => {
    const arcShape = new Shape()
    arcShape.moveTo(outerRadius * 2, outerRadius)
    arcShape.absarc(outerRadius, outerRadius, outerRadius, 0, Math.PI * 2, false)
    const holePath = new Path()
    holePath.moveTo(outerRadius + innerRadius, outerRadius)
    holePath.absarc(outerRadius, outerRadius, innerRadius, 0, Math.PI * 2, true)
    arcShape.holes.push(holePath)
    const options = {
      depth: height,
      bevelEnabled: false,
      steps: 1,
      curveSegments: radialSegments / 2,
    }
    return { arcShape, options }
  }, [])
  useLayoutEffect(() => {
    ref.current.center()
    ref.current.rotateX(Math.PI * -0.5)
  }, [])
  return <extrudeBufferGeometry ref={ref} args={[arcShape, options]} {...props} />
}




const HollowCylinder = (props: ThreeElements['mesh']) => {
  const ref = useRef<THREE.Mesh>(null!)
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // useFrame((state, delta) => (ref.current.rotation.x += delta))



  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <ambientLight />
      <hemisphereLight intensity={0.15} groundColor={'black'} />
      <pointLight intensity={1} />
      {/* <cylinderGeometry args={[0.75, 0.75, 2, 30, 2, true]} />
      <cylinderGeometry args={[1.25, 1.25, 2, 30, 2, true]} /> */}
      <ringBufferGeometry args={[0.75, 1.25, 30]} />
      <meshStandardMaterial color={hovered ? 'orange' : 'gray'} />
    </mesh>
  )
}
export {
  Peg,
  HollowCylinder,
  HollowCylinderGeometry
}