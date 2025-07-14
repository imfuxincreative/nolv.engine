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
  import { MdHomeFilled } from "react-icons/md";
  import { IoIosArrowBack } from "react-icons/io";
  import { IsAboutContext } from '../context/IsAbout';
  import { BlurContext } from '../context/BlurContext';
  import { LoadingContext } from '../context/LoadingContext';
  import { IsMobileContext } from '../context/IsMobile';
  gsap.registerPlugin(ScrollTrigger);

  function Navber() {
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    const { menuOpen, setMenuOpen } = useContext(MenuBgContext);
    const {isAbout , setIsAbout} = useContext(IsAboutContext)
    const {setIsLoading} = useContext(LoadingContext)
    const {blurValue}  = useContext(BlurContext)
    const {isMobile}  = useContext(IsMobileContext)
  console.log(blurValue)
    const menuItems = [
      { name: 'Home', path: '/', load : false },
      { name: 'Playground', path: '/infinitegrid' , load : false},
      { name: 'Projects', path: '/projects', load : false },
      { name: 'Resources', path: '/resources', load : false },
      { name: 'About', path: '/about', load : false },

    ];
  const didMountRef  = useRef(false)
  useEffect(() => {
    gsap.to('.menu-control', {
      y: 5 * blurValue,
      duration: 0.2,
      ease: 'power1.out',
    });

    gsap.to('.main', {
      y: 5 * blurValue,
      duration: 0.2,
      ease: 'power1.out',
    });
  }, [blurValue]);

    useEffect(() => {
      const tl = gsap.timeline();

      
      if (menuOpen === 'open') {
        tl.to(menuRef.current, {
          height: isMobile ? '50vw' : '30vh',
          ease: 'power1.inOut',
        });
        tl.to('.items', {
          y: isMobile? '0vw':'-2px',
          stagger: 0.059,
          
          ease: 'power1.inOut',
        }, '1');
        tl.to('.menu-control', {
          y: isMobile?'-6vw':'-40px',
          stagger: 0.059,
          ease: 'power1.inOut',
        }, '1');
      } else if (menuOpen === 'close') {
      
        tl.to('.items', {
          y: '40px',
          stagger: 0.059,
        });
        tl.to(menuRef.current, {
          height: isMobile ? '10vw':'40px',
          ease: 'power1.inOut',
        });
        tl.to('.menu-control', {
          y: isMobile?'0vw':'0px',
          ease: 'power1.inOut',
        });
      } else if (menuOpen === 'open-full') {
        tl.to(menuRef.current, {
          height: '100dvh',
          duration: 0.6,
          ease: 'power1.inOut',
        });
      tl.to('.items', {
          y: isMobile ? '-6.2vw':'-40px',
          stagger: {each : 0.024,from : 'end'}
        });
          tl.to('.menu-control', {
          y: isMobile?'-13vw':'-80px',
          stagger: 0.059,
          ease: 'power1.inOut',
        }, '1');

      }


    }, [menuOpen ]);

  const handleMenuItemClick = (path) => {
    if (path === '/') {
      if (menuOpen !== 'open') {
        setMenuOpen('open');
      }
    } else {
      if (menuOpen !== 'open-full') {
        setMenuOpen('open-full');
      }
      setTimeout(() => {
        navigate(path);
      }, 1200);
    }
  };

    const toggleMenu = () => {
      navigate(menuItems[0].path)
      setTimeout(()=>{
        setMenuOpen(menuOpen === 'open' ? 'close' : 'open');

      },400)
    };
      const toggleFirstMenu = () => {
      navigate(menuItems[0].path)
      setTimeout(()=>{
        setMenuOpen(menuOpen === 'open' ? 'close' : 'open');

      },400)
    };

    return (
      <>
      <div
      
        ref={menuRef}
        className="main bg-white/50 backdrop-blur-3xl w-screen rounded-t-xl border-t border-[#e7e7e7] pt-2 h-[10vw] lg:h-[50px] flex-col flex fixed z-[50] bottom-0 lg:bottom-[0vw] justify-between"
      >
        <div className="flex absolute bottom-[5vh] w-screen items-center justify-center flex-col">
          {menuItems.map((el, i) => (
            <div key={i} className="overflow-hidden py-1 lg:py-[2px]">
              <h1
                onClick={() => {
                  setIsLoading(true)
                  handleMenuItemClick(el.path)}}
                className={`items -translate-y-[-6vw]  opacity-50 cursor-pointer ${
                  location.pathname === el.path ? 'opacity-100 ' : ''
                }`}
              >
                {el.name}
              </h1>
            </div>
          ))}
        </div>

      
      </div>
      <div className='w-screen fixed z-[999] overflow-hidden bottom-3 lg:bottom-[0vw] lg:h-[40px] h-[25px]'>
          <div  className='menu-control '>
            
            {/* middle Row */}
            <div className="pr-3 w-screen mt-[1.5px]  flex items-center justify-between px-2">
              <div className="flex gap-1 items-center">
                <div className="rounded-full overflow-hidden content-center lg:h-[25px] lg:w-[25px] h-[6vw] w-[6vw]  bg-white">
                  <img className="" src={logo} alt="logo" />
                </div>
                <h5>mzco.</h5>
              </div>
              <button
                onClick={toggleFirstMenu}
                className="h-[6vw] w-[6vw] font-[inter-regular] text-[5vw] lg:text-[20px]   lg:w-[20px] lg:h-[40px] border-none px-1 py-1 rounded-full"
              >
                <IoMenuSharp />
              </button>
            </div>

            {/* middle Row */}
            <div className="pr-3 w-screen flex items-center justify-between px-2">
              <div className="flex gap-1 items-center">
                <div className="rounded-full overflow-hidden content-center lg:h-[25px] lg:w-[25px] h-[6vw] w-[6vw] bg-white">
                  <img className="" src={meeza} alt="meeza" />
                </div>
                <a href='https://www.instagram.com/mzco.creative' target='_blank' rel="noopener noreferrer">
                  mzco.creative
                </a>
                <GoArrowUpRight className='bg-black rounded-full text-white' size={12} />
              </div>
              <button
                onClick={toggleMenu}
                className="h-[6vw] w-[6vw] lg:text-[20px]   lg:w-[20px] lg:h-[40px] font-[inter-regular] text-[5vw] border-none px-1 py-1 rounded-full"
              >
                <RxCross1 size={17} />
              </button>
            </div>
            {/* bottom Row */}
            <div className="pr-3 w-screen mt-[1.5px] flex items-center justify-between px-2">
              <div className="flex gap-1 items-center">
                <div className="rounded-full overflow-hidden content-center lg:h-[25px] lg:w-[25px] h-[6vw] w-[6vw] bg-white">
                  <img className="" src={logo} alt="logo" />
                </div>
                <h5>mzco.</h5>
              </div>
              <button
                onClick={toggleMenu}
                className="h-[6vw] w-[6vw] lg:text-[20px]   lg:w-[20px] lg:h-[40px] font-[inter-regular] text-[5vw] border-none px-1 py-1 rounded-full"
              >
                <IoIosArrowBack  size={16}  />
              </button>
            </div>
          </div>
        </div>
        </>
    );
  }

  export default Navber;
