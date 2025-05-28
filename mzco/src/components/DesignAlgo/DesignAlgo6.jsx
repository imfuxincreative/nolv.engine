import React from 'react'
import { MdArrowOutward } from "react-icons/md";


function DesignAlgo2({image , name , tech , video , index}) {
  return (
    <div><div className='w-screen flex  relative  flex-col justify-center items-center'>
     
      <div className='bg-black rounded overflow-hidden h-[47vw] w-[85vw]'>
        <img className='object-cover ' src={!video ? image[0] : video} alt="" />
      </div>

    </div> 
    
    </div>
  )
}

export default DesignAlgo2