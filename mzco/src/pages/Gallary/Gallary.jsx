import React, { useState, useRef, useEffect } from 'react';
import { useImage } from '../../context/ImageContext.jsx';
import { motion, useMotionValue } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function Gallary() {
  const { imageDeta } = useImage();
  const [data , setData]  = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(0);
  const sliderRef = useRef();
  const imagesRef = useRef([]);
  const x = useMotionValue(0); // Track drag position
const navigate = useNavigate()
  const handleOnClick = (index) => {
    setSelectedIndex(index);
  };

  const handleDrag = () => {
    const sliderBounds = sliderRef.current?.getBoundingClientRect();
    const centerX = window.innerWidth / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;

    imagesRef.current.forEach((imageRef, i) => {
      if (!imageRef) return;
      const rect = imageRef.getBoundingClientRect();
      const imgCenter = rect.left + rect.width / 2;
      const distance = Math.abs(centerX - imgCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i % imageDeta.length;
      }
    });

    setSelectedIndex(closestIndex);
  };
  


// ✅ Early return BEFORE using data


useEffect(() => {
  const unsubscribe = x.onChange((latestX) => {
    const index = Math.round(-latestX / (itemWidth + gap)) % imageDeta.length;
    console.log(index)
    const positiveIndex = (index + imageDeta.length) % imageDeta.length;
    setSelectedIndex(positiveIndex);
  });
  return () => unsubscribe();
}, [x, imageDeta.length]);

  const itemWidth = 48; 
  const gap = 8; 
  const totalLength = [...imageDeta, ...imageDeta].length;
  const totalWidth = totalLength * (itemWidth + gap);


  
useEffect(() => {
  const raw = sessionStorage.getItem('zoom-image');
  if (!raw) {
    navigate('/');
    return;
  }
  const parsed = JSON.parse(raw);
  setData(parsed);
  setSelectedIndex(parsed.index);
}, [navigate]);
if (!data) return null;

console.log(data); // ✅ Safe here
const { index, rect } = data; // ✅ Safe here


  return (
<motion.div
  initial={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}
    exit={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}
  animate={{ backgroundColor: 'rgba(255, 255, 255, 1)' }}
  transition={{ duration: .5   ,ease : 'easeInOut'}}
  className="h-screen w-screen"
>
      {/* Main Image */}
      <motion.img
 onClick={() => navigate(-1)}
    initial  ={{
position : 'absolute' , 
      top : rect.top,
      left :rect.left,
      width : rect.width ,
      scale :1 , 

    }}
      exit={{
               position: 'absolute',
          top: rect.top+80 ,
          left: rect.left+80, 
          width: rect.width,
          height: rect.height,
           scale : 1,
        }}
    animate = {{top: '40%' , left : '50%' , x : '-50%' , y : '-50%' ,  scale : 3 , }}
      transition = {{duration : .5 , ease : 'easeInOut'}}
      
        src={imageDeta[selectedIndex].image}
        className=" w-[80%] lg:w-[20vw] object-cover"
      />

      {/* Slider Section */}
      <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 lg:w-[30vw] overflow-hidden">
        <div className="bg-gradient-to-l from-white to-transparent h-12 w-32 absolute right-0 z-10 pointer-events-none" />
        <div className="bg-gradient-to-r from-white to-transparent h-12 w-32 absolute left-0 z-10 pointer-events-none" />

        <motion.div
          className="flex gap-2 cursor-grab active:cursor-grabbing"
          ref={sliderRef}
          drag="x"
          dragConstraints={{ left: -totalWidth + 500, right: 0 }}
          dragElastic={0.2}
          dragTransition={{ bounceStiffness: 200, bounceDamping: 20 }}
          style={{ x, touchAction: 'pan-y' }}
        >
          {[...imageDeta, ...imageDeta].map((image, index) => (
            <img
              key={index}
              ref={(el) => (imagesRef.current[index] = el)}
              onClick={() => handleOnClick(index % imageDeta.length)}
              src={image.image}
              className="h-12 object-cover cursor-pointer select-none"
              draggable="false"
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Gallary;
