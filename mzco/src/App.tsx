import React from "react";
import styles from "./App.module.css";
import { BrowserRouter } from "react-router-dom";
import { LoadProvider } from "./context/LoadingContext";
import Loop from "./pages/Loop/Loop";
import Navbar from './components/Controls';
import ScrollProgressBar from "./components/ScrollProgressBer";
import CustomCursor from "./components/CustomCursor";
import { CursorProvider } from "./context/CursorContext";
import Bg from './components/Bg'
import { ThemeProvider } from './context/ThemeContext'
import { LenisProvider } from './context/LenisContext';
import { LayoutProvider } from "./context/LayoutContext";
import { VisualProvider } from "./context/VisualContext";

function AppWithBlur() {
  return (
    <div>
      <div>
        <CustomCursor />
        <ScrollProgressBar />
        <Navbar />
        <Bg />
        <div className={styles.stickyHeader}></div>
        <Loop />
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <LenisProvider>
        <ThemeProvider>
          <LayoutProvider>
            <LoadProvider>
              <CursorProvider>
                <VisualProvider>
                  <AppWithBlur />
                </VisualProvider>
              </CursorProvider>
            </LoadProvider>
          </LayoutProvider>
        </ThemeProvider>
      </LenisProvider>
    </BrowserRouter>
  );
}

export default App;
