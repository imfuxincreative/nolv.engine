import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

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

// Page animation settings
const pageVariants = {
  initial: { opacity: 0, filter: "blur(10px)" },
  animate: { opacity: 1, filter: "blur(0px)" },
  exit: { opacity: 0, filter: "blur(50px)" },
};

const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.6,
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
    <div>
      <Navber/>
      <PixelBg />
      <div className="sticky z-[999] top-0">
        {/* <ControlBar /> */}
      </div>
      {isLoading && <Loader />}
      {!isLoading && <AnimatedRoutes />}
    </div>
  );

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
