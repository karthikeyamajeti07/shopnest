import { Request, Response } from 'express';
import { sampleProducts } from '../database/productsData';
import { RecommendationEngine, CustomerPreferences } from '../services/recommendationEngine';
import { analyticsStore } from '../database/analyticsStore';

export class RecommendController {
  /**
   * POST /api/recommend
   */
  public static recommend(req: Request, res: Response): void {
    try {
      const {
        category,
        maxBudget,
        minRating,
        maxDeliveryDays,
        availability,
        quality,
        priority,
      } = req.body;

      // Validation
      if (!category || typeof category !== 'string') {
        res.status(400).json({
          success: false,
          message: 'Product category is required and must be selected.',
        });
        return;
      }

      const budgetNum = Number(maxBudget);
      if (isNaN(budgetNum) || budgetNum <= 0) {
        res.status(400).json({
          success: false,
          message: 'Please provide a valid positive budget amount in Indian Rupees (₹).',
        });
        return;
      }

      const ratingNum = Number(minRating);
      if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
        res.status(400).json({
          success: false,
          message: 'Minimum rating must be a valid number between 1.0 and 5.0.',
        });
        return;
      }

      const deliveryNum = Number(maxDeliveryDays);
      if (isNaN(deliveryNum) || deliveryNum < 1 || deliveryNum > 30) {
        res.status(400).json({
          success: false,
          message: 'Maximum delivery days must be between 1 and 30.',
        });
        return;
      }

      const validAvailability = availability === 'In Stock' || availability === 'Any' ? availability : 'Any';
      const validQuality = ['Low', 'Medium', 'High'].includes(quality) ? quality : 'Medium';
      const validPriority = [
        'Low Price',
        'High Rating',
        'Fast Delivery',
        'High Quality',
        'Overall Balance',
      ].includes(priority)
        ? priority
        : 'Overall Balance';

      const preferences: CustomerPreferences = {
        category,
        maxBudget: budgetNum,
        minRating: ratingNum,
        maxDeliveryDays: deliveryNum,
        availability: validAvailability,
        quality: validQuality,
        priority: validPriority,
      };

      const result = RecommendationEngine.evaluate(sampleProducts, preferences);

      // Track analytics
      const topRec = result.recommendations.length > 0
        ? { name: result.recommendations[0].product.name, score: result.recommendations[0].utilityScore }
        : undefined;

      analyticsStore.recordRequest(preferences.category, preferences.maxBudget, preferences.priority, topRec);

      res.status(200).json(result);
    } catch (error) {
      console.error('Error executing recommendation engine:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error during recommendation computation',
      });
    }
  }
}
