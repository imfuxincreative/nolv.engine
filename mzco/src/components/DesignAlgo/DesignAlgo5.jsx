
import React from 'react'

function DesignAlgo5({image , name , tech , video , index}) {
  return (
    <div><div className='w-screen flex justify-center items-center flex-col'>
      <div className='flex gap-2  '>
<img src={image[0]} className='w-[35vw]' alt="" />
<img src={image[1]} className='w-[35vw] object-cover' alt="" />

      </div>
 {/* <div className="flex w-screen mt-2 px-2 justify-between opacity-50"><h6>{name}</h6><h6>{tech}</h6></div> */}

    </div>

    
    </div>
  )
}

export default DesignAlgo5