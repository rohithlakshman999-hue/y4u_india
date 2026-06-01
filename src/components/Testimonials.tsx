import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Testimonials.module.css';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  { id: 1, name: 'Alex R.', text: '"The quality of the oversized hoodie is unmatched. It truly feels like a luxury piece."', role: 'Verified Buyer' },
  { id: 2, name: 'Sarah M.', text: '"Y4U INDIA sneakers are my go-to for both style and comfort. Incredible design!"', role: 'Fashion Blogger' },
  { id: 3, name: 'David K.', text: '"A brand that actually understands modern streetwear. The watch I bought is stunning."', role: 'Verified Buyer' },
  { id: 4, name: 'Priya S.', text: '"Obsessed with the new women\'s collection. The fit is perfect and the material is premium."', role: 'Stylist' },
  { id: 5, name: 'Rohan T.', text: '"Every piece feels like it has a story. Y4U INDIA is redefining the fashion game."', role: 'Verified Buyer' },
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!wrapperRef.current) return;

      // Duplicate content creates a seamless loop
      gsap.to(wrapperRef.current, {
        xPercent: -50,
        ease: 'none',
        duration: 30,
        repeat: -1,
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className={styles.testimonials}>
      <div className={styles.header}>
        <h2 className={styles.title}>COMMUNITY</h2>
        <p className={styles.subtitle}>HEAR THEIR STORIES</p>
      </div>

      <div className={styles.sliderContainer}>
        <div ref={wrapperRef} className={styles.wrapper}>
          {[...testimonials, ...testimonials].map((t, index) => (
            <div key={`${t.id}-${index}`} className={styles.card}>
              <p className={styles.text}>{t.text}</p>
              <div className={styles.author}>
                <h4 className={styles.name}>{t.name}</h4>
                <span className={styles.role}>{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
