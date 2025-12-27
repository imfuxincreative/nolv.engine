
import { useMotionValue, animate, AnimatePresence } from 'framer-motion';
import { useDrag } from '@use-gesture/react';
import { useRef, useState, useEffect, useContext } from 'react';
import { LoadingContext } from '../../context/LoadingContext';
import { IsMobileContext } from '../../context/IsMobile';
import { useCursor } from '../../context/CursorContext';
import Chat from '../../components/Chat.jsx';
import img3 from '../../assets/images/visuals/img3.jpg'
export default function InfiniteChat() {
  const { isMobile } = useContext(IsMobileContext);
  const { setCursorAnimation } = useCursor();
  const TILE_SIZE = isMobile ? 195 : 250;
  const GRID_SIZE = isMobile ? 6 : 12;
  const GRID_WIDTH = TILE_SIZE * GRID_SIZE;

  // PARALLAX: background will follow a fraction of the main motion
  const PARALLAX_FACTOR = 0.28; // tweak (0.1 = much slower, 0.5 = half speed)

  const wrap = (value, max) => ((value % max) + max) % max;

  // main motion values (same as before)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xAnim = useRef(null);
  const yAnim = useRef(null);

  const [scaleDown, setScaleDown] = useState(false);

  const tilesRef = useRef([]);     // foreground (chat) tiles
  const bgTilesRef = useRef([]);   // background tiles
  const layoutRef = useRef();

const chats = [
  { name: "User", profile: img3, message: "hiii", theme: "neon" },
  { name: "User", profile: img3, message: "I'm Fuckin' creative", theme: "neon" },
  { name: "User", profile: img3, message: "hello", theme: "gray" },
  { name: "User", profile: img3, message: "flow()", theme: "neon" },
  { name: "User", profile: img3, message: "code", theme: "red" },
  { name: "User", profile: img3, message: "innovation", theme: "gray" },
  { name: "User", profile: img3, message: "function()", theme: "neon" },
  { name: "User", profile: img3, message: "404", theme: "black" },
  { name: "User", profile: img3, message: "<motion/>", theme: "neon" },
  { name: "User", profile: img3, message: "I love motion", theme: "red" },
  { name: "User", profile: img3, message: "blend", theme: "gray" },
  { name: "User", profile: img3, message: "creative", theme: "neon" },
  { name: "User", profile: img3, message: "Design", theme: "gray" },
  { name: "User", profile: img3, message: ";)", theme: "black" },
  { name: "User", profile: img3, message: "craft", theme: "neon" },
  { name: "User", profile: img3, message: "visual", theme: "pink" },
  { name: "User", profile: img3, message: ":)", theme: "black" },
  { name: "User", profile: img3, message: "I'm wanna shine", theme: "red" },
  { name: "User", profile: img3, message: "mzco.creative", theme: "neon" },
  { name: "User", profile: img3, message: "Stooop.", theme: "black" },
  { name: "User", profile: img3, message: "figma", theme: "red" },
];

  const { isLoading, setIsLoading } = useContext(LoadingContext);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // drag binding (copied behaviour)
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
          type: "inertia",
          velocity: vx * dirX * 500,
        });

        yAnim.current = animate(y, y.get() + dirY * vy * 300, {
          type: "inertia",
          velocity: vy * dirY * 500,
        });
      }
    },
    { pointer: { touch: true } }
  );

  // RAF loop updates both foreground and background tiles
  useEffect(() => {
    let animationFrameId;

    const update = () => {
      const xVal = x.get();
      const yVal = y.get();

      // foreground (chat) tiles: follow full x,y
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

      // background tiles: follow scaled down motion -> parallax
      for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
          const tileIndex = row * GRID_SIZE + col;
          const tile = bgTilesRef.current[tileIndex];
          if (!tile) continue;

          const offsetX = col * TILE_SIZE;
          const offsetY = row * TILE_SIZE;

          // apply parallax factor to motion values
          const wrappedX = wrap(offsetX + xVal * PARALLAX_FACTOR, GRID_WIDTH);
          const wrappedY = wrap(offsetY + yVal * PARALLAX_FACTOR, GRID_WIDTH);

          // place background slightly offset/centered same as foreground but behind
          tile.style.transform = `translate(${wrappedX - window.innerWidth / 2}px, ${wrappedY - window.innerWidth * 0.35}px)`;
        }
      }

      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);

    return () => cancelAnimationFrame(animationFrameId);
  }, [GRID_SIZE, GRID_WIDTH, TILE_SIZE, x, y]);

  return (
    <div>
      <div className={`${isLoading ? "opacity-0" : "opacity-100"} duration-500`}>
        <div
          onMouseEnter={() => setCursorAnimation("playground-animation")}
          onMouseLeave={() => setCursorAnimation("onhome-animation")}
          ref={layoutRef}
          {...bind()}
          className={` ${scaleDown ? "scale-90 " : "scale-100"} duration-300  md:translate-x-[2vw] -translate-x-[10vw] -translate-y-[10vh] -md:translate-y-[5vw]  .  fixed w-[120vw] h-[120vh]  bg-transpatent touch-none`}
        >
          {/* BACKGROUND LAYER (render first to keep it behind) */}
          {Array.from({ length: GRID_SIZE }).map((_, row) =>
            Array.from({ length: GRID_SIZE }).map((_, col) => {
        
            
              const tileIndex = row * GRID_SIZE + col;

              return (
                <div
                  key={`bg-${row}-${col}`}
                  ref={(el) => (bgTilesRef.current[tileIndex] = el)}
                  className="absolute will-change-transform h-[250px] w-[250px] -z-10 border-r-[1px] border-b-[1px] border-[#dfdfdf]"
                  aria-hidden="true"
                >
                  {/* Put a lightweight background element: reuse Chat but it's behind; you can swap for a simpler element if desired */}
                  {/* <Chat index={index} message={message} profile={profile} name={name} /> */}
                </div>
              );
            })
          )}

          {/* FOREGROUND (chat) LAYER */}
          {Array.from({ length: GRID_SIZE }).map((_, row) =>
            Array.from({ length: GRID_SIZE }).map((_, col) => {
              const index = (row * GRID_SIZE + col) % chats.length;
              const { name, profile, message, theme} = chats[index];
              const tileIndex = row * GRID_SIZE + col;

              return (
                <div
                  key={`fg-${row}-${col}`}
                  ref={(el) => (tilesRef.current[tileIndex] = el)}
                  className="absolute will-change-transform h-[250px] w-[250px] z-10"
                >
                  <Chat theme={theme} index={index} message={message} profile={profile} name={name} />
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}