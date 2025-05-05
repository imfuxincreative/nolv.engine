import React from 'react'
import {useState , useEffect} from 'react'

function DynamicBlur() {
    let [isBlur , setIsBlur ] = useState(0)
    useEffect(()=>{
const handleScroll  = ()=>{
    const scrollY = window.scrollY ; 
    const blurValue = isBlur + scrollY/10
    setIsBlur(blurValue)
}
        window.addEventListener('scroll' , handleScroll);
    },[])

  return (
    <div className='h-screen w-screen pointer-events-none z-[500] fixed top-0'
    style = {{
        backdropFilter :  `blur(${isBlur}px)`
    }}
    ></div>
  )
}

export default DynamicBlur