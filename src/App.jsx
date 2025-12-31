import React from 'react';
import TerminalLayout from './components/TerminalLayout';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Contact from './components/Contact';

function App() {
  return (
    <div className="relative min-h-screen bg-terminal-bg selection:bg-terminal-accent selection:text-black">
      <div className="fixed inset-0 pointer-events-none z-50 mix-blend-overlay opacity-50 bg-[url('/assets/noise.png')]"></div>

      <TerminalLayout>
        <Hero />
        <About />
        <TechStack />
        <Contact />
      </TerminalLayout>
    </div>
  );
}

export default App;
