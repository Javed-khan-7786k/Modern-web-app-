import React from 'react';
import { Button } from '../common/Button.js';
import { ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onEnterDashboard: () => void;
  onBookDemo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onEnterDashboard, onBookDemo }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a href="#hero" className="text-lg font-bold tracking-tight text-slate-900 flex items-center gap-2">
          <span className="w-6 h-6 rounded-md bg-slate-950 text-white flex items-center justify-center text-xs font-mono">
            Æ
          </span>
          <span>Aethel School OS</span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-slate-600">
          <a href="#features" className="hover:text-slate-900 transition-colors">Capabilities</a>
          <a href="#ledgers" className="hover:text-slate-900 transition-colors">Financial Ledgers</a>
          <a href="#attendance" className="hover:text-slate-900 transition-colors">Attendance & SIS</a>
          <a href="#roles" className="hover:text-slate-900 transition-colors">Roles & Security</a>
          <a href="#pricing" className="hover:text-slate-900 transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-slate-900 transition-colors">FAQ</a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBookDemo} className="hidden sm:inline-flex">
            Book Demo
          </Button>
          <Button variant="primary" size="sm" onClick={onEnterDashboard} icon={<ArrowUpRight className="w-3.5 h-3.5" />}>
            Open Platform
          </Button>
        </div>
      </div>
    </header>
  );
};
