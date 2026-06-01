import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from './MenCollection';
import styles from './ProductDetail.module.css';
import { ShoppingBag, Check, ChevronDown, ArrowRight, ArrowLeft } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const [selectedSize, setSelectedSize] = useState('');
  const [added, setAdded] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  if (!product) return (
    <div className={styles.notFound}>
      <p>Product not found.</p>
      <Link to="/collections/men">← Back to Collection</Link>
    </div>
  );

  const handleAdd = () => {
    if (!selectedSize) return;
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  const faqs = [
    { q: 'Material & Care', a: `Made from ${product.material}. Machine wash cold, tumble dry low. Do not bleach.` },
    { q: 'Fit & Sizing', a: `This style has a ${product.fit} fit. We recommend sizing up if you prefer extra room.` },
    { q: 'Shipping & Delivery', a: 'Free shipping pan-India. Delivered in 3–7 business days. Cash on delivery available.' },
    { q: 'Returns & Exchange', a: '7-day easy returns. Item must be unworn with original tags attached.' },
  ];

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const discount = product.originalPrice
    ? Math.round((1 - parseInt(product.price.replace(/[^0-9]/g, '')) / parseInt(product.originalPrice.replace(/[^0-9]/g, ''))) * 100)
    : 0;

  return (
    <div className={styles.page}>

      {/* ── Top nav strip ── */}
      <div className={styles.topStrip}>
        <Link to="/collections/men" className={styles.backLink}>
          <ArrowLeft size={13} /> MEN'S COLLECTION
        </Link>
        <div className={styles.breadcrumb}>
          <Link to="/" className={styles.bc}>Home</Link>
          <span>/</span>
          <Link to="/collections/men" className={styles.bc}>Men's</Link>
          <span>/</span>
          <span className={styles.bcCur}>{product.name}</span>
        </div>
      </div>

      {/* ── Main: image left + details right ── */}
      <div className={styles.main}>

        {/* LEFT — large product image */}
        <div className={styles.imgCol}>
          <div className={styles.imgGlow} />
          <img src={product.img} alt={product.name} className={styles.img} />
          <div className={styles.imgOverlay} />
          {product.badge && (
            <span className={styles.badge}>{product.badge}</span>
          )}
          <div className={styles.imgItemCount}>{product.sizes.length} Sizes</div>
        </div>

        {/* RIGHT — product details */}
        <div className={styles.detailCol}>

          <p className={styles.subLabel}>{product.sub}</p>
          <h1 className={styles.name}>{product.name}</h1>

          {/* Price row */}
          <div className={styles.priceRow}>
            <span className={styles.price}>{product.price}</span>
            {product.originalPrice && (
              <>
                <span className={styles.origPrice}>{product.originalPrice}</span>
                <span className={styles.discBadge}>{discount}% OFF</span>
              </>
            )}
          </div>

          <p className={styles.desc}>{product.description}</p>

          {/* Meta */}
          <div className={styles.metaRow}>
            <span className={styles.metaKey}>FIT</span>
            <span className={styles.metaVal}>{product.fit}</span>
            <span className={styles.metaDot}>·</span>
            <span className={styles.metaKey}>MATERIAL</span>
            <span className={styles.metaVal}>{product.material}</span>
          </div>

          {/* Size selector */}
          <div className={styles.sizeBlock}>
            <div className={styles.sizeHeader}>
              <span className={styles.sizeLabel}>SELECT SIZE</span>
              {selectedSize && <span className={styles.sizePicked}>— {selectedSize}</span>}
            </div>
            <div className={styles.sizeGrid}>
              {product.sizes.map(s => (
                <button
                  key={s}
                  className={`${styles.sizeBtn} ${selectedSize === s ? styles.sizeActive : ''}`}
                  onClick={() => setSelectedSize(s)}
                >{s}</button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <button
            className={`${styles.addBtn} ${!selectedSize ? styles.addDisabled : ''} ${added ? styles.addDone : ''}`}
            onClick={handleAdd}
          >
            {added
              ? <><Check size={18} /> ADDED TO BAG</>
              : <><ShoppingBag size={18} /> {selectedSize ? 'ADD TO BAG' : 'SELECT A SIZE FIRST'}</>
            }
          </button>

          <p className={styles.shipping}>✦ Free pan-India shipping · Cash on delivery</p>

          {/* Divider */}
          <div className={styles.divider} />

          {/* FAQ Accordion */}
          {faqs.map((f, i) => (
            <div key={i} className={styles.faqItem}>
              <button className={styles.faqQ} onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
                {f.q}
                <ChevronDown size={15} className={`${styles.faqIcon} ${faqOpen === i ? styles.faqIconOpen : ''}`} />
              </button>
              {faqOpen === i && <p className={styles.faqA}>{f.a}</p>}
            </div>
          ))}

        </div>
      </div>

      {/* ── Related grid ── */}
      {related.length > 0 && (
        <div className={styles.relSection}>
          <div className={styles.relTop}>
            <div>
              <p className={styles.relEye}>SAME CATEGORY</p>
              <h2 className={styles.relTitle}>YOU MAY ALSO LIKE</h2>
            </div>
            <Link to="/collections/men" className={styles.viewAll}>
              VIEW ALL <ArrowRight size={13} />
            </Link>
          </div>
          <div className={styles.relGrid}>
            {related.map(p => (
              <Link key={p.id} to={`/product/${p.id}`} className={styles.relCard}>
                <div className={styles.relImgWrap}>
                  <img src={p.img} alt={p.name} className={styles.relImg} />
                  <div className={styles.relOverlay} />
                  {p.badge && <span className={styles.relBadge}>{p.badge}</span>}
                </div>
                <div className={styles.relInfo}>
                  <p className={styles.relSub}>{p.sub}</p>
                  <span className={styles.relName}>{p.name}</span>
                  <div className={styles.relFooter}>
                    <span className={styles.relPrice}>{p.price}</span>
                    <span className={styles.relCta}>VIEW <ArrowRight size={11} /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
