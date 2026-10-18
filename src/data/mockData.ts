import {
  TailorUser,
  CustomerUser,
  AdminUser,
  OrderItem,
  ChatConversation,
  CustomerReview,
  GalleryItem,
  BespokeTransaction
} from '../types';

export const INITIAL_CUSTOMERS: CustomerUser[] = [
  {
    id: 'cust-1',
    name: 'Mahi Suryavanshi',
    email: 'mahi.suryavanshi@example.com',
    phone: '+91 98101 23456',
    city: 'Delhi',
    role: 'CUSTOMER',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    savedDesignIds: ['gal-1', 'gal-3'],
    favoriteTailorIds: ['tailor-1', 'tailor-4'],
    measurementProfiles: [
      {
        id: 'meas-1',
        name: 'My Standard Measurements',
        gender: 'Women',
        height: '5 ft 6 in',
        chest: '36 in',
        waist: '28 in',
        hips: '38 in',
        shoulder: '14.5 in',
        sleeveLength: '21 in',
        garmentLength: '52 in',
        neck: '14 in',
        notes: 'Slightly relaxed armhole for comfortable movement in silk blouses.',
        updatedAt: '2026-09-12'
      },
      {
        id: 'meas-2',
        name: 'Wedding Lehenga & Blouse Profile',
        gender: 'Women',
        height: '5 ft 6 in',
        chest: '35.5 in',
        waist: '27.5 in',
        hips: '39 in',
        shoulder: '14 in',
        sleeveLength: '12 in',
        garmentLength: '43 in (Skirt)',
        neck: 'Sweetheart cut',
        notes: 'Padded cups required, deep back neck with dori tie.',
        updatedAt: '2026-09-28'
      }
    ]
  },
  {
    id: 'cust-2',
    name: 'Mansi Jha',
    email: 'mansi.jha@example.com',
    phone: '+91 98202 34567',
    city: 'Mumbai',
    role: 'CUSTOMER',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    savedDesignIds: ['gal-2', 'gal-5'],
    favoriteTailorIds: ['tailor-2'],
    measurementProfiles: [
      {
        id: 'meas-3',
        name: 'Formal & Western Couture',
        gender: 'Women',
        height: '5 ft 7 in',
        chest: '34 in',
        waist: '26 in',
        hips: '36 in',
        shoulder: '15 in',
        sleeveLength: '23 in',
        inseam: '32 in',
        garmentLength: '56 in',
        notes: 'Tapered trouser cut with clean high-waisted waistband.',
        updatedAt: '2026-08-15'
      }
    ]
  },
  {
    id: 'cust-3',
    name: 'Khushi Gour',
    email: 'khushi.gour@example.com',
    phone: '+91 94140 12389',
    city: 'Jaipur',
    role: 'CUSTOMER',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    savedDesignIds: ['gal-4'],
    favoriteTailorIds: ['tailor-4', 'tailor-5'],
    measurementProfiles: [
      {
        id: 'meas-4',
        name: 'Traditional Sharara & Anarkali',
        gender: 'Women',
        height: '5 ft 4 in',
        chest: '37 in',
        waist: '30 in',
        hips: '40 in',
        shoulder: '15 in',
        sleeveLength: '20 in',
        garmentLength: '48 in',
        notes: 'Heavy flair pleating preferred with broad hem canvas border.',
        updatedAt: '2026-09-01'
      }
    ]
  },
  {
    id: 'cust-4',
    name: 'Charu',
    email: 'charu.bengaluru@example.com',
    phone: '+91 99001 88291',
    city: 'Bengaluru',
    role: 'CUSTOMER',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    savedDesignIds: ['gal-1', 'gal-6'],
    favoriteTailorIds: ['tailor-3'],
    measurementProfiles: [
      {
        id: 'meas-5',
        name: 'Contemporary Fusion Fit',
        gender: 'Women',
        height: '5 ft 5 in',
        chest: '35 in',
        waist: '28 in',
        hips: '37 in',
        shoulder: '14.5 in',
        sleeveLength: '19 in',
        garmentLength: '46 in',
        notes: 'Minimalist handloom linen drapes with hidden side pockets.',
        updatedAt: '2026-09-20'
      }
    ]
  }
];

