import React , {useContext} from 'react'
import {useTheme} from '../context/ThemeContext.jsx'
import { IsMobileContext } from '../context/IsMobile.jsx'
function Bg() {
  const {isMobile } = useContext(IsMobileContext)
  console.log(isMobile)
const {isDarkMode} =  useTheme()
  return (
    <div   className='fixed top-0 pointer-events-none z-[0] h-screen w-screen bg-white  flex justify-center items-center'>
    <div style={{scale : isDarkMode ? ( isMobile ? 6 : 3) : 0}} className='rounded-full transition-transform duration-1000 h-[50vw] w-[50vw] bg-black'></div>
    </div>
  )
}

export default Bg