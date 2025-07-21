import {react , createContext , useRef , useContext, useEffect } from 'react';
import Lenis from '@studio-freight/lenis'

const LenisContext = createContext();

export const LenisProvider = ({children})=>{
    const lenisRef = useRef(null)
    useEffect(()=>{
        const lenis = new Lenis({
             duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
        })

        lenisRef.current = lenis

        function raf(time){
            lenis.raf(time)
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)


        return ()=>{
            lenis.destroy()
        }
    },[])
    return <LenisContext.Provider value={lenisRef}>
        {children}
    </LenisContext.Provider>
}
export const useSmoothScroll = ()=> useContext(LenisContext)