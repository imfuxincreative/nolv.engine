import React, { useState, useRef, useEffect } from 'react';
import { IoMenuSharp } from "react-icons/io5";
import logo from '../assets/images/logo.png';
import { useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { RxCross1 } from "react-icons/rx";
import meeza from '../assets/images/Designs/6/starlight3.jpg'
import { GoArrowUpRight } from "react-icons/go";

gsap.registerPlugin(ScrollTrigger);

function Navber() {
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation(); // ✅ For current route

  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Home', path: '/', func: () => navigate('/') },
    { name: 'components', path: '/visuals', func: () => navigate('/components') },
    { name: 'Resources', path: '/resources', func: () => navigate('/resources') },
    { name: 'About', path: '/about', func: () => navigate('/about') },
  ];

  useEffect(() => {
    const tl = gsap.timeline();
    if (menuOpen) {
      tl.to(menuRef.current, {
        height: '50vw',
      });
      tl.to('.items', {
        y: '0vw',
        stagger: 0.059,
      },'1');
            tl.to('.menu-control', {
        y: '-6vw',
        stagger: 0.059,
      },'1');
    } else {
      tl.to('.items', {
        y: '6vw',
        stagger: 0.059,
      },);

      tl.to(menuRef.current, {
        height: '10vw',
      });
              tl.to('.menu-control', {
        y: '0vw',
        stagger: 0.059,
      },);
    }
  }, [menuOpen]);

  return (
    <div
      ref={menuRef}
      className="bg-white/80 w-screen pt-2 h-[34vw] flex-col flex fixed z-[99999] bottom-0 justify-between"
    >
      <div className="flex absolute bottom-[5vh] w-screen items-center justify-center flex-col">
        {menuItems.map((el, i) => (
          <div key={i} className="overflow-hidden py-1">
            <h1
              onClick={el.func}
              className={`items opacity-50 cursor-pointer ${
                location.pathname === el.path ? 'opacity-100 ' : ''
              }`}
            >
              {el.name}
            </h1>
          </div>
        ))}
      </div>
<div className='w-screen absolute  overflow-hidden bottom--3  h-[25px]'>

<div className='menu-control '>


      <div  className=" pr-3 w-screen mt-[1.5px]  flex items-center justify-between px-2">
        <div className="flex gap-1 items-center">
          <div className="rounded-full overflow-hidden content-center h-[6vw] w-[6vw] bg-white">
            <img className="" src={logo} alt="" />
          </div>
          <h5>mzco.</h5>
        </div>

        <button
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
          className="h-[6vw] w-[6vw] font-[inter-regular] text-[5vw] border-none px-1 py-1 rounded-full"
        >
          <IoMenuSharp />
        </button>
      </div>
       <div  className=" pr-3 w-screen  flex items-center justify-between px-2">
        <div className="flex gap-1 items-center">
          <div className="rounded-full overflow-hidden content-center h-[6vw] w-[6vw] bg-white">
            <img className="" src={meeza} alt="" />
          </div>
          <a href='https://www.instagram.com/mzco.creative?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='>mzco.creative</a><GoArrowUpRight className='bg-black rounded-full  text-white' size={12}/>
        </div>

        <button
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
          className="h-[6vw] w-[6vw] font-[inter-regular] text-[5vw] border-none px-1 py-1 rounded-full"
        >
          <RxCross1 size={17} />
        </button>
      </div>
      </div>
      </div>
    </div>
  );
}

export default Navber;
