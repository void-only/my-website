import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import Lenis from 'lenis';
import { Disc } from 'lucide-react';
import EntranceSequence from './components/EntranceSequence';

export default function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [copied, setCopied] = useState(false);
  
  const mainSiteRef = useRef(null);
  const profileRef = useRef(null);
  const recordRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (showLoader) {
      document.body.style.overflow = 'hidden'; 
    } else {
      document.body.style.overflow = ''; 
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [showLoader]);

  useEffect(() => {
    if (recordRef.current) {
      gsap.to(recordRef.current, {
        rotation: 360,
        duration: 3,
        repeat: -1,
        ease: "linear"
      });
    }
  }, []);

  const handleProfileEnter = () => {
    gsap.to(profileRef.current, { scale: 0.95, duration: 0.4, ease: "power3.out" });
  };
  const handleProfileLeave = () => {
    gsap.to(profileRef.current, { scale: 1, duration: 0.4, ease: "power3.out" });
  };

  const handleCopy = async () => {
    const textToCopy = "_eternal_void";
    
    // Modern Clipboard API fallback for mobile browsers
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return;
      } catch (err) {
        // Fallback triggered if permission denied
      }
    }

    // Legacy fallback using temporary textarea for mobile execution safety
    try {
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      textArea.style.position = "fixed";
      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert("Copy failed. Username: _eternal_void");
    }
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&display=swap');
          .font-custom { font-family: 'Outfit', sans-serif; }
          
          html, body, * { 
            -ms-overflow-style: none;  
            scrollbar-width: none;  
          }
          
          body { overflow-x: hidden; } 
          
          *::-webkit-scrollbar {
            display: none !important;
          }
        `}
      </style>

      {showLoader && (
        <EntranceSequence 
          mainSiteRef={mainSiteRef} 
          onComplete={() => setShowLoader(false)} 
        />
      )}

      <div className="min-h-screen bg-black text-white font-custom font-light selection:bg-white selection:text-black antialiased relative flex flex-col justify-center">
        
        <div ref={mainSiteRef} className="w-full max-w-3xl mx-auto px-6 py-12 sm:px-12 will-change-transform">
          
          <header className="flex items-center gap-6 mb-16">
            <div 
              ref={profileRef}
              onMouseEnter={handleProfileEnter}
              onMouseLeave={handleProfileLeave}
              className="w-16 h-16 bg-black border-2 border-white overflow-hidden cursor-pointer relative group"
            >
              <img 
                src="/pfp.gif" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </div>
            
            <div>
              <h1 className="text-2xl font-bold tracking-wide uppercase">Void.</h1>
              <p className="text-xs tracking-widest mt-1">Welcome to my corner of the internet ❤️</p>
            </div>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mb-16">
            
            <section className="border-t-2 border-white pt-6">
              <span className="text-xs tracking-widest font-bold uppercase block mb-6">Profile</span>
              <div className="space-y-4 text-sm leading-relaxed">
                <p>25 years old · INFP · Somewhere in Asia.</p>
                <p>Connecting with people is hard.<br />I still enjoy talking and getting to know them.</p>
              </div>
            </section>

            <section className="border-t-2 border-white pt-6">
              <span className="text-xs tracking-widest font-bold uppercase block mb-6">Interests</span>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-4"><span className="font-bold">+</span> Playing games.</li>
                <li className="flex gap-4"><span className="font-bold">+</span> Traveling.</li>
                <li className="flex gap-4"><span className="font-bold">+</span> Spending time with cats.</li>
                <li className="flex gap-4"><span className="font-bold">+</span> Rain and nature.</li>
                <li className="flex gap-4"><span className="font-bold">+</span> Avoiding crowds and noise.</li>
              </ul>
            </section>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div className="border-2 border-white p-6 flex items-start gap-6 group hover:bg-white hover:text-black transition-colors cursor-default">
              <div ref={recordRef} className="shrink-0 mt-1">
                <Disc size={32} strokeWidth={1} className="text-white group-hover:text-black transition-colors" />
              </div>
              <div className="w-full">
                <span className="text-[10px] font-bold tracking-widest uppercase block mb-4">Favorites</span>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[10px] uppercase tracking-widest">Artist</span>
                    <span className="font-medium">Joji</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[10px] uppercase tracking-widest">Movie</span>
                    <span className="font-medium">Interstellar</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[10px] uppercase tracking-widest">Game</span>
                    <span className="font-medium">Dead by Daylight</span>
                  </div>
                </div>
              </div>
            </div>

            <div 
              onClick={handleCopy}
              className="border-2 border-white p-6 flex flex-col justify-center group hover:bg-white hover:text-black transition-colors cursor-pointer"
            >
              <span className="text-[10px] font-bold tracking-widest uppercase block mb-1">Contact</span>
              <span className="text-sm font-medium block">
                {copied ? "ID Copied." : "Copy Discord Username"}
              </span>
            </div>

          </div>
          
        </div>
      </div>
    </>
  );
}