export const INITIAL_TAILORS: TailorUser[] = [
  {
    id: 'tailor-1',
    name: 'Master Mohammad Riaz',
    atelierName: 'Royal Heritage Bespoke',
    email: 'royalheritage@example.com',
    phone: '+91 98111 00223',
    city: 'Delhi',
    locality: 'Chandni Chowk / Connaught Place',
    role: 'TAILOR',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=80',
    bio: 'Fourth-generation master karigar specializing in imperial Sherwanis, Bandhgalas, and Zardozi bridal silhouettes. Known for heirloom needlecraft and custom hand-stitched inner horsehair canvases.',
    yearsExperience: 28,
    specialties: ['Royal Sherwanis', 'Jodhpuri Bandhgalas', 'Zardozi Lehengas', 'Heirloom Handcraft'],
    attireExpertise: ['Indian'],
    genderExpertise: ['Men', 'Women'],
    startingPrice: 6500,
    turnaroundDays: '10-14 days',
    rating: 4.95,
    reviewCount: 142,
    verified: true,
    status: 'ACTIVE',
    ratingBreakdown: {
      craftsmanship: 5.0,
      fit: 4.9,
      communication: 4.9,
      value: 4.8,
      delivery: 4.9
    },
    availableFabrics: [
      'Banarasi Pure Katan Silk',
      'Raw Matka Silk',
      'Italian Wool Silk Blends',
      'Hand-woven Velvet',
      'Antique Gold Tissue'
    ],
    services: [
      {
        id: 'srv-1',
        title: 'Bespoke Royal Sherwani Crafting',
        garmentType: 'Sherwani',
        startingPrice: 9500,
        estimatedDays: '14 days',
        description: 'Complete bespoke pattern cut, chest canvas construction, artisanal brass button installation, and custom inner lining.'
      },
      {
        id: 'srv-2',
        title: 'Jodhpuri Bandhgala Suit Tailoring',
        garmentType: 'Bandhgala',
        startingPrice: 6500,
        estimatedDays: '10 days',
        description: 'High stand collar with velvet neck piping, hand-pressed shoulders, and bespoke tailored trousers.'
      },
      {
        id: 'srv-3',
        title: 'Heirloom Bridal Lehenga & Blouse Construction',
        garmentType: 'Lehenga',
        startingPrice: 12000,
        estimatedDays: '18 days',
        description: 'Full 16-kali panel stitching with heavy cancan support, double inner lining, and master blouse contouring.'
      }
    ],
    portfolio: [
      {
        id: 'port-1',
        title: 'Imperial Ivory Sherwani with Antique Resham',
        garmentType: 'Sherwani',
        gender: 'Men',
        attireType: 'Indian',
        imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
        description: 'Crafted from hand-spun raw silk with tone-on-tone French knot embroidery and custom cast gold-finish buttons.',
        priceEstimate: 14500,
        fabricUsed: 'Pure Raw Silk with Mulmul Lining',
        craftDetails: 'Hand-sewn floating canvas, 18 hours of single-needle threadwork.',
        likes: 318
      },
      {
        id: 'port-2',
        title: 'Deep Midnight Bandhgala with Velvet Trim',
        garmentType: 'Bandhgala',
        gender: 'Men',
        attireType: 'Indian',
        imageUrl: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=800&q=80',
        description: 'Structured silhouette tailored with Super 120s wool and subtle antique brass button accents.',
        priceEstimate: 8500,
        fabricUsed: 'Italian Wool Blend',
        craftDetails: 'Hand-basted canvas chest piece, double jetted side pockets.',
        likes: 245
      }
    ]
  },
  {
    id: 'tailor-2',
    name: 'Ananya Shroff',
    atelierName: 'The Golden Needle Boutique',
    email: 'goldenneedle@example.com',
    phone: '+91 98200 99881',
    city: 'Mumbai',
    locality: 'Bandra West (Pali Hill)',
    role: 'TAILOR',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80',
    bio: 'NIFT alumna atelier blending Parisian couture precision with Indian textile heritage. Renowned for Indo-Western red-carpet gowns, structured tuxedo blazers, and modern bespoke saree blouses.',
    yearsExperience: 16,
    specialties: ['Indo-Western Couture', 'Tuxedos & Evening Blazers', 'Architectural Blouses', 'Fluid Gowns'],
    attireExpertise: ['Indian', 'Western'],
    genderExpertise: ['Men', 'Women'],
    startingPrice: 5500,
    turnaroundDays: '7-10 days',
    rating: 4.92,
    reviewCount: 98,
    verified: true,
    status: 'ACTIVE',
    ratingBreakdown: {
      craftsmanship: 4.9,
      fit: 5.0,
      communication: 4.9,
      value: 4.7,
      delivery: 4.9
    },
    availableFabrics: [
      'Pure Silk Georgette',
      'Super 130s Merino Wool',
      'Chanderi Tissue',
      'Duchess Satin',
      'Imported Micro-Crepe'
    ],
    services: [
      {
        id: 'srv-4',
        title: 'Bespoke Evening Tuxedo / Blazer',
        garmentType: 'Tuxedo',
        startingPrice: 8500,
        estimatedDays: '9 days',
        description: 'Satin shawl lapels, tailored roped shoulders, bespoke trouser waist with side adjusters.'
      },
      {
        id: 'srv-5',
        title: 'Architectural Designer Saree Blouse',
        garmentType: 'Blouse',
        startingPrice: 3800,
        estimatedDays: '6 days',
        description: 'Corseted structure, custom sweetheart or halter neckline, hidden side-zip, and bone reinforcement.'
      }
    ],
    portfolio: [
      {
        id: 'port-3',
        title: 'Sculpted Champagne Tuxedo Jacket',
        garmentType: 'Tuxedo',
        gender: 'Men',
        attireType: 'Western',
        imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
        description: 'Single-button champagne tuxedo cut with contrasting satin silk lapels and horn buttons.',
        priceEstimate: 9800,
        fabricUsed: 'Merino Wool Silk Blend',
        craftDetails: 'Half-canvas drape with bespoke Milanese buttonhole.',
        likes: 198
      },
      {
        id: 'port-4',
        title: 'Emerald Indo-Western Drape Gown',
        garmentType: 'Gown',
        gender: 'Women',
        attireType: 'Western',
        imageUrl: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
        description: 'Hand-draped silk georgette with an asymmetrical cape shoulder and subtle micro-pleats.',
        priceEstimate: 11200,
        fabricUsed: 'Pure Mulberry Silk Georgette',
        craftDetails: 'Couture draping done directly on custom dress form.',
        likes: 276
      }
    ]
  },
  {
    id: 'tailor-3',
    name: 'Devendra Rao',
    atelierName: 'Sutra Threads Lab',
    email: 'sutrathreads@example.com',
    phone: '+91 99011 22334',
    city: 'Bengaluru',
    locality: 'Indiranagar / Lavelle Road',
    role: 'TAILOR',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80',
    bio: 'Master of minimalist organic tailoring. Specializes in bespoke Belgian linen suits, understated Nehru jackets, relaxed silk kurtas, and sustainable heritage textiles.',
    yearsExperience: 22,
    specialties: ['Organic Linen Tailoring', 'Minimalist Nehru Jackets', 'Contemporary Pathanis', 'Summer Suits'],
    attireExpertise: ['Indian', 'Western'],
    genderExpertise: ['Men', 'Women'],
    startingPrice: 4200,
    turnaroundDays: '6-8 days',
    rating: 4.88,
    reviewCount: 76,
    verified: true,
    status: 'ACTIVE',
    ratingBreakdown: {
      craftsmanship: 4.9,
      fit: 4.8,
      communication: 4.9,
      value: 4.9,
      delivery: 4.8
    },
    availableFabrics: [
      'Pure Belgian Linen 60 Lea',
      'Giza 88 Long Staple Cotton',
      'Desi Tussar Handloom Silk',
      'Bamboo-Silk Blend',
      'Organic Khadi Cotton'
    ],
    services: [
      {
        id: 'srv-6',
        title: 'Minimalist Handloom Nehru Jacket',
        garmentType: 'Nehru Jacket',
        startingPrice: 4200,
        estimatedDays: '6 days',
        description: 'Pure linen or tussar silk with coconut-shell or hammered copper buttons and lightweight cotton lining.'
      },
      {
        id: 'srv-7',
        title: 'Relaxed Kurta Pajama with Concealed Placket',
        garmentType: 'Kurta Pajama',
        startingPrice: 3500,
        estimatedDays: '5 days',
        description: 'Fine edge stitching, deep functional welt pockets, and tailored churidar or drawstring pyjama.'
      }
    ],
    portfolio: [
      {
        id: 'port-5',
        title: 'Earthy Sage Linen Nehru Vest',
        garmentType: 'Nehru Jacket',
        gender: 'Men',
        attireType: 'Indian',
        imageUrl: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80',
        description: 'Tailored from breathable 60-lea European linen with hidden chest pocket and wooden button detailing.',
        priceEstimate: 4800,
        fabricUsed: '100% Belgian Linen',
        craftDetails: 'Unstructured soft shoulder cut with bound interior seams.',
        likes: 182
      }
    ]
  },
  {
    id: 'tailor-4',
    name: 'Vikramaditya Singh',
    atelierName: 'Urban Stitch Atelier',
    email: 'urbanstitch@example.com',
    phone: '+91 94140 88776',
    city: 'Jaipur',
    locality: 'Johari Bazaar / C-Scheme',
    role: 'TAILOR',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
    bio: 'Heir to Jaipur court tailoring traditions. Masters the regal Rajputi Angrakha, Bagru hand-block printed festive kurtas, Gotapatti sharara ensembles, and tailored Bandhgalas.',
    yearsExperience: 19,
    specialties: ['Rajputi Bandhgalas', 'Gotapatti Shararas', 'Handblock Printed Kurtas', 'Royal Angrakhas'],
    attireExpertise: ['Indian'],
    genderExpertise: ['Men', 'Women'],
    startingPrice: 4800,
    turnaroundDays: '8-12 days',
    rating: 4.94,
    reviewCount: 112,
    verified: true,
    status: 'ACTIVE',
    ratingBreakdown: {
      craftsmanship: 5.0,
      fit: 4.9,
      communication: 4.8,
      value: 4.9,
      delivery: 4.9
    },
    availableFabrics: [
      'Jaipuri Dabu & Bagru Block Silk',
      'Chanderi Silk Cotton',
      'Kota Doria Tissue',
      'Pure Velvet',
      'Handloom Modal'
    ],
    services: [
      {
        id: 'srv-8',
        title: 'Royal Gotapatti Sharara Set',
        garmentType: 'Sharara',
        startingPrice: 7500,
        estimatedDays: '12 days',
        description: 'Three-piece flared sharara set with hand-applied Lappe and Marodi borders on Chanderi silk.'
      },
      {
        id: 'srv-9',
        title: 'Classic Rajputana Angrakha Kurta',
        garmentType: 'Kurta',
        startingPrice: 4500,
        estimatedDays: '7 days',
        description: 'Diagonal cross-over chest panel with handmade silk potli loops and side dori fastenings.'
      }
    ],
    portfolio: [
      {
        id: 'port-6',
        title: 'Royal Rust Gotapatti Sharara Ensemble',
        garmentType: 'Sharara',
        gender: 'Women',
        attireType: 'Indian',
        imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
        description: 'Opulent rust Chanderi silk sharara with authentic Jaipur metallic gota borders and hand-tucked kalis.',
        priceEstimate: 8200,
        fabricUsed: 'Chanderi Silk with Mulmul Lining',
        craftDetails: 'Hand-sewn Marodi borders and flared pleated gher.',
        likes: 295
      }
    ]
  },
  {
    id: 'tailor-5',
    name: 'Begum Parveen & Sons',
    atelierName: 'Heritage Loom Studio',
    email: 'heritageloom@example.com',
    phone: '+91 94150 33445',
    city: 'Lucknow',
    locality: 'Hazratganj / Chowk',
    role: 'TAILOR',
    avatar: 'https://images.unsplash.com/photo-1534751516642-a171ed292a8e?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1200&q=80',
    bio: 'Renowned custodians of Nawabi Chikankari needlework. Combining pure Banarasi weaves and intricate shadow work into breathtaking Anarkalis, Ghararas, and Awadhi Pathani suits.',
    yearsExperience: 34,
    specialties: ['Awadhi Chikankari', 'Heritage Ghararas', 'Nawabi Pathanis', 'Banarasi Silk Kurtis'],
    attireExpertise: ['Indian'],
    genderExpertise: ['Men', 'Women'],
    startingPrice: 5200,
    turnaroundDays: '10-15 days',
    rating: 4.96,
    reviewCount: 168,
    verified: true,
    status: 'ACTIVE',
    ratingBreakdown: {
      craftsmanship: 5.0,
      fit: 4.9,
      communication: 4.9,
      value: 4.9,
      delivery: 4.8
    },
    availableFabrics: [
      'Pure Lucknowi Georgette',
      'Banarasi Brocade Silk',
      'Mulberry Organza',
      'Tepchi Handloom Cotton',
      'Crepe de Chine'
    ],
    services: [
      {
        id: 'srv-10',
        title: 'Authentic Nawabi Awadhi Gharara',
        garmentType: 'Gharara',
        startingPrice: 8800,
        estimatedDays: '14 days',
        description: 'Authentic 2-tier knee-joint ruched gharara with pure zari gota and matching mid-thigh kurti.'
      },
      {
        id: 'srv-11',
        title: 'Handcrafted Anarkali Silhouette',
        garmentType: 'Anarkali',
        startingPrice: 6800,
        estimatedDays: '10 days',
        description: 'Floor-length flared panels with intricate chikankari bodice and scalloped organza dupatta.'
      }
    ],
    portfolio: [
      {
        id: 'port-7',
        title: 'Ivory Chikankari Floor-Length Anarkali',
        garmentType: 'Anarkali',
        gender: 'Women',
        attireType: 'Indian',
        imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
        description: 'Intricate Bakhiya and Murri handwork on diaphanous georgette with tonal silk churidar.',
        priceEstimate: 9500,
        fabricUsed: 'Pure Georgette with Pure Cotton Lining',
        craftDetails: '32 panels stitched with invisible seam allowance.',
        likes: 340
      }
    ]
  }
];

