import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './BrandReveal.module.css';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function BrandReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftImgRef  = useRef<HTMLDivElement>(null);
  const rightImgRef = useRef<HTMLDivElement>(null);
  const centerRef   = useRef<HTMLDivElement>(null);
  const textRef     = useRef<HTMLDivElement>(null);
  const svgRef      = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── 1. Spin SVG circle continuously ── */
      gsap.to(svgRef.current, {
        rotation: 360,
        duration: 25,
        repeat: -1,
        ease: 'linear',
        transformOrigin: '50% 50%',
      });

      /* ── 2. Entrance animations (on load / when section enters viewport) ── */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Left image slides in from left
      tl.fromTo(leftImgRef.current,
        { x: -80, opacity: 0 },
        { x: 0,   opacity: 1, duration: 1.2 },
        0
      );
      // Right image slides in from right
      tl.fromTo(rightImgRef.current,
        { x: 80,  opacity: 0 },
        { x: 0,   opacity: 1, duration: 1.2 },
        0
      );
      // Center text staggers up
      const spans = textRef.current?.querySelectorAll('span') ?? [];
      tl.fromTo(spans,
        { y: 60, opacity: 0, filter: 'blur(12px)' },
        { y: 0,  opacity: 1, filter: 'blur(0px)', stagger: 0.12, duration: 0.9 },
        0.2
      );
      // Categories + CTA
      tl.fromTo('.br-sub',
        { y: 20, opacity: 0 },
        { y: 0,  opacity: 1, stagger: 0.15, duration: 0.7 },
        0.7
      );

      /* ── 3. Scroll-linked parallax ── */
      gsap.to(leftImgRef.current, {
        y: 60,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=150%',
          scrub: 1.2,
        }
      });
      gsap.to(rightImgRef.current, {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=150%',
          scrub: 1.2,
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.brandReveal}>

      {/* ── Left fashion image ── */}
      <div ref={leftImgRef} className={styles.sidePanel}>
        <img
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=960&auto=format&fit=crop"
          alt="Women's fashion"
          className={styles.sideImg}
        />
        <div className={styles.sideFade} />
      </div>

      {/* ── Centre: spinning circle + text ── */}
      <div ref={centerRef} className={styles.center}>

        {/* SVG spinning ring */}
        <svg
          ref={svgRef}
          className={styles.ring}
          viewBox="0 0 200 200"
          fill="none"
        >
          <circle
            cx="100" cy="100" r="94"
            stroke="currentColor" strokeWidth="2"
            strokeDasharray="6 10"
          />
          <circle
            cx="100" cy="100" r="80"
            stroke="currentColor" strokeWidth="0.8"
            strokeDasharray="40 15"
            opacity="0.45"
          />
        </svg>

        {/* Text block */}
        <div ref={textRef} className={styles.textBlock}>
          <h2 className={styles.headline}>
            <span className={styles.line1}>Y4U.</span>
            <span className={styles.line2}>STYLE.</span>
            <span className={styles.line3}>YOU.</span>
          </h2>
          <p className={`${styles.categories} br-sub`}>
            T-SHIRTS&nbsp;&nbsp;|&nbsp;&nbsp;HOODIES&nbsp;&nbsp;|&nbsp;&nbsp;BOTTOMS&nbsp;&nbsp;|&nbsp;&nbsp;OUTERWEAR
          </p>
          <Link
            to="/collections/men"
            className={`${styles.cta} br-sub`}
          >
            SHOP NOW <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* ── Right fashion image ── */}
      <div ref={rightImgRef} className={styles.sidePanel}>
        <img
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=960&auto=format&fit=crop"
          alt="Men's fashion"
          className={styles.sideImg}
        />
        <div className={`${styles.sideFade} ${styles.sideFadeRight}`} />
      </div>

    </section>
  );
}
