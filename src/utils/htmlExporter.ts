import { Product } from '../types';

/**
 * Generates a luxurious, fully interactive, single-file HTML catalog of Zarbadshah Perfumes
 * and triggers a client-side download.
 */
export function downloadHtmlCatalog(products: Product[], coupons: any[]) {
  const origin = window.location.origin;

  // Generate HTML content for products
  const productsHtml = products.map(product => {
    const imageUrl = product.image.startsWith('http') ? product.image : `${origin}${product.image}`;
    
    // Notes badges
    const topNotes = product.notes.top.map(n => `<span class="note-badge">${n}</span>`).join('');
    const heartNotes = product.notes.heart.map(n => `<span class="note-badge">${n}</span>`).join('');
    const baseNotes = product.notes.base.map(n => `<span class="note-badge">${n}</span>`).join('');

    // WhatsApp Message
    const encodedMsg = encodeURIComponent(
      `Asalam-o-Alaikum Zarbadshah Perfumes, I am viewing your Royal Digital Catalog and would like to order:\n\n` +
      `Product: *${product.name}*\n` +
      `Collection: *${product.collection.toUpperCase()}*\n` +
      `Price: *Rs. ${product.price.toLocaleString('en-PK')}*\n\n` +
      `Please guide me regarding delivery. Shukriya!`
    );

    return `
      <div class="product-card" data-collection="${product.collection}" data-featured="${product.isFeatured ? 'true' : 'false'}" data-bestseller="${product.isBestSeller ? 'true' : 'false'}">
        <div class="image-container">
          <img src="${imageUrl}" alt="${product.name}" loading="lazy" />
          ${product.isBestSeller ? '<span class="status-badge bestseller">BEST SELLER</span>' : ''}
          ${product.isFeatured && !product.isBestSeller ? '<span class="status-badge featured">FEATURED</span>' : ''}
        </div>
        
        <div class="card-content">
          <div class="card-header">
            <div>
              <span class="collection-tag">${product.collection.toUpperCase()} COLLECTION</span>
              <h3 class="product-title">${product.name}</h3>
            </div>
            <div class="rating-box">
              <span class="star">★</span>
              <span>${product.rating}</span>
            </div>
          </div>

          <p class="product-short-desc">${product.shortDescription}</p>
          <p class="product-desc">${product.description}</p>

          <div class="spec-grid">
            <div class="spec-item">
              <span class="spec-label">LONGEVITY</span>
              <span class="spec-value">${product.longevity}</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">INTENSITY</span>
              <span class="spec-value">${product.intensity}</span>
            </div>
          </div>

          <div class="notes-section">
            <h4 class="section-title">SCENT PROFILE</h4>
            
            <div class="notes-row">
              <span class="note-type">Top Notes:</span>
              <div class="notes-list">${topNotes}</div>
            </div>
            
            <div class="notes-row">
              <span class="note-type">Heart Notes:</span>
              <div class="notes-list">${heartNotes}</div>
            </div>
            
            <div class="notes-row">
              <span class="note-type">Base Notes:</span>
              <div class="notes-list">${baseNotes}</div>
            </div>
          </div>

          <div class="sizes-row">
            <span class="sizes-label">Available Sizes:</span>
            <span class="sizes-value">${product.sizes.join(' | ')}</span>
          </div>

          <div class="card-footer">
            <div class="price-box">
              <span class="original-price">Rs. ${product.originalPrice.toLocaleString('en-PK')}</span>
              <span class="current-price">Rs. ${product.price.toLocaleString('en-PK')}</span>
            </div>
            
            <a href="https://wa.me/923001211872?text=${encodedMsg}" target="_blank" class="whatsapp-btn">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.538 1.97 14.075.941 11.451.94 6.01.94 1.587 5.309 1.583 10.74c-.001 1.745.462 3.447 1.343 4.966l-.982 3.595 3.69-.968zM17.07 14.15c-.3-.15-1.77-.872-2.045-.972-.273-.101-.473-.15-.672.15-.198.3-.768.972-.943 1.173-.173.199-.35.224-.65.074-.3-.15-1.267-.467-2.413-1.491-.892-.796-1.494-1.78-1.669-2.08-.175-.3-.018-.462.13-.611.135-.133.3-.349.45-.524.15-.175.2-.299.3-.499.1-.2.05-.374-.025-.524-.075-.15-.672-1.62-.921-2.22-.243-.586-.489-.507-.671-.517-.174-.01-.373-.012-.573-.012-.2 0-.523.075-.798.374-.275.3-1.047 1.023-1.047 2.494 0 1.47 1.072 2.891 1.222 3.09.15.2 2.11 3.22 5.11 4.516.714.309 1.272.493 1.708.632.717.228 1.37.196 1.887.119.577-.087 1.77-.724 2.02-.1424.25-.697.25-1.3 0-1.424z"/>
              </svg>
              <span>ORDER VIA WHATSAPP</span>
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Generate HTML content for coupons
  const couponsHtml = coupons.map(c => `
    <div class="coupon-card">
      <div class="coupon-code" id="coupon-${c.code}">${c.code}</div>
      <div class="coupon-desc">${c.description}</div>
      <button class="copy-btn" onclick="copyCoupon('${c.code}')">Copy Promo Code</button>
    </div>
  `).join('');

  // Assemble full standalone HTML content
  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Zarbadshah Perfumes - Royal Scent Catalog</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    /* Premium Royal Black & Gold Theme */
    :root {
      --color-gold-light: #f3e5ab;
      --color-gold: #D4AF37;
      --color-gold-dark: #AA7C11;
      --color-gold-deep: #8C6207;
      --color-black-pure: #000000;
      --color-black-soft: #080808;
      --color-black-card: #0F0F0F;
      --color-gray-dark: #1E1E1E;
      --color-gray-medium: #555555;
      --color-gray-light: #CCCCCC;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: var(--color-black-pure);
      color: #ffffff;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      line-height: 1.6;
      padding-bottom: 80px;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    /* Header & Branding */
    header {
      text-align: center;
      padding: 60px 20px 40px;
      border-bottom: 1px solid rgba(212, 175, 55, 0.15);
      margin-bottom: 40px;
      position: relative;
    }

    .emblem {
      color: var(--color-gold);
      font-size: 1.5rem;
      letter-spacing: 0.4em;
      font-weight: 700;
      display: block;
      margin-bottom: 10px;
      font-family: 'Cinzel', serif;
    }

    h1 {
      font-family: 'Cinzel', serif;
      font-size: 2.8rem;
      font-weight: 900;
      letter-spacing: 0.15em;
      margin-bottom: 10px;
      background: linear-gradient(135deg, #FFF6D6 0%, #D4AF37 50%, #AA7C11 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: 0 0 30px rgba(212, 175, 55, 0.1);
    }

    .tagline {
      font-size: 0.85rem;
      color: var(--color-gray-light);
      letter-spacing: 0.35em;
      text-transform: uppercase;
      margin-bottom: 20px;
    }

    .header-divider {
      width: 100px;
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--color-gold), transparent);
      margin: 0 auto 25px;
    }

    .intro-text {
      max-width: 700px;
      margin: 0 auto;
      color: #999;
      font-size: 0.95rem;
      line-height: 1.8;
    }

    /* Filters Section */
    .filter-wrapper {
      margin-bottom: 40px;
      text-align: center;
    }

    .filter-tabs {
      display: inline-flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 10px;
      background: rgba(255, 255, 255, 0.02);
      padding: 8px;
      border: 1px solid rgba(212, 175, 55, 0.1);
      border-radius: 4px;
    }

    .filter-btn {
      background: transparent;
      color: #aaa;
      border: none;
      padding: 10px 22px;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      cursor: pointer;
      transition: all 0.3s ease;
      border-radius: 2px;
    }

    .filter-btn:hover {
      color: #ffffff;
    }

    .filter-btn.active {
      background-color: var(--color-gold);
      color: #000000;
      box-shadow: 0 4px 15px rgba(212, 175, 55, 0.25);
    }

    /* Grid Layout */
    .grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 30px;
    }

    @media (min-width: 768px) {
      .grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (min-width: 1024px) {
      .grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    /* Product Card */
    .product-card {
      background-color: var(--color-black-card);
      border: 1px solid rgba(212, 175, 55, 0.15);
      border-radius: 0px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
    }

    .product-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 15px 35px rgba(212, 175, 55, 0.08);
      border-color: rgba(212, 175, 55, 0.35);
    }

    .image-container {
      position: relative;
      width: 100%;
      height: 320px;
      background-color: #000;
      overflow: hidden;
    }

    .image-container img {
      width: 100%;
      height: 100%;
      object-cover: cover;
      object-fit: cover;
      transition: transform 0.6s ease;
    }

    .product-card:hover .image-container img {
      transform: scale(1.05);
    }

    .status-badge {
      position: absolute;
      top: 15px;
      left: 15px;
      font-size: 0.65rem;
      font-weight: 800;
      letter-spacing: 0.15em;
      padding: 6px 12px;
      border-radius: 2px;
      color: #000000;
    }

    .status-badge.bestseller {
      background-color: var(--color-gold);
    }

    .status-badge.featured {
      background-color: #ffffff;
    }

    .card-content {
      padding: 25px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 15px;
    }

    .collection-tag {
      font-size: 0.65rem;
      color: var(--color-gold);
      font-weight: 700;
      letter-spacing: 0.15em;
      display: block;
      margin-bottom: 5px;
    }

    .product-title {
      font-family: 'Cinzel', serif;
      font-size: 1.4rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      color: #ffffff;
    }

    .rating-box {
      display: flex;
      align-items: center;
      gap: 4px;
      background-color: rgba(212, 175, 55, 0.1);
      border: 1px solid rgba(212, 175, 55, 0.2);
      padding: 4px 8px;
      font-size: 0.7rem;
      font-weight: 700;
      color: var(--color-gold);
    }

    .rating-box .star {
      color: var(--color-gold);
    }

    .product-short-desc {
      font-size: 0.8rem;
      color: #bbb;
      font-style: italic;
      margin-bottom: 15px;
      line-height: 1.5;
    }

    .product-desc {
      font-size: 0.8rem;
      color: #888;
      margin-bottom: 20px;
      line-height: 1.6;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .product-card:hover .product-desc {
      display: block;
      overflow: visible;
    }

    .spec-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      background: rgba(255, 255, 255, 0.01);
      border: 1px solid rgba(212, 175, 55, 0.08);
      padding: 12px;
      margin-bottom: 20px;
    }

    .spec-item {
      display: flex;
      flex-direction: column;
    }

    .spec-label {
      font-size: 0.6rem;
      color: #666;
      font-weight: 700;
      letter-spacing: 0.1em;
      margin-bottom: 2px;
    }

    .spec-value {
      font-size: 0.75rem;
      color: #ddd;
      font-weight: 600;
    }

    /* Notes Section */
    .notes-section {
      border-top: 1px solid rgba(212, 175, 55, 0.08);
      padding-top: 15px;
      margin-bottom: 20px;
    }

    .section-title {
      font-family: 'Cinzel', serif;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.15em;
      color: #ffffff;
      margin-bottom: 12px;
    }

    .notes-row {
      display: flex;
      margin-bottom: 8px;
      align-items: flex-start;
    }

    .note-type {
      font-size: 0.7rem;
      font-weight: 700;
      color: var(--color-gold);
      width: 80px;
      flex-shrink: 0;
      padding-top: 2px;
    }

    .notes-list {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
    }

    .note-badge {
      font-size: 0.65rem;
      background-color: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      padding: 2px 8px;
      color: #ccc;
    }

    .sizes-row {
      font-size: 0.75rem;
      margin-bottom: 20px;
      color: #999;
    }

    .sizes-label {
      font-weight: 600;
      color: #ccc;
    }

    .sizes-value {
      color: var(--color-gold);
      font-weight: 700;
    }

    /* Price and Button */
    .card-footer {
      margin-top: auto;
      border-top: 1px solid rgba(212, 175, 55, 0.1);
      padding-top: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 15px;
    }

    .price-box {
      display: flex;
      flex-direction: column;
    }

    .original-price {
      font-size: 0.75rem;
      color: #555;
      text-decoration: line-through;
      margin-bottom: 2px;
    }

    .current-price {
      font-size: 1.25rem;
      font-weight: 800;
      color: var(--color-gold);
      font-family: monospace;
    }

    .whatsapp-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      background-color: #128C7E;
      color: #ffffff;
      text-decoration: none;
      padding: 12px 18px;
      font-size: 0.7rem;
      font-weight: 800;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      transition: all 0.3s ease;
      flex-grow: 1;
      text-align: center;
    }

    .whatsapp-btn:hover {
      background-color: #075E54;
      box-shadow: 0 4px 15px rgba(18, 140, 126, 0.3);
    }

    .whatsapp-btn svg {
      width: 14px;
      height: 14px;
    }

    /* Coupon Codes Section */
    .coupons-section {
      margin-top: 80px;
      padding-top: 40px;
      border-top: 1px solid rgba(212, 175, 55, 0.15);
    }

    .section-header {
      text-align: center;
      margin-bottom: 40px;
    }

    .section-header h2 {
      font-family: 'Cinzel', serif;
      font-size: 2rem;
      color: #ffffff;
      letter-spacing: 0.15em;
      margin-bottom: 10px;
    }

    .coupon-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;
    }

    @media (min-width: 768px) {
      .coupon-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    .coupon-card {
      background-color: var(--color-black-card);
      border: 1px dashed rgba(212, 175, 55, 0.3);
      padding: 25px;
      text-align: center;
      transition: all 0.3s ease;
    }

    .coupon-card:hover {
      border-style: solid;
      border-color: var(--color-gold);
    }

    .coupon-code {
      font-family: monospace;
      font-size: 1.3rem;
      font-weight: 800;
      color: var(--color-gold);
      letter-spacing: 0.1em;
      margin-bottom: 10px;
      background-color: rgba(212, 175, 55, 0.05);
      padding: 10px;
      border: 1px solid rgba(212, 175, 55, 0.1);
    }

    .coupon-desc {
      font-size: 0.8rem;
      color: #aaa;
      margin-bottom: 15px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .copy-btn {
      background-color: transparent;
      border: 1px solid rgba(212, 175, 55, 0.3);
      color: var(--color-gold);
      font-size: 0.65rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      padding: 8px 15px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .copy-btn:hover {
      background-color: var(--color-gold);
      color: #000000;
    }

    /* Footer */
    footer {
      text-align: center;
      margin-top: 80px;
      padding: 40px 20px;
      border-top: 1px solid rgba(212, 175, 55, 0.1);
      color: #666;
      font-size: 0.75rem;
      letter-spacing: 0.05em;
    }

    footer p {
      margin-bottom: 10px;
    }

    footer strong {
      color: var(--color-gold);
    }

    /* Toast Notification */
    .toast {
      position: fixed;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background-color: var(--color-gold);
      color: #000000;
      padding: 12px 24px;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
      transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      z-index: 1000;
    }

    .toast.show {
      transform: translateX(-50%) translateY(0);
    }
  </style>
</head>
<body>

  <div class="container">
    <header>
      <span class="emblem">⚜ ZARBADSHAH ⚜</span>
      <h1>ZARBADSHAH</h1>
      <p class="tagline">The Scent of Royalty</p>
      <div class="header-divider"></div>
      <p class="intro-text">
        Zarbadshah is Pakistan's premier boutique fragrance house, presenting royal quality scents with unmatched, elite formulation. Experience exquisite oils concentrated for 12+ hours of lingering presence. We dispatch all orders within 24 hours with absolute care and elegance. Enjoy Free Delivery across Pakistan.
      </p>
    </header>

    <div class="filter-wrapper">
      <div class="filter-tabs">
        <button class="filter-btn active" onclick="filterCatalog('all')">All Collection</button>
        <button class="filter-btn" onclick="filterCatalog('men')">Royal Men</button>
        <button class="filter-btn" onclick="filterCatalog('women')">Romantic Women</button>
        <button class="filter-btn" onclick="filterCatalog('unisex')">Celestial Unisex</button>
      </div>
    </div>

    <div class="grid" id="product-grid">
      ${productsHtml}
    </div>

    <section class="coupons-section">
      <div class="section-header">
        <h2>Active Promo Codes</h2>
        <p class="tagline">Apply during checkout for grand savings</p>
      </div>
      
      <div class="coupon-grid">
        ${couponsHtml}
      </div>
    </section>

    <footer>
      <p>⚜ <strong>Zarbadshah Perfumes</strong> - Lahore, Pakistan ⚜</p>
      <p>All Scent Formulas are original proprietary developments. Contact: +92 300 1211872</p>
      <p>&copy; 2026 Zarbadshah Perfumes. Built with absolute royalty.</p>
    </footer>
  </div>

  <div class="toast" id="toast-message">Promo Code Copied!</div>

  <script>
    function filterCatalog(category) {
      // Update buttons
      const buttons = document.querySelectorAll('.filter-btn');
      buttons.forEach(btn => btn.classList.remove('active'));
      event.target.classList.add('active');

      // Update grid
      const cards = document.querySelectorAll('.product-card');
      cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-collection') === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    }

    function copyCoupon(code) {
      navigator.clipboard.writeText(code).then(() => {
        const toast = document.getElementById('toast-message');
        toast.textContent = "COPIED PROMO CODE: " + code;
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
        }, 2500);
      }).catch(err => {
        console.error('Failed to copy code: ', err);
      });
    }
  </script>
</body>
</html>`;

  // Trigger file download
  const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Zarbadshah_Perfumes_Catalog.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
