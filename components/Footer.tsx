import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-20 text-slate-900">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="text-xl font-bold tracking-tight flex items-center gap-2 mb-6">
              <div className="w-5 h-5 bg-slate-900 rounded-sm" />
              <span>APTOS INSIGHT</span>
            </div>
            <p className="text-slate-500 max-w-sm mb-8 leading-relaxed">
              Building the safest and most scalable Layer 1 blockchain. 
              Designed for people, built by developers.
            </p>
            <div className="flex space-x-4">
               <a 
                 href="https://github.com/AptViz/AptViz" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="w-10 h-10 bg-slate-200 rounded-full hover:bg-slate-300 transition-colors cursor-pointer flex items-center justify-center"
               >
                 <svg className="w-5 h-5 text-slate-700" fill="currentColor" viewBox="0 0 24 24">
                   <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                 </svg>
               </a>
               <a 
                 href="https://x.com/Aptos_kr" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="w-10 h-10 bg-slate-200 rounded-full hover:bg-slate-300 transition-colors cursor-pointer flex items-center justify-center"
               >
                 <svg className="w-5 h-5 text-slate-700" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.207-6.807-5.967 6.807H2.395l7.663-8.764L2.25 2.25h6.814l4.7 6.217 5.479-6.217zM17.002 18.807h1.833L6.287 4.125H4.382l12.62 14.682z" />
                 </svg>
               </a>
               <div className="w-10 h-10 bg-slate-200 rounded-full hover:bg-slate-300 transition-colors cursor-pointer"></div>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6 text-slate-900">Developers</h4>
            <ul className="space-y-4 text-slate-500">
              <li>
                <a 
                  href="https://aptos.dev/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-teal-600 transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/AptViz/AptViz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-teal-600 transition-colors"
                >
                  Github
                </a>
              </li>
              <li>
                <a 
                  href="/aptos-whitepaper_ko.pdf" 
                  download="Aptos-Whitepaper-KO.pdf"
                  className="hover:text-teal-600 transition-colors"
                >
                  Whitepaper
                </a>
              </li>
              <li>
                <a 
                  href="https://aptosnetwork.com/grants" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-teal-600 transition-colors"
                >
                  Grants
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-slate-900">Ecosystem</h4>
            <ul className="space-y-4 text-slate-500">
              <li>
                <a 
                  href="https://explorer.aptoslabs.com/?network=mainnet" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-teal-600 transition-colors"
                >
                  Explorer
                </a>
              </li>
              <li>
                <a 
                  href="https://chromewebstore.google.com/detail/petra-aptos-wallet/ejjladinnckdgjemekebdpeokbikhfci" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-teal-600 transition-colors"
                >
                  Wallets
                </a>
              </li>
              <li>
                <a 
                  href="https://dappradar.com/rankings/protocol/aptos" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-teal-600 transition-colors"
                >
                  DApps
                </a>
              </li>
              <li className="hover:text-teal-600 cursor-pointer transition-colors">Community</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-20 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between text-sm text-slate-500">
          <p>© 2026 AptViz. All rights reserved.</p>
          <p>Data provided by Aptos Foundation</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="cursor-pointer hover:text-slate-900">Privacy Policy</span>
            <span className="cursor-pointer hover:text-slate-900">Terms of Service</span>
            <a 
              href="https://x.com/Rayxxxxn" 
              target="_blank" 
              rel="noopener noreferrer"
              className="cursor-pointer hover:text-slate-900 transition-colors"
            >
              Made by @Ray
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};