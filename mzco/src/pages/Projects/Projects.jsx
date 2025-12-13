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
  { className: "line-2", content: <p className="">Hey</p> },
  { className: "line-3", content: <p className="">yeah!</p> },
  { className: "line-4", content: <p className="">You made it</p> },
  { className: "line-5", content: <p className="">Stay for a bit</p> },

  { className: "line-6", content: <p className="">I build late</p> },
  { className: "line-7", content: <p className="">When it’s quiet</p> },
  { className: "line-8", content: <p className="">When ideas get honest</p> },
  { className: "line-9", content: <p className="">No noise</p> },
  { className: "line-10", content: <p className="">Just focus</p> },
  { className: "line-16", content: <img  src={img3} className='h-40 w-60 rounded-lg object-cover'/> },

  { className: "line-11", content: <p className="">I’m a frontend dev</p> },
  { className: "line-12", content: <p className="">Designer too</p> },
  { className: "line-13", content: <p className="">I move pixels like emotions</p> },
  { className: "line-14", content: <p className="">Slow</p> },
  { className: "line-15", content: <p className="">Intentional</p> },


  // { className: "line-16", content: <p className="line mt-6">I saw something missing.</p> },
  // { className: "line-17", content: <p className="line mt-1">Too much talent.</p> },
  // { className: "line-18", content: <p className="line mt-1">Too little recognition.</p> },
  // { className: "line-19", content: <p className="line mt-1">Everything felt disposable.</p> },

  // { className: "line-20", content: <p className="line mt-6">So I didn’t talk about it.</p> },
  // { className: "line-21", content: <p className="line mt-1">I built instead.</p> },
  // { className: "line-22", content: <p className="line mt-1">A platform.</p> },
  // { className: "line-23", content: <p className="line mt-1">For creatives who feel deeply.</p> },

  // { className: "line-24", content: <p className="line mt-6">Work gets submitted.</p> },
  // { className: "line-25", content: <p className="line mt-1">Watched.</p> },
  // { className: "line-26", content: <p className="line mt-1">Felt.</p> },
  // { className: "line-27", content: <p className="line mt-1">Judged beyond numbers.</p> },

  // { className: "line-28", content: <p className="line mt-1">Creativity.</p> },
  // { className: "line-29", content: <p className="line mt-1">Aesthetics.</p> },
  // { className: "line-30", content: <p className="line mt-1">Emotion.</p> },

  // { className: "line-31", content: <p className="line mt-1">The real ones stand out.</p> },
  // { className: "line-32", content: <p className="line mt-1">Night after night.</p> },

  // { className: "line-33", content: <p className="line mt-6">Great work needs light.</p> },
  // { className: "line-34", content: <p className="line mt-1">So I built a spotlight.</p> },
  // { className: "line-35", content: <p className="line mt-1">Clean.</p> },
  // { className: "line-36", content: <p className="line mt-1">Focused.</p> },
  // { className: "line-37", content: <p className="line mt-1">Nothing extra.</p> },

  // { className: "line-38", content: <p className="line mt-6">You explore.</p> },
  // { className: "line-39", content: <p className="line mt-1">You discover.</p> },
  // { className: "line-40", content: <p className="line mt-1">Awarded work.</p> },
  // { className: "line-41", content: <p className="line mt-1">Hidden gems.</p> },
  // { className: "line-42", content: <p className="line mt-1">Creative supplies.</p> },
  // { className: "line-43", content: <p className="line mt-1">Visual stories.</p> },

  // { className: "line-44", content: <p className="line mt-6">Creatives can own their work.</p> },
  // { className: "line-45", content: <p className="line mt-1">Sell it.</p> },
  // { className: "line-46", content: <p className="line mt-1">Document it.</p> },
  // { className: "line-47", content: <p className="line mt-1">Keep control.</p> },

  // { className: "line-48", content: <p className="line mt-6">Nobody builds alone.</p> },
  // { className: "line-49", content: <p className="line mt-1">Brands exist here.</p> },
  // { className: "line-50", content: <p className="line mt-1">Studios too.</p> },
  // { className: "line-51", content: <p className="line mt-1">Different voices.</p> },
  // { className: "line-52", content: <p className="line mt-1">One vision.</p> },

  // { className: "line-53", content: <p className="line mt-6">Next.js.</p> },
  // { className: "line-54", content: <p className="line mt-1">TypeScript.</p> },
  // { className: "line-55", content: <p className="line mt-1">Redux.</p> },
  // { className: "line-56", content: <p className="line mt-1">Express.</p> },
  // { className: "line-57", content: <p className="line mt-1">MongoDB.</p> },
  // { className: "line-58", content: <p className="line mt-1">AWS S3.</p> },
  // { className: "line-59", content: <p className="line mt-1">Framer Motion.</p> },
  // { className: "line-60", content: <p className="line mt-1">Tailwind.</p> },
  // { className: "line-61", content: <p className="line mt-1">Everything intentional.</p> },

  // { className: "line-62", content: <p className="line mt-6">Motion tells the story.</p> },
  // { className: "line-63", content: <p className="line mt-1">Silence does the rest.</p> },

  // { className: "line-64", content: <p className="line mt-6">This is pre-beta.</p> },
  // { className: "line-65", content: <p className="line mt-1">Private.</p> },
  // { className: "line-66", content: <p className="line mt-1">Still evolving.</p> },
  // { className: "line-67", content: <p className="line mt-1">But it breathes.</p> },

  // { className: "line-68", content: <p className="line mt-6">I’m getting ready to launch.</p> },
  // { className: "line-69", content: <p className="line mt-1">But for now…</p> },
  // { className: "line-70", content: <p className="line mt-1">I’m looking to build.</p> },
  // { className: "line-71", content: <p className="line mt-1">With the right team.</p> },

  // { className: "line-72", content: <p className="line mt-6">This isn’t just a project.</p> },
  // { className: "line-73", content: <p className="line mt-1">It’s my mindset.</p> },
  // { className: "line-74", content: <p className="line mt-1">My taste.</p> },
  // { className: "line-75", content: <p className="line mt-1">My late nights.</p> },

  // { className: "line-76", content: <p className="line mt-6">Thanks for staying.</p> },
  // { className: "line-77", content: <p className="line mt-1">— Meezan</p> },

  // { className: "line-78", content: <p className="line mt-6">Some things stay in the shadows.</p> },
  // { className: "line-79", content: <p className="line mt-1">Pre-beta rules.</p> },
];
;

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
    <div className="h-[2000vh] w-screen">
      {/* Wrapper handles centering */}
      <div className="fixed top-[30vh] translate-y-[20vh]  left-10">
        <div style={{ y: 0 }} className="fixed-container">
          {/* FIRST LINE */}
          {/* <div>
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
          </div> */}

          {/* AUTO-GENERATED LINES */}
          <div className='flex  gap-2'>

          <img className='h-7 w-7 rounded-full object-cover' src={img3}/>
          <div>

{lines.map((item, i) => {
  const isEven = i % 2 === 0;
  const isParagraph = item.content.type === "p";
  
  const bubbleRadius = isEven
  ? "18px 18px 17px 18px"
  : "18px 18px 18px 4px";
  
  return (
    <div
    key={i}
    className={`
      ${item.className}
      w-fit
      mb-1
      ${isParagraph ? "bg-black text-white px-3 py-1.5" : ""}
      `}
      style={isParagraph ? { borderRadius: bubbleRadius } : {}}
      >
      {item.content}
    </div>
  );
})}
</div>
</div>


        </div>
      </div>
    </div>
  );
}

export default Projects;
