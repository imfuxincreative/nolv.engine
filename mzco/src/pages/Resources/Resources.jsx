import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
// import cv from '../../public/CV.pdf'
function Resources() {
  const introduction = ['Page', "is", 'under ', "development"];
  const textRefs = useRef([]);

  useEffect(() => {
    textRefs.current.forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0,  },
        {
          opacity: 1,

          duration: 0.8,
          delay: i * 0.5,
          ease: 'power2.out',
        }
      );
    });
  }, []);




  return (
    <div className='content-center absolute top-0 pointer-events-none bg-white h-screen w-screen'>
      <div className='flex gap-2 absolute top-1/2 left-[10vw] lg:left-[40vw] '>
        {
          introduction.map((el, i) => (
            <h2
              key={i}
              ref={(elRef) => (textRefs.current[i] = elRef)}
              className='text-black '
            >
              {el}
            </h2>
          ))
        }
      </div>
<div className='footer absolute z-[800] bottom-20 left-[10vw] lg:left-[41vw] flex gap-7 flex-col items-center justify-center'>

  <div className='flex gap-4 flex-col items-center justify-center' >
<h2 className=''>mzco.creative@gmail.com</h2>
<div className='flex gap-3'>
  <a href="">instagram</a>
  <a href="">Behance</a>
  <a href="">LinkedIn</a>
  <a href="">Github</a>

</div>
  </div>
</div>

    </div>
  );
}

export default Resources;
