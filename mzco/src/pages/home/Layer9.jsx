import React from 'react'
import svg3 from '../../assets/elements/line3.svg'

function Layer9() {
  return (
    <div className='h-[100vh] w-full overflow-hidden pointer-events-none'>
       <img className='z-[70] absolute top-[44vw] right-0 poi' src={svg3} alt="" />
       <svg 
  className="absolute top-0 right-0 z-[70] pointer-events-none" 
  width="84vw" 
  height="140vw" 
  xmlns="http://www.w3.org/2000/svg"
>
  {/* Left border line */}
  <line 
    x1="0" 
    y1="0" 
    x2="0" 
    y2="100%" 
    stroke="black" 
    strokeWidth="0.6" 
  />

  {/* Bottom border line */}
  <line 
    x1="0" 
    y1="100%" 
    x2="100%" 
    y2="100%" 
    stroke="black" 
    strokeWidth="0.6" 
  />
</svg>

<div className='absolute top-[54vw] z-[70] -translate-x-[110vw] w-[200vw] h-[163vw] border-t border-r  pointer-events-none rounded-[40vw]'>

</div>

    <h5 className='absolute top-[103vw] left-[0vw] z-[70]'> 15cm</h5> 
    <h5 className='absolute top-[136vw] left-[12vw] z-[70] rotate-270'> 90</h5>
    <h5 className='absolute top-[124vw] left-[48vw] z-[70]'> 360</h5>



    </div>
  )
}

export default Layer9