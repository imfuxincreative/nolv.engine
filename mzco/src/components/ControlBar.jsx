import React from 'react'
import logo from '../assets/images/logo.png'

function ControlBar() {
  return (
    <div  className='h-[8vw] w-[50vw] flex justify-between items-center px-1 absolute top-[20vw] right-[40vw] rounded bg-black/5 border-[#dddddd] border z-[500] backdrop-blur-2xl'>
        <div className='flex gap-1 items-center'>

        <div className='rounded-full overflow-hidden content-center h-[6vw] w-[6vw] bg-white'>
<img src={logo} alt="" />
        </div>

        <h5>mzco.</h5>
        </div>
        <button className='bg-white h-[6vw] w-[6vw] font-[inter-regular] text-[5vw] border-none px-1 py-1 rounded-full'>+</button>
    </div>
  )
}

export default ControlBar