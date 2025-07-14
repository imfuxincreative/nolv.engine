import React, { useEffect, useRef , useState  , useContext} from 'react';
import {LoadingContext} from '../context/LoadingContext'
function ScrollProgressBar() {
  const progressRef = useRef();
  const [showMessage , setShowMessage ] = useState(false)
const {isLoading , setIsLoding } = useContext(LoadingContext)
useEffect(() => {
  if (!progressRef.current) return;

  if (isLoading) {

    progressRef.current.style.width = '100%';
    progressRef.current.style.transform = 'translateX(0%)';


    setTimeout(() => {
      if (progressRef.current) {
        progressRef.current.style.transform = 'translateX(100%)';
      }
    }, 1000); 
  } else {
   
    progressRef.current.style.width = '0%';
    progressRef.current.style.transform = 'translateX(0%)';
  }
}, [isLoading]);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      console.log(scrollTop)
      const docHeight = document.documentElement.scrollHeight
      console.log(docHeight)
      const scrollPercent = (scrollTop / docHeight) * 100;
      if(scrollPercent > 97){
          progressRef.current.style.opacity = 0
        setShowMessage(true)
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
<h2>I'm fuckin' creative.</h2>
</div>
    <div
      ref={progressRef}
      className=" fixed z-[100] top-0 duration-1000 left-0 bg-black  h-[5px] w-0"
      />
      </div>
  );
}

export default ScrollProgressBar;
