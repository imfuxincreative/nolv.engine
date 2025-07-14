import React from 'react'
import {useRef , useState , useEffect , useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import ScrollProgressBar from './ScrollProgressBer';
import { LoadingContext } from '../context/LoadingContext';
function Navber2() {
const {setIsLoading , isLoading} = useContext(LoadingContext)
const navigate = useNavigate();
const menuSliderRef  = useRef();
const handleHome = ()=>{
  setIsLoading(false)
  navigate('/')
menuSliderRef.current.style.transform = 'translate(-0px)'
}
const handleAbout = ()=>{
  
  navigate('/about')
  menuSliderRef.current.style.transform = 'translate(90px)'
}
const handleResource= ()=>{
  navigate('/resources')
  menuSliderRef.current.style.transform = 'translate(200px)'
}
const handleWhatIf = ()=>{
  setIsLoading(!isLoading)
  setTimeout(()=>{
    navigate('/infiniteGrid')

  },1000)
}
  return (
    <div className='fixed z-[999] '>
<ScrollProgressBar/>
    <div className='lg:w-[300px] flex items-center  justify-center gap-[13vw] px-[4vw] lg:gap-14 rounded-full left-1/2 -translate-x-1/2   fixed z-[999] overflow-hidden bottom-8 bg-black/20 backdrop-blur-xl h-[8.4vw] lg:h-[37px] '>
     <h4 className='relative z-10 text-white' onClick = {handleHome}>Home</h4> 
      <h4 className='relative z-10 text-white' onClick = {handleAbout}>About</h4>
      <h4 className='relative z-10 text-white' onClick = {handleResource}>Resource</h4>
      <div ref={menuSliderRef} className='h-full duration-500 max-w-[100px] w-[23vw] absolute rounded-full -translate-x-[100px]  z-[0] bg-black'></div>

    </div>

    <button onClick={handleWhatIf} className='lg:h-[34px] h-[7vw] w-[22vw] px-2 lg:w-[100px] rounded-full fixed z-[999] right-10 top-10 text-white bg-black'>What if ?</button>
    </div>
  )
}

export default Navber2