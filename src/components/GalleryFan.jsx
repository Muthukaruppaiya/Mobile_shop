import React, { useState, useEffect, useRef } from 'react';

const GALLERY_CARDS = [
  { id: 1, image: '/gallery_shop.png', x: -330, y: -200, r: -15, scale: 0.95, delay: 0 },
  { id: 2, image: '/gallery_hills.png', x: 330, y: -180, r: 12, scale: 1.0, delay: 0.1 },
  { id: 3, image: '/gallery_customer.png', x: -350, y: 150, r: -8, scale: 1.05, delay: 0.2 },
  { id: 4, image: '/gallery_camera.png', x: 350, y: 170, r: 18, scale: 0.9, delay: 0.3 },
  { id: 5, image: '/gallery_shop.png', x: -160, y: -280, r: -22, scale: 0.9, delay: 0.4 },
  { id: 6, image: '/gallery_hills.png', x: 160, y: -260, r: 15, scale: 0.95, delay: 0.5 },
  { id: 7, image: '/gallery_customer.png', x: -150, y: 300, r: -5, scale: 1.0, delay: 0.6 },
  { id: 8, image: '/gallery_camera.png', x: 150, y: 320, r: 10, scale: 1.05, delay: 0.7 }
];

export default function GalleryFan() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionHeight = rect.height;
        // Start fanning when top of section is 40% up the viewport
        const startOffset = window.innerHeight * 0.8;
        const totalTravel = sectionHeight + startOffset;
        const currentProgress = (startOffset - rect.top) / totalTravel;
        
        // Clamp between 0 and 1
        const clamped = Math.max(0, Math.min(1, currentProgress));
        
        // Ease the progress slightly for smoother animation
        const eased = Math.sin((clamped * Math.PI) / 2);
        setScrollProgress(eased);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger initially

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="gallery" ref={sectionRef} className="gallery-section">
      {/* Dashed Grid Overlay */}
      <div className="grid-lines" aria-hidden="true">
        <span className="h-line h-top"></span>
        <span className="h-line h-mid"></span>
        <span className="h-line h-bottom"></span>
        <span className="v-line v-left"></span>
        <span className="v-line v-right"></span>
      </div>

      {/* Title & Description Container */}
      <div className="gallery-header-row">
        <div className="gallery-left-info">
          <h2 className="gallery-title">
            Where Every Click<br />Becomes a Memory
          </h2>
        </div>
        <div className="gallery-right-info">
          <p className="gallery-description">
            Capture life's most precious snapshots in high-definition. From the scenic views of Periyakulam valley to warm family unboxings, our mobile cameras help preserve what matters.
          </p>
          <div className="gallery-circle-badge">
            <span className="gallery-badge-text">
              PRESERVE YOUR <br /> MEMORIES
            </span>
          </div>
        </div>
      </div>

      {/* 3D Fanning Cards Display Area */}
      <div className="gallery-display-viewport">
        {/* Gallery Cards (Stacked behind, fans out on scroll) */}
        <div className="gallery-cards-container">
          {GALLERY_CARDS.map((card) => {
            // Apply scale reduction on mobile to fit screen
            const isMobile = window.innerWidth <= 768;
            const multX = isMobile ? 0.4 : 1;
            const multY = isMobile ? 0.35 : 1;

            const xPos = card.x * scrollProgress * multX;
            const yPos = card.y * scrollProgress * multY;
            const rot = card.r * scrollProgress;
            const scl = 1 + (card.scale - 1) * scrollProgress;
            
            const cardStyle = {
              transform: `translate(calc(-50% + ${xPos}px), calc(-50% + ${yPos}px)) rotate(${rot}deg) scale(${scl})`,
              opacity: Math.max(0.1, scrollProgress * 1.5 - card.delay),
              zIndex: card.id + 10
            };

            return (
              <div key={card.id} className="gallery-card-box" style={cardStyle}>
                <img src={card.image} alt={`Gallery frame ${card.id}`} />
              </div>
            );
          })}

          {/* Floating Center Phone (Sits above the cards) */}
          <div className="gallery-center-phone">
            <img src="/hero_phone.png" alt="Floating flagship smartphone" />
          </div>
        </div>
      </div>
    </section>
  );
}
