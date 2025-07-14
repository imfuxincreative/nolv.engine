import React, { useEffect,useContext ,  useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { GoArrowUpRight } from "react-icons/go";
import { MenuBgContext } from '../../context/MenuBgContext';

function Projects() {
  const navigate = useNavigate();
  const { menuOpen, setMenuOpen } = useContext(MenuBgContext);

  const allProjects = [
    { name: 'flexyourshots ( Gallary app )', path: 'https://flexyourshots.netlify.app' },
    { name: 'mzverse ( e-commerce, MERN )', path: 'https://mzverse.netlify.app' },
    { name: 'Portfolio-2024', path: 'https://meeza.netlify.app' },
    { name: 'kushalphotograph', path: 'https://postyourphotography.netlify.app/' },
    { name: 'stoicphotography', path: 'https://stoicphotograph.netlify.app' },
    { name: 'mznote (Note app , MERN )', path: 'https://mznote.netlify.app/' },
    { name: 'Architecture (UI/UX Design )', route: '/arcitecture' },
  ];

  const projectRefs = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      projectRefs.current,
      { y: '6vw' },
      {
        y: '0vw',
        duration: 0.5,
        ease: 'power1',
        stagger: 0.072,
      }
    );
  }, []);

  const handleMenuItemClick = (item) => {
    if (item.route) {
      navigate(item.route);
      setMenuOpen('open-full') // internal navigation
    } else if (item.path) {
      window.open(item.path, '_blank'); // open external link in new tab
    }
  };

  return (
    <div className="content-center absolute top-0 pointer-events-none h-screen w-screen">
      <div className="text-center w-screen">
        {allProjects.map((el, i) => (
          <div key={i} className="overflow-hidden py-1">
            <h1
              ref={(elem) => (projectRefs.current[i] = elem)}
              onClick={() => handleMenuItemClick(el)}
              className="items pointer-events-auto cursor-pointer"
            >
              {el.name}
            </h1>
          </div>
        ))}
      </div>

      <div className="footer absolute z-[800] bottom-20 left-[10vw] lg:left-[41vw] flex gap-7 flex-col items-center justify-center">
        <div className="flex gap-4 flex-col items-center justify-center">
          <h2>mzco.creative@gmail.com</h2>
          <div className="flex gap-3">
            <a href="">instagram</a>
            <a href="">Behance</a>
            <a href="">LinkedIn</a>
            <a href="">Github</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
