import React from 'react'
import mockup from '../../assets/images/Designs/mzverse/mzverse.png'
import starlight from '../../assets/images/Designs/mzverse/starlight.jpg'
import starlight2 from '../../assets/images/Designs/mzverse/starlight2.jpg'


import img1 from '../../assets/images/Designs/portfolio24/img1.jpg'
import { MdArrowOutward } from "react-icons/md";
import logoapp from '../../assets/images/Designs/portfolio24/logoapp.webp'
import next from '../../assets/images/Designs/timeless/timeless1.jpg'
import {useNavigate} from 'react-router-dom'


function Mzverse() {
  const navigate = useNavigate()
  return (
<div className='flex bg-white/80 h-full pb-[10vw] pt-[2.2vw] flex-col gap-[4vw] items-center w-screen'>
<img src={mockup} alt="" className="object-cover " />
<div className='border flex rounded-full justify-between items-center p-[3px] pl-[5px] w-[22vw] h-[6.3vw]'>
<h5 className='font-[inter-medium] text-[14px] '>View live</h5>
<a  className = 'bg-black h-[4.7vw] w-[4.7vw] flex items-center justify-center rounded-full'href='https://.netlify.app'><MdArrowOutward   color  = 'white' className = ' size-5 max-sm:size-[3.5vw] '/></a>
</div>
<img src={starlight} className='w-screen' alt="" />
<img src={starlight2} className='w-screen' alt="" />
{/* <div className='flex w-screen gap-[2vw]'>
    <img className='object-cover w-[46vw]' src={logoapp} alt="" />
    <img className='object-cover w-[46vw]' src={img1} alt="" />
</div> */}


<div className='w-screen  overflow-hidden  h-[50vw] relative bg-black' onClick={()=>{navigate('/timeless')}}>
    <img  className = 'object-cover object-top'src={next} alt="" />
  <div  className = 'bg-white h-[4.7vw] absolute top-[2vw] right-[2vw] w-[4.7vw] flex items-center justify-center rounded-full'><MdArrowOutward 
   className = ' size-5 max-sm:size-[3.5vw] '/></div>  
   <h2  className='bottom-4 absolute left-2'>Timeless</h2>
</div>

    </div>
  )
}

export default Mzverse