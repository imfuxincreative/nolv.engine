import React from 'react'
import DesignAlgo1 from '../../components/DesignAlgo/DesignAlgo1.jsx'
import DesignAlgo2 from '../../components/DesignAlgo/DesignAlgo2.jsx'
import DesignAlgo3 from '../../components/DesignAlgo/DesignAlgo3.jsx'
import DesignAlgo4 from '../../components/DesignAlgo/DesignAlgo4.jsx'



import firstImg1 from  '../../assets/images/Designs/1/img1.jpg'
import firstImg2 from  '../../assets/images/Designs/1/img2.webp'
import firstImg3 from  '../../assets/images/Designs/1/img3.jpg'
import timeless1 from '../../assets/images/Designs/timeless/timeless1.jpg'
import nosta1 from '../../assets/images/Designs/3/nostalogia1.jpg'
import nosta2 from '../../assets/images/Designs/3/nostalogia2.jpg'
import aband1 from '../../assets/images/Designs/4/aband1.jpg'
import aband2 from '../../assets/images/Designs/4/aband2.webp'
import aband3 from '../../assets/images/Designs/4/aband3.webp'
import aband4 from '../../assets/images/Designs/4/aband4.jpg'
import mzverse1 from '../../assets/images/Designs/mzverse/mzverse.png'
import starlight1 from '../../assets/images/Designs/6/starlight.webp'
import starlight2 from '../../assets/images/Designs/6/starlight2.jpg'
import starlight3 from '../../assets/images/Designs/6/starlight3.jpg'
import folio2024 from '../../assets/images/Designs/portfolio24/mockup.webp'
import arcitecture from '../../assets/images/Designs/arcitecture/arcitecture.jpg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Portfolio24 from './Portfolio24.jsx'
function Design() {
  const navigate = useNavigate()
  const [designs , setDesigns] = useState([
    {name : 'Upcoming' , tech : 'Graphics Design' , image : [firstImg1 , firstImg2 , firstImg3] , video : false , algo : DesignAlgo1},
    {name : 'Timeless Edition' , tech : 'Graphics Design' , image : [timeless1 ] , video : false , algo : DesignAlgo2 , navigation : ()=>{navigate('/timeless')}},
    {name : 'Nostalogia' , tech : 'Graphics Design' , image : [nosta1 , nosta2] , video : false , algo : DesignAlgo3},
    {name : 'Abandoned' , tech : 'Graphics Design' , image : [aband1 , aband2 , aband3 , aband4] , video : false , algo : DesignAlgo4},
    {name : 'mzverse.io' , tech : 'UI/UX + MERN' , image : [mzverse1] , video : false , algo : DesignAlgo2 , navigation : ()=>{navigate('/mzverse')}},
    {name : 'Starlight' , tech : 'UI/UX + MERN' , image : [starlight1 , starlight2] , video : false , algo : DesignAlgo3},
 {name : 'Portfolio-2024' , tech : 'Design + Development' , image : [folio2024] , video : false , algo : DesignAlgo2 , navigation : ()=>{navigate('/portfolio-2024')}},

        




    
  ])
  return (
    <div className='  w-screen Pb-[20vw] bg-white/90 mt-[20vw] flex flex-col gap-8 justify-center items-center relative z-[900]'>
      {designs.map((dsgn , index )=>{
        const Algo  = dsgn.algo
        return <div onClick={dsgn.navigation? dsgn.navigation  : null} >{<Algo image = {dsgn.image} name = {dsgn.name} tech = {dsgn.tech} video = {dsgn.video}  index={index}/>}</div>
      })}
    </div>
  )
}

export default Design