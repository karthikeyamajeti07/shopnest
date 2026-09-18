import { Product } from '../database/productsData';

export interface CustomerPreferences {
  category: string;
  maxBudget: number;
  minRating: number;
  maxDeliveryDays: number;
  availability: 'In Stock' | 'Any';
  quality: 'Low' | 'Medium' | 'High';
  priority: 'Low Price' | 'High Rating' | 'Fast Delivery' | 'High Quality' | 'Overall Balance';
}

export interface ScoreBreakdown {
  priceScore: number;       // out of 20
  ratingScore: number;      // out of 20
  availabilityScore: number;// out of 10
  deliveryScore: number;    // out of 10
  qualityScore: number;     // out of 10
  preferenceScore: number;  // out of 30
  totalScore: number;       // out of 100
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

export class RecommendationEngine {
  /**
   * Filter and rank products using Utility Theory (Multi-Attribute Utility Analysis)
   */
  public static evaluate(
    products: Product[],
    preferences: CustomerPreferences
  ): RecommendationResponse {
    const categoryProducts = products.filter(
      p => p.category.toLowerCase() === preferences.category.toLowerCase()
    );

    const unsuitableSample: { productName: string; filterReason: string }[] = [];
    const passedProducts: Product[] = [];

    // Step 1: Constraint Filtering (Perception & Pre-filtering)
    for (const product of categoryProducts) {
      if (product.price > preferences.maxBudget) {
        if (unsuitableSample.length < 3) {
          unsuitableSample.push({
            productName: product.name,
            filterReason: `Exceeds max budget (₹${product.price.toLocaleString('en-IN')} > ₹${preferences.maxBudget.toLocaleString('en-IN')})`,
          });
        }
        continue;
      }

      if (product.rating < preferences.minRating) {
        if (unsuitableSample.length < 3) {
          unsuitableSample.push({
            productName: product.name,
            filterReason: `Rating below minimum required (${product.rating}★ < ${preferences.minRating}★)`,
          });
        }
        continue;
      }

      if (product.deliveryDays > preferences.maxDeliveryDays) {
        if (unsuitableSample.length < 3) {
          unsuitableSample.push({
            productName: product.name,
            filterReason: `Delivery time exceeds limit (${product.deliveryDays} days > ${preferences.maxDeliveryDays} days)`,
          });
        }
        continue;
      }

      if (preferences.availability === 'In Stock' && product.availability !== 'In Stock') {
        if (unsuitableSample.length < 3) {
          unsuitableSample.push({
            productName: product.name,
            filterReason: `Currently Out of Stock`,
          });
        }
        continue;
      }

      // Quality filter check:
      if (preferences.quality === 'High' && product.quality < 7) {
        if (unsuitableSample.length < 3) {
          unsuitableSample.push({
            productName: product.name,
            filterReason: `Quality score (${product.quality}/10) is below High quality threshold`,
          });
        }
        continue;
      }

      passedProducts.push(product);
    }

    // Step 2 & 3: Utility Calculation and Ranking
    const evaluatedResults: Omit<RecommendationResult, 'rank'>[] = passedProducts.map(product => {
      const breakdown = this.calculateScoreBreakdown(product, preferences);
      const reason = this.generateExplanation(product, preferences, breakdown);

      return {
        product,
        utilityScore: breakdown.totalScore,
        scoreBreakdown: breakdown,
        reason,
      };
    });

    // Sort descending by utility score
    evaluatedResults.sort((a, b) => b.utilityScore - a.utilityScore);

    // Pick top 3 recommendations
    const top3 = evaluatedResults.slice(0, 3).map((item, index) => ({
      ...item,
      rank: index + 1,
    }));

    return {
      success: true,
      category: preferences.category,
      totalCatalogCount: products.length,
      categoryMatchesCount: categoryProducts.length,
      filteredCount: passedProducts.length,
      recommendations: top3,
      unsuitableSample: unsuitableSample.slice(0, 3),
      appliedWeights: {
        preferenceWeight: '30%',
        priceWeight: '20%',
        ratingWeight: '20%',
        availabilityWeight: '10%',
        deliveryWeight: '10%',
        qualityWeight: '10%',
      },
    };
  }

