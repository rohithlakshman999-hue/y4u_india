import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const linksRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    // ONLY run the scroll animation if we are exactly on the home page
    if (location.pathname !== '/') return;

    const stack = document.querySelector('.intro-stack');
    if (!stack || !linksRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stack,
          start: 'top top',
          end: '+=150%',
          scrub: 1,
        }
      });

      // Move to center near the Brand Reveal Shop Now button
      tl.to(linksRef.current, {
        top: '82vh', 
        right: '50vw',
        xPercent: 50,
        yPercent: -50,
        gap: '2.5rem',
        duration: 0.3,
        ease: 'power2.inOut'
      }, 0.1); 

      // Move back to top-right as we leave the intro stack
      tl.to(linksRef.current, {
        top: '2.75rem',
        right: '4rem',
        xPercent: 0,
        yPercent: -50,
        gap: '3rem',
        duration: 0.3,
        ease: 'power2.inOut'
      }, 0.7); 

    }, linksRef);

    // Cleanup reverts GSAP styles
    return () => {
      ctx.revert();
    };
  }, [location.pathname]);

  // Hide global navbar entirely on product detail pages (it has its own back bar)
  if (location.pathname.includes('/product/')) {
    return null;
  }

  const isHome = location.pathname === '/';

  return (
    <nav className={`${styles.navbar} ${!isHome ? styles.absoluteNav : ''}`}>
      <div className={styles.logoContainer}>
        <img src="/logo.png" alt="Y4U" className={styles.logoIcon} />
        <Link to="/" className={styles.logoText}>Y4U.</Link>
      </div>
      <div ref={linksRef} className={styles.links}>
        <Link to="/">HOME</Link>
        <Link to="/collections/men">COLLECTIONS</Link>
        <Link to="/#about">ABOUT US</Link>
        <Link to="/#contact">CONTACT US</Link>
      </div>
    </nav>
  );
}
