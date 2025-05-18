import React from 'react'

function DesignAlgo1({image , name , tech}) {
  return (
    <div className='w-screen '>
      <div className='h-[65vw] w-screen relative'> 

        <img src={image[0]} className='w-[50vw] z-[0] absolute left-[8vw]  ' alt="" />
        <img src={image[1]} className='w-[40vw]  z-[2] absolute top-[20vw] left-[13vw] ' alt="" />
        <img src={image[2]} className='w-[40vw] translate-x-[20vw] absolute top-[4vw] right-[30vw] ' alt="" />
      </div>
<div className="flex  px-2 mt-6 justify-between opacity-50"><h6>{name}</h6><h6>{tech}</h6></div>

       </div>
  )
}

export default DesignAlgo1