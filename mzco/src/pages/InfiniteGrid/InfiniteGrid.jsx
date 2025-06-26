'use client';

import { useMotionValue, animate } from 'framer-motion';
import { useDrag } from '@use-gesture/react';
import { useRef, useState, useEffect } from 'react';
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

const TILE_SIZE = 195;
const GRID_SIZE = 6;
const GRID_WIDTH = TILE_SIZE * GRID_SIZE;

const wrap = (value, max) => ((value % max) + max) % max;

export default function InfiniteImageCanvas() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xAnim = useRef(null);
  const yAnim = useRef(null);
  const [scaleDown, setScaleDown] = useState(false);
  const tilesRef = useRef([]);

  const imageDeta = [
    { name: 'Abundance', image: abundance, isFull : false },
    { name: 'Architecture', image: architecture , isFull : false},
    { name: 'Black', image: black , isFull : false},
    { name: 'Coded Eye', image: codedeye , isFull : false},
    { name: 'Freedom', image: freedom , isFull : false},
    { name: 'Founder', image: founder , isFull : false},
    { name: 'Monster', image: monster , isFull : false},
    { name: 'Glory', image: glory , isFull : false},
    { name: 'Kimpachi', image: kimpachi, isFull : false },
    { name: 'Nostalgia', image: nostalogia , isFull : false},
    { name: 'Wanted', image: wanted , isFull : false},
    { name: 'Valentine', image: valentine , isFull : false},
    { name: 'Travis', image: travis , isFull : false},
    { name: 'Timeless', image: timeless , isFull : false},
    { name: 'Hypnotic', image: hypnotic, isFull : false },
    { name: 'Starlight', image: starlight, isFull : true },
    { name: 'Outdoor', image: outdoor , isFull : false},
    { name: 'Starboy', image: starboy, isFull : false },
    { name: 'Beach', image: beach1, isFull : false },
    { name: 'Building', image: building, isFull : false },
    { name: 'Flower', image: flower, isFull : false },
    { name: 'Hard', image: hard, isFull : true },
    { name: 'Lake', image: lake, isFull : false },
    { name: 'Losted', image: losted , isFull : true},
    { name: 'Mountain', image: mountain , isFull : true},
    { name: 'Obito', image: obito, isFull : false },
    { name: 'Rain', image: rain , isFull: true },
    { name: 'Rain 1', image: rain1 , isFull: true },
    { name: 'Serenity', image: serenity, isFull : true },
  ];

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
    <div className=''>
      
    <div
      {...bind()}
      className={` ${scaleDown ? 'scale-90 ' :'scale-100'} duration-300 -translate-x-[10vw] -translate-y-[10vh] fixed w-[120vw] h-[120vh] overflow-hidden bg-transpatent touch-none`}
    >
      {Array.from({ length: GRID_SIZE }).map((_, row) =>
        Array.from({ length: GRID_SIZE }).map((_, col) => {
          const index = (row * GRID_SIZE + col) % imageDeta.length;
          const { name, image , isFull } = imageDeta[index];
          const tileIndex = row * GRID_SIZE + col;
          
          return (
            <div
            key={`${row}-${col}`}
            ref={(el) => (tilesRef.current[tileIndex] = el)}
            className="absolute will-change-transform"
            >
              <ImageCard scaleDown={scaleDown} image={image} name={name} isFull={isFull} />
            </div>
          );
        })
      )}
    </div>
      </div>
  );
}
