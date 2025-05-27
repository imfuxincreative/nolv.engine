import React, { useRef, useEffect } from 'react';
import folder from '../../assets/elements/folder.png';

function Layer10() {
  const imgRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current;
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    const startDrag = (x, y) => {
      isDragging = true;
      offsetX = x - img.offsetLeft;
      offsetY = y - img.offsetTop;
    };

    const onMouseDown = (e) => {
      e.preventDefault();
      startDrag(e.clientX, e.clientY);
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      img.style.left = `${e.clientX - offsetX}px`;
      img.style.top = `${e.clientY - offsetY}px`;
    };

    const onMouseUp = () => {
      isDragging = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    const onTouchStart = (e) => {
      const touch = e.touches[0];
      startDrag(touch.clientX, touch.clientY);
      document.addEventListener('touchmove', onTouchMove, { passive: false });
      document.addEventListener('touchend', onTouchEnd);
    };

    const onTouchMove = (e) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      img.style.left = `${touch.clientX - offsetX}px`;
      img.style.top = `${touch.clientY - offsetY}px`;
      e.preventDefault(); // Prevent scrolling while dragging
    };

    const onTouchEnd = () => {
      isDragging = false;
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };

    img.addEventListener('mousedown', onMouseDown);
    img.addEventListener('touchstart', onTouchStart);

    return () => {
      img.removeEventListener('mousedown', onMouseDown);
      img.removeEventListener('touchstart', onTouchStart);
    };
  }, []);

  return (
    <div className=''>
      <div className='absolute z-[90] top-[120vw] right-[20vw] flex flex-col items-start justify-start'>
        <img
          ref={imgRef}
          className='w-[15vw] absolute cursor-grab'
          src={folder}
          alt=""
          style={{ position: 'absolute', left: 0, top: 0, touchAction: 'none' }}
        />
        <h6 className='pl-1 translate-y-[9vw] opacity-0'>service</h6>
      </div>

      {/* <button className='absolute bottom-[10vw] left-[42vw]'>Say Hii !</button> */}
      <button className='absolute bg-white/80 border border-[#fee0ff] top-[5vw] right-[5vw]'>What if ?</button>
    </div>
  );
}

export default Layer10;
