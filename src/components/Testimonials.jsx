import React, { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Tech Enthusiast, Theni",
    text: "Muthukaruppaiya Mobiles has the best customer service in Theni! Bought my iPhone 15 Pro Max here, and they helped set up all my apps and transfer data instantly. Delivery was so fast!",
    image: "https://i.pravatar.cc/300?img=49",
    rotation: 3
  },
  {
    id: 2,
    name: "Ramanathan K.",
    role: "Business Owner, Periyakulam",
    text: "Excellent repair service. My screen was shattered, and they replaced it with a premium AMOLED display in under an hour. Highly recommended in Periyakulam!",
    image: "https://i.pravatar.cc/300?img=11",
    rotation: -2
  },
  {
    id: 3,
    name: "Priya Dharshini",
    role: "College Student, Theni",
    text: "The 3D gallery display on this site is amazing, and shopping was so smooth! Ordered a OnePlus 12 via WhatsApp, and got it delivered right to my hostel. Genuine products at local rates.",
    image: "https://i.pravatar.cc/300?img=32",
    rotation: 4
  },
  {
    id: 4,
    name: "David Martinez",
    role: "Pro Photographer",
    text: "Stunning camera lens details on their showcase. Muthukaruppaiya Mobiles has the best flagship collections and camera accessories in the district. Their service is truly professional.",
    image: "https://i.pravatar.cc/300?img=60",
    rotation: -3
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const activeReview = REVIEWS[activeIndex];

  return (
    <section id="testimonials" className="testimonials-section">
      {/* Dashed Grid Overlay */}
      <div className="grid-lines" aria-hidden="true">
        <span className="h-line h-top"></span>
        <span className="h-line h-mid"></span>
        <span className="h-line h-bottom"></span>
        <span className="v-line v-left"></span>
        <span className="v-line v-right"></span>
      </div>

      {/* Overlapping quotes */}
      <Quote className="quote-icon-tl" size={60} color="rgba(47, 36, 32, 0.1)" />
      <Quote className="quote-icon-br" size={60} color="rgba(47, 36, 32, 0.1)" />

      <div className="testimonials-container">
        {/* Left Side: Interactive Stacked Photo Deck */}
        <div className="testimonials-deck-wrapper">
          <div className="photo-deck">
            {REVIEWS.map((review, idx) => {
              // Calculate stacked offsets: active goes on top, others stack below
              const isActive = idx === activeIndex;
              // How far this review is from active review in stack
              const offset = (idx - activeIndex + REVIEWS.length) % REVIEWS.length;
              
              const deckStyle = {
                transform: `rotate(${review.rotation}deg) translate(${offset * 12}px, ${offset * -10}px)`,
                zIndex: REVIEWS.length - offset,
                opacity: isActive ? 1 : 0.8 - offset * 0.15
              };

              return (
                <div 
                  key={review.id} 
                  className={`deck-photo-frame ${isActive ? 'active' : ''}`}
                  style={deckStyle}
                  onClick={() => setActiveIndex(idx)}
                >
                  <img src={review.image} alt={review.name} />
                  <div className="photo-label">
                    <span className="label-name">{review.name}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Active Testimonial Details */}
        <div className="testimonials-content-panel">
          <div className="quote-text-container">
            <p className="quote-text">
              "{activeReview.text}"
            </p>
          </div>
          
          <div className="reviewer-info">
            <h4 className="reviewer-name">{activeReview.name}</h4>
            <p className="reviewer-role">{activeReview.role}</p>
          </div>

          {/* Slider dots */}
          <div className="slider-dots">
            {REVIEWS.map((_, idx) => (
              <button
                key={idx}
                className={`dot ${idx === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
