import React from 'react'


function DesignAlgo7({image , name , tech , video , index}) {
  return (
    <div><div className='w-screen flex  relative  flex-col justify-center items-center'>
     
      <div className=' '>
        <img className='object-cover object-center h-[80vw] w-[86vw]' src={!video ? image[0] : video} alt="" />
     
      </div>

    </div> 
    
    </div>
  )
}

export default DesignAlgo7