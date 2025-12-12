import React from 'react'
import {useCursor} from '../context/CursorContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'
function Footer() {
      const socials = [
    {name : 'Instagram' , src : 'https://www.instagram.com/mzco.creative/'},
    {name : 'Behance' , src : 'https://www.behance.net/skmeejanur1'},
    {name : 'linkedIn' , src : 'https://www.linkedin.com/in/meeza-from-mzco-aa985b332/'},
    {name : 'Github' , src : 'https://github.com/MEEZA453'},

  ]

const {isDarkMode} = useTheme()
  const {setCursorAnimation} = useCursor()

  return (
  
      <div className="footer absolute  z-[800] bottom-20 left-1/2 -translate-x-1/2 flex gap-7 flex-col items-center justify-center">
        <div className={`flex gap-3 ${isDarkMode ? 'text-white' : 'text-black' } duration-500 flex-col items-center justify-center`}>
          <h2>mzco.creative@gmail.com</h2>
          <div className="flex gap-3">
{socials.map((el , i)=>{
  return <a onMouseEnter={()=>{setCursorAnimation('sociallink-animation')}}
  onMouseLeave={()=>setCursorAnimation('onhome-animation')}
  key={i} href={el.src}>{el.name}</a>
})}
          </div>
        </div>
      </div>
  )
}

export default Footer