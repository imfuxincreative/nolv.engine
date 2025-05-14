import React from 'react'
import Index from '../home/index.jsx';
import ParallaxImageAlgo from '../../components/parallaxImageAlgo.jsx'
import DynamicBlur   from '../../components/DynamicBlur.jsx'
import ControlBar from '../../components/ControlBar.jsx';



function Home() {
  return (
    <div>

         <div className="">
     { window.innerWidth < 640?<div>

      
 
   

      <div className="sticky top-0 z-[100]">
        <Index />
      </div>
     
</div>: <div className="h-screen w-screen items-center justify-center  flex"><h5 className="text-[20px] tracking-tight">Switch to Mobile</h5></div>}

  </div>
    </div>
  )
}

export default Home