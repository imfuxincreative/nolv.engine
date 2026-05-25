import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useCursor } from '../context/CursorContext';
import { MdArrowOutward } from 'react-icons/md';
import { LuMenu } from 'react-icons/lu';
import { IoEyeOutline, IoSendSharp } from 'react-icons/io5';
import { IoIosLink } from "react-icons/io";
import { GoHome } from "react-icons/go";
import { TbArrowRoundaboutRight } from "react-icons/tb";
import { GrProjects } from "react-icons/gr";
import { useTheme } from '../context/ThemeContext';
import styles from './CustomCursor.module.css';
function CustomCursor() {
  const cursorRef = useRef(null);
  const { cursorAnimation } = useCursor();
 const {isDarkMode} = useTheme()
  useEffect(() => {
    if (!cursorRef.current) return;

    if (window.innerWidth > 640) {
      const onMouseMove = (event: MouseEvent) => {
        const { clientX: x, clientY: y } = event;

        // Animate cursor position
        gsap.to(cursorRef.current, {
          duration: 0.4,
          x,
          y,
          ease: 'power2.out',
        });
      };

      window.addEventListener('mousemove', onMouseMove);

      // Cursor animation switch
      if (cursorAnimation === 'onmenuhome-animation') {
  
        gsap.to('.home', { opacity: 1 });
gsap.to('.about' , {opacity : 0})
gsap.to('.projects' , {opacity : 0});
        gsap.to('.link', { opacity: 0 });
        gsap.to('.arrow', { opacity: 0 });
        gsap.to('.eye', { opacity: 0 });
        gsap.to('.barger', { opacity: 0 });
        gsap.to('.send', { opacity: 0 });

      }
      
     else  if (cursorAnimation === 'onmenuabout-animation') {
        console.log('menu animation applied');
        gsap.to('.home', { opacity: 0 });
gsap.to('.about' , {opacity : 1})
gsap.to('.projects' , {opacity : 0});
        gsap.to('.link', { opacity: 0 });
        gsap.to('.arrow', { opacity: 0 });
        gsap.to('.eye', { opacity: 0 });
        gsap.to('.barger', { opacity: 0 });
        gsap.to('.send', { opacity: 0 });

      }
           else  if (cursorAnimation === 'onmenuprojects-animation') {
        console.log('menu animation applied');
        gsap.to('.home', { opacity: 0 });
gsap.to('.about' , {opacity : 0})
gsap.to('.projects' , {opacity : 1});
        gsap.to('.link', { opacity: 0 });
        gsap.to('.arrow', { opacity: 0 });
        gsap.to('.eye', { opacity: 0 });
        gsap.to('.barger', { opacity: 0 });
        gsap.to('.send', { opacity: 0 });

      }
      else if (cursorAnimation === 'sociallink-animation') {
        gsap.to(cursorRef.current, {
          scale: 0.8,
      
        });
                  gsap.to('.home', { opacity: 0 });
gsap.to('.about' , {opacity : 0})
gsap.to('.projects' , {opacity : 0});
        gsap.to('.link', {
          opacity: 1,
         
        });
            gsap.to('.arrow', {
          opacity: 0,
          color: 'black',
        });
        gsap.to('.question', { opacity: 0 });

        gsap.to('.eye', { opacity: 0 });
        gsap.to('.barger', { opacity: 0 });
        gsap.to('.send', { opacity: 0 });

      } else if (cursorAnimation === 'whatif-animation') {
        gsap.to(cursorRef.current, {
          scale: 1,
          
        });
        gsap.to('.question', {
          opacity: 1,
          
        });
        gsap.to('.link', { opacity: 0 });
          gsap.to('.home', { opacity: 0 });
gsap.to('.about' , {opacity : 0})
gsap.to('.projects' , {opacity : 0});
        gsap.to('.eye', { opacity: 0 });
        gsap.to('.barger', { opacity: 0 });
        gsap.to('.send', { opacity: 0 });

      } else if (cursorAnimation === 'onhome-animation') {
        gsap.to(cursorRef.current, {
          scale: 0.3,
      
        });
        gsap.to('.question', {opacity : 0})
        gsap.to('.link' , {opacity : 0})
                  gsap.to('.home', { opacity: 0 });
gsap.to('.about' , {opacity : 0})
gsap.to('.projects' , {opacity : 0});
        gsap.to('.arrow', { opacity: 0 });
        gsap.to('.eye', { opacity: 0 });
        gsap.to('.barger', { opacity: 0 });
        gsap.to('.send', { opacity: 0 });

      } else if (cursorAnimation === 'projectlink-animation') {
        gsap.to(cursorRef.current, {
          scale: 0.8,
           
        });
        gsap.to('.arrow', {
          opacity: 1,
          color : isDarkMode ? 'black':'white'
    
        });
         gsap.to('.home', {
          opacity: 0,
        });
        gsap.to('.question' , {opacity : 0})
        gsap.to('.link', { opacity: 0 });
gsap.to('.about' , {opacity : 0})
gsap.to('.projects' , {opacity : 0});
        gsap.to('.eye', { opacity: 0 });
        gsap.to('.barger', { opacity: 0 });
        gsap.to('.send', { opacity: 0 });

      } else if (cursorAnimation === 'menubutton-animation') {
        gsap.to(cursorRef.current, {
          scale: 0.8,
        });
        gsap.to('.arrow', {
          opacity: 0,
          color: 'white',
        });
        gsap.to('.link', { opacity: 0 });
        gsap.to('.home', { opacity: 0 });
gsap.to('.about' , {opacity : 0})
gsap.to('.projects' , {opacity : 0});
        gsap.to('.eye', { opacity: 0 });
        gsap.to('.barger', { opacity: 1 });
        gsap.to('.send', { opacity: 0 });

      } else if (cursorAnimation === 'sendmessage-animation') {
        gsap.to(cursorRef.current, {
          scale: 0.8,
          
        });
        gsap.to('.arrow', {
          opacity: 0,
          color: 'white',
        });
        gsap.to('.eye', { opacity: 0 });
        gsap.to('.barger', { opacity: 0 });
        gsap.to('.send', { opacity: 1 });

      } else if (cursorAnimation === 'playground-animation') {
        gsap.to(cursorRef.current, {
          scale: .9,
        
        });
        gsap.to('.arrow', {
          opacity: 0,
          
        });
        gsap.to('.question' , {opacity : 0})
                gsap.to('.home', { opacity: 0 });
gsap.to('.about' , {opacity : 0})
gsap.to('.projects' , {opacity : 0});
        gsap.to('.eye', { opacity: 1 });
        gsap.to('.barger', { opacity: 0 });
        gsap.to('.send', { opacity: 0 });
      }

      // Cleanup
      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        console.log('cursor destroyed');
      };
    } else {
      gsap.to(cursorRef.current, { opacity: 0 });
    }
  }, [cursorAnimation]);

  return (
<div
  ref={cursorRef}
  className={`${styles.cursorContainer} ${isDarkMode ? styles.bgDark : styles.bgLight} home cursor`}
>
  <IoIosLink   className={`link ${styles.iconCommon} ${styles.textWhite} ${styles.lgText25}`} />
  <h1  className={`question ${styles.iconCommon} ${styles.lgText25}`}>?</h1>
  <MdArrowOutward
    className={`arrow ${styles.iconCommon}`}
    size={25}
  />
  <GoHome className={`home ${styles.iconCommon}`}
    size={22}/>
  <LuMenu
    className={`barger ${styles.iconCommon}`}
    size={25}
  />
  <IoEyeOutline
    className={`eye ${styles.iconCommon}`}
    size={24}
  />
  <IoSendSharp
    className={`send ${styles.iconCommon}`}
    size={25}
  />
    <TbArrowRoundaboutRight   
    className={`about ${styles.iconCommon}`}
    size={20}
  />
      <GrProjects   
    className={`projects ${styles.iconCommon}`}
    size={18}
  />
</div>


  );
}

export default CustomCursor;
