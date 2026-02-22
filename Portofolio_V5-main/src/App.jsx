import React, { useState, memo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./index.css";

// Page Components
import Home from "./Pages/Home";
import About from "./Pages/About";
import Portofolio from "./Pages/Portofolio";
import ContactPage from "./Pages/Contact";
import WelcomeScreen from "./Pages/WelcomeScreen";
import NotFoundPage from "./Pages/404";

// Layout Components
import Navbar from "./components/Navbar";
import AnimatedBackground from "./components/Background";
import ProjectDetails from "./components/ProjectDetail";

const Footer = memo(() => (
  <footer>
    <center>
      <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />
      <span className="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
        © 2026{" "}
        <a
          href="https://www.linkedin.com/in/abdullah-maulana-putra/"
          className="hover:underline"
        >
          Abdullah Maulana Putra
        </a>
        . All Rights Reserved.
      </span>
    </center>
  </footer>
));

const LandingPage = memo(({ showWelcome, setShowWelcome }) => {
  return (
    <>
      <AnimatePresence mode="wait">
        {showWelcome && (
          <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>

      {!showWelcome && (
        <>
          <Navbar />
          <AnimatedBackground />
          <Home />
          <About />
          <Portofolio />
          <ContactPage />
          <Footer />
        </>
      )}
    </>
  );
});

const ProjectPageLayout = memo(() => (
  <>
    <ProjectDetails />
    <Footer />
  </>
));

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage showWelcome={showWelcome} setShowWelcome={setShowWelcome} />
          }
        />
        <Route path="/project/:id" element={<ProjectPageLayout />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;