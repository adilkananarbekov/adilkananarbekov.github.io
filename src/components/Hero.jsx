import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center font-display relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-terminal-accent font-mono mb-4 text-sm md:text-base tracking-wide">
          &gt; INITIALIZING SYSTEM...
        </h2>
        <h1 className="text-5xl md:text-8xl font-bold mb-6 tracking-tighter leading-none">
          ANARBEKOV<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-terminal-accent to-terminal-accent-2">
            ADILKAN
          </span>
        </h1>
        <p className="max-w-2xl text-gray-400 text-lg md:text-xl leading-relaxed">
          Full-stack developer building immersive web experiences.
          Specialized in modern React ecosystems and creative interactions.
        </p>

        <div className="mt-8 flex gap-4">
          <a href="#contact" className="px-6 py-3 bg-terminal-accent/10 border border-terminal-accent text-terminal-accent hover:bg-terminal-accent hover:text-black transition-all font-mono">
            ./contact-me.sh
          </a>
          <a href="#about" className="px-6 py-3 border border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white transition-all font-mono">
            cat about.md
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
