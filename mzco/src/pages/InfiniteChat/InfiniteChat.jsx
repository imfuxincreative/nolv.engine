'use client';

import { useMotionValue, animate, AnimatePresence } from 'framer-motion';
import { useDrag } from '@use-gesture/react';
import { useRef, useState, useEffect, useContext } from 'react';
import ImageCard from '../../components/ImageCard';

import abundance from '../../assets/images/InfiniteImages/abundance.webp';
import architecture from '../../assets/images/InfiniteImages/architecture.webp';
import black from '../../assets/images/InfiniteImages/black.webp';
import codedeye from '../../assets/images/InfiniteImages/codedeye.webp';
import freedom from '../../assets/images/InfiniteImages/freedom.webp';
import founder from '../../assets/images/InfiniteImages/founder.webp';
import monster from '../../assets/images/InfiniteImages/monster.webp';
import glory from '../../assets/images/InfiniteImages/glory.webp';
import kimpachi from '../../assets/images/InfiniteImages/kimpachi.webp';
import nostalogia from '../../assets/images/InfiniteImages/nostalogia.webp';
import wanted from '../../assets/images/InfiniteImages/wanted.webp';
import valentine from '../../assets/images/InfiniteImages/valentine.webp';
import travis from '../../assets/images/InfiniteImages/travis.webp';
import timeless from '../../assets/images/InfiniteImages/timeless.webp';
import hypnotic from '../../assets/images/InfiniteImages/hypnotic.webp';
import starlight from '../../assets/images/InfiniteImages/starlight.webp';
import outdoor from '../../assets/images/InfiniteImages/outdoor.webp';
import starboy from '../../assets/images/InfiniteImages/starboy.webp';
import beach1 from '../../assets/images/InfiniteImages/beach1.jpg';
import building from '../../assets/images/InfiniteImages/building.jpg';
import flower from '../../assets/images/InfiniteImages/flower.jpg';
import hard from '../../assets/images/InfiniteImages/hard.jpg';
import lake from '../../assets/images/InfiniteImages/lake.jpg';
import losted from '../../assets/images/InfiniteImages/losted.jpg';
import mountain from '../../assets/images/InfiniteImages/mountain.jpg';
import obito from '../../assets/images/InfiniteImages/obito.jpg';
import rain from '../../assets/images/InfiniteImages/rain.jpg';
import rain1 from '../../assets/images/InfiniteImages/rain1.jpg';
import serenity from '../../assets/images/InfiniteImages/serenity.jpg';
import Loading from '../../components/loading';
import {useImage } from '../../context/ImageContext.jsx'
import { LoadingContext } from '../../context/LoadingContext';
import { IsMobileContext } from '../../context/IsMobile';
import { useCursor } from '../../context/CursorContext';
import ImageOpener from '../../components/ImageOpener.jsx'
import Chat from '../../components/Chat.jsx';
import img3 from '../../assets/images/visuals/img3.jpg'
export default function InfiniteChat() {
  const {isMobile} = useContext(IsMobileContext)
  const {setCursorAnimation} = useCursor()
const TILE_SIZE = isMobile ? 195 : 250;
const GRID_SIZE = isMobile ? 6 : 12;

  const GRID_WIDTH = TILE_SIZE * GRID_SIZE;
  
  const wrap = (value, max) => ((value % max) + max) % max;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xAnim = useRef(null);
  const yAnim = useRef(null);
  const [scaleDown, setScaleDown] = useState(false);
  const tilesRef = useRef([]);
const layoutRef  = useRef ()
const chats = [
  { name: "User", profile: img3, message: "hiii" },
  { name: "User", profile: img3, message: "I'm Fuckin' creative" },
  { name: "User", profile: img3, message: "hello" },
  { name: "User", profile: img3, message: "flow()" },
  { name: "User", profile: img3, message: "code" },
  { name: "User", profile: img3, message: "innovation" },
  { name: "User", profile: img3, message: "function()" },
  { name: "User", profile: img3, message: "404" },
  { name: "User", profile: img3, message: "<motion/>" },
  { name: "User", profile: img3, message: "I love motion" },
  { name: "User", profile: img3, message: "blend" },
  { name: "User", profile: img3, message: "creative" },
  { name: "User", profile: img3, message: "Design" },
  { name: "User", profile: img3, message: ";)" },
  { name: "User", profile: img3, message: "craft" },
  { name: "User", profile: img3, message: "visual" },
  { name: "User", profile: img3, message: ":)" },
  { name: "User", profile: img3, message: "I'm wanna shine" },
  { name: "User", profile: img3, message: "mzco.creative" },
  { name: "User", profile: img3, message: "Stooop." },
  { name: "User", profile: img3, message: "figma" },
];


  const {isLoading , setIsLoading} = useContext(LoadingContext)
  useEffect(()=>{
    const timer = setTimeout(()=>{
      setIsLoading(false)
    },1000)
    return ()=> clearTimeout(timer)
  },[])

  const bind = useDrag(
    ({ delta: [dx, dy], velocity: [vx, vy], direction: [dirX, dirY], first, last }) => {
      if (first) {
        setScaleDown(true);
        xAnim.current?.stop();
        yAnim.current?.stop();
      }

      x.set(x.get() + dx);
      y.set(y.get() + dy);

      if (last) {
        setScaleDown(false);
        xAnim.current = animate(x, x.get() + dirX * vx * 300, {
          type: 'inertia',
          velocity: vx * dirX * 500,
        });

        yAnim.current = animate(y, y.get() + dirY * vy * 300, {
          type: 'inertia',
          velocity: vy * dirY * 500,
        });
      }
    },
    { pointer: { touch: true } }
  );

  useEffect(() => {
    let animationFrameId;

    const update = () => {
      const xVal = x.get();
      const yVal = y.get();

      for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
          const tileIndex = row * GRID_SIZE + col;
          const tile = tilesRef.current[tileIndex];
          if (!tile) continue;

          const offsetX = col * TILE_SIZE;
          const offsetY = row * TILE_SIZE;

          const wrappedX = wrap(offsetX + xVal, GRID_WIDTH);
          const wrappedY = wrap(offsetY + yVal, GRID_WIDTH);

          tile.style.transform = `translate(${wrappedX - window.innerWidth / 2}px, ${wrappedY - window.innerWidth * 0.35}px)`;
        }
      }

      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div>
     <div className={`${isLoading ? 'opacity-0' : 'opacity-100'} duration-500`}>
      
    <div onMouseEnter={()=>setCursorAnimation('playground-animation')} 
     onMouseLeave={()=>setCursorAnimation('onhome-animation')} 
    ref={layoutRef}
      {...bind()}
      className={` ${scaleDown ? 'scale-90 ' :'scale-100'} duration-300  md:translate-x-[2vw] -translate-x-[10vw] -translate-y-[10vh] -md:translate-y-[5vw]  .  fixed w-[120vw] h-[120vh]  bg-transpatent touch-none`}
      >
      {Array.from({ length: GRID_SIZE }).map((_, row) =>
        Array.from({ length: GRID_SIZE }).map((_, col) => {
          const index = (row * GRID_SIZE + col) % chats.length;
          const { name, profile , message } = chats[index];
          const tileIndex = row * GRID_SIZE + col;
          
          return (
            <div
            key={`${row}-${col}`}
            ref={(el) => (tilesRef.current[tileIndex] = el)}
            className="absolute will-change-transform h-[250px] w-[250px] "
            >
              {/* <ImageOpener src = {image}/> */}
              <Chat index = {index } message={message} profile = {profile} name={name} />
            </div> 
          );
        })
      )}
    </div>
      </div>

      </div>
  );
}
