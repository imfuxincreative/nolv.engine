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
    if (isLoading) return;

    let rafId: ReturnType<typeof requestAnimationFrame>;
    let lastPercent = -1;

    const update = () => {
      const scrollTop = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const scrollPercent = Math.min(100, Math.max(0, (scrollTop / maxScroll) * 100));

      if (Math.abs(scrollPercent - lastPercent) > 0.01 && progressRef.current) {
        lastPercent = scrollPercent;
        progressRef.current.style.width = `${scrollPercent}%`;
      }

      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, [isLoading]);

  return (
    <div className={styles.container}>
    <div
      ref={progressRef}
      className={`${styles.bar} ${isLoading ? styles.loadingTransition : ''} ${isDarkMode ? styles.bgWhite : styles.bgBlack}`}
      />
      </div>
  );
}

export default ScrollProgressBar;
