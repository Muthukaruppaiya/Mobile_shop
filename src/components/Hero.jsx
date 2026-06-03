import React, { useState, useEffect } from 'react';

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      // Calculate normalized mouse coordinates from -0.5 to 0.5
      const x = (e.clientX / innerWidth) - 0.5;
      const y = (e.clientY / innerHeight) - 0.5;
      setMousePos({ x, y });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Title translations for scroll-based parallax
  const leftTitleTransform = `translateX(${scrollY * 0.1}px)`;
  const rightTitleTransform = `translateX(${-scrollY * 0.1}px)`;

  // Phone transform for mouse-based 3D tilt
  const phoneTransform = `perspective(1000px) rotateY(${mousePos.x * 25}deg) rotateX(${mousePos.y * -25}deg) translateZ(50px)`;
  // Reflection shift based on mouse move
  const reflectionStyle = {
    transform: `translate(${mousePos.x * 120}px, ${mousePos.y * 120}px)`,
    opacity: 0.15 + Math.abs(mousePos.x) * 0.2
  };

  // Shadow shift to simulate light source
  const shadowTransform = `scale(${1 - Math.abs(mousePos.y) * 0.05}) translate(${mousePos.x * -15}px, ${mousePos.y * -10}px)`;

  // Spec badges shift (Reverse parallax for depth)
  const badgeParallax = (multiplier) => ({
    transform: `translate(${mousePos.x * -multiplier}px, ${mousePos.y * -multiplier}px)`
  });

  return (
    <section id="home" className="hero-section">
      {/* Dashed Grid Overlay */}
      <div className="grid-lines" aria-hidden="true">
        <span className="h-line h-top"></span>
        <span className="h-line h-mid"></span>
        <span className="h-line h-bottom"></span>
        <span className="v-line v-left"></span>
        <span className="v-line v-right"></span>
        
        {/* Corner Alignment Brackets */}
        <span className="bracket bracket-tl"></span>
        <span className="bracket bracket-bl"></span>
        <span className="bracket bracket-tr"></span>
        <span className="bracket bracket-br"></span>
      </div>

      {/* Main Title Backdrop Overlap */}
      <div className="hero-title-block">
        <div className="titles-wrapper">
          <h1 className="title-left" style={{ transform: leftTitleTransform }}>
            DEFINE
          </h1>
          <h1 className="title-right" style={{ transform: rightTitleTransform }}>
            MOMENTS
          </h1>
        </div>

        {/* 3D Interactive Phone Showcase */}
        <div className="hero-phone-showcase">
          <div className="phone-tilt-wrapper" style={{ transform: phoneTransform }}>
            <img 
              src="/hero_phone.png" 
              alt="Sri Mobiles Flagship Phone" 
              className="hero-phone-img" 
            />
            {/* Glossy glare cover */}
            <div className="phone-reflection" style={reflectionStyle}></div>
          </div>
          {/* Dynamic 3D Shadow */}
          <div className="phone-shadow" style={{ transform: shadowTransform }}></div>
        </div>
      </div>

      {/* Floating Specs Badges (Mouse Parallax) */}
      <div className="floating-badge badge-1" style={badgeParallax(35)}>
        <span>Titanium Gold</span>
      </div>
      <div className="floating-badge badge-2" style={badgeParallax(50)}>
        <span>120Hz AMOLED</span>
      </div>
      <div className="floating-badge badge-3" style={badgeParallax(25)}>
        <span>Theni's Best Shop</span>
      </div>
      <div className="floating-badge badge-4" style={badgeParallax(45)}>
        <span>A17 Pro SoC</span>
      </div>

      {/* Bottom Content Row */}
      <div className="hero-bottom-row">
        <div className="hero-left-content">
          <p className="hero-description">
            Discover the art of premium mobiles at <strong>Sri Mobiles</strong>.<br />
            Every device in our boutique tells a story of craftsmanship. Elevate your vision with flagship smartphones, premium repair services, and custom accessories in Periyakulam, Theni.
          </p>
          <a href="#products" className="shop-cta-btn">
            Explore Flagships
          </a>
        </div>
        <p className="hero-side-note">
          Serving Periyakulam &<br />
          Theni district since 2012.<br />
          Trusted by 15,000+ Customers.
        </p>
      </div>

      {/* Circle Badge decoration */}
      <div className="hero-circle-badge">
        <span className="hero-circle-text">
          PREMIUM <br /> MOBILES
        </span>
      </div>
    </section>
  );
}
