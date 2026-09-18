import { Router } from 'express';
import { ProductController } from '../controllers/productController';
import { RecommendController } from '../controllers/recommendController';
import { AuthController } from '../controllers/authController';
import { CommerceController } from '../controllers/commerceController';

const router = Router();

// Customer and administrator access
router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);
router.get('/auth/me', AuthController.me);
router.post('/auth/logout', AuthController.logout);
router.get('/admin/users', AuthController.adminUsers);
router.get('/admin/overview', AuthController.adminOverview);
router.patch('/admin/users/:id/status', AuthController.updateUserStatus);
router.get('/cart', CommerceController.cart);
router.put('/cart', CommerceController.updateCart);
router.post('/checkout', CommerceController.checkout);
router.get('/orders', CommerceController.orders);
router.get('/wishlist', CommerceController.wishlist);
router.post('/wishlist/:productId', CommerceController.toggleWishlist);
router.get('/products/:productId/reviews', CommerceController.reviews);
router.post('/products/:productId/reviews', CommerceController.addReview);
router.get('/admin/orders', CommerceController.adminOrders);
router.get('/admin/products', CommerceController.adminProducts);
router.patch('/admin/orders/:id', CommerceController.updateOrder);

// Products catalog & details
router.get('/products', ProductController.getProducts);
router.get('/products/:id', ProductController.getProductById);

// Categories
router.get('/categories', ProductController.getCategories);

// Recommendations (Core AI Case Study Logic)
router.post('/recommend', RecommendController.recommend);

// Dashboard analytics stats
router.get('/stats', ProductController.getStats);

// Health check
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    agent: 'Intelligent Online Shopping Agent',
    version: '1.0.0',
    capabilities: ['Utility Scoring', 'Multi-Attribute Decision Making', 'Filtering', 'Ranking'],
  });
});

export default router;
