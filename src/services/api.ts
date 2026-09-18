import {
  CustomerPreferences,
  RecommendationResponse,
  DashboardStats,
  AuthUser,
  UserRole,
  AdminOverview,
  AuditEvent,
  CartItem,
  Order,
  OrderStatus,
  Product,
  Review,
  AdminProduct,
} from '../types';

const API_BASE = '/api';

export class ApiService {
  private static authHeaders(token: string) { return { Authorization: `Bearer ${token}` }; }

  static async getCart(token: string): Promise<{ success: boolean; items: CartItem[] }> {
    const res = await fetch(`${API_BASE}/cart`, { headers: this.authHeaders(token) });
    return res.json();
  }

  static async updateCart(token: string, items: CartItem[]) {
    const res = await fetch(`${API_BASE}/cart`, { method: 'PUT', headers: { ...this.authHeaders(token), 'Content-Type': 'application/json' }, body: JSON.stringify({ items }) });
    const data = await res.json(); if (!res.ok) throw new Error(data.message || 'Unable to update cart'); return data as { success: boolean; items: CartItem[] };
  }

  static async checkout(token: string, address: string): Promise<{ success: boolean; order: Order }> {
    const res = await fetch(`${API_BASE}/checkout`, { method: 'POST', headers: { ...this.authHeaders(token), 'Content-Type': 'application/json' }, body: JSON.stringify({ address }) });
    const data = await res.json(); if (!res.ok) throw new Error(data.message || 'Checkout failed'); return data;
  }

  static async getOrders(token: string): Promise<{ success: boolean; orders: Order[] }> { const res = await fetch(`${API_BASE}/orders`, { headers: this.authHeaders(token) }); return res.json(); }
  static async getWishlist(token: string): Promise<{ success: boolean; products: Product[] }> { const res = await fetch(`${API_BASE}/wishlist`, { headers: this.authHeaders(token) }); return res.json(); }
  static async toggleWishlist(token: string, productId: number) { const res = await fetch(`${API_BASE}/wishlist/${productId}`, { method: 'POST', headers: this.authHeaders(token) }); return res.json() as Promise<{ success: boolean; products: Product[] }>; }
  static async getReviews(productId: number): Promise<{ success: boolean; reviews: Review[] }> { const res = await fetch(`${API_BASE}/products/${productId}/reviews`); return res.json(); }
  static async addReview(token: string, productId: number, review: Pick<Review, 'rating' | 'title' | 'body'>) { const res = await fetch(`${API_BASE}/products/${productId}/reviews`, { method: 'POST', headers: { ...this.authHeaders(token), 'Content-Type': 'application/json' }, body: JSON.stringify(review) }); const data = await res.json(); if (!res.ok) throw new Error(data.message || 'Unable to add review'); return data; }
  static async getAdminOrders(token: string): Promise<{ success: boolean; orders: Order[] }> { const res = await fetch(`${API_BASE}/admin/orders`, { headers: this.authHeaders(token) }); return res.json(); }
  static async getAdminProducts(token: string): Promise<{ success: boolean; products: AdminProduct[] }> { const res = await fetch(`${API_BASE}/admin/products`, { headers: this.authHeaders(token) }); return res.json(); }
  static async updateOrderStatus(token: string, id: string, status: OrderStatus) { const res = await fetch(`${API_BASE}/admin/orders/${id}`, { method: 'PATCH', headers: { ...this.authHeaders(token), 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) }); return res.json(); }
  static async register(payload: { name: string; email: string; password: string }): Promise<{ success: boolean; token: string; user: AuthUser }> {
    return this.authRequest('/auth/register', payload);
  }

  static async login(payload: { email: string; password: string; role?: UserRole }): Promise<{ success: boolean; token: string; user: AuthUser }> {
    return this.authRequest('/auth/login', payload);
  }

  static async getCurrentUser(token: string): Promise<{ success: boolean; user: AuthUser }> {
    const res = await fetch(`${API_BASE}/auth/me`, { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Session expired');
    return data;
  }

  static async logout(token: string) {
    await fetch(`${API_BASE}/auth/logout`, { method: 'POST', headers: { Authorization: `Bearer ${token}` } });
  }

  private static async authRequest(path: string, body: object) {
    const res = await fetch(`${API_BASE}${path}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Authentication failed');
    return data;
  }

  static async getAdminUsers(token: string): Promise<{ success: boolean; users: AuthUser[]; overview: AdminOverview; audit: AuditEvent[] }> {
    const res = await fetch(`${API_BASE}/admin/users`, { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Admin access required');
    return data;
  }

  static async getAdminOverview(token: string): Promise<{ success: boolean; overview: AdminOverview; audit: AuditEvent[] }> {
    const res = await fetch(`${API_BASE}/admin/overview`, { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Admin access required');
    return data;
  }

  static async updateUserStatus(token: string, userId: string, status: AuthUser['status']) {
    const res = await fetch(`${API_BASE}/admin/users/${userId}/status`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ status }) });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Unable to update user');
    return data;
  }
  /**
   * Fetch all products with optional filters
   */
  static async getProducts(params?: {
    category?: string;
    search?: string;
    minRating?: number;
    maxPrice?: number;
    availability?: string;
    sortBy?: string;
  }): Promise<{ success: boolean; count: number; products: Product[] }> {
    const query = new URLSearchParams();
    if (params?.category) query.append('category', params.category);
    if (params?.search) query.append('search', params.search);
    if (params?.minRating) query.append('minRating', params.minRating.toString());
    if (params?.maxPrice) query.append('maxPrice', params.maxPrice.toString());
    if (params?.availability) query.append('availability', params.availability);
    if (params?.sortBy) query.append('sortBy', params.sortBy);

    const url = `${API_BASE}/products${query.toString() ? `?${query.toString()}` : ''}`;
    const res = await fetch(url);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Failed to fetch products: ${res.statusText}`);
    }
    return res.json();
  }

  /**
   * Fetch a single product by ID
   */
  static async getProductById(id: number): Promise<{ success: boolean; product: Product }> {
    const res = await fetch(`${API_BASE}/products/${id}`);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Product not found with ID ${id}`);
    }
    return res.json();
  }

  /**
   * Fetch product categories
   */
  static async getCategories(): Promise<{ success: boolean; categories: { name: string; count: number }[] }> {
    const res = await fetch(`${API_BASE}/categories`);
    if (!res.ok) {
      throw new Error('Failed to load product categories');
    }
    return res.json();
  }

  /**
   * POST Customer preferences to intelligent recommendation engine
   */
  static async getRecommendations(preferences: CustomerPreferences): Promise<RecommendationResponse> {
    const res = await fetch(`${API_BASE}/recommend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preferences),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Recommendation failed: ${res.statusText}`);
    }

    return res.json();
  }

  /**
   * Fetch administrative stats & analytics
   */
  static async getStats(): Promise<{ success: boolean; stats: DashboardStats }> {
    const res = await fetch(`${API_BASE}/stats`);
    if (!res.ok) {
      throw new Error('Failed to load dashboard statistics');
    }
    return res.json();
  }

  /**
   * Health check for system diagnostics
   */
  static async checkHealth(): Promise<{ status: string; agent: string; version: string }> {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) {
      throw new Error('Backend agent server offline');
    }
    return res.json();
  }
}
