import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Architecture from "./pages/design/Architecture.jsx";
import Timeless from "./pages/design/Timeless.jsx";
import Mzverse from "./pages/design/Mzverse.jsx";
import Portfolio24 from "./pages/design/Portfolio24.jsx";
import Home from "./pages/home/Home.jsx";
import AllWorks from "./pages/Works/AllWorks.jsx";
import Design from './pages/design/Design.jsx';

import { BlurProvider } from "./context/BlurContext.jsx";
import { ReverseAnimeProvider } from './context/ReverseAnime.jsx';
import { LoadProvider } from "./context/LoadingContext.jsx";

import DynamicBlur from "./components/DynamicBlur.jsx";
import ControlBar from "./components/ControlBar.jsx";
import PixelBg from "./components/pixelbg.jsx";
import Loader from "./components/loading.jsx";
import Visuals from "./pages/visuals/Visuals.jsx";
import Navber from "./components/Navber.jsx";
import About from "./pages/About.jsx";
import Templates from "./pages/templates/Templates.jsx";
import Resources from "./pages/Resources/Resources.jsx";
import { MenuBgContext, MenuBgProvider } from "./context/MenuBgContext.jsx";
import Projects from "./pages/Projects/Projects.jsx";
import InfiniteGrid from "./pages/InfiniteGrid/InfiniteGrid.jsx";

// Page animation settings
const pageVariants = {
  initial: { opacity: 0,  },
  animate: { opacity: 1,  },
  exit: { opacity: 0,  },
};

const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.3,
};

// Wrap routes with AnimatePresence and motion.div
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <Home />
            </motion.div>
          }
        />
         <Route
          path="/visuals"
          element={
            <motion.div
            className = 'relative z-[300]'
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <Visuals />
            </motion.div>
          }
        />
           <Route
          path="/infinitegrid"
          element={
            <motion.div
            className = 'relative z-[100]'
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
          <InfiniteGrid/>
            </motion.div>
          }
        />
        <Route
          path="/works"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <AllWorks />
            </motion.div>
          }
        />
         <Route
          path="/resources"
          
          element={
            <motion.div
            className="relative z-[300]"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <Resources />
            </motion.div>
          }
        />
         <Route
          path="/about"
          element={
            <motion.div
            
  className="relative z-[100]"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <About/>
            </motion.div>
          }
        />
          <Route
          path="/templates"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <Templates />
            </motion.div>
          }
        />
        <Route
          path="/design"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <Design />
            </motion.div>
          }
        />
         <Route
          path="/mzverse"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <Mzverse />
            </motion.div>
          }
        />
         <Route
          path="/portfolio-2024"
          element={
            <motion.div
            
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <Portfolio24 />
            </motion.div>
          }
        />
         <Route
          path="/timeless"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <Timeless />
            </motion.div>
          }
        />
         <Route
          path="/arcitecture"
          className = ""
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <Architecture />
            </motion.div>
          }
        />
         <Route
          path="/projects"
          element={
            <motion.div  
            className="relative z-[100]"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <Projects/>
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const AppWithBlur = () => (
    <div>{window.innerWidth < 640 ? <div>
      {/* <About/> */}
      <Navber/>

      <PixelBg />
      <div className="sticky z-[999] top-0">
        {/* <ControlBar /> */}
      </div>
      {isLoading && <Loader />}
      {!isLoading && <AnimatedRoutes />}
    </div>: <div className="h-screen w-screen flex items-center justify-center bg-white">
      
      <h5 className="text-[20px] tracking-tight">Please, Switch to mobile.</h5></div>}
    </div>
  );

  return (
    <LoadProvider>
      <MenuBgProvider>
      <BlurProvider>
        <ReverseAnimeProvider>
          <Router>
            <AppWithBlur />
          </Router>
        </ReverseAnimeProvider>
      </BlurProvider>
    </MenuBgProvider>
    </LoadProvider>
  );
}

export default App;
