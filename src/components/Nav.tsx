import Link from 'next/link';
import { ExternalLink, Mail } from 'lucide-react';

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 h-[56px] bg-[rgba(8,8,13,0.88)] backdrop-blur-[16px] border-b border-border flex items-center justify-center supports-[not_(backdrop-filter:blur(1px))]:bg-[rgba(8,8,13,0.97)]">
      <div className="w-full max-w-[1200px] px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="font-display font-bold text-accent-cork text-lg tracking-tight hover:opacity-80 transition-opacity">
          SAKSHAM.DEV
        </Link>
        <div className="flex items-center gap-6">
          <a href="https://play.google.com/store/apps/dev?id=YOUR_DEV_ID" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors">
            <span className="hidden md:inline">Google Play</span>
            <ExternalLink size={16} className="md:w-3.5 md:h-3.5" />
          </a>
          <a href="mailto:contact@saksham.dev" className="group flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors">
            <span className="hidden md:inline">Contact</span>
            <Mail size={16} className="md:hidden" />
            <ExternalLink size={16} className="hidden md:inline md:w-3.5 md:h-3.5" />
          </a>
        </div>
      </div>
    </nav>
  );
}
