/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Ticket, Zap, MapPin, Menu, X, ArrowRight, Speaker, Disc, Terminal } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import CustomCursor from './components/CustomCursor';
import ArtistCard from './components/ArtistCard';
import { Artist } from './types';
import AIChat from './components/AIChat';

// Hiatus Festival 2025 Lineup Data
const LINEUP: Artist[] = [
  { 
    id: '1', 
    name: 'Lorenzo Senni', 
    genre: 'Pointillistic Trance', 
    day: 'SAT 29', 
    image: 'https://images.unsplash.com/photo-1550975646-7080e7c53bb5?q=80&w=1000&auto=format&fit=crop',
    description: 'AV Show. The master of pointillistic trance brings his deconstructed rave euphoria to the main stage.'
  },
  { 
    id: '2', 
    name: 'Abul Mogard', 
    genre: 'Drone / Ambient', 
    day: 'FRI 28', 
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=1000&auto=format&fit=crop',
    description: 'Live Act. Massive, monolithic walls of sound from the legendary synth artisan.'
  },
  { 
    id: '3', 
    name: 'HDMIRROR', 
    genre: 'Hard Dance / Core', 
    day: 'FRI 28', 
    image: 'https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=1000&auto=format&fit=crop',
    description: 'AV Show. A high-velocity collision of euro-dance nostalgia and futuristic rave accelerationism.'
  },
  { 
    id: '4', 
    name: 'Fausto Mercier', 
    genre: 'Experimental Club', 
    day: 'FRI 28', 
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1000&auto=format&fit=crop',
    description: 'AV Show. Complex rhythms and digital textures deconstructed into a visceral club experience.'
  },
  { 
    id: '5', 
    name: 'ZULI', 
    genre: 'Deconstructed Club', 
    day: 'SAT 29', 
    image: 'https://images.unsplash.com/photo-1571266028243-371695039989?q=80&w=1000&auto=format&fit=crop',
    description: 'Cairo\'s finest brings his unique fusion of grime, jungle, and experimental sound design.'
  },
  { 
    id: '6', 
    name: 'Avtomat', 
    genre: 'Techno / Queer Rave', 
    day: 'FRI 28', 
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
    description: 'Relentless energy and unapologetic rhythms from the Polish underground icon.'
  },
  { 
    id: '7', 
    name: 'Afterimage', 
    genre: 'Visual / Ambient', 
    day: 'SAT 29', 
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop',
    description: 'AV Show. A sensory exploration of light and sound.'
  },
  { 
    id: '8', 
    name: 'Dtekk', 
    genre: 'Techno', 
    day: 'FRI 28', 
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1000&auto=format&fit=crop',
    description: 'Deep, hypnotic techno to close the main stage on Friday night.'
  },
];

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]); // Parallax
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  
  const [purchasingIndex, setPurchasingIndex] = useState<number | null>(null);
  const [purchasedIndex, setPurchasedIndex] = useState<number | null>(null);

  // Handle keyboard navigation for artist modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedArtist) return;
      if (e.key === 'ArrowLeft') navigateArtist('prev');
      if (e.key === 'ArrowRight') navigateArtist('next');
      if (e.key === 'Escape') setSelectedArtist(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedArtist]);

  const handlePurchase = (index: number) => {
    setPurchasingIndex(index);
    setTimeout(() => {
      setPurchasingIndex(null);
      setPurchasedIndex(index);
    }, 2000);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const navigateArtist = (direction: 'next' | 'prev') => {
    if (!selectedArtist) return;
    const currentIndex = LINEUP.findIndex(a => a.id === selectedArtist.id);
    let nextIndex;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % LINEUP.length;
    } else {
      nextIndex = (currentIndex - 1 + LINEUP.length) % LINEUP.length;
    }
    setSelectedArtist(LINEUP[nextIndex]);
  };
  
  return (
    <div className="relative min-h-screen text-gray-200 selection:bg-[#ccff00] selection:text-black cursor-none overflow-x-hidden bg-black">
      <CustomCursor />
      <FluidBackground />
      <AIChat />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-4 md:px-6 md:py-6 mix-blend-difference border-b border-white/20 bg-black/80 backdrop-blur-sm">
        <div className="font-heading text-lg md:text-xl font-bold tracking-widest text-white cursor-default z-50 uppercase">
          [ HIATUS_2025 ]
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-12 text-xs font-mono tracking-widest uppercase">
          {['Lineup', 'Info', 'Tickets'].map((item) => (
            <button 
              key={item} 
              onClick={() => scrollToSection(item.toLowerCase())}
              className="hover:text-[#ccff00] transition-colors text-white cursor-pointer bg-transparent border-none flex items-center gap-2 group"
              data-hover="true"
            >
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#ccff00]">{'>'}</span>
              {item}
            </button>
          ))}
        </div>
        <button 
          onClick={() => scrollToSection('tickets')}
          className="hidden md:inline-flex items-center gap-2 border border-white px-6 py-2 text-xs font-mono font-bold uppercase hover:bg-[#ccff00] hover:text-black hover:border-[#ccff00] transition-all duration-0 text-white cursor-pointer bg-transparent"
          data-hover="true"
        >
          <Zap className="w-3 h-3" />
          Acquire Tickets
        </button>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white z-50 relative w-10 h-10 flex items-center justify-center border border-white/20"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
           {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-30 bg-black flex flex-col items-start pt-32 px-8 gap-8 md:hidden border-l border-white/20"
          >
            {['Lineup', 'Info', 'Tickets'].map((item, i) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-4xl font-heading font-bold text-white hover:text-[#ccff00] transition-colors uppercase bg-transparent border-none flex items-center gap-4"
              >
                <span className="text-xs font-mono text-gray-600">0{i+1}</span>
                {item}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('tickets')}
              className="mt-8 w-full border border-[#ccff00] px-10 py-4 text-sm font-bold tracking-widest uppercase bg-[#ccff00] text-black"
            >
              Get Tickets
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <header className="relative h-screen min-h-[700px] flex flex-col items-center justify-center overflow-hidden px-4 border-b border-white/20">
        <motion.div 
          style={{ y }}
          className="z-10 w-full max-w-[1800px] flex flex-col justify-between h-full py-32 md:py-40"
        >
          {/* Top Info */}
           <div className="flex justify-between items-start w-full px-2 md:px-0">
              <div className="flex flex-col text-xs md:text-sm font-mono text-gray-400 gap-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#ccff00]"></span>
                  <span>STATUS: ONLINE</span>
                </div>
                <div>ID: HIATUS_V6.0</div>
              </div>
              <div className="text-right text-xs md:text-sm font-mono text-gray-400">
                <div>LOC: SCHRON_BUNKER</div>
                <div>LAT: 52.4064° N</div>
                <div>LON: 16.9252° E</div>
              </div>
           </div>

          {/* Main Title */}
          <div className="relative w-full text-center">
            <h1 className="text-[14vw] leading-[0.8] font-heading font-black tracking-tighter text-white mix-blend-exclusion">
              HIATUS
            </h1>
            <h1 className="text-[14vw] leading-[0.8] font-heading font-black tracking-tighter text-transparent stroke-text absolute top-0 left-0 w-full pointer-events-none opacity-50" style={{ WebkitTextStroke: '1px #333' }}>
              HIATUS
            </h1>
            
            <div className="w-full h-px bg-white/20 my-8 relative overflow-hidden">
               <motion.div 
                 className="absolute top-0 left-0 h-full w-1/3 bg-[#ccff00]"
                 animate={{ x: ['-100%', '300%'] }}
                 transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
               />
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center text-xs md:text-sm font-mono tracking-widest uppercase w-full max-w-4xl mx-auto px-4">
              <span>28-29 NOV 2025</span>
              <span className="hidden md:inline text-[#ccff00]">//</span>
              <span>POZNAŃ, PL</span>
              <span className="hidden md:inline text-[#ccff00]">//</span>
              <span>AVANT-GARDE ELECTRONICS</span>
            </div>
          </div>
          
          <div className="flex justify-center">
             <ArrowRight className="w-6 h-6 text-white/50 animate-bounce mt-10" />
          </div>
        </motion.div>
      </header>

      {/* LINEUP SECTION */}
      <section id="lineup" className="relative z-10 border-b border-white/20">
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-screen">
          {/* Sidebar Label */}
          <div className="hidden md:flex md:col-span-1 border-r border-white/20 items-center justify-center bg-black">
            <h2 className="text-xl font-heading font-bold uppercase -rotate-90 whitespace-nowrap tracking-widest text-[#ccff00]">
              Index / Artists
            </h2>
          </div>

          <div className="col-span-1 md:col-span-11">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {LINEUP.map((artist, idx) => (
                <div key={artist.id} className={`border-b border-white/20 ${idx % 4 !== 3 ? 'md:border-r' : ''}`}>
                  <ArtistCard artist={artist} onClick={() => setSelectedArtist(artist)} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INFO SECTION */}
      <section id="info" className="relative z-10 border-b border-white/20 bg-white text-black">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 md:p-20 border-b lg:border-b-0 lg:border-r border-black/10 flex flex-col justify-between min-h-[600px]">
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-3 h-3 bg-black"></div>
                  <span className="font-mono text-sm tracking-widest uppercase">Mission Statement</span>
                </div>
                <h2 className="text-5xl md:text-8xl font-heading font-black mb-10 leading-[0.9]">
                  NOISE<br/>SIGNAL<br/>VOID
                </h2>
                <p className="text-xl md:text-2xl font-mono leading-relaxed max-w-xl">
                  Hiatus is an interdisciplinary festival focused on avant-garde electroacoustic, electronic, and improvised music. 
                  <br/><br/>
                  We occupy the brutalist concrete structures of <strong>SCHRON</strong> to create a temporary autonomous zone of sound and light.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-8 mt-12 font-mono text-sm border-t border-black/10 pt-8">
                <div>
                  <div className="font-bold mb-2 uppercase">/ Organizer</div>
                  <div>Stowarzyszenie Twórcownia</div>
                </div>
                <div>
                  <div className="font-bold mb-2 uppercase">/ Partners</div>
                  <div>Urząd Marszałka Województwa Wielkopolskiego, Miasto Poznań</div>
                </div>
              </div>
            </div>

            <div className="relative h-[500px] lg:h-auto bg-black overflow-hidden group">
               {/* Image effect */}
               <img 
                 src="https://images.unsplash.com/photo-1594961556667-07409477e5d8?q=80&w=1000&auto=format&fit=crop" 
                 className="absolute inset-0 w-full h-full object-cover grayscale opacity-50 group-hover:opacity-80 transition-opacity duration-500 group-hover:scale-105 transform"
                 alt="Bunker Texture" 
               />
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 mix-blend-overlay"></div>
               
               <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full bg-gradient-to-t from-black to-transparent">
                  <div className="font-heading text-6xl text-white mb-2">SCHRON</div>
                  <div className="font-mono text-[#ccff00] text-lg uppercase flex items-center gap-2">
                    <MapPin size={16} /> Bunker Location // Poznań
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* TICKETS SECTION */}
      <section id="tickets" className="relative z-10 py-20 md:py-32 px-4 md:px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="border border-white/20 p-1 md:p-2">
            <div className="border border-white/20 p-8 md:p-16">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-6xl font-heading font-bold uppercase mb-4 text-white">Access Protocol</h2>
                <p className="font-mono text-gray-400 text-sm">/// SELECT YOUR TIER</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/20">
                {[
                  { name: 'FRI / SAT', price: '70 PLN', type: 'SINGLE DAY', color: 'text-white' },
                  { name: 'FULL PASS', price: '120 PLN', type: 'WEEKEND', color: 'text-[#ccff00]' },
                  { name: 'GATE', price: '140 PLN', type: 'FULL PASS', color: 'text-gray-400' },
                ].map((ticket, i) => (
                  <div 
                    key={i} 
                    className={`
                      relative p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/20 last:border-0 hover:bg-white/5 transition-colors group
                      ${i === 1 ? 'bg-white/5' : ''}
                    `}
                  >
                    <div className="font-mono text-xs text-gray-500 mb-4 flex justify-between">
                      <span>REF: 00{i+1}</span>
                      {i === 1 && <span className="text-[#ccff00] animate-pulse">RECOMMENDED</span>}
                    </div>
                    <div className={`text-3xl md:text-5xl font-bold font-heading mb-2 ${ticket.color}`}>{ticket.price}</div>
                    <div className="text-sm font-mono font-bold uppercase mb-8">{ticket.name}</div>
                    
                    <ul className="text-xs font-mono text-gray-400 space-y-2 mb-8">
                       <li>[x] Bunker Access</li>
                       <li>[x] AV Shows</li>
                       <li>{i === 2 ? '[ ] Pre-sale price' : '[x] Pre-sale price'}</li>
                    </ul>

                    <button 
                      onClick={() => handlePurchase(i)}
                      className={`
                        w-full py-4 text-xs font-bold uppercase tracking-widest border border-white/20 
                        hover:bg-[#ccff00] hover:text-black hover:border-[#ccff00] transition-all duration-0
                        ${purchasingIndex === i ? 'bg-white text-black' : ''}
                      `}
                    >
                      {purchasingIndex === i ? 'PROCESSING...' : 'INITIATE'}
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-center font-mono text-xs text-gray-500">
                SECURE TRANSACTION via BILETOMAT.PL
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/20 py-12 bg-black">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
             <div className="font-heading text-2xl font-bold tracking-tight mb-4 text-white uppercase">HIATUS // 2025</div>
             <div className="flex flex-col gap-2 text-xs font-mono text-gray-500 uppercase">
               <span>Org: Stowarzyszenie Twórcownia</span>
               <span>Partners: UMWW, Poznań, Schron</span>
             </div>
          </div>
          
          <div className="flex gap-8 font-mono text-xs uppercase">
            <a href="#" className="text-gray-500 hover:text-[#ccff00] hover:underline">[ Facebook ]</a>
            <a href="#" className="text-gray-500 hover:text-[#ccff00] hover:underline">[ Instagram ]</a>
            <a href="#" className="text-gray-500 hover:text-[#ccff00] hover:underline">[ Resident Advisor ]</a>
          </div>
        </div>
      </footer>

      {/* Artist Detail Modal - Brutalist Style */}
      <AnimatePresence>
        {selectedArtist && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedArtist(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center p-0 md:p-8 bg-black/90 cursor-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl bg-black border border-white/30 flex flex-col md:flex-row h-full md:h-auto max-h-screen overflow-y-auto md:overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedArtist(null)}
                className="absolute top-0 right-0 z-20 p-4 bg-[#ccff00] text-black hover:bg-white transition-colors"
                data-hover="true"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Image Side */}
              <div className="w-full md:w-1/2 h-64 md:h-auto relative border-b md:border-b-0 md:border-r border-white/20">
                <img 
                  src={selectedArtist.image} 
                  alt={selectedArtist.name} 
                  className="w-full h-full object-cover grayscale contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50" />
                <div className="absolute bottom-4 left-4 bg-black px-2 py-1 text-xs font-mono text-[#ccff00] border border-[#ccff00]">
                  IMG_REF: {selectedArtist.id}
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-[#050505]">
                <div className="flex items-center gap-4 mb-6">
                   <span className="font-mono text-xs bg-white text-black px-2 py-1">{selectedArtist.day}</span>
                   <span className="font-mono text-xs border border-white/30 text-gray-400 px-2 py-1 uppercase">{selectedArtist.genre}</span>
                </div>
                
                <h3 className="text-4xl md:text-7xl font-heading font-bold uppercase leading-[0.85] mb-8 text-white">
                  {selectedArtist.name}
                </h3>
                
                <p className="font-mono text-gray-300 leading-relaxed text-sm md:text-base border-l-2 border-[#ccff00] pl-6">
                  {selectedArtist.description}
                </p>
                
                <div className="mt-12 flex gap-4">
                  <div className="h-2 w-2 bg-[#ccff00] animate-pulse"></div>
                  <div className="h-2 w-2 bg-[#ccff00] animate-pulse delay-75"></div>
                  <div className="h-2 w-2 bg-[#ccff00] animate-pulse delay-150"></div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;