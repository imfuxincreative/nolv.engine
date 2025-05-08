import React, { useEffect, useState } from "react";
import Index from "./pages/home/index.jsx";
import Visuals from "./pages/home/ImageViewer/Visuals.jsx";
import DynamicBlur from "./components/DynamicBlur.jsx";
import ParallaxImageAlgo from "./pages/home/ImageViewer/parallaxImageAlgo.jsx";

function App() {
  const [blur, setBlur] = useState(0); // default blur

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Clamp value between 20 and 80
      const blurValue = Math.min(0, 0 + scrollY / 10);
      setBlur(blurValue);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="">
      <div className="sticky top-0 z-[10]">
        <Index />
      </div>
<div className="z-[999] relative">
<ParallaxImageAlgo/>

</div>
<DynamicBlur/>


  </div>
  );
}

export default App;
