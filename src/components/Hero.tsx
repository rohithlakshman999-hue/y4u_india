import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Hero.module.css';

gsap.registerPlugin(ScrollTrigger);

const gridImages = [
  'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=600&auto=format&fit=crop',
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a timeline that pins the container
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=150%',
          scrub: 1,
        },
      });

      // Zoom in the grid heavily and fade it out
      tl.to(gridRef.current, {
        scale: 4,
        opacity: 0,
        ease: 'power1.inOut',
        duration: 1,
      }, 0);

      // Fade and scale up the text slightly
      tl.to(textRef.current, {
        scale: 1.2,
        opacity: 0,
        y: -50,
        ease: 'power1.inOut',
        duration: 1,
      }, 0);

      // Fade the entire hero container to reveal BrandReveal underneath
      tl.to(containerRef.current, {
        opacity: 0,
        ease: 'power2.inOut',
        duration: 0.8,
      }, 0.2);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className={styles.hero}>
      <div className={styles.perspectiveContainer}>
        <div ref={gridRef} className={styles.grid}>
          {gridImages.map((src, index) => (
            <div key={index} className={styles.card}>
              <img src={src} alt="Product" className={styles.image} />
            </div>
          ))}
        </div>
      </div>
      
      <div ref={textRef} className={styles.content}>
        <h1 className={styles.title}>Y4U INDIA</h1>
        <p className={styles.subtitle}>~ WEAR UR STORY ~</p>
      </div>
    </section>
  );
}
