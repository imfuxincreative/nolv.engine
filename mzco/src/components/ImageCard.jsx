import React from 'react'
import abundance from '../assets/images/InfiniteImages/abundance.webp'
import black from '../assets/images/InfiniteImages/black.webp'
import ImageOpener from '../components/ImageOpener.jsx'
import {useState , useEffect} from 'react'

function ImageCard({image , scaleDown, isFull}) {
const [isImageOpen , setIsImageOpen ] = useState(false)
  return (
    <div className='border-r-[1px] border-b-[1px] flex flex-col items-center justify-center border-[#d1d1d1] lg:h-[250px] lg:w-[250px] h-[200px] w-[200px]'>
<div>

</div>
<img  src={image} className={` overflow-hidden   ${isFull ? 'w-[130px] lg:[150px] ':'w-[110px] lg:w-[130px]'} duration-200`} alt="" />
<div className='flex gap-3'>
{/* <button >Graphic</button> */}
</div>
    </div>
  )
}

export default ImageCard