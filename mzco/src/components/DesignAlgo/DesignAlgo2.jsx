import React from 'react'
import { MdArrowOutward } from "react-icons/md";


function DesignAlgo2({image , name , tech , video , index}) {
  return (
    <div>{index %2 === 0 ?<div className='w-screen flex  relative  flex-col justify-center items-center'>
      <div  className = 'bg-white h-[4.7vw] absolute top-[2vw] right-[10vw] w-[4.7vw] flex items-center justify-center rounded-full'><MdArrowOutward 
         className = ' size-5 max-sm:size-[3.7vw] text-black'/></div>
      <div className='bg-black rounded overflow-hidden h-[47vw] w-[85vw]'>
        <img className='object-cover ' src={!video ? image[0] : video} alt="" />
      </div>
<div className="flex w-screen mt-2 px-2 justify-between opacity-50"><h6>{name}</h6><h6>{tech}</h6></div>

    </div> : <div className='w-screen flex relative  flex-col justify-center items-center'>
        <div  className = 'bg-white h-[4.7vw] absolute top-[2vw] right-[10vw] w-[4.7vw] flex items-center justify-center rounded-full'><MdArrowOutward 
         className = ' size-5 max-sm:size-[3.7vw] text-black'/></div>
      <div className='bg-black rounded overflow-hidden h-[45vw] w-[85vw]'>
        <img className='object-cover object-top' src={!video ? image[0] : video} alt="" />
      </div>
<div className="flex w-screen mt-2 px-2 justify-between opacity-50"><h6>{name}</h6><h6>{tech}</h6></div>

    </div> }

    
    </div>
  )
}

export default DesignAlgo2