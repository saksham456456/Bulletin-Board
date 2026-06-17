'use client';

import { motion, useReducedMotion, Variants, AnimatePresence } from 'framer-motion';
import { Notice } from '@/types';
import { formatDate } from '@/lib/utils';
import { useState } from 'react';
import { X } from 'lucide-react';

interface BoardCardProps {
  notice: Notice;
  index: number;
}

const typeStyles = {
  release: { paper: '#FEFAF3', pin: '#D94F4F', label: 'NEW RELEASE' },
  update: { paper: '#F3F8FE', pin: '#4B8EF0', label: 'UPDATE' },
  bugfix: { paper: '#FFF3F3', pin: '#D94F4F', label: 'FIX' },
  roadmap: { paper: '#FFFBF0', pin: '#E8C547', label: 'ROADMAP' },
  support: { paper: '#F3FFF8', pin: '#3DB87A', label: 'SUPPORT' },
};

// Seeded random for consistent tilt based on ID
const getTilt = (id: string) => {
  const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const tilt = (hash % 6) - 3; // -3 to +3
  return tilt;
};

export default function BoardCard({ notice, index }: BoardCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const styles = typeStyles[notice.type] || typeStyles.update;
  const tilt = getTilt(notice.id);
  const [isExpanded, setIsExpanded] = useState(false);

  const variants: Variants = shouldReduceMotion
    ? { initial: { opacity: 1, y: 0, rotate: tilt }, animate: { opacity: 1, y: 0, rotate: tilt } }
    : {
        initial: { opacity: 0, y: -20, rotate: tilt + 5 },
        animate: { 
          opacity: 1, 
          y: 0, 
          rotate: tilt,
          transition: { delay: 0.3 + index * 0.07, duration: 0.5, type: 'spring' as const, bounce: 0.4 }
        }
      };

  return (
    <>
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      className="notice-card relative cursor-pointer md:cursor-default w-[80vw] max-w-[300px] md:w-full md:max-w-none shrink-0"
      style={{ scrollSnapAlign: 'start' }}
      onClick={() => {
        // Only trigger expansion on mobile screens (where hover is not active typically)
        if (window.innerWidth < 768) {
          setIsExpanded(true);
        }
      }}
    >
      <div 
        className="relative w-full h-full min-h-[200px] rounded p-5 md:transition-all md:duration-250 md:ease-[cubic-bezier(0.34,1.56,0.64,1)] group hover:scale-[1.04] hover:z-10 bg-white"
        style={{ 
          backgroundColor: styles.paper,
          boxShadow: '2px 4px 16px rgba(0,0,0,0.35), 0 1px 3px rgba(0,0,0,0.2)'
        }}
      >
        {/* Hover Reset for Tilt (Desktop only) */}
        <style jsx>{`
          @media (min-width: 768px) {
            .group:hover {
              transform: scale(1.04) rotate(0deg) !important;
              box-shadow: 0 16px 32px rgba(0,0,0,0.4), 0 4px 8px rgba(0,0,0,0.2) !important;
            }
          }
          @media (max-width: 767px) {
            .group:active {
               transform: scale(0.97);
               transition: transform 0.15s ease;
            }
          }
        `}</style>
        
        {/* Grain overlay */}
        <div className="absolute inset-0 opacity-[0.04] mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

        {/* Pushpin */}
        <div 
          className="absolute -top-[9px] left-1/2 -translate-x-1/2 w-[18px] h-[18px] rounded-full z-10"
          style={{ 
            backgroundColor: styles.pin,
            boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.3), inset 2px 2px 4px rgba(255,255,255,0.4), 1px 2px 4px rgba(0,0,0,0.4)'
          }}
        >
          <div className="absolute top-1 left-[4px] w-1 h-1 bg-white/40 rounded-full blur-[1px]"></div>
          <div className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-[2px] h-[6px] bg-[#333] -z-10 shadow-[1px_2px_2px_rgba(0,0,0,0.2)]"></div>
        </div>

        <div className="flex flex-col h-full mt-2 relative z-10">
          <div className="font-mono text-[10px] font-bold tracking-wider mb-2 uppercase" style={{ color: styles.pin }}>
            {styles.label}
          </div>
          
          <h3 className="font-display font-medium text-lg text-[#1A1A2A] leading-tight mb-1">
            {notice.title}
          </h3>
          
          <div className="font-mono text-xs text-[#1A1A2A]/50 mb-3">
            {formatDate(notice.date)}
          </div>
          
          {notice.description && (
            <p className="font-sans text-sm text-[#1A1A2A]/80 leading-snug line-clamp-3 mb-4 flex-grow">
              {notice.description}
            </p>
          )}
          
          <div className="mt-auto flex items-center gap-2 flex-wrap">
            {notice.app_name && (
              <span className="inline-block px-2 py-0.5 bg-black/5 rounded font-medium text-xs text-[#1A1A2A]">
                {notice.app_name}
              </span>
            )}
            {notice.version && (
              <span className="inline-block px-2 py-0.5 bg-black/5 rounded font-mono text-xs text-[#1A1A2A]">
                v{notice.version}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
    
    <AnimatePresence>
      {isExpanded && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:hidden bg-black/60 backdrop-blur-sm" onClick={() => setIsExpanded(false)}>
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
            className="w-full bg-surface rounded-t-2xl p-6 relative"
            style={{ backgroundColor: styles.paper }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setIsExpanded(false)} className="absolute right-4 top-4 p-2 text-[#1A1A2A]/50 hover:text-[#1A1A2A]">
               <X size={20} />
            </button>
            
            <div className="font-mono text-[10px] font-bold tracking-wider mb-3" style={{ color: styles.pin }}>
              {styles.label}
            </div>
            
            <h3 className="font-display font-medium text-xl text-[#1A1A2A] leading-tight mb-2">
              {notice.title}
            </h3>
            
            <div className="font-mono text-xs text-[#1A1A2A]/60 mb-4">
              {formatDate(notice.date)}
            </div>
            
            {notice.description && (
              <p className="font-sans text-sm text-[#1A1A2A]/80 leading-relaxed mb-6 whitespace-pre-wrap">
                {notice.description}
              </p>
            )}
            
            <div className="flex gap-2 flex-wrap">
               {notice.app_name && (
                  <span className="inline-block px-3 py-1 bg-black/5 rounded-full text-xs font-medium text-[#1A1A2A]">
                    {notice.app_name}
                  </span>
               )}
               {notice.version && (
                  <span className="inline-block px-3 py-1 bg-black/5 rounded-full font-mono text-xs text-[#1A1A2A]">
                    v{notice.version}
                  </span>
               )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
    </>
  );
}
