import React, { useEffect, useRef , useState  , useContext} from 'react';
import {LoadingContext} from '../context/LoadingContext'
function ScrollProgressBar() {
  const progressRef = useRef();
  const [showMessage , setShowMessage ] = useState(false)
const {isLoading , setIsLoding } = useContext(LoadingContext)
 useEffect(() => {
    if (!progressRef.current) return;
    const bar = progressRef.current;

    // Reset styles
    bar.classList.remove('ml-auto');
    bar.classList.remove('right-0');

    if (isLoading) {
      // Step 1: grow from left
      bar.style.width = '100%';

      // Step 2: after full width, shrink from right
      setTimeout(() => {
        if (bar) {
          bar.classList.add('ml-auto');     // Push it to the right
          bar.classList.add('right-0');     // Anchor it to the right
          bar.style.width = '0%';           // Shrink from right
        }
      }, 1000); // Wait until grow finishes
    } else {
      // reset
      bar.style.width = '0%';
      bar.classList.remove('ml-auto');
      bar.classList.remove('right-0');
    }
  }, [isLoading]);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      console.log(scrollTop)
      const docHeight = document.documentElement.scrollHeight
      console.log(docHeight)
      const scrollPercent = (scrollTop / docHeight) * 100;
      if(scrollPercent > 99){
        setShowMessage(true)
        setTimeout(()=>{
          scrollTo(0 , 0)
            
           
        }, 2000)
      }
      if (progressRef.current) {
        progressRef.current.style.width = `${scrollPercent}%`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='pointer-events-none'>
<div style={{opacity : showMessage ? 1 : 0}} className='h-screen fixed flex items-center justify-center z-[100] duration-1000 w-screen bg-white'>
<h2>you made a mess here.</h2>
</div>
    <div
      ref={progressRef}
      className=" fixed z-[120] top-0 duration-1000 left-0  bg-black  h-[5px] w-0"
      />
      </div>
  );
}

export default ScrollProgressBar;
