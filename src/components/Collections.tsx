import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Collections.module.css';

gsap.registerPlugin(ScrollTrigger);

const collections = [
  { id: 1, title: 'MEN', img: 'https://images.unsplash.com/photo-1520975954732-57dd22299614?q=80&w=1600&auto=format&fit=crop' },
  { id: 2, title: 'WOMEN', img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1600&auto=format&fit=crop' },
  { id: 3, title: 'FOOTWEAR', img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1600&auto=format&fit=crop' },
];

export default function Collections() {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      panelsRef.current.forEach((panel) => {
        if (!panel) return;
        const img = panel.querySelector(`.${styles.image}`);
        const title = panel.querySelector(`.${styles.title}`);

        // Image parallax
        gsap.to(img, {
          y: '20%',
          ease: 'none',
          scrollTrigger: {
            trigger: panel,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });

        // Title reveal
        gsap.from(title, {
          y: 100,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: panel,
            start: 'top 60%',
            end: 'bottom 80%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className={styles.collections}>
      {collections.map((collection, index) => (
        <div
          key={collection.id}
          ref={(el) => { panelsRef.current[index] = el; }}
          className={styles.panel}
        >
          <div className={styles.imageWrapper}>
            <img src={collection.img} alt={collection.title} className={styles.image} />
            <div className={styles.overlay}></div>
          </div>
          <div className={styles.content}>
            <h2 className={styles.title}>{collection.title}</h2>
            <button className={styles.exploreBtn}>EXPLORE COLLECTION</button>
          </div>
        </div>
      ))}
    </section>
  );
}
