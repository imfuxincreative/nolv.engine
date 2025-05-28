import React, { useState, useRef, useEffect } from 'react'
import img1 from '../../assets/images/visuals/img.jpg'
import img2 from '../../assets/images/visuals/img2.jpg'
import img3 from '../../assets/images/visuals/img3.jpg'
import img4 from '../../assets/images/visuals/img4.jpg'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
gsap.registerPlugin(ScrollTrigger)

function Visuals() {
  const [blur, setBlur] = useState(true)
  const headingRefs = useRef([])
  const scrollContainerRef = useRef(null)

  const [visuals, setVisuals] = useState([
    { image: img1, isVisible: false , name : 'Serenity'},
    { image: img2, isVisible: false, name : 'Outdoor', },
    { image: img3, isVisible: true , name : 'Black & white'}, // initially true
    { image: img4, isVisible: false , name : 'Abandoned'},
    { image: img1, isVisible: false , name : 'Aesthetic'},
      { image:img3, isVisible: false , name : 'Sunset'},
    { image: img2, isVisible: false , name : 'Serenity'},
    { image: img4, isVisible: false, name : 'Outdoor', },
    { image: img3, isVisible: true , name : 'Black & white'}, // initially true
    { image: img4, isVisible: false , name : 'Abandoned'},
    { image: img2, isVisible: false , name : 'Aesthetic'},
      { image: img1, isVisible: false , name : 'Sunset'},
    { image: img2, isVisible: false , name : 'Serenity'},

  ])

  useEffect(() => {
    ScrollTrigger.defaults({
      scroller: scrollContainerRef.current
    })

    headingRefs.current.forEach((ref, i) => {
      if (!ref) return

      gsap.to(ref, {
        scrollTrigger: {
          trigger: ref,
          start: 'top 100vw',
          end: 'bottom 55vw',
          onEnter: () => updateVisibility(i),
          onEnterBack: () => updateVisibility(i)

        }
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const updateVisibility = (activeIndex) => {
    setVisuals(prev =>
      prev.map((item, idx) => ({
        ...item,
        isVisible: idx === activeIndex
      }))
    )
  }

  return (
    <div className='relative h-screen bg-white w-screen'>

      {/* Scrollable container */}
      <div
        ref={scrollContainerRef}
        className='overflow-y-scroll no-scrollber   absolute top-[40vh] z-[20] w-[100vw] h-[50vw]'
      >
        <div
          onTouchStart={() => setBlur(false)}
          onTouchEnd={() => setBlur(true)}
          onTouchCancel={() => setBlur(true)}
          className='flex flex-col py-2 gap-[5vw] items-center justify-center'
        >
          {visuals.map((el, i) => (
            <h2
              key={i}
              ref={el => headingRefs.current[i] = el}
              className={`h-fit text-center  w-[50vw] transition-opacity duration-500 ${el.isVisible ? 'opacity-100 text-[8vw]  ' : ' opacity-20'}`}
            >
            0{i}
            </h2>
          ))}
        </div>
      </div>

      {/* Blur overlay */}
      <div
        style={{ opacity: blur ? 1 : 0 }}
        className='h-screen w-screen duration-500 absolute z-[10] bg-white/30 backdrop-blur-lg'
      ></div>

      {/* Background image layer */}
      <div className='w-screen h-screen'>
        {/* {visuals.map((el, index) => (
          <div key={index}>
            <img
              src={el.image}
              style={{ opacity: el.isVisible ? 1 : 0 }}
              className='h-screen fixed top-0 w-screen object-cover object-top transition-opacity '
              alt=""
            />
          </div>
        ))} */}
      </div>
    </div>
  )
}

export default Visuals
