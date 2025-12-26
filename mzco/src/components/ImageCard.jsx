import React from 'react'
import abundance from '../assets/images/InfiniteImages/abundance.webp'
import black from '../assets/images/InfiniteImages/black.webp'
import ImageOpener from '../components/ImageOpener.jsx'

import {useState , useRef ,  useEffect} from 'react'
import {useTheme} from '../context/ThemeContext.jsx'

import {useNavigate} from  'react-router-dom'
function ImageCard({src , index ,  scaleDown, isFull , to = '/gallary'}) {
  const {isDarkMode} = useTheme()
  
const navigate = useNavigate()
const imageRef = useRef()

const handleImageClick = () => {
  const rect = imageRef.current.getBoundingClientRect()
  const scrollX = window.scrollX || window.pageXOffset
  const scrollY = window.scrollY || window.pageYOffset
console.log(index)
  const data = {
    index , 
    rect: {
      top: rect.top + scrollY,
      left: rect.left + scrollX,
      width: rect.width,
      height: rect.height,
    },
  }

  sessionStorage.setItem('zoom-image', JSON.stringify(data))
  navigate(to)
}

  return (
    <div className={`border-r-[1px] border-b-[1px] flex flex-col duration-500 items-center justify-center ${isDarkMode ? 'border-[#363636]':'border-[#dfdfdf]'} lg:h-[250px] lg:w-[250px] max-sm:h-[200px] max-sm:w-[200px]  md:h-[260px] md:w-[260px]`}>
<div>

</div>
<img ref={imageRef}  onClick={handleImageClick}  src={src} className={` overflow-hidden   ${isFull ? 'w-[130px] lg:[150px] ':'w-[110px] lg:w-[130px]'} duration-200`} alt="" />
<div className='flex gap-3'>
{/* <button >Graphic</button> */}
</div>
    </div>
  )
}

export default ImageCard