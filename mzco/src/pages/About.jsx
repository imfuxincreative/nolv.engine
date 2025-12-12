import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useTheme } from '../context/ThemeContext';

import Footer from '../components/Footer';
function About() {
  const introduction = ['hii,', "I'm", 'meeza™ '];
  const textRefs = useRef([]);
const {isDarkMode} = useTheme()
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
  window.open('/Resume.pdf', '_blank');
};
  return (
    <div className='content-center absolute top-0  h-screen w-screen'>
      <div className={`col ${isDarkMode ? 'text-white' : 'text-black' } duration-500 items-center justify-center gap-1 absolute flex  flex-col top-1/2 -translate-x-1/2 left-1/2 `}>

      <div className='flex gap-2 '>
        {
          introduction.map((el, i) => (
            <h2
            key={i}
            ref={(elRef) => (textRefs.current[i] = elRef)}
            className=' '
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
  <button onClick={handleDownload} className=' rounded-full border fixed bottom-[200px] left-1/2 -translate-x-1/2 px-2 py-1 - border-[#b3b3b3] pointer-events-auto bg-[#f0f0f0]'>CV.pdf</button>
<Footer/>

    </div>
  );
}

export default About;
