import React, { useEffect, useRef , useState  , useContext} from 'react';
import {LoadingContext} from '../context/LoadingContext'
import {useTheme} from '../context/ThemeContext'
import styles from './ScrollProgressBer.module.css'
function ScrollProgressBar() {
const {isDarkMode} = useTheme()
  const progressRef = useRef<HTMLDivElement>(null);
const {isLoading , setIsLoading , showMessage , setShowMessage} = useContext(LoadingContext)
 useEffect(() => {
    if (!progressRef.current) return;
    const bar = progressRef.current;

    // Reset styles
    bar.classList.remove(styles.mlAuto);
    bar.classList.remove(styles.right0);

    if (isLoading) {
      // Step 1: grow from left
      bar.style.width = '100%';

      // Step 2: after full width, shrink from right
      setTimeout(() => {
        if (bar) {
          bar.classList.add(styles.mlAuto);     // Push it to the right
          bar.classList.add(styles.right0);     // Anchor it to the right
          bar.style.width = '0%';           // Shrink from right
        }
      }, 1000); // Wait until grow finishes
    } else {
      // reset
      bar.style.width = '0%';
      bar.classList.remove(styles.mlAuto);
      bar.classList.remove(styles.right0);
    }
  }, [isLoading]);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      const docHeight = document.documentElement.scrollHeight
  
      const scrollPercent = (scrollTop / (docHeight - window.innerHeight)) * 100;
      

      if (progressRef.current) {
        progressRef.current.style.width = `${scrollPercent}%`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.container}>
    <div
      ref={progressRef}
      className={`${styles.bar} ${isDarkMode ? styles.bgWhite : styles.bgBlack}`}
      />
      </div>
  );
}

export default ScrollProgressBar;
