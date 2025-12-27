import { useFrame } from '@react-three/fiber'
import React, { useMemo } from 'react'
import BlurText from './BlurText'
import {useRef} from 'react'
import img3 from '../../assets/images/InfiniteImages/beach1.jpg'
function LoopingTexts({count = 80, zRange = 160}) {
  const textRefs = useRef([])
  const textOptions =  [
    { name: "User", profile: img3, message: "hiii", theme: "neon" },
    { name: "User", profile: img3, message: "I'm Fuckin' creative", theme: "neon" },
    { name: "User", profile: img3, message: "hello", theme: "gray" },
    { name: "User", profile: img3, message: "flow()", theme: "neon" },
    { name: "User", profile: img3, message: "code", theme: "pink" },
    { name: "User", profile: img3, message: "innovation", theme: "gray" },
    { name: "User", profile: img3, message: "function()", theme: "neon" },
    { name: "User", profile: img3, message: "404", theme: "black" },
    { name: "User", profile: img3, message: "<motion/>", theme: "neon" },
    { name: "User", profile: img3, message: "I love motion", theme: "blue" },
    { name: "User", profile: img3, message: "blend", theme: "gray" },
    { name: "User", profile: img3, message: "creative", theme: "neon" },
    { name: "User", profile: img3, message: "Design", theme: "gray" },
    { name: "User", profile: img3, message: ";)", theme: "black" },
    { name: "User", profile: img3, message: "craft", theme: "neon" },
    { name: "User", profile: img3, message: "visual", theme: "pink" },
    { name: "User", profile: img3, message: ":)", theme: "black" },
    { name: "User", profile: img3, message: "I'm wanna shine", theme: "pink" },
    { name: "User", profile: img3, message: "mzco.creative", theme: "neon" },
    { name: "User", profile: img3, message: "Stooop.", theme: "black" },
    { name: "User", profile: img3, message: "figma", theme: "pink" },
  ];

  const positions = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      x: (Math.random() - 0.5) * 6,
      y: (Math.random() - 0.5) * 4,
      z: -Math.random() * zRange,
      word: textOptions[Math.floor(Math.random() * textOptions.length)],
    }))
  }, [count])

  useFrame(({ camera }) => {
    textRefs.current.forEach((ref, i) => {
      if (!ref) return

      // Recycle if behind camera
      if (ref.position.z < camera.position.z - zRange) {
        ref.position.z += zRange
      }
    })
  })

  return (
    <>
      {positions.map((pos, i) => (
        <BlurText
          key={i}
          position={[pos.x, pos.y, pos.z]}
          message={pos.word.message}
          theme={pos.word.theme}
          profile={pos.word.profile}
          ref={(el) => (textRefs.current[i] = el)}
        />
      ))}
    </>
  )
}

export default LoopingTexts