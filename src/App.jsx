import React from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import ServicesSection from './components/ServicesSection';
import Hero from './components/Hero';
import SpecsParallax from './components/SpecsParallax';
import GalleryFan from './components/GalleryFan';
import ProductSwiper from './components/ProductSwiper';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  return (
    <CartProvider>
      <Navbar />
      <Hero />
      <ServicesSection />
      <SpecsParallax />
      <GalleryFan />
      <ProductSwiper />
      <Testimonials />
      <Footer />
    </CartProvider>
  );
}
