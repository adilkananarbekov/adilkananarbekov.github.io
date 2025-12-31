import React from 'react';
import { motion } from 'framer-motion';

const TerminalLayout = ({ children }) => {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 pt-20">
      <header className="fixed top-0 left-0 right-0 z-40 bg-terminal-bg/80 backdrop-blur-md border-b border-terminal-accent/20">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between font-mono text-sm">
          <div className="flex items-center gap-2 text-terminal-accent">
            <span className="animate-blink text-lg">_</span>
            <span className="tracking-tight font-bold">anarbekov.dev</span>
          </div>
          <nav className="hidden md:flex gap-8 text-gray-400">
            <a href="#about" className="hover:text-terminal-accent transition-colors duration-300">~/about</a>
            <a href="#stack" className="hover:text-terminal-accent transition-colors duration-300">~/stack</a>
            <a href="#contact" className="hover:text-terminal-accent transition-colors duration-300">~/contact</a>
          </nav>
        </div>
      </header>

      <main className="relative z-10 space-y-32 pb-20">
        {children}
      </main>

      <footer className="py-8 text-center text-gray-600 font-mono text-xs border-t border-gray-900 mt-20">
        <p className="mb-2">git checkout improved-design-4015373312457276924</p>
        <p>© {new Date().getFullYear()} Anarbekov AdilKan</p>
      </footer>
    </div>
  );
};

export default TerminalLayout;
