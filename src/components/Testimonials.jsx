import React, { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: "Karthikeyan S.",
    role: "Software Engineer, Theni",
    text: "Muthukaruppaiya Mobiles is the best mobile shop in Theni! Got my Samsung Galaxy S24 Ultra at a great price. They installed tempered glass perfectly and transferred all my data. Super fast service!",
    image: "https://randomuser.me/api/portraits/men/44.jpg",
    rotation: 3
  },
  {
    id: 2,
    name: "Meenakshi R.",
    role: "Teacher, Periyakulam",
    text: "My Redmi phone screen cracked and they replaced it in just 45 minutes. Very affordable price compared to other shops. Staff is very polite and trustworthy. Highly recommended!",
    image: "https://randomuser.me/api/portraits/women/26.jpg",
    rotation: -2
  },
  {
    id: 3,
    name: "Muruganantham V.",
    role: "Business Owner, Uthamapalayam",
    text: "Bought original Type-C charger and a new back cover for my Vivo phone. Very good quality products at local rates. Also got my battery replaced — working like a brand new phone now!",
    image: "https://randomuser.me/api/portraits/men/36.jpg",
    rotation: 4
  },
  {
    id: 4,
    name: "Kavitha Devi",
    role: "College Student, Theni",
    text: "Ordered mobile cover and earphones via WhatsApp — delivery was super fast! Best shop for accessories in Theni. Tempered glass fitting was free! Will definitely come back again.",
    image: "https://randomuser.me/api/portraits/women/55.jpg",
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
