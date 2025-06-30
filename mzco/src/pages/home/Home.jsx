import React,{useState , useContext , useEffect} from 'react'
import Index from '../home/index.jsx';
import ParallaxImageAlgo from '../../components/parallaxImageAlgo.jsx'
import DynamicBlur   from '../../components/DynamicOpacity.jsx'
import ControlBar from '../../components/ControlBar.jsx';
import Design from '../design/Design.jsx';
import PixelBg from '../../components/pixelbg.jsx';
import Navber from '../../components/Navber.jsx';
import { MenuBgContext } from '../../context/MenuBgContext.jsx';
import InfiniteImageCanvas from '../InfiniteGrid/InfiniteGrid.jsx';
import Layer10 from './Layer10.jsx';
import About from '../About.jsx';
import { BlurContext } from '../../context/BlurContext.jsx';
import { LoadingContext } from '../../context/LoadingContext.jsx';
import Loading from '../../components/loading.jsx';
import { AnimatePresence } from 'framer-motion';


function Home() {
  const {blurValue , setBlurValue}  = useContext(BlurContext)
    const {isLoading , setIsLoading} = useContext(LoadingContext)
    console.log(isLoading)
useEffect(()=>{
 const  timer = setTimeout(()=>{
setIsLoading(false)
  } , 500)
  return ()=> clearTimeout(timer)
},[])
    return (
      <div>{isLoading ?<AnimatePresence><Loading/></AnimatePresence> : <div className='h-screen w-screen'>

{/* <Navber/> */}
         <div className="">
     { window.innerWidth < 640?<div>

      
 
   

      <div className="sticky top-0">
        <DynamicBlur/>
        {/* <Layer10/> */}
        {/* <InfiniteImageCanvas/> */}
        <Index/>
      </div>
      <div className='top' style={{opacity : blurValue*.2}}>
  <About/>

      </div>
     
</div>: <div className="h-screen w-screen items-center justify-center  flex"><h5 className="text-[20px] tracking-tight">Switch to Mobile</h5></div>}

  </div>
    </div>}

   
      </div>
  )
}

export default Home