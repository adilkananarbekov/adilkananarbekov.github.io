import React from 'react';

const icons = [
  { name: 'React', src: '/assets/icons/react.svg' }, // Assuming I might not have react.svg, I'll check.
  { name: 'JavaScript', src: '/assets/icons/javascript.svg' },
  { name: 'Git', src: '/assets/icons/git.svg' },
  { name: 'GitHub', src: '/assets/icons/github.svg' },
  { name: 'Firebase', src: '/assets/icons/firebase.svg' },
  { name: 'Flutter', src: '/assets/icons/flutter.svg' },
  { name: 'Dart', src: '/assets/icons/dart.svg' },
  { name: 'Google', src: '/assets/icons/google.svg' },
  { name: 'LinkedIn', src: '/assets/icons/linkedin.svg' },
];

const TechStack = () => {
  return (
    <section id="stack" className="scroll-mt-24">
      <h3 className="font-mono text-terminal-accent mb-8 flex items-center gap-2">
        <span className="text-xl">02.</span>
        <span className="h-px bg-terminal-accent/20 flex-grow max-w-xs"></span>
        Tech Stack
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {icons.map((tech) => (
          <div key={tech.name} className="group border border-gray-800 bg-gray-900/20 p-4 rounded-lg hover:border-terminal-accent/50 transition-colors flex items-center gap-3">
             <img
               src={tech.src}
               alt={tech.name}
               className="w-8 h-8 opacity-70 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
               onError={(e) => {e.target.style.display = 'none'}} // Hide if broken
             />
             <span className="font-mono text-sm text-gray-400 group-hover:text-white">{tech.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;
