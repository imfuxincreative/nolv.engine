import React, { useRef, useEffect, useState } from 'react';
import { motion, useTransform, useMotionValue } from 'framer-motion';
import gsap from 'gsap';

import img1 from '../assets/images/visuals/img1.jpg';
import img2 from '../assets/images/visuals/img2.jpg';
import img3 from '../assets/images/visuals/img3.jpg';
import img4 from '../assets/images/visuals/img4.jpg';
import img5 from '../assets/images/visuals/img5.jpg';
import img6 from '../assets/images/visuals/img6.jpg';
import img7 from '../assets/images/visuals/img7.jpg';
import img8 from '../assets/images/visuals/img8.jpg';
import img9 from '../assets/images/visuals/img9.jpg';
import img10 from '../assets/images/visuals/img10.jpg';

// ✅ Custom scroll tracker using requestAnimationFrame
function useRafScrollMotionValue() {
  const scrollY = useMotionValue(0);

  useEffect(() => {
    let rafId;

    const update = () => {
      scrollY.set(window.scrollY);
      rafId = requestAnimationFrame(update);
    };

    update();

    return () => cancelAnimationFrame(rafId);
  }, [scrollY]);

  return scrollY;
}

// ✅ ParallaxImageSet with GSAP appear animation
function ParallaxImageSet({ images, scrollY }) {
  const ref = useRef(null);
  const [offsetTop, setOffsetTop] = useState(0);
  const imageRefs = useRef([]);

  useEffect(() => {
    if (ref.current) {
      setOffsetTop(ref.current.offsetTop);
    }

    // Initial opacity 0
    gsap.set(imageRefs.current, { opacity: 0 });

    // GSAP timeline to show images quickly one by one
    const tl = gsap.timeline({ delay: 0.2 });
    imageRefs.current.forEach((img, index) => {
      tl.to(img, { opacity: 1, duration: 0 }, index * 0.1); // instant show, small stagger
    });

    return () => tl.kill();
  }, []);

  const y = useTransform(
    scrollY,
    [offsetTop - window.innerHeight, offsetTop + window.innerHeight],
    [0, 200]
  );

  return (
    <div ref={ref} className="px-3 bg-transparent z-[999] translate-y-[20vh]">
      <div className="h-[80vh] md:h-[120vh] w-full relative">
        {/* Static positioned images */}
        <div className="random-images-1">
          {images.slice(0, 3).map((src, i) => (
            <img
              key={i}
              ref={(el) => (imageRefs.current[i] = el)}
              className={`absolute object-cover object-top opacity-0 ${
                i === 0 ? 'top-5 md:top-22 left-[6vw] w-[40vw] md:w-[30vw] md:h-[40vw] h-[50vw]' :
                i === 1 ? 'top-7 right-[5vw] md:right-[14vw] w-[50vw] h-[60vw] md:w-[30vw] md:h-[30vw]' :
                          'bottom-[17vh] right-0 w-[70vw] md:w-[30vw] md:h-[40vw] h-[50vw] z-[1]'
              }`}
              src={src}
              alt=""
            />
          ))}
        </div>

        {/* Parallax motion images */}
        <motion.div style={{ y, willChange: 'transform' }} className="random-images-2">
          {images.slice(3, 6).map((src, i) => (
            <img
              key={i + 3}
              ref={(el) => (imageRefs.current[i + 3] = el)}
              className={`absolute object-cover object-top opacity-0 ${
                i === 0 ? 'top-[30vh] w-[60vw] md:w-[30vw] md:h-[20vw] h-[40vw]' :
                i === 1 ? 'top-[25vh] right-0 w-[40vw] md:h-[25vw] md:w-[30vw] md:right-[20vw] h-[50vw]' :
                          'bottom-[0vh] left-0 w-[40vw] md:w-[30vw] md:h-[40vw] h-[50vw] z-[2]'
              }`}
              src={src}
              alt=""
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// ✅ Main component
function ParallaxImageAlgo() {
  const scrollY = useRafScrollMotionValue();

  const highlightImages = [
    { images: [img2, img3, img4, img5, img6, img7] },
    { images: [img5, img6, img7, img8, img9, img10] },
    { images: [img2, img3, img4, img5, img6, img7] },
    { images: [img5, img6, img7, img8, img9, img10] },
  ];

  return (
    <div className="relative">
      {highlightImages.map((el, index) => (
        <ParallaxImageSet key={index} images={el.images} scrollY={scrollY} />
      ))}
    </div>
  );
}

export default ParallaxImageAlgo;
