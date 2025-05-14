import React, { useRef, useEffect , useState } from 'react';
import gsap from 'gsap';
import PixelBg from '../../components/pixelbg';
import ControlBar from '../../components/ControlBar.jsx';

import Layer1 from './Layer1.jsx';
import Layer2 from './Layer2.jsx';
import Layer3 from './Layer3.jsx';
import Layer4 from './Layer4.jsx';
import Layer5 from './Layer5.jsx';
import Layer6 from './Layer6.jsx';
import Layer7 from './Layer7.jsx';
import Layer8 from './Layer8.jsx';
import Layer9 from './Layer9.jsx';
import Layer10 from './Layer10.jsx';
const layers = [Layer1, Layer2, Layer3, Layer4, Layer5, Layer6, Layer7, Layer8];

function Index() {
  let [reserveAnime , setReserveAnime] = useState(false)
  const layerRefs = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline();
    layerRefs.current.forEach(el => {
      tl.set(el, { opacity: 1 }, '+=0.1');
    });
  }, []);
  return (
    <div className="h-screen w-screen overflow-hidden relative">
      <PixelBg />

      <div className="absolute inset-0 z-10">
        {layers.map((Layer, i) => (
          <div
            key={i}
            ref={el => (layerRefs.current[i] = el)}
            style={{ opacity: 0 }}
          >
            <Layer />
          </div>
        ))}
        <Layer9 />
        <Layer10 />
      </div>

      <ControlBar  setReserveAnime = {setReserveAnime}/>
    </div>
  );
}

export default Index;
