import React, { useRef } from 'react';
import { Wrench, Zap, Shield, Smartphone, Cable, Wifi } from 'lucide-react';
import './ServicesSection.css';

const services = [
  {
    icon: <Wrench size={28} />,
    title: 'Mobile Repair',
    desc: 'Screen replacement, battery swap, speaker & mic fix — all brands serviced. Quick turnaround, warranty included.',
    img: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=600&q=80',
    alt: 'Mobile phone repair service in Theni',
    badge: 'Most Popular',
  },
  {
    icon: <Zap size={28} />,
    title: 'Charger & Adapter Sales',
    desc: 'Original & compatible chargers for all mobiles — Type-C, Micro USB, Lightning. Fast charging adapters available.',
    img: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80',
    alt: 'Mobile charger and adapter sales Theni',
    badge: null,
  },
  {
    icon: <Shield size={28} />,
    title: 'Tempered Glass',
    desc: 'Premium 9H hardness tempered glass for all models. Anti-scratch, anti-fingerprint — fitted on the spot.',
    img: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=600&q=80',
    alt: 'Tempered glass fitting Theni Periyakulam',
    badge: 'Free Fitting',
  },
  {
    icon: <Smartphone size={28} />,
    title: 'Mobile Cases & Covers',
    desc: 'Stylish back covers, silicone cases, flip covers & designer cases for iPhone, Samsung, Redmi, Vivo & more.',
    img: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=600&q=80',
    alt: 'Mobile cases and covers Theni',
    badge: null,
  },
  {
    icon: <Cable size={28} />,
    title: 'Cables & Accessories',
    desc: 'Data cables, OTG adapters, earphones, Bluetooth speakers & powerbanks — top brands at best prices.',
    img: 'https://images.unsplash.com/photo-1618410320928-25228d811631?auto=format&fit=crop&w=600&q=80',
    alt: 'Mobile cables and accessories Theni',
    badge: null,
  },
  {
    icon: <Wifi size={28} />,
    title: 'SIM & Network Help',
    desc: 'New SIM activation, port assistance, network unlocking & data plan guidance for Jio, Airtel, Vi & BSNL.',
    img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80',
    alt: 'SIM card activation Theni Jio Airtel',
    badge: null,
  },
];

/* ── 3-D tilt on mouse move ── */
function TiltCard({ children, className }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04,1.04,1.04)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
  };

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

export default function ServicesSection() {
  const whatsappLink = 'https://api.whatsapp.com/send?phone=919876543210&text=I%20am%20interested%20in%20your%20services';

  return (
    <section
      id="services"
      className="services-section"
      aria-label="Mobile shop services in Theni and Periyakulam"
    >
      {/* SEO-friendly heading hierarchy */}
      <div className="services-header">
        <span className="services-eyebrow">What We Offer</span>
        <h2 className="section-title">Our Services</h2>
        <p className="services-subtitle">
          Trusted mobile repair & accessories shop in <strong>Theni</strong>, <strong>Periyakulam</strong> &amp; <strong>Uthamapalayam</strong>
        </p>
      </div>

      <div className="services-grid" role="list">
        {services.map((svc, idx) => (
          <TiltCard key={idx} className="service-card" role="listitem">
            {/* Shine sweep layer */}
            <div className="service-shine" aria-hidden="true" />

            <img
              src={svc.img}
              alt={svc.alt}
              className="service-card-img"
              loading="lazy"
              width="600"
              height="340"
            />
            <div className="service-overlay" aria-hidden="true" />

            {/* Badge */}
            {svc.badge && (
              <span className="service-badge">{svc.badge}</span>
            )}

            <div className="service-content">
              <div className="service-icon" aria-hidden="true">{svc.icon}</div>
              <h3 className="service-title">{svc.title}</h3>
              <p className="service-desc">{svc.desc}</p>
            </div>

            {/* 3-D floating bottom edge shadow */}
            <div className="card-bottom-glow" aria-hidden="true" />
          </TiltCard>
        ))}
      </div>

      <div className="services-cta-wrapper">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="services-cta-btn"
          aria-label="Book mobile service via WhatsApp"
        >
          📲 Book via WhatsApp
        </a>
      </div>
    </section>
  );
}
