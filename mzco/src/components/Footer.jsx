import React from 'react'
import {useCursor} from '../context/CursorContext.jsx'
function Footer() {
      const socials = [
    {name : 'Instagram' , src : 'https://www.instagram.com/mzco.creative/'},
    {name : 'Behance' , src : 'https://www.behance.net/skmeejanur1'},
    {name : 'linkedIn' , src : 'https://www.linkedin.com/in/meeza-from-mzco-aa985b332/'},
    {name : 'Github' , src : 'https://github.com/MEEZA453'},

  ]
  const {setCursorAnimation} = useCursor()

  return (
  
      <div className="footer absolute  z-[800] bottom-20 left-[10vw] lg:left-[41vw] flex gap-7 flex-col items-center justify-center">
        <div className="flex gap-4 flex-col items-center justify-center">
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