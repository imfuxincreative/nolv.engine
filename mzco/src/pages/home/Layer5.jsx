import React, { useRef, useEffect } from 'react';

function Layer5() {
  const boxRefs = useRef([]);

  useEffect(() => {
    const boxes = boxRefs.current;

    boxes.forEach((box) => {
      let isDragging = false;
      let offsetX = 0;
      let offsetY = 0;

      const startDrag = (e) => {
        isDragging = true;
        const rect = box.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', stopDrag);
      };

      const onMouseMove = (e) => {
        if (!isDragging) return;
        box.style.left = `${e.clientX - offsetX}px`;
        box.style.top = `${e.clientY - offsetY}px`;
      };

      const stopDrag = () => {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', stopDrag);
      };

      const onTouchStart = (e) => {
        const touch = e.touches[0];
        const rect = box.getBoundingClientRect();
        offsetX = touch.clientX - rect.left;
        offsetY = touch.clientY - rect.top;
        isDragging = true;

        document.addEventListener('touchmove', onTouchMove, { passive: false });
        document.addEventListener('touchend', stopTouchDrag);
      };

      const onTouchMove = (e) => {
        if (!isDragging) return;
        const touch = e.touches[0];
        box.style.left = `${touch.clientX - offsetX}px`;
        box.style.top = `${touch.clientY - offsetY}px`;
        e.preventDefault();
      };

      const stopTouchDrag = () => {
        isDragging = false;
        document.removeEventListener('touchmove', onTouchMove);
        document.removeEventListener('touchend', stopTouchDrag);
      };

      box.addEventListener('mousedown', startDrag);
      box.addEventListener('touchstart', onTouchStart);

      // Cleanup
      return () => {
        box.removeEventListener('mousedown', startDrag);
        box.removeEventListener('touchstart', onTouchStart);
      };
    });
  }, []);

  return (
    <div>
      <div
        ref={(el) => (boxRefs.current[0] = el)}
        className="w-[16vw] h-[12vw] z-[140] absolute top-[103vw] left-[32vw] bg-transparent backdrop-blur-md cursor-grab"
        style={{ position: 'absolute' }}
      ></div>
      <div
        ref={(el) => (boxRefs.current[1] = el)}
        className="w-[20vw] h-[12vw] z-[140] absolute top-[70vw] left-[48vw] bg-transparent backdrop-blur-md cursor-grab"
        style={{ position: 'absolute' }}
      ></div>
      <div
        ref={(el) => (boxRefs.current[2] = el)}
        className="w-[12vw] h-[12vw] z-[140] absolute top-[82vw] left-[56vw] bg-transparent backdrop-blur-md cursor-grab"
        style={{ position: 'absolute', right: '24vw' }}
      ></div>
    </div>
  );
}

export default Layer5;
