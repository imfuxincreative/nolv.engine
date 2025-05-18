import React, { useRef, useEffect, useState, useContext } from 'react';
import logo from '../assets/images/logo.png';
import { BlurContext } from '../context/BlurContext';
import { useNavigate } from 'react-router-dom';
import { ReverseAnimeContext } from '../context/ReverseAnime';

function ControlBar() {
  const {setReverseAnimation} = useContext(ReverseAnimeContext)
  const barRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const {setBlurValue} = useContext(BlurContext)
const navigate  =  useNavigate()
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

  const menuItems = [
    {name : 'Home', func : ()=>{navigate('/')}},
    {name : 'Captures', func : ()=>{navigate('/visuals')}},
    {name : 'Designs', func : ()=>{navigate('/design')}},
    {name : 'About', func : ()=>{navigate('/works')}},


  ];

  return (
    <div
      ref={barRef}
      className="h-[8vw] w-[50vw] flex justify-between items-center px-1 fixed top-[10vw] right-[28vw] rounded bg-black/5 border-[#d2d2d2] border z-[900] backdrop-blur-2xl cursor-grab"
      style={{ position: 'fixed' }}
    >
      <div className="flex gap-1 items-center">
        <div className="rounded-full overflow-hidden content-center h-[6vw] w-[6vw] bg-white">
          <img className='' src={logo} alt="" />
        </div>
        <h5>mzco.</h5>
      </div>
      <div className="relative">
        <button
          onClick={() =>{ setMenuOpen(!menuOpen)}}
          className="bg-white h-[6vw] w-[6vw] font-[inter-regular] text-[5vw] border-none px-1 py-1 rounded-full"
        >
          +
        </button>

        {/* Dropdown */}
        <div className={`absolute right-0 mt-2 flex flex-col bg-white overflow-hidden shadow-lg transition-all duration-300 ease-in-out ${menuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
          {menuItems.map((item, index) => (
            <h5 onClick={item.func}
              key={index}
              className={`px-2 py border-b border-[#d8d8d8] text-sm text-black hover:bg-gray-100 transition-all duration-300 ease-in-out`}
              style={{ transitionDelay: `${menuOpen ? index * 100 : 0}ms` }}
            >
              {item.name}
            </h5>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ControlBar;