export const INITIAL_FOUNDERS: AdminUser[] = [
  {
    id: 'admin-1',
    name: 'Sunaina',
    email: 'sunaina@stichlyandco.com',
    role: 'ADMIN',
    title: 'Founder & Creative Director',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'admin-2',
    name: 'Simran Tyagi',
    email: 'simran.tyagi@stichlyandco.com',
    role: 'ADMIN',
    title: 'Co-Founder',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80'
  }
];

export const INITIAL_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    customerName: 'Mahi Suryavanshi',
    customerCity: 'Delhi',
    tailorId: 'tailor-1',
    tailorName: 'Master Mohammad Riaz',
    atelierName: 'Royal Heritage Bespoke',
    outfitName: 'Antique Zardozi Velvet Bandhgala',
    outfitCategory: 'Men • Indian',
    rating: 5.0,
    reviewText: 'Master Riaz crafted this Bandhgala for my brother’s wedding. The chest canvas structure and inner horsehair finish felt like an Italian savile row piece blended with pure Mughal grandeur. We negotiated the price respectfully and agreed on ₹8,200 including fitting trials. Masterpiece!',
    date: '14 September 2026',
    breakdown: {
      craftsmanship: 5.0,
      fit: 5.0,
      communication: 5.0,
      value: 4.8,
      delivery: 5.0
    },
    verifiedClient: true,
    tailorReply: 'Honored to dress your family, Mahi ji. May the outfit bring joy at the festivities!'
  },
  {
    id: 'rev-2',
    customerName: 'Mansi Jha',
    customerCity: 'Mumbai',
    tailorId: 'tailor-2',
    tailorName: 'Ananya Shroff',
    atelierName: 'The Golden Needle Boutique',
    outfitName: 'Sculpted Tuxedo & Silk Trouser Set',
    outfitCategory: 'Western • Bespoke',
    rating: 5.0,
    reviewText: 'I uploaded my Pinterest board to STICHLY&CO.’s Design Scanner and connected with Ananya in Bandra. She suggested minor lapel adjustments for my height and delivered on the dot in 8 days. The shoulder roping is pure art.',
    date: '22 August 2026',
    breakdown: {
      craftsmanship: 5.0,
      fit: 5.0,
      communication: 4.9,
      value: 4.7,
      delivery: 5.0
    },
    verifiedClient: true
  },
  {
    id: 'rev-3',
    customerName: 'Khushi Gour',
    customerCity: 'Jaipur',
    tailorId: 'tailor-4',
    tailorName: 'Vikramaditya Singh',
    atelierName: 'Urban Stitch Atelier',
    outfitName: 'Hand-block Printed Gota Sharara Set',
    outfitCategory: 'Women • Indian',
    rating: 5.0,
    reviewText: 'Finding a tailor who understands authentic Rajasthani Gotapatti without making it stiff is almost impossible. Vikramaditya and his team in Johari Bazaar nailed the flow. Even during negotiation, he was gracious and included matching potli tassels.',
    date: '02 September 2026',
    breakdown: {
      craftsmanship: 5.0,
      fit: 4.9,
      communication: 4.9,
      value: 5.0,
      delivery: 4.9
    },
    verifiedClient: true
  },
  {
    id: 'rev-4',
    customerName: 'Charu',
    customerCity: 'Bengaluru',
    tailorId: 'tailor-3',
    tailorName: 'Devendra Rao',
    atelierName: 'Sutra Threads Lab',
    outfitName: 'Organic Belgian Linen Nehru Waistcoat',
    outfitCategory: 'Men • Indian / Western',
    rating: 4.9,
    reviewText: 'Devendra in Indiranagar is a gem. He measured me carefully, explained the thread count and breathability of Belgian linen vs khadi silk, and completed the first trial in just 4 days. Highly recommended for bespoke lovers.',
    date: '19 September 2026',
    breakdown: {
      craftsmanship: 4.9,
      fit: 4.9,
      communication: 5.0,
      value: 4.9,
      delivery: 4.8
    },
    verifiedClient: true
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Heritage Ivory Zardozi Sherwani',
    tailorId: 'tailor-1',
    tailorName: 'Master Mohammad Riaz',
    atelierName: 'Royal Heritage Bespoke',
    city: 'Delhi',
    gender: 'Men',
    attireType: 'Indian',
    garmentType: 'Sherwani',
    startingPrice: 11500,
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
    likesCount: 420,
    fabric: 'Raw Silk & Mulmul',
    turnaroundDays: '12-14 days',
    tags: ['Wedding', 'Royal', 'Zardozi', 'Imperial']
  },
  {
    id: 'gal-2',
    title: 'Bespoke Satin Shawl Lapel Tuxedo',
    tailorId: 'tailor-2',
    tailorName: 'Ananya Shroff',
    atelierName: 'The Golden Needle Boutique',
    city: 'Mumbai',
    gender: 'Men',
    attireType: 'Western',
    garmentType: 'Tuxedo',
    startingPrice: 8500,
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80',
    likesCount: 290,
    fabric: 'Super 130s Merino Wool',
    turnaroundDays: '8-10 days',
    tags: ['Black Tie', 'Formal', 'Savile Row Cut', 'Evening']
  },
  {
    id: 'gal-3',
    title: 'Bridal Crimson Banarasi Silk Lehenga',
    tailorId: 'tailor-1',
    tailorName: 'Master Mohammad Riaz',
    atelierName: 'Royal Heritage Bespoke',
    city: 'Delhi',
    gender: 'Women',
    attireType: 'Indian',
    garmentType: 'Lehenga',
    startingPrice: 14000,
    imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80',
    likesCount: 512,
    fabric: 'Pure Katan Silk & Zari',
    turnaroundDays: '16-20 days',
    tags: ['Bridal', 'Banarasi', 'Heirloom', 'Handloom']
  },
  {
    id: 'gal-4',
    title: 'Royal Rust Gotapatti Sharara Ensemble',
    tailorId: 'tailor-4',
    tailorName: 'Vikramaditya Singh',
    atelierName: 'Urban Stitch Atelier',
    city: 'Jaipur',
    gender: 'Women',
    attireType: 'Indian',
    garmentType: 'Sharara',
    startingPrice: 7800,
    imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80',
    likesCount: 310,
    fabric: 'Chanderi Silk Cotton',
    turnaroundDays: '10-12 days',
    tags: ['Festive', 'Jaipur Royal', 'Sharara', 'Gota']
  },
  {
    id: 'gal-5',
    title: 'Emerald Asymmetrical Couture Gown',
    tailorId: 'tailor-2',
    tailorName: 'Ananya Shroff',
    atelierName: 'The Golden Needle Boutique',
    city: 'Mumbai',
    gender: 'Women',
    attireType: 'Western',
    garmentType: 'Gown',
    startingPrice: 9500,
    imageUrl: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=80',
    likesCount: 265,
    fabric: 'Mulberry Silk Georgette',
    turnaroundDays: '9-12 days',
    tags: ['Red Carpet', 'Cocktail', 'Draped', 'Minimal']
  },
  {
    id: 'gal-6',
    title: 'Pure Sage Linen Nehru Waistcoat',
    tailorId: 'tailor-3',
    tailorName: 'Devendra Rao',
    atelierName: 'Sutra Threads Lab',
    city: 'Bengaluru',
    gender: 'Men',
    attireType: 'Indian',
    garmentType: 'Nehru Jacket',
    startingPrice: 4500,
    imageUrl: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=900&q=80',
    likesCount: 184,
    fabric: 'Belgian Linen',
    turnaroundDays: '6-8 days',
    tags: ['Organic', 'Summer Bespoke', 'Contemporary', 'Minimalist']
  },
  {
    id: 'gal-7',
    title: 'Midnight Jodhpuri Bandhgala Ensemble',
    tailorId: 'tailor-1',
    tailorName: 'Master Mohammad Riaz',
    atelierName: 'Royal Heritage Bespoke',
    city: 'Delhi',
    gender: 'Men',
    attireType: 'Indian',
    garmentType: 'Bandhgala',
    startingPrice: 8500,
    imageUrl: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=900&q=80',
    likesCount: 395,
    fabric: 'Super 120s Wool Silk',
    turnaroundDays: '10-12 days',
    tags: ['Royal', 'Formal', 'Jodhpuri', 'Heritage']
  },
  {
    id: 'gal-8',
    title: 'Awadhi Chikankari Georgette Anarkali',
    tailorId: 'tailor-5',
    tailorName: 'Begum Parveen & Sons',
    atelierName: 'Heritage Loom Studio',
    city: 'Lucknow',
    gender: 'Women',
    attireType: 'Indian',
    garmentType: 'Anarkali',
    startingPrice: 8900,
    imageUrl: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=900&q=80',
    likesCount: 440,
    fabric: 'Lucknowi Georgette',
    turnaroundDays: '12-14 days',
    tags: ['Chikankari', 'Awadhi', 'Nawabi', 'Handcrafted']
  }
];

