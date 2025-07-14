import React from 'react'
import {useRef , useState , useEffect , useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import ScrollProgressBar from './ScrollProgressBer';
import { LoadingContext } from '../context/LoadingContext';
function Navber2() {
const {setIsLoading} = useContext(LoadingContext)
const navigate = useNavigate();
const menuSliderRef  = useRef();
const handleHome = ()=>{
  navigate('/')
menuSliderRef.current.style.transform = 'translate(8px)'
}
const handleAbout = ()=>{
  
  navigate('/about')
  menuSliderRef.current.style.transform = 'translate(94px)'
}
const handleResource= ()=>{
  navigate('/projects')
  menuSliderRef.current.style.transform = 'translate(190px)'
}
const handleWhatIf = ()=>{
  setIsLoading(true)
  setTimeout(()=>{
    navigate('/infiniteGrid')

  },1000)
}
  return (
    <div className='fixed z-[999] '>

    <div className='lg:w-[400px] flex items-center  justify-center gap-12 w-[270px]  lg:gap-20 rounded-full left-1/2 -translate-x-1/2   fixed z-[999] overflow-hidden bottom-8 bg-black/20 backdrop-blur-xl min-h-[30px] max-h-[45px] h-[35px]  lg:h-[37px] '>
     <h4 className='relative z-10 text-white' onClick = {handleHome}>Home</h4> 
      <h4 className='relative z-10 text-white' onClick = {handleAbout}>About</h4>
      <h4 className='relative z-10 text-white' onClick = {handleResource}>Projects</h4>
      <div ref={menuSliderRef} className='h-full duration-500 min-w-[100px] max-w- w-[100px] absolute rounded-full -translate-x-[100px]  z-[0] bg-black'></div>

    </div>

    <button onClick={handleWhatIf} className='lg:h-[34px] h-[7vw] w-[22vw] px-2 lg:w-[100px] rounded-full fixed z-[999] right-10 top-10 text-white bg-black'>What if ?</button>
    </div>
  )
}

export default Navber2