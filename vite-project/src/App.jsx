import React from 'react';
import './App.css';
import { ThemeProvider } from './context/ThemeContext';

// Layout
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Sections
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import GitHubStats from './components/GitHubStats';
import LinkedInProfile from './components/LinkedInProfile';
import Certifications from './components/Certifications';
import Contact from './components/Contact';

// Global UX
import LoadingScreen from './components/LoadingScreen';
import CursorGlow from './components/CursorGlow';
import ScrollProgressBar from './components/ScrollProgressBar';
import BackToTop from './components/BackToTop';

function App() {
  return (
    <ThemeProvider>
      <LoadingScreen />
      <CursorGlow />
      <ScrollProgressBar />

      <div className="App">
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Skills />
        <GitHubStats />
        <LinkedInProfile />
        <Certifications />
        <Contact />
        <Footer />
      </div>

      <BackToTop />
    </ThemeProvider>
  );
}

export default App;