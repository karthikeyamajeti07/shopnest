export interface RecommendationLog {
  id: string;
  timestamp: string;
  category: string;
  maxBudget: number;
  priority: string;
  topProductName: string;
  topProductScore: number;
}

class AnalyticsStore {
  private totalRequests: number = 24; // Initial seeded count for realism
  private categoryCounts: Record<string, number> = {
    'Smartphones': 9,
    'Laptops': 6,
    'Headphones': 4,
    'Smart Watches': 3,
    'Shoes': 1,
    'Cameras': 1,
  };
  private priorityCounts: Record<string, number> = {
    'Overall Balance': 10,
    'Low Price': 5,
    'High Rating': 4,
    'High Quality': 3,
    'Fast Delivery': 2,
  };
  private recentLogs: RecommendationLog[] = [
    {
      id: 'req-001',
      timestamp: new Date(Date.now() - 3600000 * 2).toLocaleTimeString(),
      category: 'Smartphones',
      maxBudget: 30000,
      priority: 'Overall Balance',
      topProductName: 'OnePlus Nord CE4 5G',
      topProductScore: 91,
    },
    {
      id: 'req-002',
      timestamp: new Date(Date.now() - 3600000).toLocaleTimeString(),
      category: 'Headphones',
      maxBudget: 35000,
      priority: 'High Quality',
      topProductName: 'Sony WH-1000XM5 Wireless ANC',
      topProductScore: 94,
    },
    {
      id: 'req-003',
      timestamp: new Date(Date.now() - 1800000).toLocaleTimeString(),
      category: 'Laptops',
      maxBudget: 60000,
      priority: 'High Rating',
      topProductName: 'ASUS Vivobook 16X',
      topProductScore: 89,
    }
  ];

  recordRequest(category: string, maxBudget: number, priority: string, topProduct?: { name: string; score: number }) {
    this.totalRequests++;
    this.categoryCounts[category] = (this.categoryCounts[category] || 0) + 1;
    this.priorityCounts[priority] = (this.priorityCounts[priority] || 0) + 1;

    if (topProduct) {
      this.recentLogs.unshift({
        id: `req-${Date.now().toString().slice(-4)}`,
        timestamp: new Date().toLocaleTimeString(),
        category,
        maxBudget,
        priority,
        topProductName: topProduct.name,
        topProductScore: topProduct.score,
      });
      if (this.recentLogs.length > 20) {
        this.recentLogs.pop();
      }
    }
  }

  getStats(totalProducts: number, inStockCount: number, avgRating: number, avgDelivery: number) {
    return {
      totalProducts,
      inStockCount,
      outOfStockCount: totalProducts - inStockCount,
      totalCategories: Object.keys(this.categoryCounts).length,
      averageRating: Number(avgRating.toFixed(2)),
      averageDeliveryDays: Number(avgDelivery.toFixed(1)),
      totalRecommendationRequests: this.totalRequests,
      categoryCounts: this.categoryCounts,
      priorityCounts: this.priorityCounts,
      recentLogs: this.recentLogs,
    };
  }
}

export const analyticsStore = new AnalyticsStore();
