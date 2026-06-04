import React from 'react';
import { MapPin, Phone, Clock, Send, MessageCircle, Info } from 'lucide-react';

export default function Footer() {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing to our catalog updates!');
  };

  return (
    <footer id="contact" className="footer-section">
      {/* Decorative rotated top cap */}
      <div className="footer-cap-divider"></div>

      <div className="footer-top-row">
        {/* Card 1: Location */}
        <div className="contact-card">
          <div className="card-icon">
            <MapPin size={18} />
          </div>
          <div className="card-info">
            <h5>Visit Our Store</h5>
            <p>Near Main Bus Stand, Periyakulam, Theni - 625601</p>
          </div>
        </div>

        {/* Card 2: Phone */}
        <div className="contact-card">
          <div className="card-icon">
            <Phone size={18} />
          </div>
          <div className="card-info">
            <h5>Call / Chat Us</h5>
            <p>+91 98765 43210 <br /> +91 90123 45678</p>
          </div>
        </div>

        {/* Card 3: Timings */}
        <div className="contact-card">
          <div className="card-icon">
            <Clock size={18} />
          </div>
          <div className="card-info">
            <h5>Shop Timings</h5>
            <p>Daily: 9:00 AM - 9:00 PM <br /> Sundays Open</p>
          </div>
        </div>
      </div>

      <div className="footer-main-grid">
        {/* Col 1: Brand & Desc */}
        <div className="footer-brand-col">
          <h3 className="footer-logo">Sri Mobiles</h3>
          <p className="footer-desc">
            Discover the art of premium mobiles at <strong>Sri Mobiles</strong>.<br />verified flagship devices, luxury covers, screen protectors, and certified repair diagnostics with precision tools.
          </p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle size={18} /></a>
          </div>
        </div>

        {/* Col 2: High-fidelity Vector Map (Custom Styled instead of standard dark/blue iframe) */}
        <div className="footer-map-col">
          <div className="map-panel">
            <div className="map-header">
              <Info size={12} color="#eceae0" style={{ marginRight: '4px' }} />
              <span>Boutique Location Map</span>
            </div>

            {/* SVG Vector Map */}
            <div className="vector-map-container">
              <svg viewBox="0 0 300 160" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                {/* Background layout */}
                <rect width="300" height="160" rx="6" fill="#2f2420" />

                {/* Street Lines */}
                <path d="M 0,40 L 300,40" stroke="#4a3b34" strokeWidth="12" fill="none" />
                <path d="M 160,0 L 160,160" stroke="#4a3b34" strokeWidth="12" fill="none" />
                <path d="M 0,120 C 100,120 180,80 300,80" stroke="#4a3b34" strokeWidth="8" fill="none" />

                {/* Street Labels */}
                <text x="20" y="32" fill="#bc704f" fontSize="7" fontWeight="bold">THENI ROAD</text>
                <text x="170" y="145" fill="#bc704f" fontSize="7" fontWeight="bold">MADURAI HIGHWAY</text>

                {/* Landmark 1: Bus Stand */}
                <rect x="30" y="65" width="60" height="30" rx="3" fill="#3d3029" />
                <text x="36" y="83" fill="#eceae0" fontSize="7" fontWeight="800">BUS STAND</text>

                {/* Store Pin (Glowing Rust) */}
                <circle cx="160" cy="80" r="16" fill="rgba(189, 110, 64, 0.25)" />
                <circle cx="160" cy="80" r="8" fill="#bd6e40" />
                <circle cx="160" cy="80" r="3" fill="#faf9f5" />

                {/* Store Label */}
                <rect x="180" y="68" width="100" height="24" rx="4" fill="#bd6e40" />
                <text x="186" y="79" fill="#faf9f5" fontSize="6.5" fontWeight="900">Sri Mobiles</text>
                <text x="186" y="87" fill="#faf9f5" fontSize="5.5" fontWeight="500">Mobiles (We are here!)</text>

                {/* Compass */}
                <circle cx="280" cy="20" r="8" fill="none" stroke="#6b7280" strokeWidth="1" />
                <path d="M 280,14 L 282,20 L 280,26 L 278,20 Z" fill="#bd6e40" />
                <text x="278" y="11" fill="#6b7280" fontSize="5" fontWeight="bold">N</text>
              </svg>
            </div>
          </div>
        </div>

        {/* Col 3: Services */}
        <div className="footer-links-col">
          <h4>Services</h4>
          <ul>
            <li>Display & Screen Replacement</li>
            <li>Original Battery Replacement</li>
            <li>Water Damage Recovery</li>
            <li>Premium Accessories & Cases</li>
            <li>Software Flashing & Unlocking</li>
          </ul>
        </div>

        {/* Col 4: Newsletter */}
        <div className="footer-newsletter-col">
          <h4>Catalogue Updates</h4>
          <p>Subscribe to receive price drops, trade-in rates, and news on new flagship arrivals.</p>
          <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
            <input type="email" placeholder="Your Email Address" required />
            <button type="submit" aria-label="Subscribe">
              <Send size={14} />
            </button>
          </form>
        </div>
      </div>

      {/* Gigantic bottom brand header */}
      <div className="footer-brand-backdrop">
        <h2 className="footer-brand-title">PERIYAKULAM</h2>
      </div>
      <div className="footer-dev-credit">Developed by Gypsy Coder</div>
    </footer>
  );
}
