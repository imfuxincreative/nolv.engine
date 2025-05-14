import React from 'react'
import logo from '../assets/images/mzco.png'
import { IoEyeOutline } from "react-icons/io5";

function worksToggleBar() {
  return (
    <div className=' h-[9vw] z-[999] w-[60vw] border border-[#d8d8d8] items-center flex justify-between px-2 fixed top-[5vw] left-[17vw] backdrop-blur-3xl rounded'>
<div className="flex gap-1 items-center">
        <div className="rounded-full overflow-hidden content-center h-[6vw] w-[6vw] bg-white">
          <img src={logo} alt="" />
        </div>
        <h5>mzco.</h5>
      </div>
      <div className="flex gap-1">
      <button className="bg-white h-[6vw] w-[6vw] font-[inter-regular] text-[5vw] border-none px-1 py-1 rounded-full"><IoEyeOutline color='' size={15}/></button>
   

      </div>
    </div>
  )
}

export default worksToggleBar