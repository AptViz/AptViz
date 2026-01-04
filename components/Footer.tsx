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
               <div className="w-10 h-10 bg-slate-200 rounded-full hover:bg-slate-300 transition-colors cursor-pointer"></div>
               <div className="w-10 h-10 bg-slate-200 rounded-full hover:bg-slate-300 transition-colors cursor-pointer"></div>
               <div className="w-10 h-10 bg-slate-200 rounded-full hover:bg-slate-300 transition-colors cursor-pointer"></div>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6 text-slate-900">Developers</h4>
            <ul className="space-y-4 text-slate-500">
              <li className="hover:text-teal-600 cursor-pointer transition-colors">Documentation</li>
              <li className="hover:text-teal-600 cursor-pointer transition-colors">Github</li>
              <li className="hover:text-teal-600 cursor-pointer transition-colors">Whitepaper</li>
              <li className="hover:text-teal-600 cursor-pointer transition-colors">Grants</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-slate-900">Ecosystem</h4>
            <ul className="space-y-4 text-slate-500">
              <li className="hover:text-teal-600 cursor-pointer transition-colors">Explorer</li>
              <li className="hover:text-teal-600 cursor-pointer transition-colors">Wallets</li>
              <li className="hover:text-teal-600 cursor-pointer transition-colors">DApps</li>
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
              href="https://x.com/taeho35858" 
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