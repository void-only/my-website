import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import Lenis from 'lenis';
import { Disc, Film, Gamepad2 } from 'lucide-react';
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
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return;
      } catch (err) {}
    }

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
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
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

      {/* Global Background Video with WebM preference for seamless looping */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover -z-10 pointer-events-none"
      >
        <source src="/bg.webm" type="video/webm" />
        <source src="/bg.mp4" type="video/mp4" />
      </video>

      <div className="min-h-screen text-white font-custom font-light selection:bg-white selection:text-black antialiased relative flex flex-col justify-center">
        
        <div 
          ref={mainSiteRef} 
          className="w-full max-w-[720px] mx-auto px-5 py-12 md:py-24 will-change-transform relative z-10 bg-black shadow-[0_0_120px_80px_rgba(0,0,0,1)]"
        >
          
          <header className="flex items-center gap-6 mb-12 md:mb-16">
            <div 
              ref={profileRef}
              onMouseEnter={handleProfileEnter}
              onMouseLeave={handleProfileLeave}
              className="w-16 h-16 bg-black border-2 border-white overflow-hidden cursor-pointer relative group shrink-0"
            >
              <img 
                src="/pfp.gif" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </div>
            
            <div>
              <h1 className="text-[26px] sm:text-[28px] font-semibold tracking-wide uppercase text-white">Void.</h1>
              <p className="text-[12px] sm:text-[13px] font-light text-gray-300 mt-1">Welcome to my corner of the internet ❤️</p>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 mb-8 md:mb-10">
            
            <section className="border-t-2 border-white pt-6 break-words">
              <span className="text-[11px] sm:text-[12px] font-medium tracking-wider uppercase text-gray-400 block mb-6">Profile</span>
              <div className="space-y-4">
                <p className="text-[14px] sm:text-[15px] font-light text-gray-100">25 years old · INFP · Based in Asia.</p>
                <p className="text-[16px] sm:text-[17px] font-normal leading-relaxed text-white">
                  Connecting with people is hard.<br />I still enjoy talking and getting to know them.
                </p>
              </div>
            </section>

            <section className="border-t-2 border-white pt-6 break-words">
              <span className="text-[11px] sm:text-[12px] font-medium tracking-wider uppercase text-gray-400 block mb-6">Interests</span>
              <ul className="space-y-3 text-[14px] sm:text-[15px] font-light text-gray-100">
                <li className="flex gap-4"><span className="font-medium text-gray-400 shrink-0">+</span> Playing games.</li>
                <li className="flex gap-4"><span className="font-medium text-gray-400 shrink-0">+</span> Traveling.</li>
                <li className="flex gap-4"><span className="font-medium text-gray-400 shrink-0">+</span> Spending time with cats.</li>
                <li className="flex gap-4"><span className="font-medium text-gray-400 shrink-0">+</span> Rain and nature.</li>
                <li className="flex gap-4"><span className="font-medium text-gray-400 shrink-0">+</span> Avoiding crowds and noise.</li>
              </ul>
            </section>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 auto-rows-fr">
            
            <div className="h-full border border-white p-6 md:p-8 flex flex-col justify-between group hover:bg-white transition-colors duration-300 cursor-default min-h-[180px]">
              
              <div className="flex items-center gap-3 mb-8">
                {/* Media Icons Cluster */}
                <div className="flex items-center gap-2 text-white group-hover:text-black transition-colors shrink-0">
                  
                  {/* Rotating Record Player with Detail */}
                  <div ref={recordRef} className="relative w-[18px] h-[18px] flex items-center justify-center">
                    <Disc size={18} strokeWidth={1.5} className="absolute inset-0" />
                    {/* Small offset dot creates the visual rotation effect */}
                    <div className="absolute top-[4px] right-[4px] w-[2.5px] h-[2.5px] bg-current rounded-full"></div>
                  </div>
                  
                  <Film size={18} strokeWidth={1.5} />
                  <Gamepad2 size={18} strokeWidth={1.5} />
                </div>
                <span className="text-[11px] sm:text-[12px] font-medium tracking-wider uppercase text-gray-400 group-hover:text-gray-500 transition-colors pt-[2px]">Favorites</span>
              </div>
              
              <div className="space-y-3 w-full">
                <div className="flex justify-between items-baseline gap-4">
                  <span className="text-[10px] sm:text-[11px] font-medium tracking-wider uppercase text-gray-400 shrink-0 group-hover:text-gray-500 transition-colors">Artist</span>
                  <span className="text-[14px] sm:text-[15px] font-medium text-white group-hover:text-black transition-colors text-right leading-tight">Joji</span>
                </div>
                <div className="flex justify-between items-baseline gap-4">
                  <span className="text-[10px] sm:text-[11px] font-medium tracking-wider uppercase text-gray-400 shrink-0 group-hover:text-gray-500 transition-colors">Movie</span>
                  <span className="text-[14px] sm:text-[15px] font-medium text-white group-hover:text-black transition-colors text-right leading-tight break-words">Interstellar</span>
                </div>
                <div className="flex justify-between items-baseline gap-4">
                  <span className="text-[10px] sm:text-[11px] font-medium tracking-wider uppercase text-gray-400 shrink-0 group-hover:text-gray-500 transition-colors">Game</span>
                  <span className="text-[14px] sm:text-[15px] font-medium text-white group-hover:text-black transition-colors text-right leading-tight break-words">Dead by Daylight</span>
                </div>
              </div>
            </div>

            <div 
              onClick={handleCopy}
              className="h-full border border-white p-6 md:p-8 flex flex-col justify-between group hover:bg-white transition-colors duration-300 cursor-pointer min-h-[180px]"
            >
              <span className="text-[11px] sm:text-[12px] font-medium tracking-wider uppercase text-gray-400 group-hover:text-gray-500 transition-colors block">Contact</span>
              <span className="text-[14px] sm:text-[15px] font-medium text-white group-hover:text-black transition-colors block text-right mt-10">
                {copied ? "ID Copied." : "Copy Discord Username"}
              </span>
            </div>

          </div>
          
        </div>
      </div>
    </>
  );
}