import Navber from './component pages/navber';

import Home from './home.jsx';
import Footer from './component pages/footer.jsx'
import Playground from './playground.jsx';
import Contact from './contact.jsx'
import Menu from './menu.jsx'
import Mobmenu from './mobilemenu.jsx'
import Aboutme from './aboutme.jsx';
import React, { useState , useEffect , useRef } from 'react'
import gsap from 'gsap'
import Project1 from './projects/appleofficial.jsx'
import Project2 from './projects/znote.jsx'
import LocomotiveScroll from 'locomotive-scroll';


import arrow from './assets/arrow.png'
import { MdArrowOutward } from "react-icons/md";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScrollTotop from './scrollTotop.jsx'
import { AnimatePresence, motion } from 'framer-motion';
import { LuMenu } from "react-icons/lu";
import { IoSendSharp } from "react-icons/io5";
import Loader from './component pages/loader.jsx'
import Lenis from '@studio-freight/lenis';
import SwimingPool from './swimingPool.jsx'


import './app.css'

import { IoEyeOutline } from "react-icons/io5";
import { CursorProvider, useCursor } from './context/CursorContext.jsx';
import CustomCursor from './component pages/CustomCursor.jsx';


function App() {
  
let {cursorAnnimation , setCursorAnnimation} = useCursor
  let [isLoading , setIsLoading ] = useState(true)
  const scrollRef = useRef(null)
  const cursorRef = useRef(null);
  const scrollInstance = useRef(null)
useEffect(()=>{
  
  const timer =  setTimeout(()=>{
    setIsLoading(false)
  }, 3000)


  return ()=>{
    clearTimeout(timer)
  }
  
})


useEffect(() => {
  const timer = setTimeout(() => {
    setIsLoading(false);
  }, 3000);

  return () => {
    clearTimeout(timer);
  };
}, []);

 

useEffect(() => {

  if (!isLoading) {
    
    scrollInstance.current = new Lenis({
      duration: 1.2, // Smoothness of scrolling // Easing function
      smooth: true,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
    });
    console.log('scroll installized')


    const scroll = (time) => {
      scrollInstance.current.raf(time);
      requestAnimationFrame(scroll);
    };

    requestAnimationFrame(scroll);

    // Cleanup on unmount
    const onMouseMove = (event) => {
      const { clientX: x, clientY: y } = event;

      // Use GSAP to animate the cursor
      gsap.to(cursorRef.current, {
        duration: 0.4, // How fast the element should follow the cursor
        x: x,
        y: y ,
        ease: 'power2.out', // Smooth easing effect
      });
    };

    window.addEventListener('mousemove', onMouseMove);

    // Cleanup on unmount
    return () => {
      console.log('scroll destroyed')
    };
  }
}, [isLoading]);
if(window.innerWidth > 640) {
  if(cursorAnnimation === 'onmenu-annimation'){
    console.log('menu annimation applied')
    gsap.to(cursorRef.current, {
      backgroundColor : 'white',
      scale : 0.3

    })
    gsap.to('.arrow', {
     opacity : 0
    })
    gsap.to('.eye', {
      opacity : 0
     })
     gsap.to('.barger', {
      opacity : 0
     })
     gsap.to('.send', {
      opacity : 0
     })

    
  }if(cursorAnnimation === 'onmenu-element-annimation'){
    gsap.to(cursorRef.current,{
      scale  : 1.5, 
      backgroundColor : 'white'
    })
    gsap.to('.arrow',{
     opacity : 1  , 
     color : 'black'
    })
    gsap.to('.eye', {
      opacity : 0
     })
     gsap.to('.barger', {
      opacity : 0
     })
     gsap.to('.send', {
      opacity : 0
     })
    
  }if(cursorAnnimation === 'onmenu-link-annimation'){
    gsap.to(cursorRef.current,{
      scale  : 1, 
      backgroundColor : 'white'
    })
    gsap.to('.arrow',{
     opacity : 1  , 
     color : 'black'
    })
    gsap.to('.eye', {
      opacity : 0
     })
     gsap.to('.barger', {
      opacity : 0
     })
     gsap.to('.send', {
      opacity : 0
     })
  }if(cursorAnnimation === 'onhome-annimation'){
    gsap.to(cursorRef.current , {
      scale : 0.3 , 
    backgroundColor : 'black' , 

    })
    gsap.to('.arrow' , {
      opacity : 0 , 
    })
    gsap.to('.eye', {
      opacity : 0
     })
     gsap.to('.barger', {
      opacity : 0
     })
     gsap.to('.send', {
      opacity : 0
     })

  }if(cursorAnnimation ==='onbutton-annimation'){
    gsap.to(cursorRef.current , {
      scale : .8,
      backgroundColor : 'black'
    })
    gsap.to('.arrow' , {
      opacity : 1 , 
      color : 'white'
    })
    gsap.to('.eye', {
      opacity : 0
     })
     gsap.to('.barger', {
      opacity : 0
     })
     gsap.to('.send', {
      opacity : 0
     })
  }
  if(cursorAnnimation ==='menubutton-annimation'){
    gsap.to(cursorRef.current , {
     scale  : 0.8, 

    })
    gsap.to('.arrow' , {
      opacity :  0, 
      color : 'white'
    })
    gsap.to('.eye', {
      opacity : 0
     })
     gsap.to('.barger', {
      opacity : 1
     })
     gsap.to('.send', {
      opacity : 0
     })
  }if(cursorAnnimation === 'sendmessage-annimation'){
    gsap.to(cursorRef.current , {
      scale : .8,
      backgroundColor : 'black'
    })
    gsap.to('.arrow' , {
      opacity : 0 , 
      color : 'white'
    })
    gsap.to('.eye', {
      opacity : 0
     })
     gsap.to('.barger', {
      opacity : 0
     })
     gsap.to('.send', {
      opacity : 1
     })
  }if(cursorAnnimation === 'playground-annimation'){
    gsap.to(cursorRef.current , {
      scale : 1.2,
      backgroundColor : 'black'
    })
    gsap.to('.arrow' , {
      opacity : 0 , 
      color : 'white'
    })
    gsap.to('.eye', {
      opacity : 1
     })
     gsap.to('.barger', {
      opacity : 0
     })
     gsap.to('.send', {
      opacity : 0
     })
  }

}else{
   gsap.to(cursorRef.current , {
    opacity : 0 , 
   })
   console.log('')
}
  


  const pageVariants = {
    initial: { opacity : 0 ,  filter: "blur(10px)" },
    in: { opacity : 1 , filter: "blur(0px)"  },
    out: {  opacity : 0  , filter: "blur(200px)"}, 
  }


  const menuVarient = {
    initial : { y : 1000 } , 
    in : {y : 0 } , 
    out : {y : 1000 }
  }

  
  const pageTransition = { type: "tween", ease: "linear", duration: .8 };
  
const menuTransition  = {duration : .7 , ease : 'linear'}
  return (
    <div ref={scrollRef} style={{height : '100%' ,  }} data-scroll-container className=' main mx-0'>
  

       
      <div className = ''>


      {isLoading ? <Loader></Loader> :<CursorProvider>
      <AnimatePresence mode="wait"> 

<CustomCursor/>
  <Router>
    
    <ScrollTotop  lenis={scrollInstance.current} />
    <Routes location={location} key={location.pathname} >
      <Route path = '/project1-appleofficial' exact element = {<motion.div
      initial = 'initial'
      animate = 'in'
      exit = 'out '
      variants = {pageVariants}
      transition = {pageTransition}>
        <Project1/>
      
      </motion.div>} />
      <Route path = '/project2-znote' exact element = {<motion.div
      initial = 'initial'
      animate = 'in'
      exit = 'out '
      variants = {pageVariants}
      transition = {pageTransition}>
        <Project2/>
      
      </motion.div>} />
      <Route path = '/swiming-pool' exact element = {<motion.div
      initial = 'initial'
      animate = 'in'
      exit = 'out '
      variants = {pageVariants}
      transition = {pageTransition}>
        <SwimingPool/>
      
      </motion.div>} />
    <Route path='/contact' exact element={<motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Contact cursorAnnimation = {cursorAnnimation} setCursorAnnimation = {setCursorAnnimation}/>
            </motion.div>} />
    <Route path='/menu' exact element={<motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Menu cursorAnnimation = {cursorAnnimation} setCursorAnnimation = {setCursorAnnimation}/>
            </motion.div>} />
            <Route path='/mobmenu' exact element={<motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Mobmenu cursorAnnimation = {cursorAnnimation} setCursorAnnimation = {setCursorAnnimation}/>
            </motion.div>} />
    <Route path='/' exact element={<motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
       
            </motion.div>} />
    <Route path='/playground' exact element={<motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Playground cursorAnnimation = {cursorAnnimation} setCursorAnnimation = {setCursorAnnimation}/>
            </motion.div>} />
    <Route path='/aboutme' exact element={<motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Aboutme cursorAnnimation = {cursorAnnimation} setCursorAnnimation = {setCursorAnnimation}/>
            </motion.div>} />



    </Routes>
  </Router>
  </AnimatePresence>

  </CursorProvider>
}  
  

      </div>

    </div>
  )
}

export default App

