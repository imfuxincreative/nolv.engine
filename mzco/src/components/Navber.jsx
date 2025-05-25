import React, { useRef, useEffect, useContext } from 'react';
import { IoMenuSharp } from "react-icons/io5";
import logo from '../assets/images/logo.png';
import { useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { RxCross1 } from "react-icons/rx";
import meeza from '../assets/images/Designs/starlight/starlight3.jpg';
import { GoArrowUpRight } from "react-icons/go";
import { MenuBgContext } from '../context/MenuBgContext';

gsap.registerPlugin(ScrollTrigger);

function Navber() {
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { menuOpen, setMenuOpen } = useContext(MenuBgContext);

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'components', path: '/components' },
    { name: 'Resources', path: '/resources' },
    { name: 'About', path: '/about' },
  ];

  useEffect(() => {
    const tl = gsap.timeline();

    if (menuOpen === 'open') {
      tl.to(menuRef.current, {
        height: '50vw',
        ease: 'power1.inOut',
      });
      tl.to('.items', {
        y: '0vw',
        stagger: 0.1,
        ease: 'power1.inOut',
      }, '1');
      tl.to('.menu-control', {
        y: '-6vw',
        stagger: 0.059,
        ease: 'power1.inOut',
      }, '1');
    } else if (menuOpen === 'close') {
      tl.to('.items', {
        y: '6vw',
        stagger: 0.059,
      });
      tl.to(menuRef.current, {
        height: '10vw',
        ease: 'power1.inOut',
      });
      tl.to('.menu-control', {
        y: '0vw',
        ease: 'power1.inOut',
      });
    } else if (menuOpen === 'open-full') {
      tl.to(menuRef.current, {
        height: '100vh',
        duration: 1,
        ease: 'power1.inOut',
      });

    }
  }, [menuOpen]);

  const handleMenuItemClick = (path) => {
    setMenuOpen('open-full');
    setTimeout(() => {
      navigate(path);
      setMenuOpen('open');
    }, 1300); // Delay to allow the animation to finish
  };

  const toggleMenu = () => {
    setMenuOpen(menuOpen === 'open' ? 'close' : 'open');
  };

  return (
    <div
      ref={menuRef}
      className="bg-white w-screen pt-2 h-[34vw] flex-col flex fixed z-[100] bottom-0 justify-between"
    >
      <div className="flex absolute bottom-[5vh] w-screen items-center justify-center flex-col">
        {menuItems.map((el, i) => (
          <div key={i} className="overflow-hidden py-1">
            <h1
              onClick={() => handleMenuItemClick(el.path)}
              className={`items opacity-50 cursor-pointer ${
                location.pathname === el.path ? 'opacity-100 ' : ''
              }`}
            >
              {el.name}
            </h1>
          </div>
        ))}
      </div>

      <div className='w-screen absolute overflow-hidden bottom--3 h-[25px]'>
        <div className='menu-control'>
          {/* Top Row */}
          <div className="pr-3 w-screen mt-[1.5px] flex items-center justify-between px-2">
            <div className="flex gap-1 items-center">
              <div className="rounded-full overflow-hidden content-center h-[6vw] w-[6vw] bg-white">
                <img className="" src={logo} alt="logo" />
              </div>
              <h5>mzco.</h5>
            </div>
            <button
              onClick={toggleMenu}
              className="h-[6vw] w-[6vw] font-[inter-regular] text-[5vw] border-none px-1 py-1 rounded-full"
            >
              <IoMenuSharp />
            </button>
          </div>

          {/* Bottom Row */}
          <div className="pr-3 w-screen flex items-center justify-between px-2">
            <div className="flex gap-1 items-center">
              <div className="rounded-full overflow-hidden content-center h-[6vw] w-[6vw] bg-white">
                <img className="" src={meeza} alt="meeza" />
              </div>
              <a href='https://www.instagram.com/mzco.creative' target='_blank' rel="noopener noreferrer">
                mzco.creative
              </a>
              <GoArrowUpRight className='bg-black rounded-full text-white' size={12} />
            </div>
            <button
              onClick={toggleMenu}
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
