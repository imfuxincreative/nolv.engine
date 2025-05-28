import React from 'react'


import mockup from '../../assets/images/Designs/arcitecture/arcitecture.jpg'
import poster from '../../assets/images/Designs/arcitecture/arcposter.webp'
import img1 from '../../assets/images/Designs/arcitecture/s.jpg'
import img2 from '../../assets/images/Designs/arcitecture/sd.jpg'
import img3 from '../../assets/images/Designs/arcitecture/raw.jpg'
import img4 from '../../assets/images/Designs/arcitecture/fd.jpg'
import full from '../../assets/images/Designs/arcitecture/arcitectrefull.jpg'





import { MdArrowOutward } from "react-icons/md";

import next from '../../assets/images/Designs/portfolio24/mockup.webp'
import {useNavigate} from 'react-router-dom'


function Arcitecture() {
  const navigate = useNavigate()
  return (
<div className='flex bg-white/80 h-full pb-[10vw] pt-[2.2vw] flex-col relative z-50 gap-[4vw] items-center w-screen'>
<img src={mockup} alt="" className="object-cover " />
{/* <div className='border flex rounded-full justify-between items-center p-[3px] pl-[5px] w-[22vw] h-[6.3vw]'>
<h5 className='font-[inter-medium] text-[14px] '>View live</h5>
<a  className = 'bg-black h-[4.7vw] w-[4.7vw] flex items-center justify-center rounded-full'href='https://.netlify.app'><MdArrowOutward   color  = 'white' className = ' size-5 max-sm:size-[3.5vw] '/></a>
</div> */}
<img src={poster} className='w-screen' alt="" />
<div className='flex gap-[2vw]'>
  <img src={img2}className='w-[54vw] object-cover' alt="" />
  <img src={img1}className='w-[44vw] object-cover' alt="" />

</div>

<div className='flex gap-[2vw]'>
  <img src={img3}className='w-[54vw] object-cover' alt="" />
  <img src={img4}className='w-[44vw] object-cover' alt="" />

</div>

<img src={full} alt="" className="object-cover " />

<div className='w-screen  overflow-hidden  h-[50vw] relative bg-black' onClick={()=>{navigate('/portfolio-2024')}}>
    <img  className = 'object-cover object-top'src={next} alt="" />
  <div  className = 'bg-white h-[4.7vw] absolute top-[2vw] right-[2vw] w-[4.7vw] flex items-center justify-center rounded-full'><MdArrowOutward 
   className = ' size-5 max-sm:size-[3.5vw] '/></div>  
   <h2  className='bottom-4 absolute  text-black left-2'>Portfolio-2024</h2>
</div>

    </div>
  )
}

export default Arcitecture