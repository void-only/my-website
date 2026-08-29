import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function EntranceSequence({ onComplete, mainSiteRef }) {
  const containerRef = useRef(null);
  const leftDoorRef = useRef(null);
  const rightDoorRef = useRef(null);
  const lineRef = useRef(null);
  const leftEdgeRef = useRef(null);
  const rightEdgeRef = useRef(null);

  useEffect(() => {
    if (mainSiteRef.current) {
      gsap.set(mainSiteRef.current, { scale: 0.9, opacity: 0.5, filter: "blur(4px)" });
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(onComplete, 100);
      }
    });

    tl.to(lineRef.current, {
      width: "120px", 
      duration: 0.7,
      ease: "power3.inOut"
    })
    .to(lineRef.current, {
      rotation: 90, 
      duration: 0.6,
      ease: "back.out(1.5)"
    })
    .to(lineRef.current, {
      width: "120vh", 
      duration: 0.6,
      ease: "expo.inOut"
    }, "+=0.1")
    
    .set(lineRef.current, { opacity: 0 })
    .set([leftEdgeRef.current, rightEdgeRef.current], { opacity: 1 })
    
    .to(leftDoorRef.current, {
      xPercent: -100, 
      duration: 1.2,
      ease: "power4.inOut"
    })
    .to(rightDoorRef.current, {
      xPercent: 100, 
      duration: 1.2,
      ease: "power4.inOut"
    }, "<")
    
    .to(mainSiteRef.current, {
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power4.inOut"
    }, "<") 

    .to([leftEdgeRef.current, rightEdgeRef.current], {
      opacity: 0,
      duration: 0.4,
      ease: "power2.out"
    }, "-=0.6");

    return () => tl.kill();
  }, [onComplete, mainSiteRef]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 flex overflow-hidden pointer-events-none">
      <div ref={leftDoorRef} className="w-1/2 h-full bg-black will-change-transform flex justify-end">
        <div ref={leftEdgeRef} className="w-[1px] h-full bg-white opacity-0 will-change-transform" />
      </div>
      
      <div ref={rightDoorRef} className="w-1/2 h-full bg-black will-change-transform flex justify-start">
        <div ref={rightEdgeRef} className="w-[1px] h-full bg-white opacity-0 will-change-transform" />
      </div>
      
      <div ref={lineRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[2px] w-[0px] bg-white will-change-transform" />
    </div>
  );
}