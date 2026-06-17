'use client';

import { Notice } from '@/types';
import BoardCard from './BoardCard';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

export default function BulletinBoard({ initialNotices }: { initialNotices: Notice[] }) {
  const [showAll, setShowAll] = useState(false);
  
  const displayNotices = showAll ? initialNotices : initialNotices.slice(0, 8);
  const hasMore = initialNotices.length > 8;

  return (
    <section className="w-full flex flex-col items-center pb-24 overflow-hidden">
      
      {/* 3D Board Container */}
      <div className="w-full max-w-[1400px] px-0 sm:px-4 md:px-8 perspective-1800">
        
        {/* The Board Itself */}
        <div className="board-frame relative w-full min-h-[560px] bg-[#9D683E] rounded-none sm:rounded-md border-y-2 sm:border-y-0 border-[#3b2111] sm:border-[6px] shadow-[0_10px_30px_rgba(0,0,0,0.5)] md:shadow-[0_40px_80px_rgba(0,0,0,0.5)] transform-flat md:transform-3d">
          
          {/* Inner Frame Shadow */}
          <div className="absolute inset-0 shadow-[inset_0_4px_12px_rgba(0,0,0,0.6)] z-10 pointer-events-none sm:rounded-sm"></div>
          
          {/* Cork Texture & Lighting */}
          <div 
            className="absolute inset-0 sm:rounded-sm overflow-hidden"
            style={{ 
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=%22200%22 height=%22200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3CfeColorMatrix type=%22matrix%22 values=%221 0 0 0 0.72 0 1 0 0 0.47 0 0 1 0 0.29 0 0 0 0.15 0%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E")',
              backgroundSize: '200px 200px'
            }}
          >
            {/* Radial Warm Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(184,121,74,0.15)_0%,transparent_70%)] pointer-events-none"></div>
          </div>

          {/* Cards Grid/Strip Container */}
          <div className="relative z-20 w-full h-full py-8 md:py-16">
            <div className="board-layout">
              <AnimatePresence>
                {displayNotices.map((notice, i) => (
                  <div 
                    key={notice.id} 
                    className="grid-col-stagger flex justify-center"
                  >
                    <BoardCard notice={notice} index={i} />
                  </div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          
        </div>
      </div>

      {/* View All Toggle */}
      {hasMore && (
        <div className="mt-12 text-center">
          <button 
            onClick={() => setShowAll(!showAll)}
            className="text-accent-cork hover:text-white font-medium text-sm transition-colors border-b border-accent-cork/30 hover:border-white pb-0.5"
          >
            {showAll ? '↑ Show fewer notices' : '↓ View all notices'}
          </button>
        </div>
      )}

      <style jsx global>{`
        .perspective-1800 {
          perspective: 1800px;
        }
        
        @media (min-width: 768px) {
          .transform-3d {
            transform: rotateX(2deg);
            transform-style: preserve-3d;
          }
        }
        @media (min-width: 1024px) {
          .transform-3d {
            transform: rotateX(3deg);
          }
        }

        .board-layout {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          gap: 16px;
          padding: 16px 24px;
        }

        .board-layout::-webkit-scrollbar {
          display: none;
        }

        @media (min-width: 481px) {
          .board-layout {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
            padding: 24px;
            overflow: visible;
          }
          /* Stagger effect on alternate columns */
          .grid-col-stagger:nth-child(even) {
            transform: translateY(24px);
          }
        }

        @media (min-width: 1024px) {
          .board-layout {
            grid-template-columns: repeat(3, 1fr);
            gap: 32px;
            max-width: 900px;
            margin: 0 auto;
          }
          .grid-col-stagger:nth-child(even) {
            transform: none;
          }
          .grid-col-stagger:nth-child(3n+2) {
             transform: translateY(32px);
          }
        }

        @media (min-width: 1280px) {
          .board-layout {
            grid-template-columns: repeat(4, 1fr);
            max-width: 1100px;
          }
          .grid-col-stagger:nth-child(3n+2) {
             transform: none;
          }
          .grid-col-stagger:nth-child(even) {
            transform: translateY(32px);
          }
        }
        
        @media (min-width: 1536px) {
           .board-layout {
             max-width: 1300px;
             gap: 40px;
           }
        }
      `}</style>
    </section>
  );
}
