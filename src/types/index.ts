export type ProductCategory =
  | 'Smartphones'
  | 'Laptops'
  | 'Headphones'
  | 'Smart Watches'
  | 'Shoes'
  | 'Cameras';

export interface Product {
  id: number;
  name: string;
  category: ProductCategory;
  price: number;
  rating: number;
  availability: 'In Stock' | 'Out of Stock';
  deliveryDays: number;
  quality: number; // 1-10 scale
  qualityTier: 'Low' | 'Medium' | 'High';
  description: string;
  brand: string;
  image: string;
  specs: Record<string, string>;
  features: string[];
}

export type CustomerPriority =
  | 'Low Price'
  | 'High Rating'
  | 'Fast Delivery'
  | 'High Quality'
  | 'Overall Balance';

export interface CustomerPreferences {
  category: string;
  maxBudget: number;
  minRating: number;
  maxDeliveryDays: number;
  availability: 'In Stock' | 'Any';
  quality: 'Low' | 'Medium' | 'High';
  priority: CustomerPriority;
}

export interface ScoreBreakdown {
  priceScore: number;
  ratingScore: number;
  availabilityScore: number;
  deliveryScore: number;
  qualityScore: number;
  preferenceScore: number;
  totalScore: number;
  maxScores: {
    price: 20;
    rating: 20;
    availability: 10;
    delivery: 10;
    quality: 10;
    preference: 30;
    total: 100;
  };
}

export interface RecommendationResult {
  product: Product;
  utilityScore: number;
  scoreBreakdown: ScoreBreakdown;
  reason: string;
  rank: number;
}

export interface RecommendationResponse {
  success: boolean;
  category: string;
  totalCatalogCount: number;
  categoryMatchesCount: number;
  filteredCount: number;
  recommendations: RecommendationResult[];
  unsuitableSample?: {
    productName: string;
    filterReason: string;
  }[];
  appliedWeights: {
    preferenceWeight: string;
    priceWeight: string;
    ratingWeight: string;
    availabilityWeight: string;
    deliveryWeight: string;
    qualityWeight: string;
  };
}

export interface DashboardStats {
  totalProducts: number;
  inStockCount: number;
  outOfStockCount: number;
  totalCategories: number;
  averageRating: number;
  averageDeliveryDays: number;
  totalRecommendationRequests: number;
  categoryCounts: Record<string, number>;
  priorityCounts: Record<string, number>;
  recentLogs: {
    id: string;
    timestamp: string;
    category: string;
    maxBudget: number;
    priority: string;
    topProductName: string;
    topProductScore: number;
  }[];
}

export type ActiveTab =
  | 'home'
  | 'recommend'
  | 'catalog'
  | 'compare'
  | 'peas'
  | 'environment'
  | 'agent-architecture'
  | 'dashboard'
  | 'login'
  | 'account'
  | 'admin'
  | 'cart';

export type UserRole = 'customer' | 'admin';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'Active' | 'Suspended';
  joinedAt: string;
  lastLoginAt?: string;
  orders: number;
}

export interface CartItem { productId: number; quantity: number; }
export interface OrderItem extends CartItem { name: string; price: number; image: string; }
export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
export interface Order { id: string; userId: string; items: OrderItem[]; total: number; address: string; status: OrderStatus; createdAt: string; }
export interface Review { id: string; userId: string; productId: number; rating: number; title: string; body: string; createdAt: string; }
export interface AdminProduct extends Product { inventory: number; }

export interface AdminOverview {
  totalUsers: number;
  activeUsers: number;
  suspendedUsers: number;
  totalLogins: number;
  totalRegistrations: number;
  activeSessions: number;
}

export interface AuditEvent {
  id: string;
  type: 'REGISTER' | 'LOGIN' | 'LOGOUT' | 'STATUS_CHANGE';
  actorId: string;
  actorEmail: string;
  targetId?: string;
  details: string;
  timestamp: string;
}
