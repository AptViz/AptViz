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
                 href="https://github.com/aptos-labs" 
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
               <a
                 href="https://discord.gg/aptosnetwork"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="w-10 h-10 bg-slate-200 rounded-full hover:bg-slate-300 transition-colors cursor-pointer flex items-center justify-center"
               >
                 <svg className="w-5 h-5 text-slate-700" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                 </svg>
               </a>
               <a
                 href="https://t.me/AptosKR"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="w-10 h-10 bg-slate-200 rounded-full hover:bg-slate-300 transition-colors cursor-pointer flex items-center justify-center"
               >
                 <svg className="w-5 h-5 text-slate-700" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                 </svg>
               </a>
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