export const INITIAL_ORDERS: OrderItem[] = [
  {
    id: 'ord-101',
    customerId: 'cust-1',
    customerName: 'Mahi Suryavanshi',
    customerCity: 'Delhi',
    tailorId: 'tailor-1',
    tailorName: 'Master Mohammad Riaz',
    atelierName: 'Royal Heritage Bespoke',
    tailorCity: 'Delhi',
    garmentTitle: 'Imperial Ivory Sherwani with Antique Resham',
    designSpecs: {
      gender: 'Men',
      attireType: 'Indian',
      garmentType: 'Sherwani',
      fabric: 'Banarasi Pure Katan Silk',
      color: 'Ivory & Warm Champagne',
      pattern: 'Tone-on-tone French Knots & Floral Vines',
      sleeveStyle: 'Full Sleeve with Churidar Gathers',
      neckline: 'High Mandarin Collar',
      length: 'Below Knee (44 in)',
      fit: 'Structured Bespoke Cut',
      embroidery: 'Hand Zardozi with Bullion Wire',
      buttons: 'Artisanal Hammered Brass with Gold Wash',
      border: 'Fine antique zari cord',
      specialInstructions: 'Need 1.5 inch room around armhole for high flexibility during wedding rituals.',
      occasion: 'Brother’s Royal Wedding',
      clientBudget: 8000
    },
    referenceImages: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
    ],
    measurementsSummary: 'Chest: 36in, Shoulder: 14.5in, Length: 44in, Waist: 28in',
    stage: 'NEGOTIATION',
    currentQuote: 8000,
    initialQuote: 8500,
    negotiationStatus: 'IN_NEGOTIATION',
    negotiationHistory: [
      {
        id: 'neg-1',
        senderRole: 'TAILOR',
        senderName: 'Master Mohammad Riaz',
        amount: 8500,
        note: 'Initial bespoke quote including hand-cut canvas chest piece, double mulmul lining, and brass buttons.',
        timestamp: 'Yesterday at 3:15 PM',
        status: 'COUNTERED'
      },
      {
        id: 'neg-2',
        senderRole: 'CUSTOMER',
        senderName: 'Mahi Suryavanshi',
        amount: 7500,
        note: 'Would you be able to do this for ₹7,500? I will provide the matching pocket square.',
        timestamp: 'Yesterday at 4:30 PM',
        status: 'COUNTERED'
      },
      {
        id: 'neg-3',
        senderRole: 'TAILOR',
        senderName: 'Master Mohammad Riaz',
        amount: 8000,
        note: 'I can do ₹8,000 including two trial fitting sessions and bespoke sleeve alterations.',
        timestamp: 'Today at 10:20 AM',
        status: 'PENDING'
      }
    ],
    trialDate: '2026-10-14',
    deliveryEstimatedDate: '2026-10-20',
    createdAt: '2026-10-05',
    updatedAt: '2026-10-07'
  },
  {
    id: 'ord-102',
    customerId: 'cust-2',
    customerName: 'Mansi Jha',
    customerCity: 'Mumbai',
    tailorId: 'tailor-2',
    tailorName: 'Ananya Shroff',
    atelierName: 'The Golden Needle Boutique',
    tailorCity: 'Mumbai',
    garmentTitle: 'Sculpted Champagne Tuxedo Jacket',
    designSpecs: {
      gender: 'Women',
      attireType: 'Western',
      garmentType: 'Tuxedo',
      fabric: 'Super 130s Merino Wool',
      color: 'Champagne & Midnight Black',
      pattern: 'Solid Minimalist',
      sleeveStyle: 'Full Sleeve with French Cuffs',
      neckline: 'Satin Shawl Lapel',
      length: 'Hip Length (28 in)',
      fit: 'Fitted Hourglass Silhouette',
      buttons: 'Concealed Royal Placket',
      specialInstructions: 'Padded shoulder structure with light roping.',
      occasion: 'Art Gala Reception',
      clientBudget: 9000
    },
    referenceImages: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80'
    ],
    measurementsSummary: 'Chest: 34in, Waist: 26in, Shoulder: 15in',
    stage: 'CUTTING_STITCHING',
    currentQuote: 9200,
    initialQuote: 9800,
    agreedPrice: 9200,
    negotiationStatus: 'PRICE_AGREED',
    negotiationHistory: [
      {
        id: 'neg-4',
        senderRole: 'TAILOR',
        senderName: 'Ananya Shroff',
        amount: 9800,
        note: 'Initial atelier quote for pure merino wool tuxedo.',
        timestamp: '2026-09-29',
        status: 'COUNTERED'
      },
      {
        id: 'neg-5',
        senderRole: 'CUSTOMER',
        senderName: 'Mansi Jha',
        amount: 9000,
        note: 'Can we round to ₹9,000 for full suit with trousers?',
        timestamp: '2026-09-30',
        status: 'COUNTERED'
      },
      {
        id: 'neg-6',
        senderRole: 'TAILOR',
        senderName: 'Ananya Shroff',
        amount: 9200,
        note: 'Agreed at ₹9,200 with complimentary satin hanger & garment bag.',
        timestamp: '2026-09-30',
        status: 'ACCEPTED'
      }
    ],
    trialDate: '2026-10-10',
    deliveryEstimatedDate: '2026-10-16',
    paymentStatus: 'ADVANCE_PAID',
    paidAmount: 4600,
    transactions: [
      {
        id: 'TXN-STICH-40291',
        orderId: 'ord-102',
        garmentTitle: 'Sculpted Champagne Tuxedo Jacket',
        customerId: 'cust-2',
        customerName: 'Mansi Jha',
        tailorId: 'tailor-2',
        tailorName: 'Ananya Shroff',
        atelierName: 'The Golden Needle Boutique',
        amount: 4600,
        paymentType: 'ADVANCE_50_PERCENT',
        paymentMethod: 'UPI',
        paymentDetails: {
          upiId: 'mansi.jha@okhdfcbank'
        },
        gstAmount: 230,
        platformCommission: 460,
        artisanPayoutAmount: 4140,
        status: 'HELD_IN_ESCROW',
        escrowReleaseConditions: 'Held in Escrow Vault until Trial Fitting scheduled for 10 Oct 2026',
        timestamp: '2026-09-30 04:15 PM'
      }
    ],
    createdAt: '2026-09-28',
    updatedAt: '2026-10-06'
  }
];

