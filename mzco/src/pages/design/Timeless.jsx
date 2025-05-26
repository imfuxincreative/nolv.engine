import React from 'react'
import mockup from '../../assets/images/Designs/timeless/timeless1.jpg'
import img2 from '../../assets/images/Designs/timeless/img.jpg'
import img1 from '../../assets/images/Designs/timeless/img1.jpg'
import img5 from '../../assets/images/Designs/timeless/img5.jpg'
import img6 from '../../assets/images/Designs/timeless/img6.jpg'
import img4 from '../../assets/images/Designs/timeless/img4.jpg'
import img3 from '../../assets/images/Designs/timeless/img3.jpg'
import love from '../../assets/images/Designs/timeless/love.jpg'
import shadow from '../../assets/images/Designs/timeless/shadow.jpg'



import poster1 from '../../assets/images/Designs/timeless/poster1.webp'



import { MdArrowOutward } from "react-icons/md";
import next from '../../assets/images/Designs/arcitecture/arcitecture.jpg'
import {useNavigate} from 'react-router-dom'


function Timeless() {
    const navigate = useNavigate()
  
  return (
<div className='flex bg-white/80 h-full pb-[10vw] ] flex-col  items-center w-screen'>
{/* <img src={mockup} alt="" className="object-cover w-screen" /> */}
<img src={img2} className='w-screen' alt="" />

<div className='flex w-screen'>
   <div className='flex content-center bg-black items-center justify-center w-[60vw]'>
<img src={poster1} className='w-[40vw]' alt="" />
   </div>
    <div className='w-[40vw]'>
      <img src={img5} alt="" />
      <img src={img1} alt="" />

    </div>
</div>
<img src={img6} className='w-screen' alt="" />
<img src={love} className='w-screen' alt="" />
<div>
  <img src={img3} alt="" />
  <div className='flex w-screen'>
    <img className='w-[50vw] object-cover' src={shadow} alt="" />
    <img className='w-[50vw] object-cover' src={img4} alt="" />

  </div>
</div>

<div className='w-screen mt-[10vw] overflow-hidden  h-[50vw] relative bg-black' onClick={()=>{navigate('/arcitecture')}}>
    <img  className = 'object-cover object-top'src={next} alt="" />
  <div  className = 'bg-white h-[4.7vw] absolute top-[2vw] right-[2vw] w-[4.7vw] flex items-center justify-center rounded-full'><MdArrowOutward 
   className = ' size-5 max-sm:size-[3.5vw] '/></div>  
   <h2  className='bottom-4 absolute left-2'>Arcitecture</h2>
</div>

    </div>
  )
}

export default Timeless