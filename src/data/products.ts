import { Product } from '../types';

// Absolute image paths pointing to the premium assets generated
export const HERO_IMAGE = '/src/assets/images/luxury_perfume_hero_1783495875458.jpg';

export const products: Product[] = [
  {
    id: 'white-oud',
    name: 'White Oud',
    collection: 'men',
    price: 3850,
    originalPrice: 4800,
    image: '/src/assets/images/perfume_white_oud_1783495892449.jpg',
    shortDescription: 'An ultra-refined, smooth, and powdery interpretation of precious agarwood.',
    description: 'White Oud represents the pinnacle of subtle sophistication. Far from the harshness of traditional heavy ouds, this fragrance introduces a creamy, powdery, and highly sophisticated agarwood experience. Wrapped in white pepper, precious rosewood, and warm amber, it creates a lingering, elite aura that commands respect in any setting. Perfect for executive wear and evening engagements.',
    notes: {
      top: ['White Pepper', 'Brazilian Rosewood', 'Cardamom'],
      heart: ['Precious Oud', 'Sichuan Pepper', 'Sandalwood'],
      base: ['Vanilla', 'Vetiver', 'Tonka Bean', 'Warm Amber']
    },
    sizes: ['50ml', '100ml'],
    rating: 4.9,
    reviewsCount: 148,
    reviews: [
      { id: 'rev1', author: 'Muhammad Ali', rating: 5, comment: 'Hands down the best oud fragrance in Pakistan! Highly long-lasting, easily stays 10+ hours on clothes. People kept asking me which brand this is.', date: 'June 15, 2026' },
      { id: 'rev2', author: 'Bilal Khan', rating: 5, comment: 'Extremely elegant. It has a beautiful creamy woodiness. Zarbadshah packaging is so premium, feels like a luxury French bottle.', date: 'June 28, 2026' },
      { id: 'rev3', author: 'Sarah J.', rating: 4, comment: 'Gifted this to my husband and he loved it! Very classy scent, not overpowering.', date: 'July 02, 2026' }
    ],
    isFeatured: true,
    isBestSeller: true,
    intensity: 'Moderate',
    longevity: '8-12 Hours'
  },
  {
    id: 'majnu',
    name: 'Majnu',
    collection: 'men',
    price: 3450,
    originalPrice: 4200,
    image: '/src/assets/images/perfume_majnu_1783495911302.jpg',
    shortDescription: 'A passionate, deep, smoky amber with rich undertones of raw leather and pink pepper.',
    description: 'Majnu is a scent of devotion, mystery, and raw confidence. Named after the legendary lover, this fragrance blends intense dark leather with vibrant pink pepper and rich patchouli. It is smoky, resinous, and deeply passionate, drying down to an amber-infused musk that clings elegantly to the skin. Made for the bold, charismatic man who leaves an unforgettable impression.',
    notes: {
      top: ['Bergamot', 'Pink Pepper', 'Incense'],
      heart: ['Tuscan Leather', 'Patchouli', 'Saffron'],
      base: ['Warm Amber', 'Cedarwood', 'Rich Musk', 'Vetiver']
    },
    sizes: ['50ml', '100ml'],
    rating: 4.8,
    reviewsCount: 96,
    reviews: [
      { id: 'm-rev1', author: 'Zain Ul Abideen', rating: 5, comment: 'This is pure passion in a bottle. Very unique leather and amber vibe. Lasts all night, perfect for winter nights and date nights.', date: 'May 12, 2026' },
      { id: 'm-rev2', author: 'Ahmad Raza', rating: 5, comment: 'The pink pepper and leather combination is outstanding. True masterpiece at this price. Zarbadshah has won my trust.', date: 'June 10, 2026' }
    ],
    isFeatured: true,
    intensity: 'Intense',
    longevity: '12+ Hours'
  },
  {
    id: 'sultan',
    name: 'Sultan',
    collection: 'men',
    price: 3950,
    originalPrice: 4950,
    image: '/src/assets/images/perfume_sultan_1783495969643.jpg',
    shortDescription: 'A majestic, royal blend of precious saffron, spices, and deep golden agarwood.',
    description: 'Sultan is a fragrance of royalty, absolute power, and grandeur. It opens with an opulent burst of saffron, cardamom, and fresh nutmeg, melting into a deep heart of dark rose and precious jasmine. The dry down is a powerful presence of pure agarwood, royal amber, and soft Tuscan leather. A heavy, magnificent fragrance crafted for grand occasions.',
    notes: {
      top: ['Saffron', 'Cardamom', 'Nutmeg'],
      heart: ['Royal Rose', 'Night-Blooming Jasmine', 'Myrrh'],
      base: ['Agarwood (Oud)', 'Royal Amber', 'Patchouli', 'Tuscan Leather']
    },
    sizes: ['50ml', '100ml'],
    rating: 4.9,
    reviewsCount: 112,
    reviews: [
      { id: 's-rev1', author: 'Asim Butt', rating: 5, comment: 'Sultan makes me feel like a king. The saffron and agarwood blend is extremely luxurious. Very high quality projection!', date: 'April 25, 2026' },
      { id: 's-rev2', author: 'Usman Ghani', rating: 5, comment: 'Super premium projection. It easily lasts 12+ hours and projects like crazy for the first 3 hours. Best blind buy.', date: 'May 19, 2026' }
    ],
    isFeatured: false,
    isBestSeller: true,
    intensity: 'Intense',
    longevity: '12+ Hours'
  },
  {
    id: 'laila',
    name: 'Laila',
    collection: 'women',
    price: 3450,
    originalPrice: 4200,
    image: '/src/assets/images/perfume_laila_1783495931947.jpg',
    shortDescription: 'A dreamy, delicate bouquet of romantic roses, fresh peonies, and soft white musk.',
    description: 'Laila is the essence of delicate elegance and romantic dreams. It opens with a sparkling burst of fresh rose petals, soft pink peonies, and bright mandarin orange. The heart reveals juicy apricots and peaches blended with night-blooming jasmine, settling into a powdery cloud of luxurious white musk and creamy sandalwood. Elegant, soft, and beautifully feminine.',
    notes: {
      top: ['Damask Rose', 'Pink Peony', 'Mandarin Orange'],
      heart: ['Sweet Apricot', 'Night Jasmine', 'Velvety Peach'],
      base: ['White Musk', 'Creamy Sandalwood', 'Amberwood']
    },
    sizes: ['50ml', '100ml'],
    rating: 4.7,
    reviewsCount: 84,
    reviews: [
      { id: 'l-rev1', author: 'Ayesha Malik', rating: 5, comment: 'So soft, feminine, and absolutely gorgeous! It smells exactly like fresh roses on a misty morning. Love the crystal packaging too!', date: 'June 01, 2026' },
      { id: 'l-rev2', author: 'Mariam Baig', rating: 4, comment: 'Very pleasant and gentle. Perfect for daily office or college wear. I receive so many compliments.', date: 'June 20, 2026' }
    ],
    isFeatured: true,
    isBestSeller: true,
    intensity: 'Subtle',
    longevity: '6-8 Hours'
  },
  {
    id: 'darshi',
    name: 'Darshi',
    collection: 'women',
    price: 3650,
    originalPrice: 4500,
    image: '/src/assets/images/perfume_darshi_1783496010506.jpg',
    shortDescription: 'A seductive, gourmand embrace of rich vanilla, sweet caramel, and creamy coconut.',
    description: 'Darshi is a captivating gourmand fragrance that envelops you in sweet, warm temptation. With a luxurious opening of velvety vanilla, rich butter caramel, and coconut milk, it melts into a floral heart of ylang-ylang and exotic heliotrope. The base settles into precious benzoin resins and sandalwood, making it an irresistible, head-turning fragrance for elegant evenings.',
    notes: {
      top: ['Madagascar Vanilla', 'Rich Caramel', 'Coconut Milk'],
      heart: ['Exotic Ylang-Ylang', 'Heliotrope', 'White Lily'],
      base: ['Siam Benzoin', 'Golden Musk', 'Sandalwood']
    },
    sizes: ['50ml', '100ml'],
    rating: 4.9,
    reviewsCount: 67,
    reviews: [
      { id: 'd-rev1', author: 'Nida Fatima', rating: 5, comment: 'If you love sweet, vanilla-caramel fragrances, Darshi is an absolute must-have! It smells so rich, edible, and high-end.', date: 'May 30, 2026' },
      { id: 'd-rev2', author: 'Zainab Bibi', rating: 5, comment: 'Stunning gourmand. The caramel dry-down is incredibly smooth and sweet but extremely classy.', date: 'June 18, 2026' }
    ],
    isFeatured: false,
    intensity: 'Moderate',
    longevity: '8-12 Hours'
  },
  {
    id: 'ishq',
    name: 'Ishq',
    collection: 'women',
    price: 3850,
    originalPrice: 4800,
    image: '/src/assets/images/perfume_ishq_1783495990526.jpg',
    shortDescription: 'An intense, hypnotic blend of dark red roses, warm spices, and seductive amberwood.',
    description: 'Ishq is an exploration of deep, passionate obsession. A powerful, hypnotic fragrance that blends opulent dark rose with warm saffron, jasmine, and exotic patchouli. It dries down to a rich, resinous amberwood, velvety vanilla, and precious resins, leaving a heavy, seductive trail that is completely irresistible. Created for the bold woman who loves deeply.',
    notes: {
      top: ['Dark Roses', 'Saffron', 'Red Berries'],
      heart: ['Royal Jasmine', 'Warm Patchouli', 'Clary Sage'],
      base: ['Amberwood', 'Madagascar Vanilla', 'Precious Benzoin', 'Oud Wood']
    },
    sizes: ['50ml', '100ml'],
    rating: 4.9,
    reviewsCount: 118,
    reviews: [
      { id: 'i-rev1', author: 'Kiran Shah', rating: 5, comment: 'This is hands-down the most luxurious perfume I have ever purchased. Smells extremely royal. Projects across the entire room!', date: 'July 01, 2026' },
      { id: 'i-rev2', author: 'Aiman Khan', rating: 5, comment: 'Deep, mysterious, and so beautiful. The rose and saffron combination makes it project like international brands.', date: 'July 04, 2026' }
    ],
    isFeatured: true,
    isBestSeller: true,
    intensity: 'Intense',
    longevity: '12+ Hours'
  },
  {
    id: 'dream',
    name: 'Dream',
    collection: 'unisex',
    price: 3750,
    originalPrice: 4600,
    image: '/src/assets/images/perfume_dream_1783495948982.jpg',
    shortDescription: 'An ethereal, celestial ocean breeze combined with earthy sage, lavender, and cedar.',
    description: 'Dream is a universal, fluid masterpiece that transcends boundaries. Evoking a high-altitude sea breeze drifting over rugged cedar cliffs, it starts with fresh Calabrian bergamot, sea salt, and aromatic sage. The heart introduces calming lavender, ambrette seeds, and clean ocean seaweed, settling into a long-lasting base of driftwood, cedarwood, and clean musk. Truly a dream of clean sophistication.',
    notes: {
      top: ['Calabrian Bergamot', 'Mineral Sea Salt', 'Aromatic Sage'],
      heart: ['Calming Lavender', 'Ambrette Seeds', 'Ocean Seaweed'],
      base: ['Driftwood', 'Virginia Cedarwood', 'Clean Musk']
    },
    sizes: ['50ml', '100ml'],
    rating: 4.8,
    reviewsCount: 132,
    reviews: [
      { id: 'dr-rev1', author: 'Haris Qureshi', rating: 5, comment: 'So fresh, clean, and celestial! This is my absolute favorite signature scent. It works beautifully in hot summer weather as well as air-conditioned office spaces.', date: 'June 14, 2026' },
      { id: 'dr-rev2', author: 'Saba Sheikh', rating: 5, comment: 'Very clean, classy, and soothing. Both my brother and I use it, truly unisex! Stays fresh for hours.', date: 'June 25, 2026' }
    ],
    isFeatured: true,
    isBestSeller: true,
    intensity: 'Moderate',
    longevity: '8-12 Hours'
  },
  {
    id: 'izhaar',
    name: 'Izhaar',
    collection: 'unisex',
    price: 3950,
    originalPrice: 4900,
    image: '/src/assets/images/perfume_izhaar_1783498426271.jpg',
    shortDescription: 'Zarbadshah presents Izhaar: Unspoken Emotions. An intimate, deep, and utterly seductive blend of spices, precious saffron, black rose, and intense amberwood.',
    description: 'Izhaar is an exploration of deep emotions, unspoken thoughts, and intense romantic devotion. It opens with an intimate burst of warm cardamom, pink pepper, and wild bergamot. The heart unfolds a majestic blend of dark red roses, saffron, and rich night jasmine, leading into a highly sensual and lingering base of precious amberwood, warm musk, patchouli, and sandalwood. Truly a captivating scent that expresses what words cannot.',
    notes: {
      top: ['Cardamom', 'Pink Pepper', 'Bergamot'],
      heart: ['Dark Roses', 'Saffron', 'Night Jasmine'],
      base: ['Precious Amberwood', 'Golden Musk', 'Sandalwood', 'Patchouli']
    },
    sizes: ['50ml', '100ml'],
    rating: 4.9,
    reviewsCount: 74,
    reviews: [
      { id: 'iz-rev1', author: 'Kashif Ali', rating: 5, comment: 'Simply majestic. This has replaced my daily wear. The amberwood and saffron dry down is out of this world!', date: 'July 05, 2026' },
      { id: 'iz-rev2', author: 'Sonia Mirza', rating: 5, comment: 'Such a mysterious and sensual scent. Gifted it to my brother and we both love it! Definitely unisex and lasts 12+ hours.', date: 'July 07, 2026' }
    ],
    isFeatured: true,
    isBestSeller: true,
    intensity: 'Intense',
    longevity: '12+ Hours'
  }
];

// Coupon discount data
export const coupons = [
  { code: 'ZARBADSHAH10', discountPercent: 10, minPurchase: 0, description: '10% OFF on all items' },
  { code: 'ROYAL20', discountPercent: 20, minPurchase: 10000, description: '20% OFF on orders above Rs. 10,000' },
  { code: 'WELCOME5', discountPercent: 5, minPurchase: 0, description: '5% OFF on your first order' }
];

export const formatPKR = (amount: number): string => {
  return 'Rs. ' + amount.toLocaleString('en-PK');
};
