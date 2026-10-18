export type UserRole = 'CUSTOMER' | 'TAILOR' | 'ADMIN';

export type GenderType = 'Men' | 'Women';
export type AttireType = 'Indian' | 'Western';

export interface MeasurementProfile {
  id: string;
  name: string; // e.g. "My Standard Measurements", "Royal Wedding Measurements"
  gender: GenderType;
  height?: string;
  chest?: string;
  waist?: string;
  hips?: string;
  shoulder?: string;
  sleeveLength?: string;
  inseam?: string;
  neck?: string;
  garmentLength?: string;
  bicep?: string;
  armhole?: string;
  notes?: string;
  updatedAt: string;
}

export interface CustomerUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  role: 'CUSTOMER';
  avatar: string;
  measurementProfiles: MeasurementProfile[];
  savedDesignIds: string[];
  favoriteTailorIds: string[];
}

export interface TailorService {
  id: string;
  title: string;
  garmentType: string;
  startingPrice: number;
  estimatedDays: string;
  description: string;
}

export interface TailorPortfolioItem {
  id: string;
  title: string;
  garmentType: string;
  gender: GenderType;
  attireType: AttireType;
  imageUrl: string;
  description: string;
  priceEstimate: number;
  fabricUsed: string;
  craftDetails: string;
  likes: number;
}

export interface TailorUser {
  id: string;
  name: string;
  atelierName: string;
  email: string;
  phone: string;
  city: string;
  locality: string;
  role: 'TAILOR';
  avatar: string;
  coverImage: string;
  bio: string;
  yearsExperience: number;
  specialties: string[];
  attireExpertise: ('Indian' | 'Western')[];
  genderExpertise: ('Men' | 'Women')[];
  startingPrice: number;
  turnaroundDays: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  status: 'ACTIVE' | 'PENDING_APPROVAL' | 'SUSPENDED';
  ratingBreakdown: {
    craftsmanship: number;
    fit: number;
    communication: number;
    value: number;
    delivery: number;
  };
  availableFabrics: string[];
  services: TailorService[];
  portfolio: TailorPortfolioItem[];
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN';
  title: string;
  avatar: string;
}

export type OrderStage =
  | 'DESIGN_REQUEST'
  | 'QUOTE_REQUESTED'
  | 'NEGOTIATION'
  | 'PRICE_AGREED'
  | 'ORDER_CONFIRMED'
  | 'MEASUREMENTS'
  | 'CUTTING_STITCHING'
  | 'TRIAL'
  | 'ALTERATIONS'
  | 'READY'
  | 'DELIVERED'
  | 'COMPLETED';

export interface QuoteNegotiationEntry {
  id: string;
  senderRole: 'TAILOR' | 'CUSTOMER';
  senderName: string;
  amount: number;
  note?: string;
  timestamp: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'COUNTERED';
}

export interface CustomDesignSpecs {
  gender: GenderType;
  attireType: AttireType;
  garmentType: string;
  fabric: string;
  color: string;
  pattern: string;
  sleeveStyle: string;
  neckline: string;
  length: string;
  fit: string;
  embroidery?: string;
  buttons?: string;
  collar?: string;
  pockets?: string;
  border?: string;
  specialInstructions?: string;
  occasion?: string;
  clientBudget?: number;
}

export type PaymentMethod = 'UPI' | 'CARD' | 'NETBANKING' | 'ESCROW_VAULT';
export type PaymentType = 'FULL_PAYMENT' | 'ADVANCE_50_PERCENT' | 'FINAL_BALANCE';
export type PaymentStatus = 'SUCCESS' | 'HELD_IN_ESCROW' | 'RELEASED_TO_TAILOR' | 'REFUNDED';

export interface BespokeTransaction {
  id: string;
  orderId: string;
  garmentTitle: string;
  customerId: string;
  customerName: string;
  tailorId: string;
  tailorName: string;
  atelierName: string;
  amount: number;
  paymentType: PaymentType;
  paymentMethod: PaymentMethod;
  paymentDetails: {
    upiId?: string;
    cardLast4?: string;
    bankName?: string;
  };
  gstAmount: number;
  platformCommission: number;
  artisanPayoutAmount: number;
  status: PaymentStatus;
  escrowReleaseConditions: string;
  timestamp: string;
}

export interface OrderItem {
  id: string;
  customerId: string;
  customerName: string;
  customerCity: string;
  tailorId: string;
  tailorName: string;
  atelierName: string;
  tailorCity: string;
  garmentTitle: string;
  designSpecs: CustomDesignSpecs;
  referenceImages: string[];
  measurementsSummary?: string;
  stage: OrderStage;
  currentQuote: number;
  initialQuote: number;
  agreedPrice?: number;
  negotiationStatus: 'IN_NEGOTIATION' | 'PRICE_AGREED' | 'DECLINED' | 'PENDING_QUOTE';
  negotiationHistory: QuoteNegotiationEntry[];
  paymentStatus?: 'UNPAID' | 'ADVANCE_PAID' | 'FULLY_PAID';
  paidAmount?: number;
  transactions?: BespokeTransaction[];
  trialDate?: string;
  deliveryEstimatedDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  orderId?: string;
  senderId: string;
  senderRole: UserRole;
  senderName: string;
  text: string;
  timestamp: string;
  image?: string;
  quotePayload?: {
    amount: number;
    note: string;
    status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'COUNTERED';
  };
}

export interface ChatConversation {
  id: string;
  orderId?: string;
  customerId: string;
  customerName: string;
  customerAvatar: string;
  tailorId: string;
  tailorName: string;
  atelierName: string;
  tailorAvatar: string;
  lastMessage: string;
  lastTimestamp: string;
  unreadCount: number;
  messages: ChatMessage[];
}

export interface CustomerReview {
  id: string;
  customerName: string;
  customerCity: string;
  tailorId: string;
  tailorName: string;
  atelierName: string;
  outfitName: string;
  outfitCategory: string;
  rating: number;
  reviewText: string;
  date: string;
  breakdown: {
    craftsmanship: number;
    fit: number;
    communication: number;
    value: number;
    delivery: number;
  };
  verifiedClient: boolean;
  tailorReply?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  tailorId: string;
  tailorName: string;
  atelierName: string;
  city: string;
  gender: GenderType;
  attireType: AttireType;
  garmentType: string;
  startingPrice: number;
  imageUrl: string;
  likesCount: number;
  fabric: string;
  turnaroundDays: string;
  tags: string[];
}
