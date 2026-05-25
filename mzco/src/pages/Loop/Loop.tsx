import React from 'react'
import ImageCanvasAnimation from '../../components/ImageCanvasAnimation/ImageCanvasAnimation'
import ScrollProgressBer from '../../components/ScrollProgressBer'
import { useCursor } from '../../context/CursorContext'
function Loop() {
const {setCursorAnimation} = useCursor()
  return (
    <div  onMouseEnter={()=>setCursorAnimation('onhome-animation')}  className=''>
      {/* <ScrollProgressBer/> */}
      <ImageCanvasAnimation/>
    </div>
  )
}

export default Loop