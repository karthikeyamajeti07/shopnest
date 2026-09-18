import { Request, Response } from 'express';
import { sampleProducts, Product } from '../database/productsData';
import { analyticsStore } from '../database/analyticsStore';

export class ProductController {
  /**
   * GET /api/products
   * Supports query parameters: category, search, minRating, maxPrice, availability, sortBy
   */
  public static getProducts(req: Request, res: Response): void {
    try {
      const { category, search, minRating, maxPrice, availability, sortBy } = req.query;

      let results: Product[] = [...sampleProducts];

      if (category && typeof category === 'string' && category.toLowerCase() !== 'all') {
        results = results.filter(
          p => p.category.toLowerCase() === category.toLowerCase()
        );
      }

      if (search && typeof search === 'string' && search.trim() !== '') {
        const query = search.toLowerCase().trim();
        results = results.filter(
          p =>
            p.name.toLowerCase().includes(query) ||
            p.brand.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            p.features.some(f => f.toLowerCase().includes(query))
        );
      }

      if (minRating && !isNaN(Number(minRating))) {
        results = results.filter(p => p.rating >= Number(minRating));
      }

      if (maxPrice && !isNaN(Number(maxPrice))) {
        results = results.filter(p => p.price <= Number(maxPrice));
      }

      if (availability && typeof availability === 'string' && availability !== 'Any') {
        results = results.filter(
          p => p.availability.toLowerCase() === availability.toLowerCase()
        );
      }

      // Sorting
      if (sortBy === 'price-low') {
        results.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'price-high') {
        results.sort((a, b) => b.price - a.price);
      } else if (sortBy === 'rating') {
        results.sort((a, b) => b.rating - a.rating);
      } else if (sortBy === 'delivery') {
        results.sort((a, b) => a.deliveryDays - b.deliveryDays);
      } else if (sortBy === 'quality') {
        results.sort((a, b) => b.quality - a.quality);
      }

      res.status(200).json({
        success: true,
        count: results.length,
        products: results,
      });
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error while fetching products',
      });
    }
  }

  /**
   * GET /api/products/:id
   */
  public static getProductById(req: Request, res: Response): void {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'Invalid product ID. Must be a numeric identifier.',
        });
        return;
      }

      const product = sampleProducts.find(p => p.id === id);
      if (!product) {
        res.status(404).json({
          success: false,
          message: `Product with ID ${id} not found in database.`,
        });
        return;
      }

      res.status(200).json({
        success: true,
        product,
      });
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error while retrieving product',
      });
    }
  }

  /**
   * GET /api/categories
   */
  public static getCategories(req: Request, res: Response): void {
    try {
      const categoryMap = new Map<string, number>();
      for (const p of sampleProducts) {
        categoryMap.set(p.category, (categoryMap.get(p.category) || 0) + 1);
      }

      const categories = Array.from(categoryMap.entries()).map(([name, count]) => ({
        name,
        count,
      }));

      res.status(200).json({
        success: true,
        categories,
      });
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error while fetching categories',
      });
    }
  }

  /**
   * GET /api/stats
   */
  public static getStats(req: Request, res: Response): void {
    try {
      const total = sampleProducts.length;
      const inStock = sampleProducts.filter(p => p.availability === 'In Stock').length;
      const avgRating =
        sampleProducts.reduce((acc, p) => acc + p.rating, 0) / (total || 1);
      const avgDelivery =
        sampleProducts.reduce((acc, p) => acc + p.deliveryDays, 0) / (total || 1);

      const stats = analyticsStore.getStats(total, inStock, avgRating, avgDelivery);

      res.status(200).json({
        success: true,
        stats,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error while fetching stats',
      });
    }
  }
}
