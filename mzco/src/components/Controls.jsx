import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LoadingContext } from '../context/LoadingContext.jsx';
import { useCursor } from '../context/CursorContext.jsx';
import { CiLight } from "react-icons/ci";
import { useTheme } from '../context/ThemeContext.jsx'
import { useLayoutMode } from '../context/LayoutContext.jsx'
import { RiBox2Fill } from "react-icons/ri"
import { FaSquareFull } from "react-icons/fa"

export default function Navbar() {
  const { setIsDarkMode, isDarkMode } = useTheme()
  const { setCursorAnimation } = useCursor()
  const { is2DMode, setIs2DMode } = useLayoutMode()
  const navigate = useNavigate();
  const location = useLocation();

  const handleThemeClick = () => {
    setIsDarkMode((prev) => !prev)
  }

  const handleLogin = () => {
    window.location.href = `https://nolv.vercel.app/signup`;
  };

  const isHome = location.pathname === '/' && !is2DMode
  const isProjects = location.pathname === '/' && is2DMode

  return (
    <>
      <div className='flex fixed items-center top-10 right-10 gap-1 z-[999]'>
        <button onClick={handleThemeClick} className={` h-[27px]  w-[27px] flex items-center justify-center  px-2 rounded-full ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'} duration-500 `} ><CiLight size={23} className='' /></button>
        <button
          onClick={handleLogin}
          onMouseLeave={() => setCursorAnimation('onhome-animation')} onMouseEnter={() => setCursorAnimation('whatif-animation')}
          className={` ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'} duration-500 h-fit py-2  w-fit px-3 rounded-full `}
        >
          Join Now
        </button>
      </div>

      <div className='flex flex-col gap-1 bg-[#ededed] rounded-full fixed right-3 top-1/2 -translate-y-1/2 z-[999] items-center'>
        {/* HOME */}
        <button
          onClick={() => {
            if (location.pathname !== '/') navigate('/')
            setIs2DMode(false)
          }}
          className={`h-7 w-7 flex items-center justify-center rounded-full
            ${isHome ? 'bg-black text-white' : 'bg-[#ededed]'}`}
        >
          <RiBox2Fill />
        </button>

        {/* PROJECTS */}
        <button
          onClick={() => {
            if (location.pathname !== '/') navigate('/')
            setIs2DMode(true)
          }}
          className={`h-7 w-7 flex items-center justify-center rounded-full
            ${isProjects ? 'bg-black text-white' : ''}`}
        >
          <FaSquareFull size={8} />
        </button>
      </div>
    </>
  );
}
