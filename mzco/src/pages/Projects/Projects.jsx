import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { GoArrowUpRight } from "react-icons/go";

function Projects() {
  const allProjects = [
    { name: 'flexyourwork', path: 'https://flexyourshots.netlify.app' },
    { name: 'mzverse', path: 'https://mzverse.netlify.app' },
    { name: 'Portfolio-2024', path: 'https://meeza.netlify.app' },
    { name: 'kushalphotograph', path: 'https://kushalphotograph.netlify.app/' },
    { name: 'stoicphotography', path: 'https://stoicphotograph.netlify.app' },
    { name: 'mznote', path: 'https://mznote.netlify.app/' },
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

  const handleMenuItemClick = (path) => {
    window.location.href = path;
  };

  return (
    <div className="content-center absolute top-0 pointer-events-none h-screen w-screen">
      <div className="text-center w-screen">
        {allProjects.map((el, i) => (
          <div key={i} className="overflow-hidden py-1">
            <h1
              ref={(elem) => (projectRefs.current[i] = elem)}
              onClick={() => handleMenuItemClick(el.path)}
              className="items pointer-events-auto"
            >
              {el.name}
            </h1>
            {/* Optional icon */}
            {/* <GoArrowUpRight className="bg-black rounded-full text-white" size={12} /> */}
          </div>
        ))}
      </div>

      <div className="footer absolute z-[800] bottom-20 left-[10vw] flex gap-7 flex-col items-center justify-center">
        <div className="flex gap-4 flex-col items-center justify-center">
          <h2 className="">mzco.creative@gmail.com</h2>
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