export const INITIAL_TRANSACTIONS: BespokeTransaction[] = [
  {
    id: 'TXN-STICH-40291',
    orderId: 'ord-102',
    garmentTitle: 'Sculpted Champagne Tuxedo Jacket',
    customerId: 'cust-2',
    customerName: 'Mansi Jha',
    tailorId: 'tailor-2',
    tailorName: 'Ananya Shroff',
    atelierName: 'The Golden Needle Boutique',
    amount: 4600,
    paymentType: 'ADVANCE_50_PERCENT',
    paymentMethod: 'UPI',
    paymentDetails: {
      upiId: 'mansi.jha@okhdfcbank'
    },
    gstAmount: 230,
    platformCommission: 460,
    artisanPayoutAmount: 4140,
    status: 'HELD_IN_ESCROW',
    escrowReleaseConditions: 'Held in Escrow Vault until Trial Fitting scheduled for 10 Oct 2026',
    timestamp: '2026-09-30 04:15 PM'
  },
  {
    id: 'TXN-STICH-39820',
    orderId: 'ord-098',
    garmentTitle: 'Antique Zardozi Velvet Bandhgala',
    customerId: 'cust-1',
    customerName: 'Mahi Suryavanshi',
    tailorId: 'tailor-1',
    tailorName: 'Master Mohammad Riaz',
    atelierName: 'Royal Heritage Bespoke',
    amount: 8200,
    paymentType: 'FULL_PAYMENT',
    paymentMethod: 'CARD',
    paymentDetails: {
      cardLast4: '4192'
    },
    gstAmount: 410,
    platformCommission: 820,
    artisanPayoutAmount: 7380,
    status: 'RELEASED_TO_TAILOR',
    escrowReleaseConditions: 'Fitting completed and verified by client. Payout released to atelier bank account.',
    timestamp: '2026-09-14 02:40 PM'
  }
];

