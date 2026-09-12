import React from 'react'
import ImageCanvasAnimation from '../../components/ImageCanvasAnimation/ImageCanvasAnimation.jsx'
import ScrollProgressBer from '../../components/ScrollProgressBer.jsx'
import { useCursor } from '../../context/CursorContext.jsx'
function Loop() {
  const { setCursorAnimation } = useCursor
  return (
    <div onMouseEnter={() => setCursorAnimation('onhome-animation')} className=''>
      <ImageCanvasAnimation />
    </div>
  )
}

export default Loop