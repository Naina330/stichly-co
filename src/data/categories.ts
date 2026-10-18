export interface CategoryItem {
  id: string;
  name: string;
  gender: 'Men' | 'Women';
  attireType: 'Indian' | 'Western';
  description: string;
  startingPrice: number;
  iconName?: string;
  image: string;
}

export const MEN_INDIAN_CATEGORIES: string[] = [
  'Kurta',
  'Kurta Pajama',
  'Sherwani',
  'Nehru Jacket',
  'Bandhgala',
  'Indo-Western',
  'Pathani',
  'Dhoti / Dhoti Sets',
  'Custom Traditional Wear'
];

export const MEN_WESTERN_CATEGORIES: string[] = [
  'Suit',
  'Tuxedo',
  'Blazer',
  'Formal Shirt',
  'Trousers',
  'Waistcoat',
  'Casual Shirt',
  'Custom Western Wear'
];

export const WOMEN_INDIAN_CATEGORIES: string[] = [
  'Saree',
  'Blouse',
  'Lehenga',
  'Salwar Suit',
  'Anarkali',
  'Kurti',
  'Sharara',
  'Gharara',
  'Palazzo Set',
  'Dupatta',
  'Indo-Western',
  'Custom Traditional Wear'
];

export const WOMEN_WESTERN_CATEGORIES: string[] = [
  'Dress',
  'Gown',
  'Jumpsuit',
  'Skirt',
  'Blazer',
  'Pants',
  'Formal Wear',
  'Party Wear',
  'Custom Western Wear'
];

export const INDIAN_CITIES = [
  'All Cities',
  'Delhi',
  'Noida',
  'Gurugram',
  'Jaipur',
  'Mumbai',
  'Bengaluru',
  'Lucknow',
  'Chandigarh',
  'Kolkata',
  'Hyderabad'
];

export const FABRIC_OPTIONS = [
  { name: 'Banarasi Brocade & Katan Silk', tags: ['Royal', 'Wedding', 'Winter/Festive'], description: 'Rich metallic gold & silver zari motifs woven into pure mulberry silk.' },
  { name: 'Pure Raw Silk / Chanderi', tags: ['Crisp Drape', 'Festive', 'All Seasons'], description: 'Textured natural sheen, structured silhouette, high breathability.' },
  { name: 'Super 130s Italian Wool', tags: ['Suits & Blazers', 'Wrinkle Resistant', 'Luxury'], description: 'Impeccable drape for Bandhgalas, Tuxedos, and bespoke suits.' },
  { name: 'Pure Lucknowi Chikankari Georgette', tags: ['Heritage Handwork', 'Ethereal', 'Summer/Evening'], description: 'Delicate hand needlework featuring Bakhiya and Tepchi stiches.' },
  { name: 'Pure Belgian Linen', tags: ['Minimalist', 'Summer', 'Organic'], description: 'Crisp, airy luxury fiber perfect for bespoke Nehru jackets & Pathanis.' },
  { name: 'Crushed Silk Velvet', tags: ['Opulent', 'Regal', 'Winter Gala'], description: 'Plush hand-feel, deep light absorption for evening Bandhgalas & Sherwanis.' },
  { name: 'Giza Egyptian Cotton', tags: ['Ultra Soft', 'Breathable', 'Daily Bespoke'], description: 'Extra-long staple cotton woven for tailored shirts and daily kurtas.' },
  { name: 'Mulberry Silk Organza', tags: ['Sheer', 'Modern Couture', 'Lightweight'], description: 'Delicate semi-transparent drape with gentle structure for dupattas & capes.' }
];

export const EMBROIDERY_OPTIONS = [
  'None / Clean Tailored Edge',
  'Hand Zardozi with Bullion Wire & French Knots',
  'Royal Gotapatti & Marodi Work',
  'Delicate Resham Thread Embroidery',
  'Tone-on-tone Minimalist Collar Stitching',
  'Authentic Lucknowi Shadow Work (Chikan)',
  'Aari & Mirror Craft Detailing'
];

export const BUTTON_OPTIONS = [
  'Artisanal Hammered Brass with Gold Wash',
  'Handcrafted Fabric Potli Buttons',
  'Natural Horn & Mother-of-Pearl Buttons',
  'Concealed Royal Placket (Hidden Fasteners)',
  'Enamel Inlaid Heritage Buttons'
];

export const SLEEVE_OPTIONS = [
  'Full Sleeve with French Cuffs',
  'Full Sleeve with Churidar Gathers',
  '3/4th Sleeve with Border Cuff',
  'Sleeveless / Cap Sleeve',
  'Bell / Flared Sleeve',
  'Classic Regular Full Sleeve'
];

export const NECKLINE_OPTIONS = [
  'High Mandarin / Angrakha Overlap',
  'Classic Bandhgala Stand Collar',
  'Notch Lapel / Peak Lapel',
  'Sweetheart Neckline with Piping',
  'Elegant Boat Neck',
  'Deep U / V Neck with Inset',
  'Shawl Collar'
];
