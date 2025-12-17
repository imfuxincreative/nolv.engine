import { useFrame } from '@react-three/fiber'
import React, { useMemo } from 'react'
import BlurText from './BlurText'
import {useRef} from 'react'
function LoopingTexts({count = 80, zRange = 160}) {
  const textRefs = useRef([])
  const textOptions = ['hiii', "I'm Fuckin' creative",'hello','flow()', 'code','inovation', 'function()','404','<motion/>' ,'I love motion', 'blend','creative', 'Design',';)', 'craft','visual', ':)', "I'm wanna shine", 'mzco.creative', 'Stooop.','figma']

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
          text={pos.word}
          ref={(el) => (textRefs.current[i] = el)}
        />
      ))}
    </>
  )
}

export default LoopingTexts