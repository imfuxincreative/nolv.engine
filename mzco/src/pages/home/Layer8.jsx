import React, { useEffect, useRef } from 'react';

function Layer8() {
  const tilt = useRef({ beta: 0, gamma: 0 });
  const prevTilt = useRef({ beta: 0, gamma: 0 });

  const refs = {
    intro: useRef(null),
    founder: useRef(null),
    logo: useRef(null),
    loading: useRef(null),
  };

  useEffect(() => {
    const handleOrientation = (event) => {
      tilt.current = { beta: event.beta, gamma: event.gamma };
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation);
    }

    return () => {
      if (window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', handleOrientation);
      }
    };
  }, []);

  useEffect(() => {
    const positions = {
      intro: { x: 0, y: 0 },
      founder: { x: 0, y: 0 },
      logo: { x: 0, y: 0 },
      loading: { x: 0, y: 0 },
    };

    let animationId;

    const updatePosition = () => {
      const deltaX = (tilt.current.gamma - prevTilt.current.gamma) * 0.3;
      const deltaY = (tilt.current.beta - prevTilt.current.beta) * 0.3;

      Object.entries(refs).forEach(([key, ref]) => {
        if (ref.current) {
          positions[key].x -= deltaX;
          positions[key].y -= deltaY;

          ref.current.style.transform = `translate3d(${positions[key].x}px, ${positions[key].y}px, 0)`;
        }
      });

      prevTilt.current = { ...tilt.current };

      animationId = requestAnimationFrame(updatePosition);
    };

    updatePosition(); // Start animation

    return () => {
      cancelAnimationFrame(animationId); // Properly cancel on cleanup
    };
  }, []);

  return (
    <div>
      <h6
        ref={refs.intro}
        className="absolute top-[78vw] z-[70] bg-white border  bg-opacity-5 border-[#ffffff] rounded-[2px] pl-2 right-[30vw]"
        style={{ transition: 'transform 0.1s ease-out' }}
      >
        \ Introducing the mzco.
      </h6>
      <h6
        ref={refs.founder}
        className="absolute top-[95vw] z-[70] bg-white border  bg-opacity-5 border-[#d8d8d8] pl-2 rounded-[2px] left-[10vw]"
        style={{ transition: 'transform 0.1s ease-out' }}
      >
        Founded by meeza™
      </h6>
      <h6
        ref={refs.logo}
        className="absolute top-[100vw] z-[70] bg-white border  bg-opacity-5 border-[#efefef] rounded-[2px] px-1  right-[20vw]"
        style={{ transition: 'transform 0.1s ease-out' }}
      >
        text.png
      </h6>
      {/* <h6
        ref={refs.loading}
        className="absolute bottom-[78vw] z-[70] bg-white pl-2 pb-1 right-[30vw]"
        style={{ transition: 'transform 0.1s ease-out' }}
      >
        / Loading creation
      </h6> */}
    </div>
  );
}

export default Layer8;
