import React, { useRef, useEffect, useState, useContext } from 'react';
import gsap from 'gsap';
import PixelBg from '../../components/pixelbg';
import ControlBar from '../../components/ControlBar.jsx';
import Loading from '../../components/loading.jsx';
import { ReverseAnimeContext } from '../../context/ReverseAnime.jsx';
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
import DynamicBlur from '../../components/DynamicBlur.jsx';

const layers = [ Layer3,Layer4,  Layer8];

function Index() {
  const { reverseAnime, setReverseAnime } = useContext(ReverseAnimeContext);
  const layerRefs = useRef([]);
  const timelineRef = useRef(null); // Store GSAP timeline here

  useEffect(() => {
    const tl = gsap.timeline();
    layerRefs.current.forEach(el => {
      tl.set(el, { opacity: 1 }, '+=0.1');
    });
    timelineRef.current = tl;
  }, []);

  useEffect(() => {
    if (reverseAnime && timelineRef.current) {
      timelineRef.current.reverse();
    }
  }, [reverseAnime]);
  
  return (
    <div className="h-screen w-screen overflow-hidden relative">
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
        
        <Layer10 />
  
      </div>
     
    </div>
  );
}

export default Index;
