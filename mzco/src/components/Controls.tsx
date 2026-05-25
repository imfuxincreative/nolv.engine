import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LoadingContext } from '../context/LoadingContext';
import { useCursor } from '../context/CursorContext';
import { CiLight } from "react-icons/ci";
import { useTheme } from '../context/ThemeContext'
import { useLayoutMode } from '../context/LayoutContext'
import { RiBox2Fill } from "react-icons/ri"
import { FaSquareFull } from "react-icons/fa"
import styles from './Controls.module.css'

export default function Controls() {
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
      <div className={styles.topRightContainer}>
        <button onClick={handleThemeClick} className={`${styles.themeBtn} ${isDarkMode ? styles.bgWhiteTextBlack : styles.bgBlackTextWhite}`} ><CiLight size={23} /></button>
        <button
          onClick={handleLogin}
          onMouseLeave={() => setCursorAnimation('onhome-animation')} onMouseEnter={() => setCursorAnimation('whatif-animation')}
          className={`${styles.loginBtn} ${isDarkMode ? styles.bgWhiteTextBlack : styles.bgBlackTextWhite}`}
        >
          Join Now
        </button>
      </div>

      <div className={styles.navContainer}>
        {/* HOME */}
        <button
          onClick={() => {
            if (location.pathname !== '/') navigate('/')
            setIs2DMode(false)
          }}
          className={`${styles.navBtn} ${isHome ? styles.bgBlackTextWhite : styles.bgEdeded}`}
        >
          <RiBox2Fill />
        </button>

        {/* PROJECTS */}
        <button
          onClick={() => {
            if (location.pathname !== '/') navigate('/')
            setIs2DMode(true)
          }}
          className={`${styles.navBtn} ${isProjects ? styles.bgBlackTextWhite : ''}`}
        >
          <FaSquareFull size={8} />
        </button>
      </div>
    </>
  );
}
