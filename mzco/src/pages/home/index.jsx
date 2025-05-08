import React from 'react'
import PixelBg from '../../components/pixelbg'
import Layer1 from './Layer1.jsx'
import Layer2 from './Layer2.jsx'
import Layer3 from './Layer3.jsx'
import Layer4 from './Layer4.jsx'
import Layer5 from './Layer5.jsx'
import Layer6 from './Layer6.jsx'
import Layer7 from './Layer7.jsx'
import Layer8 from './Layer8.jsx'
import Layer9 from './Layer9.jsx'
import Layer10 from './Layer10.jsx'
import ControlBar from '../../components/ControlBar.jsx'

function Index() {
  return (
    <div className='h-screen  w-screen overflow-hidden'>
      <PixelBg/>
      <Layer1/>
      <Layer2/>
      <Layer3/>
      <Layer4/>
      <Layer5/>
      <Layer6/>
      <Layer7/>
      <Layer8/>
      <Layer9/>
      <Layer10/>
      <ControlBar/>
    </div>
  )
}

export default Index