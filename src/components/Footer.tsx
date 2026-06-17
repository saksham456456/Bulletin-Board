import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-surface py-12 border-t border-border mt-24">
      <div className="w-full max-w-[1200px] px-4 md:px-6 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
          <div>
            <h2 className="font-display font-bold text-accent-cork mb-1">SAKSHAM.DEV</h2>
            <p className="text-secondary text-sm">Google Play Developer</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center w-full md:w-auto">
            <a href="https://play.google.com/store/apps/dev?id=YOUR_DEV_ID" target="_blank" rel="noopener noreferrer" className="text-sm text-secondary hover:text-primary transition-colors flex items-center gap-1">
              Google Play <ExternalLink size={12} />
            </a>
            <a href="mailto:contact@saksham.dev" className="text-sm text-secondary hover:text-primary transition-colors flex items-center gap-1">
              Contact <ExternalLink size={12} />
            </a>
            <Link href="/privacy" className="text-sm text-secondary hover:text-primary transition-colors flex items-center gap-1">
              Privacy Policy <ExternalLink size={12} />
            </Link>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end pt-8 border-t border-border gap-4">
          <p className="text-xs text-muted">
            &copy; {currentYear} Saksham Mogha. All rights reserved.
          </p>
          <p className="font-mono text-xs text-muted">
            Built to ship.
          </p>
        </div>
      </div>
    </footer>
  );
}
