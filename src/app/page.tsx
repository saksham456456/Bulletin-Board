import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import BulletinBoard from '@/components/BulletinBoard';
import { supabase } from '@/lib/supabase';
import { Notice } from '@/types';

// Force dynamic rendering or set revalidate time
export const revalidate = 60; // Revalidate every 60 seconds

async function getNotices() {
  const { data, error } = await supabase
    .from('notices')
    .select('*')
    .eq('status', 'published')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching notices:', error);
    return [];
  }
  return data as Notice[];
}

export default async function Home() {
  const notices = await getNotices();

  return (
    <div className="min-h-screen flex flex-col bg-base selection:bg-accent-blue/30 selection:text-white">
      <Nav />
      
      <main className="flex-grow flex flex-col">
        {/* Minimal Hero Section */}
        <section className="w-full flex flex-col items-center text-center px-4 pt-[60px] pb-[48px] sm:pt-[80px] sm:pb-[60px] lg:pt-[100px] lg:pb-[80px] xl:pt-[140px] xl:pb-[100px] z-10 relative">
          
          <div className="font-mono text-sm text-accent-cork tracking-wider uppercase mb-4 sm:mb-6">
            SAKSHAM.DEV
          </div>
          
          <h1 className="font-display font-bold text-primary tracking-tight leading-[1.1] mb-6 
            text-[clamp(1.75rem,7vw,2.75rem)] 
            md:text-3xl 
            lg:text-4xl 
            2xl:text-[clamp(3.75rem,4vw,5rem)]">
            Official Bulletin Board
          </h1>
          
          <p className="font-sans text-base text-secondary max-w-[500px] mx-auto leading-relaxed mb-10">
            App updates, releases, and notices —<br className="hidden sm:block" />
            posted here before anywhere else.
          </p>
          
          <a 
            href="#board" 
            className="group relative inline-flex items-center justify-center px-6 py-3 bg-surface border border-border text-primary font-medium text-sm rounded transition-all hover:bg-elevated hover:border-accent-cork/30 hover:-translate-y-[1px] active:translate-y-0 w-full sm:w-auto"
          >
            <span>↓ View the Board</span>
          </a>
          
        </section>

        <div id="board" className="scroll-mt-24 w-full">
           <BulletinBoard initialNotices={notices} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
