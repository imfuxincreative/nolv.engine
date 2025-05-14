import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import AllWorks from "./pages/Works/AllWorks.jsx";
import { BlurProvider } from "./context/BlurContext.jsx";
import { ReverseAnimeProvider} from './context/ReverseAnime.jsx'
import DynamicBlur from "./components/DynamicBlur.jsx";
import ControlBar from "./components/ControlBar.jsx";
import PixelBg from "./components/pixelbg.jsx";

function App() {
  const AppWithBlur = () => {




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
      <ReverseAnimeProvider>

      <Router>
        <AppWithBlur />
      </Router>
      </ReverseAnimeProvider>
    </BlurProvider>
  );
}

export default App;