  /**
   * Normalized Multi-Attribute Utility Function:
   * Total = Price(20) + Rating(20) + Availability(10) + Delivery(10) + Quality(10) + Preference(30)
   */
  public static calculateScoreBreakdown(
    product: Product,
    preferences: CustomerPreferences
  ): ScoreBreakdown {
    // 1. Price Score (Max 20)
    // Products closer to or comfortably under budget get high score
    const budgetRatio = preferences.maxBudget > 0 ? (product.price / preferences.maxBudget) : 1;
    // Base 12 points for being within budget + up to 8 points for remaining savings
    const priceScoreRaw = Math.max(8, Math.min(20, 12 + (1 - budgetRatio) * 10));
    const priceScore = Math.round(priceScoreRaw);

    // 2. Rating Score (Max 20)
    // Normalized based on 1 to 5 scale
    const ratingScoreRaw = (product.rating / 5) * 20;
    const ratingScore = Math.round(ratingScoreRaw);

    // 3. Availability Score (Max 10)
    const availabilityScore = product.availability === 'In Stock' ? 10 : 2;

    // 4. Delivery Score (Max 10)
    let deliveryScore = 5;
    if (product.deliveryDays <= 1) deliveryScore = 10;
    else if (product.deliveryDays === 2) deliveryScore = 9;
    else if (product.deliveryDays === 3) deliveryScore = 8;
    else if (product.deliveryDays === 4) deliveryScore = 6;
    else if (product.deliveryDays === 5) deliveryScore = 5;
    else deliveryScore = 3;

    // 5. Quality Score (Max 10)
    // Product quality is stored as 1-10
    const qualityScore = Math.min(10, Math.max(1, product.quality));

    // 6. Preference Score (Max 30)
    // User-designated priority factor receives 30% weight
    let preferenceScore = 20;
    switch (preferences.priority) {
      case 'Low Price':
        preferenceScore = Math.round((priceScore / 20) * 30);
        break;
      case 'High Rating':
        preferenceScore = Math.round((ratingScore / 20) * 30);
        break;
      case 'Fast Delivery':
        preferenceScore = Math.round((deliveryScore / 10) * 30);
        break;
      case 'High Quality':
        preferenceScore = Math.round((qualityScore / 10) * 30);
        break;
      case 'Overall Balance':
      default: {
        const balancedFraction =
          (priceScore / 20) * 0.25 +
          (ratingScore / 20) * 0.25 +
          (deliveryScore / 10) * 0.25 +
          (qualityScore / 10) * 0.25;
        preferenceScore = Math.round(balancedFraction * 30);
        break;
      }
    }

    const totalScore = Math.min(
      100,
      priceScore + ratingScore + availabilityScore + deliveryScore + qualityScore + preferenceScore
    );

    return {
      priceScore,
      ratingScore,
      availabilityScore,
      deliveryScore,
      qualityScore,
      preferenceScore,
      totalScore,
      maxScores: {
        price: 20,
        rating: 20,
        availability: 10,
        delivery: 10,
        quality: 10,
        preference: 30,
        total: 100,
      },
    };
  }

  /**
   * Transparent Natural Language Explanation of the Agent's Decision
   */
  private static generateExplanation(
    product: Product,
    preferences: CustomerPreferences,
    breakdown: ScoreBreakdown
  ): string {
    const formattedPrice = `₹${product.price.toLocaleString('en-IN')}`;
    const budgetSaving = preferences.maxBudget - product.price;
    const savingNote = budgetSaving > 0 ? `saves ₹${budgetSaving.toLocaleString('en-IN')}` : 'fits right on target';

    let priorityHighlight = '';
    switch (preferences.priority) {
      case 'Low Price':
        priorityHighlight = `strongly favored for its competitive ${formattedPrice} price`;
        break;
      case 'High Rating':
        priorityHighlight = `excels in customer satisfaction with an impressive ${product.rating}★ rating`;
        break;
      case 'Fast Delivery':
        priorityHighlight = `provides rapid dispatch within ${product.deliveryDays} day(s)`;
        break;
      case 'High Quality':
        priorityHighlight = `exhibits premium craftsmanship (${product.quality}/10 quality index)`;
        break;
      case 'Overall Balance':
      default:
        priorityHighlight = `maintains superior harmonic balance across price, rating, and specs`;
        break;
    }

    return `Recommended because it comfortably fits your budget at ${formattedPrice} (${savingNote}), boasts a ${product.rating}★ rating, is ${product.availability.toLowerCase()}, ensures quick ${product.deliveryDays}-day delivery, and ${priorityHighlight}.`;
  }
}
