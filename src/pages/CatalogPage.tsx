import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Star,
  Truck,
  CheckCircle2,
  XCircle,
  Eye,
  Scale,
  Check,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { ApiService } from '../services/api';

interface CatalogPageProps {
  onCompareAdd: (product: Product) => void;
  comparedProductIds: number[];
  onViewProductDetail: (product: Product) => void;
  onQuickRecommendForProduct: (category: string, price: number) => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  onCompareAdd,
  comparedProductIds,
  onViewProductDetail,
  onQuickRecommendForProduct,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters state
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(100000);
  const [minRating, setMinRating] = useState<number>(0);
  const [availability, setAvailability] = useState<string>('Any');
  const [sortBy, setSortBy] = useState<string>('featured');

  const categories: string[] = [
    'All',
    'Smartphones',
    'Laptops',
    'Headphones',
    'Smart Watches',
    'Shoes',
    'Cameras',
  ];

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await ApiService.getProducts({
        category: category !== 'All' ? category : undefined,
        search: search.trim() || undefined,
        minRating: minRating > 0 ? minRating : undefined,
        maxPrice: maxPrice < 100000 ? maxPrice : undefined,
        availability: availability !== 'Any' ? availability : undefined,
        sortBy: sortBy !== 'featured' ? sortBy : undefined,
      });
      setProducts(res.products);
    } catch (err: any) {
      console.error('Error loading products catalog:', err);
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category, minRating, maxPrice, availability, sortBy]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts();
  };

  const handleResetFilters = () => {
    setSearch('');
    setCategory('All');
    setMaxPrice(100000);
    setMinRating(0);
    setAvailability('Any');
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Product Catalog & Dataset
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Browse all 32 curated multi-category products perceived by the intelligent shopping agent.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg border border-indigo-200">
            {products.length} Products Found
          </span>
          <button
            onClick={handleResetFilters}
            className="text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Filter Control Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
        {/* Top search & sorting row */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <form onSubmit={handleSearchSubmit} className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by product name, brand (e.g., Apple, Sony, Nike), or feature..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-24 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer"
            >
              Search
            </button>
          </form>

          <div className="sm:col-span-4">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 font-medium text-slate-700"
            >
              <option value="featured">Sort by: Default Catalog</option>
              <option value="price-low">Sort by: Price (Lowest First)</option>
              <option value="price-high">Sort by: Price (Highest First)</option>
              <option value="rating">Sort by: Rating (Top Rated)</option>
              <option value="delivery">Sort by: Delivery Speed (Fastest)</option>
              <option value="quality">Sort by: Build Quality Tier</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-500 mr-2 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            Category:
          </span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                category === cat
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Secondary Filters: Rating & Availability & Price */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100 text-xs">
          <div>
            <label className="text-slate-500 font-medium block mb-1">
              Minimum Rating: <strong className="text-slate-800">{minRating > 0 ? `${minRating}★` : 'Any'}</strong>
            </label>
            <div className="flex gap-1">
              {[0, 4.0, 4.3, 4.6].map(r => (
                <button
                  key={r}
                  onClick={() => setMinRating(r)}
                  className={`flex-1 py-1 text-xs font-semibold rounded-md border ${
                    minRating === r
                      ? 'bg-amber-50 border-amber-400 text-amber-900'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {r === 0 ? 'All' : `${r}★+`}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-slate-500 font-medium block mb-1">
              Availability Filter:
            </label>
            <select
              value={availability}
              onChange={e => setAvailability(e.target.value)}
              className="w-full px-2.5 py-1 text-xs bg-slate-50 border border-slate-300 rounded-lg"
            >
              <option value="Any">All Items (In & Out of Stock)</option>
              <option value="In Stock">In Stock Only</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between text-slate-500 font-medium mb-1">
              <span>Max Price:</span>
              <span className="font-bold text-slate-800 font-mono">
                {maxPrice >= 100000 ? 'No Limit' : `₹${maxPrice.toLocaleString('en-IN')}`}
              </span>
            </div>
            <input
              type="range"
              min={2000}
              max={100000}
              step={2000}
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <div className="w-10 h-10 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-500">Querying product database...</p>
        </div>
      ) : error ? (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-center text-xs text-rose-700">
          {error}
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-3">
          <p className="text-sm font-bold text-slate-700">No products match the selected criteria.</p>
          <p className="text-xs text-slate-500">Try broadening your search keyword or relaxing the price/rating filters.</p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map(product => {
            const isCompared = comparedProductIds.includes(product.id);
            return (
              <div
                key={product.id}
                className="bg-white border border-slate-200 hover:border-indigo-300 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Image container */}
                  <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold bg-slate-900/80 text-white rounded">
                      {product.brand}
                    </span>
                    <span
                      className={`absolute top-2 right-2 px-2 py-0.5 text-[10px] font-bold rounded ${
                        product.availability === 'In Stock'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-700 text-slate-200'
                      }`}
                    >
                      {product.availability}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-0.5">
                        <span>{product.category}</span>
                        <span className="font-semibold text-amber-600 flex items-center gap-0.5">
                          ⭐ {product.rating}
                        </span>
                      </div>
                      <h3 className="font-bold text-sm text-slate-900 line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Price and Speed badges */}
                    <div className="flex items-baseline justify-between pt-1 border-t border-slate-100">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-semibold block">Price</span>
                        <span className="font-extrabold text-base text-slate-900 font-mono">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 uppercase font-semibold block">Delivery</span>
                        <span className="text-xs font-semibold text-purple-700 flex items-center justify-end gap-1">
                          <Truck className="w-3 h-3" />
                          {product.deliveryDays}d
                        </span>
                      </div>
                    </div>

                    {/* Quality & Specs snippet */}
                    <div className="bg-slate-50 border border-slate-200/80 p-2 rounded-lg text-[11px] text-slate-600 flex justify-between items-center">
                      <span>Quality Index:</span>
                      <span className="font-bold text-emerald-700">
                        {product.qualityTier} ({product.quality}/10)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-4 pt-0 space-y-2 border-t border-slate-100 mt-2">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => onViewProductDetail(product)}
                      className="py-1.5 px-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Details</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onCompareAdd(product)}
                      className={`py-1.5 px-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer ${
                        isCompared
                          ? 'bg-emerald-600 text-white'
                          : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200'
                      }`}
                    >
                      {isCompared ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Compared</span>
                        </>
                      ) : (
                        <>
                          <Scale className="w-3 h-3" />
                          <span>Compare</span>
                        </>
                      )}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => onQuickRecommendForProduct(product.category, product.price * 1.2)}
                    className="w-full py-1.5 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50/60 hover:bg-indigo-100/80 rounded-lg flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Evaluate Alternatives with Agent</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
