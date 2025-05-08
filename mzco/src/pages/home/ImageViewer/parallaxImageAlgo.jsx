import React, { useRef, useEffect, useState } from 'react';
import { motion, useTransform, useMotionValue } from 'framer-motion';
import img1 from '../../../assets/images/visuals/img1.jpg'
import img2 from '../../../assets/images/visuals/img2.jpg'
import img3 from '../../../assets/images/visuals/img3.jpg'
import img4 from '../../../assets/images/visuals/img4.jpg'
import img5 from '../../../assets/images/visuals/img5.jpg'
import img6 from '../../../assets/images/visuals/img6.jpg'
import img7 from '../../../assets/images/visuals/img7.jpg'
import img8 from '../../../assets/images/visuals/img8.jpg'
import img9 from '../../../assets/images/visuals/img9.jpg'
import img10 from '../../../assets/images/visuals/img10.jpg'
// ✅ Custom scroll tracker using RAF
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


function ParallaxImageSet({ images, scrollY }) {
  const ref = useRef(null);
  const [offsetTop, setOffsetTop] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setOffsetTop(ref.current.offsetTop);
    }
  }, []);

  const y = useTransform(
    scrollY,
    [offsetTop - window.innerHeight, offsetTop + window.innerHeight],
    [0, 200]
  );

  return (
    <div ref={ref} className="px-3 translate-y-[20vh]">
      <div className="h-[80vh] w-full relative">
        <div className="random-images-1">
          <img
            className="absolute top-5 left-[6vw] object-cover object-top w-[40vw] h-[50vw]"
            src={images[0]}
            alt=""
          />
          <img
            className="absolute top-7 right-[5vw] object-cover object-top w-[50vw] h-[60vw]"
            src={images[1]}
            alt=""
          />
          <img
            className="absolute bottom-[17vh] z-[1] right-0 object-cover object-top w-[70vw] h-[50vw]"
            src={images[2]}
            alt=""
          />
        </div>

        <motion.div style={{ y, willChange: 'transform' }} className="random-images-2">
          <img
            className="absolute top-[30vh] object-cover object-top w-[60vw] h-[40vw]"
            src={images[3]}
            alt=""
          />
          <img
            className="absolute top-[25vh] right-0 object-cover object-top w-[40vw] h-[50vw]"
            src={images[4]}
            alt=""
          />
          <img
            className="absolute bottom-[0vh] z-[2] left-0 object-cover object-top w-[40vw] h-[50vw]"
            src={images[5]}
            alt=""
          />
        </motion.div>
      </div>
    </div>
  );
}

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
