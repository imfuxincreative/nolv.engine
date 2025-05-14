import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home.jsx";
import AllWorks from "./pages/Works/AllWorks.jsx";
import { BlurProvider, BlurContext } from "./context/BlurContext.jsx";
import DynamicBlur from "./components/DynamicBlur.jsx";
import ControlBar from "./components/ControlBar.jsx";
import PixelBg from "./components/pixelbg.jsx";

function App() {
  const AppWithBlur = () => {
    const { setBlur } = useContext(BlurContext);

    useEffect(() => {
      const handleScroll = () => {
        const scrollY = window.scrollY;
        const blurValue = Math.min(80, scrollY / 10);
        setBlur(blurValue);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, [setBlur]);

    return (
      <div >
         <PixelBg/>
      <div className="sticky z-[999] top-0">
      <ControlBar/>
        
      </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/works" element={<AllWorks />} />
        </Routes>
        <div className="z-[10]">

        </div>
      </div>
    );
  };

  return (
    <BlurProvider>
      <Router>
        <AppWithBlur />
      </Router>
    </BlurProvider>
  );
}

export default App;
