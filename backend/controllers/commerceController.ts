import { Request, Response } from 'express';
import { authStore } from '../database/authStore';
import { commerceStore } from '../database/commerceStore';
import { sampleProducts } from '../database/productsData';

const userFor = (req: Request, res: Response, role?: 'customer' | 'admin') => {
  const header = req.headers.authorization;
  const user = authStore.getUserByToken(header?.startsWith('Bearer ') ? header.slice(7) : undefined);
  if (!user || (role && user.role !== role)) { res.status(401).json({ success: false, message: 'Authentication required' }); return undefined; }
  return user;
};

export class CommerceController {
  static cart(req: Request, res: Response) { const user = userFor(req, res, 'customer'); if (user) res.json({ success: true, items: commerceStore.getCart(user.id) }); }
  static updateCart(req: Request, res: Response) { const user = userFor(req, res, 'customer'); if (!user) return; const items = Array.isArray(req.body.items) ? req.body.items : []; res.json({ success: true, items: commerceStore.setCart(user.id, items.map((item: { productId: number; quantity: number }) => ({ productId: Number(item.productId), quantity: Math.max(0, Math.min(99, Number(item.quantity))) }))) }); }
  static checkout(req: Request, res: Response) { const user = userFor(req, res, 'customer'); if (!user) return; if (typeof req.body.address !== 'string' || req.body.address.trim().length < 8) { res.status(400).json({ success: false, message: 'A delivery address is required' }); return; } try { res.status(201).json({ success: true, order: commerceStore.createOrder(user.id, req.body.address) }); } catch (error) { res.status(400).json({ success: false, message: (error as Error).message }); } }
  static orders(req: Request, res: Response) { const user = userFor(req, res, 'customer'); if (user) res.json({ success: true, orders: commerceStore.getOrders(user.id) }); }
  static wishlist(req: Request, res: Response) { const user = userFor(req, res, 'customer'); if (user) res.json({ success: true, products: commerceStore.getWishlist(user.id) }); }
  static toggleWishlist(req: Request, res: Response) { const user = userFor(req, res, 'customer'); if (user) res.json({ success: true, products: commerceStore.toggleWishlist(user.id, Number(req.params.productId)) }); }
  static reviews(req: Request, res: Response) { res.json({ success: true, reviews: commerceStore.getReviews(Number(req.params.productId)) }); }
  static addReview(req: Request, res: Response) { const user = userFor(req, res, 'customer'); if (!user) return; const rating = Number(req.body.rating); if (!Number.isInteger(rating) || rating < 1 || rating > 5 || !req.body.title?.trim() || !req.body.body?.trim()) { res.status(400).json({ success: false, message: 'Rating, title, and review text are required' }); return; } res.status(201).json({ success: true, review: commerceStore.addReview(user.id, Number(req.params.productId), rating, req.body.title, req.body.body) }); }
  static adminOrders(req: Request, res: Response) { if (!userFor(req, res, 'admin')) return; res.json({ success: true, orders: commerceStore.getOrders() }); }
  static adminProducts(req: Request, res: Response) { if (!userFor(req, res, 'admin')) return; res.json({ success: true, products: sampleProducts.map(product => ({ ...product, inventory: product.availability === 'In Stock' ? 25 : 0 })) }); }
  static updateOrder(req: Request, res: Response) { if (!userFor(req, res, 'admin')) return; const valid = ['Processing', 'Shipped', 'Delivered', 'Cancelled']; if (!valid.includes(req.body.status)) { res.status(400).json({ success: false, message: 'Invalid order status' }); return; } const order = commerceStore.updateOrderStatus(req.params.id, req.body.status); if (!order) { res.status(404).json({ success: false, message: 'Order not found' }); return; } res.json({ success: true, order }); }
}
