import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import cv from '../../public/CV.pdf'
function About() {
  const introduction = ['hii,', "I'm", 'meeza™ '];
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

const handleDownload = () => {
  console.log('clo')
  const link = document.createElement('a');
  link.href = '/CV.pdf';  // Path in public folder
  link.download = 'CV'; // Filename for download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};



  return (
    <div className='content-center absolute top-0  pointer-events-none h-screen bg-white w-screen'>
      <div className='col items-center justify-center gap-3 lg:gap-1 absolute flex  flex-col top-1/2 left-[24vw] lg:left-[44vw] '>

      <div className='flex gap-2 '>
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
      <h4>
Designer | Frontend developer
      </h4>
        </div>
<div className='footer absolute z-[800] bottom-20 left-[10vw] lg:left-[40.5vw] flex gap-7 flex-col items-center justify-center'>
  <button onClick={handleDownload} className=' rounded-full border border-[#b3b3b3] pointer-events-auto bg-[#f0f0f0]'>CV.pdf</button>
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

export default About;
