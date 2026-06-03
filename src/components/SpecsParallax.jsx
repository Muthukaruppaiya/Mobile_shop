import React, { useState, useEffect, useRef } from 'react';

export default function SpecsParallax() {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        // Calculate how far the section has scrolled relative to view
        const scrolled = window.innerHeight - rect.top;
        if (scrolled > 0 && rect.bottom > 0) {
          setScrollY(scrolled);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Slide large background specs title on scroll
  const textTranslate = `translateX(${-200 + scrollY * 0.15}px) rotate(4.9deg)`;

  return (
    <section id="specs" ref={sectionRef} className="specs-section">
      {/* Dashed Grid Lines (White themed for dark background) */}
      <div className="grid-lines" aria-hidden="true">
        <span className="h-line h-top white-dash"></span>
        <span className="h-line h-mid white-dash"></span>
        <span className="h-line h-bottom white-dash"></span>
        <span className="v-line v-left white-dash"></span>
        <span className="v-line v-right white-dash"></span>

        {/* White Corner Alignment Brackets */}
        <span className="bracket bracket-tl white-bracket"></span>
        <span className="bracket bracket-bl white-bracket"></span>
        <span className="bracket bracket-tr white-bracket"></span>
        <span className="bracket bracket-br white-bracket"></span>
      </div>

      {/* Main backdrop text that slides on scroll */}
      <h2 className="specs-backdrop-title" style={{ transform: textTranslate }}>
        ULTRA SPEC
      </h2>

      <div className="specs-content-wrapper">
        {/* Left Side Content */}
        <div className="specs-left-content">
          <h3 className="specs-subtitle">Future-Proof Core</h3>
          <p className="specs-description">
            Experience mobile computing at the speed of light. Our curated catalog features devices packing neural engine processing, high-density batteries, and pro camera systems.
          </p>
          <span className="specs-badge">
            Explore 5G
          </span>
        </div>

        {/* Right Side Stats Grid */}
        <div className="specs-right-content">
          <div className="stat-card">
            <h4 className="stat-value">200M</h4>
            <p className="stat-label">Ultra-High Pixel Density <br />for microscopic clarity</p>
          </div>
          
          <div className="stat-card">
            <h4 className="stat-value">120Hz</h4>
            <p className="stat-label">AMOLED Refresh Rate <br />for butter-smooth scrolls</p>
          </div>

          <div className="stat-card">
            <h4 className="stat-value">100W</h4>
            <p className="stat-label">SuperVOOC flash charging <br />to 100% in 20 minutes</p>
          </div>
        </div>
      </div>
    </section>
  );
}
