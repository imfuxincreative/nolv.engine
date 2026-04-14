import React, { useRef, useContext, useEffect, useState } from 'react';
import { useNavigate , useLocation } from 'react-router-dom';
import { LoadingContext } from '../context/LoadingContext';
import { useCursor } from '../context/CursorContext';
import { CiLight } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import {useTheme} from '../context/ThemeContext.jsx'
import { TfiInfinite } from "react-icons/tfi";
import { PiImagesSquareLight } from "react-icons/pi";
function Navber2() {
  const {setIsDarkMode , isDarkMode} = useTheme()
  const { setIsLoading  , setShowMessage} = useContext(LoadingContext);
  const {setCursorAnimation} = useCursor()
  const playgroundBtnRef = useRef()
  const navigate = useNavigate();
  const menuSliderRef = useRef();
// Track screen size
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
  const location = useLocation();
const [openGallary , setOpenGallary] = useState (false)
useEffect(() => {
  if (!playgroundBtnRef.current) return;

  if (location.pathname === '/infiniteGrid') {

    playgroundBtnRef.current.textContent = 'Instagram';
  } else if (location.pathname === '/gallary') {
    setOpenGallary(true);
  }
   else {
    playgroundBtnRef.current.textContent = 'What If ?';
  }
}, [location.pathname]);


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

  const handleThemeClick = ()=>{
   setIsDarkMode((prev) => !prev
  )
  }
const handleLogin = () => {
  const callbackUrl = encodeURIComponent(
    'http://localhost:5173/auth/callback'
  );

  window.location.href = `https://mzverse.vercel.app/signup?redirect=${callbackUrl}`;
};

  const handleWhatIf = () => {
     if (location.pathname === '/infiniteGrid' && playgroundBtnRef.current) {
      window.location.href = 'https://www.instagram.com/mzco.creative/'
     }else{

       setIsLoading(true);
       setTimeout(() => navigate('/infiniteGrid'), 1000);
      }
  };

  return (
    <div className="fixed z-[999]">
      {/* Bottom Navigation */}
      {/* <div className=' flex fixed gap-1 bottom-8 left-1/2 -translate-x-1/2'>
 
      <div onMouseLeave={()=> setCursorAnimation('onhome-animation')} onMouseEnter={()=> setCursorAnimation('menubutton-animation')} className={ ` flex items-center justify-center gap-10 lg:gap-16 w-[270px] ${isDarkMode ? 'bg-white/20 text-black' : 'bg-black/20 text-white'} duration-500 lg:w-[320px] h-[30px] lg:h-[34px] min-h-[30px] max-h-[45px] backdrop-blur-sm rounded-full overflow-hidden z-[999]`}>
        <button style={{fontSize:15}} onMouseLeave={()=>setCursorAnimation('home-animation')} typeof='button' className="relative  z-10 lg:-translate-x-3 cursor-pointer" onMouseEnter={()=>setCursorAnimation('onmenuhome-animation')} onClick={() =>{ handleNavigate('/', 8, 15), setShowMessage(false)}}>Home</button>
        <button style={{fontSize:15}} onMouseLeave={()=>setCursorAnimation('home-animation')} onMouseEnter={()=>setCursorAnimation('onmenuabout-animation')} typeof='button' className="relative z-10  cursor-pointer" onClick={() =>{ handleNavigate('/about', 90, 125), setShowMessage(false)}}>About</button>
        <button style={{fontSize:15}} onMouseLeave={()=>setCursorAnimation('home-animation')} onMouseEnter={()=>setCursorAnimation('onmenuprojects-animation')} typeof='button' className="relative z-10 lg:translate-x-3 cursor-pointer" onClick={() => {handleNavigate('/projects', 180, 248), setShowMessage(false)}}>Projects</button>

 
        <div
          ref={menuSliderRef}
          className={`absolute z-0 h-full w-[100px] lg:w-[90px] rounded-full ${isDarkMode?'bg-white' : 'bg-black'} duration-500 -translate-x-[94px]  lg:-translate-x-[134px]`}
          />
      </div>


          </div> */}
{!openGallary ? <div className='flex fixed items-center top-10 right-10 gap-1 z-[999]'>
<button  onClick={handleThemeClick}  className={` h-[27px]  w-[27px] flex items-center justify-center  px-2 rounded-full ${isDarkMode ?'bg-white text-black' : 'bg-black text-white'} duration-500 `} ><CiLight size={23} className=''/></button>
      {/* Top Right Button */}
      {/* <button ref={playgroundBtnRef}
        onClick={handleWhatIf}
        onMouseLeave={()=> setCursorAnimation('onhome-animation')} onMouseEnter={()=> setCursorAnimation('whatif-animation')} 
        className={` ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'} duration-500 h-fit py-2  w-fit px-3 rounded-full `}
        >
Design
      </button> */}
            <button 
onClick={handleLogin}
        onMouseLeave={()=> setCursorAnimation('onhome-animation')} onMouseEnter={()=> setCursorAnimation('whatif-animation')} 
        className={` ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'} duration-500 h-fit py-2  w-fit px-3 rounded-full `}
        >
Join Community
      </button>
        </div> : <button onClick={()=>{ navigate(-1) ,setOpenGallary(false)}} className={`h-[35px] lg:h-[40px] lg:w-[40px] w-[35px] flex justify-center items-center px-2 rounded-full ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}  fixed top-10 right-10 gap-1 z-[999] `}><RxCross1/></button>}
    </div>
  );
}

export default Navber2;
