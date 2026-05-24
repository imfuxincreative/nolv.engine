import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { LoadProvider } from "./context/LoadingContext.jsx";
import Loop from "./pages/Loop/Loop.jsx";
import Navbar from './components/Controls.jsx';
import ScrollProgressBar from "./components/ScrollProgressBer.jsx";
import CustomCursor from "./components/CustomCursor.jsx";
import { CursorProvider } from "./context/CursorContext.jsx";
import Bg from './components/Bg.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { LenisProvider } from './context/LenisContext.jsx';
import { LayoutProvider } from "./context/LayoutContext.jsx";
import { VisualProvider } from "./context/VisualContext.jsx";

// Page animation settings
const pageVariants = {
  initial: { opacity: 0, },
  animate: { opacity: 1, },
  exit: { opacity: 0, },
};
const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.3,
};

// Wrap routes with AnimatePresence and motion.div
const AnimatedRoutes = () => {
  const [isMobile, setIsMobile] = useState(false)
  const location = useLocation();
  useEffect(() => {
    if (window.innerWidth >= 640) {
      setIsMobile(false)
    } else {
      setIsMobile(true)
    }
  }, [])

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
              <Loop />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  function AppWithBlur() {
    return (
      <div>
        <div>
          <CustomCursor />
          <ScrollProgressBar />
          <Navbar />
          <Bg />
          <div className="sticky z-[999] top-0">
          </div>
          <AnimatedRoutes />
        </div>
      </div>
    );
  }

  return (
    <LenisProvider>
      <ThemeProvider>
        <LayoutProvider>
          <LoadProvider>
            <CursorProvider>
              <VisualProvider>
                <Router>
                  <AppWithBlur />
                </Router>
              </VisualProvider>
            </CursorProvider>
          </LoadProvider>
        </LayoutProvider>
      </ThemeProvider>
    </LenisProvider>
  );
}

export default App;