export const INITIAL_CONVERSATIONS: ChatConversation[] = [
  {
    id: 'conv-1',
    orderId: 'ord-101',
    customerId: 'cust-1',
    customerName: 'Mahi Suryavanshi',
    customerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    tailorId: 'tailor-1',
    tailorName: 'Master Mohammad Riaz',
    atelierName: 'Royal Heritage Bespoke',
    tailorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    lastMessage: 'I can do ₹8,000 including two trial fitting sessions and bespoke sleeve alterations.',
    lastTimestamp: '10:20 AM',
    unreadCount: 1,
    messages: [
      {
        id: 'msg-1',
        orderId: 'ord-101',
        senderId: 'cust-1',
        senderRole: 'CUSTOMER',
        senderName: 'Mahi Suryavanshi',
        text: 'Namaste Master Riaz ji! I have submitted a bespoke request for an ivory raw silk Sherwani for my brother’s wedding in Delhi.',
        timestamp: 'Yesterday, 2:45 PM'
      },
      {
        id: 'msg-2',
        orderId: 'ord-101',
        senderId: 'tailor-1',
        senderRole: 'TAILOR',
        senderName: 'Master Mohammad Riaz',
        text: 'Adaab Mahi ji! Delighted to assist. I reviewed your silhouette and reference images. Banarasi raw silk with French knot zardozi will look truly majestic.',
        timestamp: 'Yesterday, 3:15 PM',
        quotePayload: {
          amount: 8500,
          note: 'Initial quote: ₹8,500 with hand-cut canvas chest piece, double mulmul lining, and brass buttons.',
          status: 'COUNTERED'
        }
      },
      {
        id: 'msg-3',
        orderId: 'ord-101',
        senderId: 'cust-1',
        senderRole: 'CUSTOMER',
        senderName: 'Mahi Suryavanshi',
        text: 'Would you be able to do this for ₹7,500? I already have the matching silk pocket square and safa cloth.',
        timestamp: 'Yesterday, 4:30 PM',
        quotePayload: {
          amount: 7500,
          note: 'Customer counter offer: ₹7,500',
          status: 'COUNTERED'
        }
      },
      {
        id: 'msg-4',
        orderId: 'ord-101',
        senderId: 'tailor-1',
        senderRole: 'TAILOR',
        senderName: 'Master Mohammad Riaz',
        text: 'I can do ₹8,000 including two trial fitting sessions at our Chandni Chowk atelier and fine sleeve alterations. How does that sound?',
        timestamp: 'Today, 10:20 AM',
        quotePayload: {
          amount: 8000,
          note: 'Tailor counter-offer: ₹8,000 (Includes 2 fittings & alterations)',
          status: 'PENDING'
        }
      }
    ]
  },
  {
    id: 'conv-2',
    orderId: 'ord-102',
    customerId: 'cust-2',
    customerName: 'Mansi Jha',
    customerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    tailorId: 'tailor-2',
    tailorName: 'Ananya Shroff',
    atelierName: 'The Golden Needle Boutique',
    tailorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    lastMessage: 'Fabric has arrived from the mill! Cutting starts today. Trial scheduled for Oct 10.',
    lastTimestamp: 'Yesterday',
    unreadCount: 0,
    messages: [
      {
        id: 'msg-5',
        orderId: 'ord-102',
        senderId: 'cust-2',
        senderRole: 'CUSTOMER',
        senderName: 'Mansi Jha',
        text: 'Hi Ananya! Super excited for the champagne tuxedo. Did the Super 130s fabric arrive?',
        timestamp: 'Yesterday, 11:10 AM'
      },
      {
        id: 'msg-6',
        orderId: 'ord-102',
        senderId: 'tailor-2',
        senderRole: 'TAILOR',
        senderName: 'Ananya Shroff',
        text: 'Fabric has arrived from the mill! Cutting starts today. Trial scheduled for Oct 10 at our Pali Hill studio.',
        timestamp: 'Yesterday, 11:45 AM'
      }
    ]
  }
];
