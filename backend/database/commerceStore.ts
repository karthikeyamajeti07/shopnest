import { randomBytes } from 'crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { Product, sampleProducts } from './productsData';

export interface CartItem { productId: number; quantity: number; }
export interface OrderItem extends CartItem { name: string; price: number; image: string; }
export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
export interface Order { id: string; userId: string; items: OrderItem[]; total: number; address: string; status: OrderStatus; createdAt: string; }
export interface WishlistItem { userId: string; productId: number; createdAt: string; }
export interface Review { id: string; userId: string; productId: number; rating: number; title: string; body: string; createdAt: string; }

interface CommerceData { carts: Record<string, CartItem[]>; orders: Order[]; wishlists: WishlistItem[]; reviews: Review[]; }
const dataPath = process.env.COMMERCE_DATA_FILE || path.join(process.cwd(), 'data', 'commerce-data.json');

class CommerceStore {
  private data: CommerceData = this.load();

  getCart(userId: string) { return this.data.carts[userId] || []; }
  setCart(userId: string, items: CartItem[]) { this.data.carts[userId] = items.filter(item => item.quantity > 0); this.save(); return this.getCart(userId); }

  createOrder(userId: string, address: string) {
    const items = this.getCart(userId).map(item => {
      const product = sampleProducts.find(candidate => candidate.id === item.productId);
      if (!product || product.availability !== 'In Stock') throw new Error('One or more cart items are unavailable');
      return { ...item, name: product.name, price: product.price, image: product.image };
    });
    if (!items.length) throw new Error('Your cart is empty');
    const order: Order = { id: `ord-${randomBytes(5).toString('hex')}`, userId, items, total: items.reduce((sum, item) => sum + item.price * item.quantity, 0), address: address.trim(), status: 'Processing', createdAt: new Date().toISOString() };
    this.data.orders.unshift(order);
    this.data.carts[userId] = [];
    this.save();
    return order;
  }

  getOrders(userId?: string) { return userId ? this.data.orders.filter(order => order.userId === userId) : this.data.orders; }
  updateOrderStatus(orderId: string, status: OrderStatus) { const order = this.data.orders.find(candidate => candidate.id === orderId); if (!order) return undefined; order.status = status; this.save(); return order; }

  toggleWishlist(userId: string, productId: number) {
    const index = this.data.wishlists.findIndex(item => item.userId === userId && item.productId === productId);
    if (index >= 0) this.data.wishlists.splice(index, 1);
    else this.data.wishlists.push({ userId, productId, createdAt: new Date().toISOString() });
    this.save();
    return this.getWishlist(userId);
  }
  getWishlist(userId: string) { return this.data.wishlists.filter(item => item.userId === userId).map(item => sampleProducts.find(product => product.id === item.productId)).filter(Boolean) as Product[]; }

  addReview(userId: string, productId: number, rating: number, title: string, body: string) {
    const review: Review = { id: `rev-${randomBytes(5).toString('hex')}`, userId, productId, rating, title: title.trim(), body: body.trim(), createdAt: new Date().toISOString() };
    this.data.reviews.unshift(review); this.save(); return review;
  }
  getReviews(productId: number) { return this.data.reviews.filter(review => review.productId === productId); }

  private load(): CommerceData {
    if (existsSync(dataPath)) return JSON.parse(readFileSync(dataPath, 'utf8')) as CommerceData;
    const initial = { carts: {}, orders: [], wishlists: [], reviews: [] };
    this.write(initial); return initial;
  }
  private save() { this.write(this.data); }
  private write(data: CommerceData) { mkdirSync(path.dirname(dataPath), { recursive: true }); writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8'); }
}

export const commerceStore = new CommerceStore();
