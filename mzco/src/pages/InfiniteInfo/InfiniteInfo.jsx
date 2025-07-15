import React from 'react'
import ScrollZoomCanvas2 from '../../components/ZoomScroll/ScrollZoomCanvas.jsx'
import ScrollProgressBer from '../../components/ScrollProgressBer.jsx'
import { useCursor } from '../../context/CursorContext.jsx'
function InfiniteInfo() {
const {setCursorAnimation} = useCursor
  return (
    <div  onMouseEnter={()=>setCursorAnimation('onhome-animation')}  className=''>
      {/* <ScrollProgressBer/> */}
      <ScrollZoomCanvas2/>
    </div>
  )
}

export default InfiniteInfo