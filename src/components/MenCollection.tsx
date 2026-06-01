import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './MenCollection.module.css';
import { ArrowRight } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Heritage Oversized Tee',
    price: '₹1,299',
    originalPrice: '₹1,799',
    category: 'T-Shirts',
    sub: 'CLASSIC STREETWEAR',
    img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop',
    badge: 'BESTSELLER',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Relaxed oversized silhouette in premium 100% cotton. A wardrobe essential.',
    material: '100% Cotton',
    fit: 'Oversized',
  },
  {
    id: 2,
    name: 'Raw Edge Graphic Tee',
    price: '₹999',
    originalPrice: '',
    category: 'T-Shirts',
    sub: 'BOLD STATEMENT',
    img: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop',
    badge: 'NEW',
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Bold graphic print with raw-edge detailing. Statement streetwear at its finest.',
    material: '100% Cotton',
    fit: 'Regular',
  },
  {
    id: 3,
    name: 'Premium Cargo Jogger',
    price: '₹2,499',
    originalPrice: '₹3,199',
    category: 'Bottoms',
    sub: 'UTILITY SERIES',
    img: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4de2?q=80&w=800&auto=format&fit=crop',
    badge: '',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Utility-inspired cargo jogger with tapered fit and multiple functional pockets.',
    material: 'Cotton Blend',
    fit: 'Tapered',
  },
  {
    id: 4,
    name: 'Drop-Shoulder Hoodie',
    price: '₹2,999',
    originalPrice: '₹3,999',
    category: 'Hoodies',
    sub: 'HEAVYWEIGHT 380GSM',
    img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop',
    badge: 'LIMITED',
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Premium drop-shoulder construction with a heavyweight 380gsm fleece interior.',
    material: '380gsm Fleece',
    fit: 'Oversized',
  },
  {
    id: 5,
    name: 'Street Utility Jacket',
    price: '₹4,499',
    originalPrice: '₹5,999',
    category: 'Outerwear',
    sub: 'WINDPROOF SHELL',
    img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop',
    badge: 'NEW',
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Multi-pocket utility jacket built for the streets. Windproof and water-resistant.',
    material: 'Nylon Shell',
    fit: 'Regular',
  },
  {
    id: 6,
    name: 'Relaxed Fit Chinos',
    price: '₹1,799',
    originalPrice: '',
    category: 'Bottoms',
    sub: 'EVERYDAY ESSENTIAL',
    img: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=800&auto=format&fit=crop',
    badge: '',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Clean, versatile chinos cut in a relaxed silhouette. From street to dinner.',
    material: 'Cotton Twill',
    fit: 'Relaxed',
  },
  {
    id: 7,
    name: 'Core Logo Sweatshirt',
    price: '₹1,999',
    originalPrice: '₹2,499',
    category: 'Hoodies',
    sub: 'SIGNATURE PIECE',
    img: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800&auto=format&fit=crop',
    badge: 'BESTSELLER',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Our core logo sweatshirt — heavyweight, minimal, and built to last.',
    material: '300gsm Fleece',
    fit: 'Oversized',
  },
  {
    id: 8,
    name: 'Linen Boxy Shirt',
    price: '₹1,599',
    originalPrice: '',
    category: 'Shirts',
    sub: 'SUMMER READY',
    img: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=800&auto=format&fit=crop',
    badge: '',
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Breathable linen shirt cut in a boxy silhouette. Perfect for every season.',
    material: '100% Linen',
    fit: 'Boxy',
  },
];

const categories = ['ALL', 'T-Shirts', 'Hoodies', 'Bottoms', 'Outerwear', 'Shirts'];

export type Product = (typeof products)[0];
export { products };

export default function MenCollection() {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const filtered = activeCategory === 'ALL'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <div className={styles.page}>

      {/* ── Full‑viewport Hero ── */}
      <div className={styles.hero}>
        <div className={styles.heroGlow} />
        <img
          src="https://images.unsplash.com/photo-1520975954732-57dd22299614?q=80&w=1600&auto=format&fit=crop"
          alt="Men's Collection"
          className={styles.heroImg}
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>OUR EXCLUSIVE</p>
          <h1 className={styles.heroTitle}>COLLECTION</h1>
          <p className={styles.heroSub}>WEAR YOUR STORY</p>
          <a href="#grid" className={styles.heroBtn}>
            EXPLORE COLLECTION <ArrowRight size={18} className={styles.heroBtnIcon} />
          </a>
        </div>
      </div>

      {/* ── Filter strip ── */}
      <div className={styles.filterStrip}>
        <div className={styles.filterInner}>
          {categories.map(cat => (
            <button
              key={cat}
              className={`${styles.catBtn} ${activeCategory === cat ? styles.catActive : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <span className={styles.count}>{filtered.length} ITEMS</span>
      </div>

      {/* ── Product Grid ── */}
      <div id="grid" className={styles.grid}>
        {filtered.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className={styles.card}
          >
            {/* Image */}
            <div className={styles.imgWrap}>
              <img src={product.img} alt={product.name} className={styles.img} />
              <div className={styles.imgOverlay} />
              {product.badge && (
                <span className={styles.badge}>{product.badge}</span>
              )}
              <div className={styles.itemCount}>
                {product.sizes.length} Sizes
              </div>
            </div>

            {/* Info below image */}
            <div className={styles.info}>
              <p className={styles.sub}>{product.sub}</p>
              <h3 className={styles.name}>{product.name}</h3>
              <p className={styles.desc}>{product.description}</p>
              <div className={styles.footer}>
                <span className={styles.explore}>
                  EXPLORE NOW <ArrowRight size={14} />
                </span>
                <div className={styles.arrowCircle}>
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}
