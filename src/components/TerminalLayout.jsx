import React from 'react';
import { motion } from 'framer-motion';

const TerminalLayout = ({ children }) => {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 pt-20">
      <header className="fixed top-0 left-0 right-0 z-40 bg-terminal-bg/80 backdrop-blur-md border-b border-terminal-accent/20">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between font-mono text-sm">
          <div className="flex items-center gap-2 text-terminal-accent">
            <span className="animate-blink">_</span>
            <span>anarbekov.dev</span>
          </div>
          <nav className="hidden md:flex gap-6 text-gray-400">
            <a href="#about" className="hover:text-terminal-accent transition-colors">~/about</a>
            <a href="#stack" className="hover:text-terminal-accent transition-colors">~/stack</a>
            <a href="#contact" className="hover:text-terminal-accent transition-colors">~/contact</a>
          </nav>
        </div>
      </header>

      <main className="relative z-10 space-y-24 pb-20">
        {children}
      </main>

      <footer className="py-8 text-center text-gray-600 font-mono text-xs">
        <p>git checkout improved-design</p>
        <p>© {new Date().getFullYear()} Anarbekov AdilKan</p>
      </footer>
    </div>
  );
};

export default TerminalLayout;
