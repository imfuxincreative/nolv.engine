import React from 'react'

function DesignAlgo1({image , name , tech}) {
  return (
    <div className='w-screen relative'>
      <div className='h-[65vw] w-screen'> 

        <img src={image[0]} className='w-[60vw] z-[3] absolute left-[8vw]  rotate-[-5deg]' alt="" />
        <img src={image[1]} className='w-[40vw]  z-[2] absolute top-[20vw] left-[13vw] ' alt="" />
        <img src={image[2]} className='w-[45vw] translate-x-[20vw] absolute top-[4vw] right-[30vw] ' alt="" />
      </div>
<div className="flex  px-2 justify-between opacity-50"><h6>{name}</h6><h6>{tech}</h6></div>

       </div>
  )
}

export default DesignAlgo1