'use client';

import { motion, useMotionValue, useTransform, animate, AnimationPlaybackControls } from 'framer-motion';
import { useDrag } from '@use-gesture/react';
import { useRef } from 'react';

const TILE_SIZE = 100;
const GRID_SIZE = 20;
const GRID_WIDTH = TILE_SIZE * GRID_SIZE;

const wrap = (value, max) => ((value % max) + max) % max;

export default function InfiniteCanvas() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // store animation controls
  const xAnim = useRef(null);
  const yAnim = useRef(null);

  const bind = useDrag(
    ({ delta: [dx, dy], velocity: [vx, vy], direction: [dirX, dirY], first, last }) => {
      // Stop animation on first touch
      console.log(first  , last)
      if (first) {
        xAnim.current?.stop();
        yAnim.current?.stop();
      }

      x.set(x.get() + dx);
      y.set(y.get() + dy);

      if (last) {
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

  return (
    <div
      {...bind()}
      className="relative w-screen h-screen overflow-hidden bg-black touch-none"
    >
      {Array.from({ length: GRID_SIZE }).map((_, row) =>
        Array.from({ length: GRID_SIZE }).map((_, col) => {
          const offsetX = col * TILE_SIZE;
          const offsetY = row * TILE_SIZE;

          const transformedX = useTransform(x, (val) =>
            wrap(offsetX + val, GRID_WIDTH)
          );
          const transformedY = useTransform(y, (val) =>
            wrap(offsetY + val, GRID_WIDTH)
          );

          return (
            <motion.div
              key={`${row}-${col}`}
              className="absolute w-[100px] h-[100px] -translate-x-[20vw]  -translate-y-[20vw] border border-[#444] bg-[#111] text-white flex items-center justify-center text-sm"
              style={{
                x: transformedX,
                y: transformedY,
              }}
            >
              {row},{col}
            </motion.div>
          );
        })
      )}
    </div>
  );
}
