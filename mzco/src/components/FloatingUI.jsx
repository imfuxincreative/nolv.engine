import { Html } from '@react-three/drei'
import { forwardRef } from 'react'

const FloatingUI = forwardRef(({ position, img }, ref) => {
  return (
    <group ref={ref} position={position}>
      <Html
        transform
        distanceFactor={1.2}   // scales with camera zoom
        occlude={false}
      >
        <div className="flex gap-3 items-center">
          <img
            className="h-6 w-6 rounded-full"
            src={img}
            alt="avatar"
          />
          <p
            style={{ borderRadius: "18px 18px 18px 4px" }}
            className="bg-black py-1.5 px-3 text-white text-sm whitespace-nowrap"
          >
            listen to me
          </p>
        </div>
      </Html>
    </group>
  )
})

export default FloatingUI
