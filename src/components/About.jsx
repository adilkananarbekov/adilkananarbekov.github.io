import React from 'react';

const About = () => {
  return (
    <section id="about" className="scroll-mt-24">
      <div className="border border-gray-800 bg-terminal-panel rounded-lg overflow-hidden">
        <div className="bg-gray-900/50 px-4 py-2 border-b border-gray-800 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-2 font-mono text-xs text-gray-500">about.md — vim</span>
        </div>
        <div className="p-6 md:p-10 font-mono text-sm md:text-base text-gray-300 space-y-4">
          <p>
            <span className="text-pink-500">const</span> <span className="text-blue-400">developer</span> = <span className="text-yellow-300">{"{"}</span>
          </p>
          <div className="pl-4 space-y-2">
            <p>name: <span className="text-green-400">"Anarbekov AdilKan"</span>,</p>
            <p>role: <span className="text-green-400">"Software Engineer"</span>,</p>
            <p>location: <span className="text-green-400">"Earth"</span>,</p>
            <p>status: <span className="text-green-400">"Open for opportunities"</span>,</p>
          </div>
          <p className="text-yellow-300">{"}"}</p>
          <br />
          <p className="text-gray-400">
            // Passionate about clean code, performance, and user experience.
            // Always learning new technologies and improving my craft.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
