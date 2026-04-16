import React, { useContext, useEffect, useState } from "react";
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
import { LoadingContext, LoadProvider } from "./context/LoadingContext.jsx";
import DynamicBlur from "./components/DynamicOpacity.jsx";
import ControlBar from "./components/ControlBar.jsx";
import PixelBg from "./components/pixelbg.jsx";
import Loader from "./components/loading.jsx";
import Visuals from "./pages/visuals/Visuals.jsx";
// import Navber from "./components/Navber.jsx";
import About from "./pages/About.jsx";
import Templates from "./pages/templates/Templates.jsx";
import Resources from "./pages/Resources/Resources.jsx";
import { MenuBgContext, MenuBgProvider } from "./context/MenuBgContext.jsx";
import Projects from "./pages/Projects/Projects.jsx";
import InfiniteGrid from "./pages/InfiniteGrid/InfiniteGrid.jsx";
import { IsAboutProvider } from "./context/IsAbout.jsx";
import SwitchToMobile from "./components/SwitchToMobile.jsx";
import { IsMobileContext, IsMobileProvider } from "./context/IsMobile.jsx";
import InfiniteInfo from "./pages/InfiniteInfo/InfiniteInfo.jsx";
import Navber from './components/Navber2.jsx';
import ScrollProgressBar from "./components/ScrollProgressBer.jsx";
import CustomCursor from "./components/CustomCursor.jsx";
import { CursorProvider } from "./context/CursorContext.jsx";
import ImageViewer from './components/ImageViewer.jsx'
import { ImageProvider } from "./context/ImageContext.jsx";
import Gallary from './pages/Gallary/Gallary.jsx'
import Bg from './components/Bg.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { useSmoothScroll, LenisProvider } from './context/LenisContext.jsx';
import Nav from "./components/Nav.jsx";
import InfiniteChat from "./pages/InfiniteChat/InfiniteChat.jsx";
import { LayoutProvider } from "./context/LayoutContext.jsx";
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
              <InfiniteInfo />
            </motion.div>
          }
        />
        <Route
          path="/visuals"
          element={
            <motion.div
              className='relative z-[300]'
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
              className='relative z-[100]'
              variants={pageVariants}
              initial="initial"
              animate="animate"

              transition={pageTransition}
            >
              <InfiniteGrid />
            </motion.div>
          }
        />
        <Route
          path="/gallary"
          element={
            <motion.div
              className='relative z-[100]'
              variants={pageVariants}
              initial="initial"
              animate="animate"

              transition={pageTransition}
            >
              <Gallary />
            </motion.div>
          }
        />
        <Route
          path="/viewer"
          element={
            <motion.div
              className='relative z-[100]'

            >
              <ImageViewer />
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
              <About />
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
          className=""
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
              <Projects />
            </motion.div>
          }
        />
        <Route
          path="/InfiniteChat"
          element={
            <motion.div
              className="relative z-[100]"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <InfiniteChat />
            </motion.div>
          }
        />
        <Route
          path="/InfiniteInfo"
          className=""
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <InfiniteInfo />
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
        {/* {window.innerWidth < 640 ? ( */}
        <div>
          <CustomCursor />
          <ScrollProgressBar />
          <Navber />
          <Nav />
          {/* <Navber /> */}
          <Bg />
          <div className="sticky z-[999] top-0">
            {/* <ControlBar /> */}
          </div>
          <AnimatedRoutes />
        </div>
        {/* ) : (
       <SwitchToMobile/>
      )} */}
      </div>
    );
  }

  return (
    <LenisProvider  >

      <ThemeProvider>
        <LayoutProvider>

        <LoadProvider>
          <CursorProvider>
            <ImageProvider>

              <IsMobileProvider>

                <IsAboutProvider>
                  <MenuBgProvider>
                    <BlurProvider>
                      <ReverseAnimeProvider>
                        <Router>
                          <AppWithBlur />
                        </Router>
                      </ReverseAnimeProvider>
                    </BlurProvider>
                  </MenuBgProvider>
                </IsAboutProvider>
              </IsMobileProvider>
            </ImageProvider>
          </CursorProvider>
        </LoadProvider>
        </LayoutProvider>
      </ThemeProvider>
    </LenisProvider>
  );
}

export default App;
