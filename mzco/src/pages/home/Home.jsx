import React from 'react'
import Index from '../home/index.jsx';
import ParallaxImageAlgo from '../../components/parallaxImageAlgo.jsx'
import DynamicBlur   from '../../components/DynamicBlur.jsx'
import ControlBar from '../../components/ControlBar.jsx';
import Design from '../design/Design.jsx';
import PixelBg from '../../components/pixelbg.jsx';
import Navber from '../../components/Navber.jsx';
import { MenuBgContext } from '../../context/MenuBgContext.jsx';
import InfiniteImageCanvas from '../InfiniteGrid/InfiniteGrid.jsx';
import Layer10 from './Layer10.jsx';



function Home() {
  return (
    <div className='h-screen w-screen'>

{/* <Navber/> */}
         <div className="">
     { window.innerWidth < 640?<div>

      
 
   

      <div className="sticky top-0">
        {/* <Layer10/> */}
        {/* <InfiniteImageCanvas/> */}
        <Index/>
      </div>
  {/* <Design/> */}
     
</div>: <div className="h-screen w-screen items-center justify-center  flex"><h5 className="text-[20px] tracking-tight">Switch to Mobile</h5></div>}

  </div>
    </div>
  )
}

export default Home