import React, { useRef, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoadingContext } from '../context/LoadingContext';
import { useCursor } from '../context/CursorContext';

function Navber2() {
  const { setIsLoading  , setShowMessage} = useContext(LoadingContext);
  const {setCursorAnimation} = useCursor()
  const navigate = useNavigate();
  const menuSliderRef = useRef();

  // Track screen size
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {                           
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive slider handler
  const handleNavigate = (path, offsetSmall, offsetLarge) => {
    navigate(path);
    const offset = isLargeScreen ? offsetLarge : offsetSmall;
    if (menuSliderRef.current) {
      menuSliderRef.current.style.transform = `translate(${offset}px)`;
    }
  };

  const handleWhatIf = () => {
    setIsLoading(true);
    setTimeout(() => navigate('/infiniteGrid'), 1000);
  };

  return (
    <div className="fixed z-[999]">
      {/* Bottom Navigation */}
      <div onMouseLeave={()=> setCursorAnimation('onhome-animation')} onMouseEnter={()=> setCursorAnimation('menubutton-animation')} className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center gap-10 lg:gap-20 w-[270px] lg:w-[370px] h-[35px] lg:h-[37px] min-h-[30px] max-h-[45px] bg-black/20  backdrop-blur-xl rounded-full overflow-hidden z-[999]">
        <h4 onMouseLeave={setCursorAnimation('home-animation')} typeof='button' className="relative z-10 text-white cursor-pointer" onMouseEnter={()=>setCursorAnimation('onmenuhome-animation')} onClick={() =>{ handleNavigate('/', 8, 0), setShowMessage(false)}}>Home</h4>
        <h4 onMouseLeave={setCursorAnimation('home-animation')} onMouseEnter={()=>setCursorAnimation('onmenuabout-animation')} typeof='button' className="relative z-10 text-white cursor-pointer" onClick={() =>{ handleNavigate('/about', 90, 125), setShowMessage(false)}}>About</h4>
        <h4 onMouseLeave={setCursorAnimation('home-animation')} onMouseEnter={()=>setCursorAnimation('onmenuprojects-animation')} typeof='button' className="relative z-10 text-white cursor-pointer" onClick={() => {handleNavigate('/projects', 180, 270), setShowMessage(false)}}>Projects</h4>

        {/* Slider Indicator */}
        <div
          ref={menuSliderRef}
          className="absolute z-0 h-full w-[100px] rounded-full bg-black duration-500 -translate-x-[94px]  lg:-translate-x-[134px]"
        />
      </div>

      {/* Top Right Button */}
      <button
        onClick={handleWhatIf}
        onMouseLeave={()=> setCursorAnimation('onhome-animation')} onMouseEnter={()=> setCursorAnimation('whatif-animation')} 
        className="fixed top-10 right-10 h-[7vw] lg:h-[34px] w-[22vw] lg:w-[100px] px-2 rounded-full bg-black text-white z-[999]"
      >
        What if?
      </button>
    </div>
  );
}

export default Navber2;
