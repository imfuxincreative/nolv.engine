import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useCursor } from '../context/CursorContext';
import { MdArrowOutward } from 'react-icons/md';
import { LuMenu } from 'react-icons/lu';
import { IoEyeOutline, IoSendSharp } from 'react-icons/io5';
import { IoIosLink } from "react-icons/io";
function CustomCursor() {
  const cursorRef = useRef(null);
  const { cursorAnimation } = useCursor();

  useEffect(() => {
    if (!cursorRef.current) return;

    if (window.innerWidth > 640) {
      const onMouseMove = (event) => {
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
      if (cursorAnimation === 'onmenu-animation') {
        console.log('menu animation applied');
        gsap.to(cursorRef.current, {
          backgroundColor: 'white',
          scale: 0.3,
        });
        gsap.to('.link', { opacity: 0 });
        gsap.to('.arrow', { opacity: 0 });
        gsap.to('.eye', { opacity: 0 });
        gsap.to('.barger', { opacity: 0 });
        gsap.to('.send', { opacity: 0 });

      } else if (cursorAnimation === 'sociallink-animation') {
        gsap.to(cursorRef.current, {
          scale: 0.8,
          backgroundColor: 'black',
        });
        gsap.to('.link', {
          opacity: 1,
          color: 'white',
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
          backgroundColor: 'white',
        });
        gsap.to('.question', {
          opacity: 1,
          color: 'black',
        });
        gsap.to('.link', { opacity: 0 });

        gsap.to('.eye', { opacity: 0 });
        gsap.to('.barger', { opacity: 0 });
        gsap.to('.send', { opacity: 0 });

      } else if (cursorAnimation === 'onhome-animation') {
        gsap.to(cursorRef.current, {
          scale: 0.3,
          backgroundColor: 'black',
        });
        gsap.to('.arrow', { opacity: 0 });
        gsap.to('.eye', { opacity: 0 });
        gsap.to('.barger', { opacity: 0 });
        gsap.to('.send', { opacity: 0 });

      } else if (cursorAnimation === 'projectlink-animation') {
        gsap.to(cursorRef.current, {
          scale: 0.8,
          backgroundColor: 'black', 
        });
        gsap.to('.arrow', {
          opacity: 1,
          color: 'white',
        });
        gsap.to('.link', { opacity: 0 });

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

        gsap.to('.eye', { opacity: 0 });
        gsap.to('.barger', { opacity: 1 });
        gsap.to('.send', { opacity: 0 });

      } else if (cursorAnimation === 'sendmessage-animation') {
        gsap.to(cursorRef.current, {
          scale: 0.8,
          backgroundColor: 'black',
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
          backgroundColor: 'black',
        });
        gsap.to('.arrow', {
          opacity: 0,
          color: 'white',
        });
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
  className="fixed top-0 z-[9999] left-0 w-10 h-10 scale-30 bg-black rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 pt-2 pl-2"
>
  <IoIosLink   className="link opacity-0 lg:text-[25px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white" />
  <h1  className="question opacity-0 lg:text-[25px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">?</h1>
  <MdArrowOutward
    className="arrow opacity-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
    size={25}
  />
  <LuMenu
    className="barger opacity-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
    size={25}
  />
  <IoEyeOutline
    className="eye opacity-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
    size={24}
  />
  <IoSendSharp
    className="send opacity-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
    size={25}
  />
</div>


  );
}

export default CustomCursor;
