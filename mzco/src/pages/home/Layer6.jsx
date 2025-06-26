import React, { useRef, useEffect } from 'react';
import bg from '../../assets/images/meeza2.jpg';

function Layer5() {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    const startDrag = (x, y) => {
      isDragging = true;
      offsetX = x - svg.getBoundingClientRect().left;
      offsetY = y - svg.getBoundingClientRect().top;
    };

    const onMouseDown = (e) => {
      e.preventDefault();
      startDrag(e.clientX, e.clientY);
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      svg.style.left = `${e.clientX - offsetX}px`;
      svg.style.top = `${e.clientY - offsetY}px`;
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
      svg.style.left = `${touch.clientX - offsetX}px`;
      svg.style.top = `${touch.clientY - offsetY}px`;
      e.preventDefault(); // Prevent scrolling while dragging
    };

    const onTouchEnd = () => {
      isDragging = false;
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };

    svg.addEventListener('mousedown', onMouseDown);
    svg.addEventListener('touchstart', onTouchStart);

    return () => {
      svg.removeEventListener('mousedown', onMouseDown);
      svg.removeEventListener('touchstart', onTouchStart);
    };
  }, []);

  return (
    <div>
      <svg
        ref={svgRef}
        className="absolute z-[60] top-[10vw] h-[120vw] -left-[10vw] w-full  cursor-grab"
      >
        {/* Define the mask */}
        <defs>
          <mask id="mask3" x="0" y="0" width="100%" height="100%">
            {/* <rect x="80vw" y="48vw" width="12vw" height="12vw" fill="white" /> */}
            {/* <rect x="8vw" y="48vw" width="52vw" height="12vw" fill="white" /> */}
            <rect x="0vw" y="18vw" width="70vw" height="48vw" fill="white" />
            <rect x="70vw" y="65vw" width="20vw" height="30vw" fill="white" />
          </mask>
        </defs>

        {/* Background Image */}
        <image className='fixed' href={bg} x="-30vw" y="-48vh" width="160vw" mask="url(#mask3)" />
      </svg>
    </div>
  );
}

export default Layer5;
