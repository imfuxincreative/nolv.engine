import React from 'react'
import abundance from '../assets/images/InfiniteImages/abundance.webp'
import black from '../assets/images/InfiniteImages/black.webp'


function ImageCard({image , scaleDown, isFull}) {
  return (
    <div className='border-r-[1px] border-b-[1px] flex flex-col items-center justify-center border-[#d1d1d1] lg:h-[39vw] lg:w-[39vw] h-[50vw] w-[50vw]'>
<div>

</div>
<img src={image} className={` overflow-hidden w-[30vw]  ${isFull ? 'w-[35vw] lg:w-[7vw] ':'w-[30vw] lg:w-[7vw]'} duration-200`} alt="" />
<div className='flex gap-3'>
{/* <button >Graphic</button> */}
</div>
    </div>
  )
}

export default ImageCard