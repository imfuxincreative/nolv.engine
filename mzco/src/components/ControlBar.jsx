import React, { useRef, useEffect } from 'react';
import logo from '../assets/images/logo.png';

function ControlBar() {
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    const startDrag = (e) => {
      isDragging = true;
      const rect = bar.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', stopDrag);
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      bar.style.left = `${e.clientX - offsetX}px`;
      bar.style.top = `${e.clientY - offsetY}px`;
    };

    const stopDrag = () => {
      isDragging = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', stopDrag);
    };

    const onTouchStart = (e) => {
      const touch = e.touches[0];
      const rect = bar.getBoundingClientRect();
      offsetX = touch.clientX - rect.left;
      offsetY = touch.clientY - rect.top;
      isDragging = true;

      document.addEventListener('touchmove', onTouchMove, { passive: false });
      document.addEventListener('touchend', stopTouchDrag);
    };

    const onTouchMove = (e) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      bar.style.left = `${touch.clientX - offsetX}px`;
      bar.style.top = `${touch.clientY - offsetY}px`;
      e.preventDefault();
    };

    const stopTouchDrag = () => {
      isDragging = false;
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', stopTouchDrag);
    };

    bar.addEventListener('mousedown', startDrag);
    bar.addEventListener('touchstart', onTouchStart);

    return () => {
      bar.removeEventListener('mousedown', startDrag);
      bar.removeEventListener('touchstart', onTouchStart);
    };
  }, []);

  return (
    <div
      ref={barRef}
      className="h-[8vw] w-[50vw] flex justify-between items-center px-1 absolute top-[20vw] right-[40vw] rounded bg-black/5 border-[#dddddd] border z-[500] backdrop-blur-2xl cursor-grab"
      style={{ position: 'absolute' }}
    >
      <div className="flex gap-1 items-center">
        <div className="rounded-full overflow-hidden content-center h-[6vw] w-[6vw] bg-white">
          <img src={logo} alt="" />
        </div>
        <h5>mzco.</h5>
      </div>
      <button className="bg-white h-[6vw] w-[6vw] font-[inter-regular] text-[5vw] border-none px-1 py-1 rounded-full">+</button>
    </div>
  );
}

export default ControlBar;
