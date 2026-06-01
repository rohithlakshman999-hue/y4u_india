import { useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import Hero from './components/Hero';
import BrandReveal from './components/BrandReveal';
import ProductShowcase from './components/ProductShowcase';
import Collections from './components/Collections';
import AboutBrand from './components/AboutBrand';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import MenCollection from './components/MenCollection';
import ProductDetail from './components/ProductDetail';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    } as any);

    lenis.on('scroll', ScrollTrigger.update);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: stackRef.current,
        start: 'top top',
        end: '+=150%',
        pin: true,
      });
    }, stackRef);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(update);
      ctx.revert();
    };
  }, []);

  return (
    <div className="app-container">
      <div ref={stackRef} className="intro-stack">
        <div className="intro-layer intro-brand">
          <BrandReveal />
        </div>
        <div className="intro-layer intro-hero">
          <Hero />
        </div>
      </div>
      <ProductShowcase />
      <Collections />
      <AboutBrand />
      <Testimonials />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/collections/men" element={<MenCollection />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </>
  );
}

export default App;
