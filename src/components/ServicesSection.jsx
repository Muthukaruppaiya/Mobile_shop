import React from 'react';
import { Phone, Battery, Droplet, Code, ShoppingBag } from 'lucide-react';
import './ServicesSection.css';
const services = [
  {
    icon: <Phone size={24} />,
    title: 'Screen Repair',
    desc: 'Cracked or shattered screen replaced with OEM‑grade glass and a 30‑day warranty.',
    img: 'https://images.unsplash.com/photo-1587829741301-3ab433d450a9?auto=format&fit=crop&w=600&q=80',
  },
  {
    icon: <Battery size={24} />,
    title: 'Battery Replacement',
    desc: 'Fast swap using authentic cells, calibrated for optimal performance.',
    img: 'https://images.unsplash.com/photo-1588179091715-ac834b6c8790?auto=format&fit=crop&w=600&q=80',
  },
  {
    icon: <Droplet size={24} />,
    title: 'Water‑Damage Rescue',
    desc: 'Advanced drying & component cleaning to revive water‑exposed devices.',
    img: 'https://images.unsplash.com/photo-1526403220-7436365c56e6?auto=format&fit=crop&w=600&q=80',
  },
  {
    icon: <Code size={24} />,
    title: 'Software & Firmware',
    desc: 'OS updates, data migration, unlocking and custom ROM flashing.',
    img: 'https://images.unsplash.com/photo-1517430816045-df4b7de5c25c?auto=format&fit=crop&w=600&q=80',
  },
  {
    icon: <ShoppingBag size={24} />,
    title: 'Premium Accessories',
    desc: 'Custom cases, tempered glass and high‑quality earphones.',
    img: 'https://images.unsplash.com/photo-1583697261526-6f78b1b45c5f?auto=format&fit=crop&w=600&q=80',
  },
];


export default function ServicesSection() {
  const whatsappLink = 'https://api.whatsapp.com/send?phone=919876543210&text=I%20am%20interested%20in%20your%20services';
  return (
    <section id="services" className="services-section">
      <h2 className="section-title">Our Services</h2>
        <div className="services-grid">
          {services.map((svc, idx) => (
            <div key={idx} className="service-card" style={{ backgroundImage: `url(${svc.img})` }}>
              <div className="service-overlay" />
              <div className="service-content">
                <div className="service-icon">{svc.icon}</div>
                <h3 className="service-title">{svc.title}</h3>
                <p className="service-desc">{svc.desc}</p>
              </div>
            </div>
          ))}
        </div>
      <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="services-cta-btn">
        Book via WhatsApp
      </a>
    </section>
  );
}
