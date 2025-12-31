import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="scroll-mt-24 mb-20">
      <h3 className="font-mono text-terminal-accent mb-8 flex items-center gap-2">
        <span className="text-xl">03.</span>
        <span className="h-px bg-terminal-accent/20 flex-grow max-w-xs"></span>
        Contact
      </h3>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
           <p className="text-gray-400 mb-6">
             Interested in working together? Feel free to reach out directly on social media or send me a message.
           </p>
           <div className="flex flex-col gap-4">
             <a href="mailto:example@example.com" className="flex items-center gap-3 text-gray-300 hover:text-terminal-accent transition-colors">
               <img src="/assets/icons/email.svg" className="w-5 h-5" alt="Email" />
               example@example.com
             </a>
             <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-terminal-accent transition-colors">
               <img src="/assets/icons/linkedin.svg" className="w-5 h-5" alt="LinkedIn" />
               LinkedIn Profile
             </a>
             <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-terminal-accent transition-colors">
               <img src="/assets/icons/github.svg" className="w-5 h-5" alt="GitHub" />
               GitHub Profile
             </a>
           </div>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Name" className="bg-gray-900/50 border border-gray-800 p-3 rounded text-sm focus:border-terminal-accent focus:outline-none text-white placeholder-gray-600" />
            <input type="email" placeholder="Email" className="bg-gray-900/50 border border-gray-800 p-3 rounded text-sm focus:border-terminal-accent focus:outline-none text-white placeholder-gray-600" />
          </div>
          <textarea placeholder="Message" rows="4" className="w-full bg-gray-900/50 border border-gray-800 p-3 rounded text-sm focus:border-terminal-accent focus:outline-none text-white placeholder-gray-600"></textarea>
          <button className="bg-terminal-accent text-black font-bold py-3 px-8 hover:bg-white transition-colors text-sm uppercase tracking-wider">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
