import React from 'react'
import {Canvas, useFrame, useThree} from '@react-three/fiber'
import {useRef ,useEffect} from 'react'
import LoopingTexts from './LoopingTexts';
import {useTheme} from '../../context/ThemeContext.jsx'


function InfiniteCamera ({scrollRef}){
const {isDarkMode} = useTheme()
  const {camera} = useThree();
useFrame(()=>{
  const targetZ = 10 + scrollRef.current * 10
  camera.position.z += (targetZ - camera.position.z)*0.1
})
return null
}
  
export default function ScrollZoomCanvas() {
  const scrollRef  = useRef(0) 

useEffect(() => {
  let start = null
  const startY = window.scrollY
  const targetY = 500
  const duration = 500 // in ms

  const step = (timestamp) => {
    if (!start) start = timestamp
    const progress = timestamp - start
    const percent = Math.min(progress / duration, 1)
    const eased = percent < 0.5
      ? 2 * percent * percent
      : -1 + (4 - 2 * percent) * percent

    window.scrollTo(0, startY + (targetY - startY) * eased)

    if (percent < 1) {
      requestAnimationFrame(step)
    }
  }

  requestAnimationFrame(step)
}, [])

useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY / window.innerHeight


    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  return (
    <div className='relative w-full h-[100000px] bg-transparent'>
        <Canvas camera={{position : [0 , 0 , 10] , fov :50}}
        className='!fixed  top-0 left-0 w-full h-screen'>
            <ambientLight  intensity = {1} />
            <LoopingTexts/>
            <InfiniteCamera scrollRef = {scrollRef}/>
        </Canvas>
    </div>
  )
}

