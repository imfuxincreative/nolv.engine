import React, { useEffect, useContext , useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import AllWorks from "./pages/Works/AllWorks.jsx";
import { BlurProvider } from "./context/BlurContext.jsx";
import { ReverseAnimeProvider} from './context/ReverseAnime.jsx'
import DynamicBlur from "./components/DynamicBlur.jsx";
import ControlBar from "./components/ControlBar.jsx";
import PixelBg from "./components/pixelbg.jsx";
import Loader from "./components/loading.jsx";
import { LoadProvider } from "./context/LoadingContext.jsx";

function App() {
  const AppWithBlur = () => {

const [isLoading , setIsLoading] = useState(true)
useEffect(()=>{
  setTimeout(()=>{
    setIsLoading(false)
  } , 2000)
} , [])

    return (
      <div >
         <PixelBg/>
      <div className="sticky z-[999] top-0">
      <ControlBar/>
        
      </div>
     { isLoading ? <Loader/> : null}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/works" element={<AllWorks />} />
        </Routes>

      </div>
    );
  };

  return (
    <LoadProvider>

    <BlurProvider>
      <ReverseAnimeProvider>

      <Router>
        <AppWithBlur />
      </Router>
      </ReverseAnimeProvider>
    </BlurProvider>
    </LoadProvider>
  );
}

export default App;
