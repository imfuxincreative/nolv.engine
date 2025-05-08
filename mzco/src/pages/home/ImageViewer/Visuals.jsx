import React from 'react'
import img1 from '../../../assets/images/visuals/img1.jpg'
import img from '../../../assets/images/visuals/img.jpg'
import img2 from '../../../assets/images/visuals/img2.jpg'
import img3 from '../../../assets/images/visuals/img3.jpg'
import img4 from '../../../assets/images/visuals/img4.jpg'
import img5 from '../../../assets/images/visuals/img5.jpg'
import img6 from '../../../assets/images/visuals/img6.jpg'
import img7 from '../../../assets/images/visuals/img7.jpg'
import img8 from '../../../assets/images/visuals/img8.jpg'
import img9 from '../../../assets/images/visuals/img9.jpg'
import img10 from '../../../assets/images/visuals/img10.jpg'


function Visuals() {
  const visuals = [img5 , img6 , img7 , img8 , img9 , img10 ,img , img1 , img2 , img3 , img4]
  return (
    <div className='h-screen w-screen  items-center flex flex-col gap-10 px-3'>
      {visuals.map((el, index)=>{
        return <div className='w-[70vw]'>

<div className='flex w-full justify-between mt-1 opacity-60'><h5>00{index+1}</h5></div>
          <img src={el} className='w-[70vw]' alt="" />
        </div>
      })}

    </div>
  )
}

export default Visuals