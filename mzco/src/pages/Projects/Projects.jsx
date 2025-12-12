import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import img3 from '../../assets/images/InfiniteImages/beach1.jpg';

gsap.registerPlugin(ScrollTrigger);

function Projects() {
  const textRefs = useRef([]);
  const introduction = ['Introduding', "the", 'Grido', ];

  // 🔥 All extra lines here (you can add unlimited lines)
  const lines = [
    { className: "second-line", content: <p className="line mt-10">There is a lot I wanna say</p> },
    { className: "third-line", content: <p className="and mt-1">It been almost 4 month</p> },
    { className: "fourth-line", content: <h4 style={{fontSize : '28px'}} className="custom mt-1">I guess</h4> },
    { className: "d-line", content: <p className="and mt-1">See this first</p> },

    { className: "fifth-line", content: <div className="custom mt-1"><img src={img3} className='object-cover w-100 h-60 rounded-lg'/></div> },
    { className: "sixeh-line", content: <div className="custom mt-1">I'm fuckin' creative</div> },
  ];

  useEffect(() => {
    // FIRST RENDER FADE-IN
    textRefs.current.forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          delay: i * 0.5,
          ease: 'power2.out',
        }
      );
    });

    // 🔹 Hide all scroll-animated lines initially
    lines.forEach(line => {
      gsap.set(`.${line.className}`, { opacity: 0 });
    });

    // SCROLL ANIMATIONS (dynamic)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".intro-line",
        start: "top 20%",
        end: "+=2000",
        scrub: true,
      }
    });

    // 🔥 Loop: reveal each line + move parent up
    lines.forEach((line, index) => {
      // Reveal the line
      tl.fromTo(
        `.${line.className}`,
        { opacity: 0, y: 60 + index * 20 },
        { opacity: 1, y: 0, ease: "power2.out", duration: 1 }
      );

      // Move container only for lines after the first one
      if (index >= 1) {
        tl.to(
          ".fixed-container",
          {
            y: -index * 40, // tweak movement amount
            ease: "power2.out",
            duration: 1,
          },
          "<" // sync with line reveal
        );
      }
    });
  }, []);

  return (
    <div className="h-[500vh] w-screen">
      {/* Wrapper handles centering */}
      <div className="fixed top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2">
        <div style={{ y: 0 }} className="fixed-container">
          {/* FIRST LINE */}
          <div>
            <div className='flex gap-2 intro-line'>
              {introduction.map((el, i) => (
                <h2
                  key={i}
                  ref={(elRef) => (textRefs.current[i] = elRef)}
                >
                  {el}
                </h2>
              ))}
            </div>
            <h3>a platform for degital creatives</h3>
          </div>

          {/* AUTO-GENERATED LINES */}
          {lines.map((item, i) => (
            <div key={i} className={item.className}>
              {item.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;
