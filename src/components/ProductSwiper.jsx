import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ChevronLeft, ChevronRight, ShoppingCart, Star } from 'lucide-react';

export default function ProductSwiper() {
  const { products, addToCart } = useCart();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  const activeProduct = products[activeIndex];

  const handleNext = () => {
    if (isSliding) return;
    setIsSliding(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
      setIsSliding(false);
    }, 400); // match transition speed
  };

  const handlePrev = () => {
    if (isSliding) return;
    setIsSliding(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
      setIsSliding(false);
    }, 400);
  };

  return (
    <section id="products" className="products-section">
      {/* Dashed Grid Overlay (White themed) */}
      <div className="grid-lines" aria-hidden="true">
        <span className="h-line h-top white-dash"></span>
        <span className="h-line h-mid white-dash"></span>
        <span className="h-line h-bottom white-dash"></span>
        <span className="v-line v-left white-dash"></span>
        <span className="v-line v-right white-dash"></span>
      </div>

      {/* Large Backdrop Brand text */}
      <h2 className="products-backdrop-title">
        COLLECTION
      </h2>

      {/* Main Grid: Info Counterpart & Swiper Spotlight */}
      <div className="products-container">
        {/* Left Side: Spotlight specifications */}
        <div className="product-details-panel">
          <span className="product-brand">{activeProduct.brand}</span>
          <h3 className="product-name">{activeProduct.name}</h3>
          
          <div className="rating-row">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="#faf9f5" color="#faf9f5" />
              ))}
            </div>
            <span>{activeProduct.rating} ({activeProduct.reviews} reviews)</span>
          </div>

          <p className="product-desc">{activeProduct.description}</p>

          <div className="specs-table">
            <div className="spec-row">
              <span className="spec-name">Screen</span>
              <span className="spec-value">{activeProduct.specs.display}</span>
            </div>
            <div className="spec-row">
              <span className="spec-name">Processor</span>
              <span className="spec-value">{activeProduct.specs.processor}</span>
            </div>
            <div className="spec-row">
              <span className="spec-name">Camera</span>
              <span className="spec-value">{activeProduct.specs.camera}</span>
            </div>
            <div className="spec-row">
              <span className="spec-name">Battery</span>
              <span className="spec-value">{activeProduct.specs.battery}</span>
            </div>
            <div className="spec-row">
              <span className="spec-name">Memory</span>
              <span className="spec-value">{activeProduct.specs.memory}</span>
            </div>
            <div className="spec-row">
              <span className="spec-name">Finish</span>
              <span className="spec-value">{activeProduct.specs.color}</span>
            </div>
          </div>

          <div className="action-row">
            <span className="product-price">₹{activeProduct.price.toLocaleString('en-IN')}</span>
            <button className="add-to-cart-btn" onClick={() => addToCart(activeProduct)}>
              <ShoppingCart size={16} />
              Add To Cart
            </button>
          </div>
        </div>

        {/* Right Side: 3D Animated Product Spotlight */}
        <div className="product-slider-spotlight">
          {/* Custom navigation arrows */}
          <button className="slider-nav-btn prev-btn" onClick={handlePrev} aria-label="Previous product">
            <ChevronLeft size={24} />
          </button>
          
          {/* Swiper Visual Area */}
          <div className="spotlight-frame">
            <div className={`spotlight-phone-container ${isSliding ? 'sliding' : ''} ${activeIndex % 2 === 0 ? 'tilt-left' : 'tilt-right'}`}>
              <img src={activeProduct.image} alt={activeProduct.name} className="spotlight-phone-img" />
              <div className="spotlight-phone-shadow"></div>
            </div>
          </div>

          <button className="slider-nav-btn next-btn" onClick={handleNext} aria-label="Next product">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Decorative Side Column details */}
      <div className="products-side-content">
        <h4 className="side-title">Premium Flagships</h4>
        <div className="avatars-group">
          <img src="https://i.pravatar.cc/150?img=33" alt="Client 1" className="avatar-small" />
          <img src="https://i.pravatar.cc/150?img=12" alt="Client 2" className="avatar-small" />
          <img src="https://i.pravatar.cc/150?img=47" alt="Client 3" className="avatar-small" />
          <span className="avatars-count">Trusted by 10,000+ tech lovers</span>
        </div>
      </div>

      <span className="explore-badge">EXPLORE</span>
    </section>
  );
}
