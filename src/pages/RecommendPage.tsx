import React, { useState } from 'react';
import {
  Sparkles,
  Sliders,
  DollarSign,
  Star,
  Truck,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Scale,
  Award,
  ChevronDown,
  ChevronUp,
  Info,
  Eye,
  Check,
} from 'lucide-react';
import {
  CustomerPreferences,
  RecommendationResponse,
  RecommendationResult,
  Product,
  CustomerPriority,
} from '../types';
import { ApiService } from '../services/api';

interface RecommendPageProps {
  preferences: CustomerPreferences;
  setPreferences: React.Dispatch<React.SetStateAction<CustomerPreferences>>;
  onCompareAdd: (product: Product) => void;
  comparedProductIds: number[];
  onViewProductDetail: (product: Product) => void;
}

export const RecommendPage: React.FC<RecommendPageProps> = ({
  preferences,
  setPreferences,
  onCompareAdd,
  comparedProductIds,
  onViewProductDetail,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<RecommendationResponse | null>(null);
  const [showScoreExplainer, setShowScoreExplainer] = useState(true);
  const [expandedBreakdownId, setExpandedBreakdownId] = useState<number | null>(null);

  const categories = [
    'Smartphones',
    'Laptops',
    'Headphones',
    'Smart Watches',
    'Shoes',
    'Cameras',
  ];

  const priorities: { id: CustomerPriority; label: string; desc: string }[] = [
    { id: 'Overall Balance', label: 'Overall Balance', desc: 'Harmonically balances cost, reviews, delivery speed, and build quality' },
    { id: 'Low Price', label: 'Low Price', desc: 'Prioritizes maximum monetary savings below your budget ceiling' },
    { id: 'High Rating', label: 'High Rating', desc: 'Weights top customer review scores and verified satisfaction highest' },
    { id: 'Fast Delivery', label: 'Fast Delivery', desc: 'Favors same-day and 1-2 day express shipping dispatches' },
    { id: 'High Quality', label: 'High Quality', desc: 'Favors top-grade hardware specifications and premium material tiers' },
  ];

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);

    // Validation
    if (!preferences.category) {
      setError('Please select a product category.');
      return;
    }

    if (!preferences.maxBudget || preferences.maxBudget <= 0) {
      setError('Please provide a valid maximum budget greater than ₹0.');
      return;
    }

    if (preferences.minRating < 1 || preferences.minRating > 5) {
      setError('Minimum rating must be between 1.0 and 5.0.');
      return;
    }

    setLoading(true);

    try {
      const data = await ApiService.getRecommendations(preferences);
      setResult(data);
      if (data.recommendations.length > 0) {
        setExpandedBreakdownId(data.recommendations[0].product.id);
      }
    } catch (err: any) {
      console.error('Failed to get recommendations:', err);
      setError(
        err.message || 'Unable to connect to the backend recommendation engine. Please verify the server is running.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleQuickBudget = (amount: number) => {
    setPreferences(prev => ({ ...prev, maxBudget: amount }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Multi-Attribute Decision Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Customer Preference Specification
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Specify your constraints and goals. The agent will observe live inventory, filter unviable options, and rank products by utility score.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => {
                setPreferences({
                  category: 'Smartphones',
                  maxBudget: 30000,
                  minRating: 4.0,
                  maxDeliveryDays: 3,
                  availability: 'In Stock',
                  quality: 'High',
                  priority: 'Overall Balance',
                });
                setResult(null);
                setError(null);
              }}
              className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Form on Left, Results on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Preference Input Form Column */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-600" />
              <span>Input Parameters</span>
            </h2>
            <span className="text-[11px] font-medium text-slate-400">Step 1 of 2</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 1. Product Category */}
            <div className="space-y-1.5">
              <label htmlFor="pref-category" className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                1. Product Category <span className="text-rose-500">*</span>
              </label>
              <select
                id="pref-category"
                value={preferences.category}
                onChange={e => setPreferences(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-medium text-slate-800"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Maximum Budget */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="pref-budget" className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                  <span>2. Maximum Budget</span>
                </label>
                <span className="text-sm font-extrabold text-indigo-700 font-mono">
                  ₹{preferences.maxBudget.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                id="pref-budget"
                type="number"
                min={1000}
                max={150000}
                step={500}
                value={preferences.maxBudget}
                onChange={e =>
                  setPreferences(prev => ({ ...prev, maxBudget: Math.max(0, parseInt(e.target.value) || 0) }))
                }
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-slate-800"
              />
              <input
                type="range"
                min={1000}
                max={100000}
                step={1000}
                value={preferences.maxBudget}
                onChange={e => setPreferences(prev => ({ ...prev, maxBudget: Number(e.target.value) }))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              {/* Quick budget chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[15000, 25000, 30000, 50000, 75000].map(amt => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => handleQuickBudget(amt)}
                    className={`px-2 py-0.5 text-[11px] font-semibold rounded-md transition-colors ${
                      preferences.maxBudget === amt
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    ₹{(amt / 1000).toFixed(0)}k
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Minimum Rating */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="pref-rating" className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-500" />
                  <span>3. Minimum Rating</span>
                </label>
                <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                  ⭐ {preferences.minRating.toFixed(1)} & above
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[3.5, 4.0, 4.2, 4.5].map(rate => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => setPreferences(prev => ({ ...prev, minRating: rate }))}
                    className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                      preferences.minRating === rate
                        ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    ★ {rate.toFixed(1)}+
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Maximum Delivery Time */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="pref-delivery" className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-purple-600" />
                  <span>4. Max Delivery Time</span>
                </label>
                <span className="text-xs font-bold text-purple-700">
                  Within {preferences.maxDeliveryDays} days
                </span>
              </div>
              <select
                id="pref-delivery"
                value={preferences.maxDeliveryDays}
                onChange={e => setPreferences(prev => ({ ...prev, maxDeliveryDays: Number(e.target.value) }))}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
              >
                <option value={1}>1 Day (Next-day express)</option>
                <option value={2}>2 Days (Fast delivery)</option>
                <option value={3}>3 Days (Standard transit)</option>
                <option value={5}>5 Days (Flexible transit)</option>
                <option value={7}>7 Days (Any delivery window)</option>
              </select>
            </div>

            {/* 5. Availability & 6. Quality Preference */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label htmlFor="pref-availability" className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                  5. Availability
                </label>
                <select
                  id="pref-availability"
                  value={preferences.availability}
                  onChange={e =>
                    setPreferences(prev => ({ ...prev, availability: e.target.value as 'In Stock' | 'Any' }))
                  }
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl"
                >
                  <option value="In Stock">In Stock Only</option>
                  <option value="Any">Any Availability</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="pref-quality" className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                  6. Quality
                </label>
                <select
                  id="pref-quality"
                  value={preferences.quality}
                  onChange={e =>
                    setPreferences(prev => ({ ...prev, quality: e.target.value as 'Low' | 'Medium' | 'High' }))
                  }
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl"
                >
                  <option value="High">High (8-10)</option>
                  <option value="Medium">Medium (5-7)</option>
                  <option value="Low">Low (Entry-level)</option>
                </select>
              </div>
            </div>

            {/* 7. Customer Preference (Priority Factor - 30% Weight) */}
            <div className="space-y-2 pt-1 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-indigo-600" />
                  <span>7. Customer Priority (30% Weight)</span>
                </label>
                <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                  {preferences.priority}
                </span>
              </div>
              <div className="space-y-1.5">
                {priorities.map(p => (
                  <label
                    key={p.id}
                    className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-all ${
                      preferences.priority === p.id
                        ? 'bg-indigo-50/80 border-indigo-400 text-indigo-950'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="priorityPreference"
                      value={p.id}
                      checked={preferences.priority === p.id}
                      onChange={() => setPreferences(prev => ({ ...prev, priority: p.id }))}
                      className="mt-0.5 accent-indigo-600"
                    />
                    <div className="text-xs">
                      <p className="font-bold">{p.label}</p>
                      <p className="text-slate-500 text-[11px] leading-snug">{p.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              id="get-intelligent-recommendations-btn"
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Computing Utility Matrix...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Get Intelligent Recommendations</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-7 space-y-6">
          {!result && !loading && (
            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-8 sm:p-12 text-center space-y-4">
              <div className="w-14 h-14 bg-indigo-100/80 rounded-2xl flex items-center justify-center mx-auto text-indigo-600">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">
                Awaiting Customer Preferences
              </h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                Click <strong>"Get Intelligent Recommendations"</strong> on the left. The agent will execute constraint filtering and multi-attribute utility calculation.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => handleSubmit()}
                  className="px-5 py-2.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Run Recommendation with Default Parameters</span>
                </button>
              </div>
            </div>
          )}

          {loading && (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-4 shadow-xs">
              <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-800">Agent Reasoning in Progress...</h3>
                <p className="text-xs text-slate-500">
                  Retrieving {preferences.category} catalog • Applying budget & rating filters • Computing 6-factor utility weights
                </p>
              </div>
            </div>
          )}

          {result && (
            <div className="space-y-6 animate-in fade-in-50 duration-300">
              {/* Agent Filter Summary Card */}
              <div className="bg-indigo-950 text-white rounded-2xl p-5 shadow-sm border border-indigo-900">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-indigo-800/80 pb-3">
                  <div>
                    <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                      Decision Outcome
                    </span>
                    <h2 className="text-lg font-bold text-white">
                      Top Recommendations ({result.recommendations.length} Selected)
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 text-xs font-semibold bg-indigo-900/80 text-indigo-200 border border-indigo-700/60 rounded-lg">
                      {result.filteredCount} / {result.categoryMatchesCount} Category Items Viable
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 text-xs">
                  <div>
                    <span className="text-indigo-300 text-[11px]">Category:</span>
                    <p className="font-semibold text-white">{result.category}</p>
                  </div>
                  <div>
                    <span className="text-indigo-300 text-[11px]">Budget Ceiling:</span>
                    <p className="font-semibold text-emerald-400">₹{preferences.maxBudget.toLocaleString('en-IN')}</p>
                  </div>
                  <div>
                    <span className="text-indigo-300 text-[11px]">Priority Factor:</span>
                    <p className="font-semibold text-amber-300">{preferences.priority}</p>
                  </div>
                  <div>
                    <span className="text-indigo-300 text-[11px]">Catalog Searched:</span>
                    <p className="font-semibold text-white">{result.totalCatalogCount} total items</p>
                  </div>
                </div>

                {/* Unsuitable items audit (College Viva Transparency) */}
                {result.unsuitableSample && result.unsuitableSample.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-indigo-900/80 text-[11px] text-indigo-300 space-y-1">
                    <span className="font-semibold text-indigo-200 flex items-center gap-1">
                      <Info className="w-3 h-3 text-amber-400" />
                      Constraint Filter Log (Excluded Candidates):
                    </span>
                    <ul className="list-disc list-inside space-y-0.5 text-indigo-300/90 pl-1">
                      {result.unsuitableSample.map((u, i) => (
                        <li key={i}>
                          <span className="text-white font-medium">{u.productName}:</span> {u.filterReason}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* No Products Found friendly state */}
              {result.recommendations.length === 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center space-y-3">
                  <AlertCircle className="w-8 h-8 text-amber-600 mx-auto" />
                  <h3 className="text-base font-bold text-amber-900">
                    No Products Matched Strict Constraints
                  </h3>
                  <p className="text-xs text-amber-700 max-w-md mx-auto">
                    All products in <strong>{preferences.category}</strong> exceeded your budget of ₹{preferences.maxBudget.toLocaleString('en-IN')} or didn't meet the minimum {preferences.minRating}★ rating.
                  </p>
                  <button
                    onClick={() => {
                      setPreferences(prev => ({ ...prev, maxBudget: prev.maxBudget * 1.5, minRating: 3.8 }));
                      setTimeout(() => handleSubmit(), 50);
                    }}
                    className="px-4 py-2 text-xs font-semibold text-amber-900 bg-amber-200/80 hover:bg-amber-200 rounded-lg transition-colors cursor-pointer"
                  >
                    Relax Budget (+50%) & Retry
                  </button>
                </div>
              )}

              {/* Top Recommended Products Cards */}
              <div className="space-y-6">
                {result.recommendations.map(rec => (
                  <RecommendationCard
                    key={rec.product.id}
                    recommendation={rec}
                    isExpanded={expandedBreakdownId === rec.product.id}
                    onToggleBreakdown={() =>
                      setExpandedBreakdownId(prev => (prev === rec.product.id ? null : rec.product.id))
                    }
                    onCompareAdd={onCompareAdd}
                    isCompared={comparedProductIds.includes(rec.product.id)}
                    onViewDetail={onViewProductDetail}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface RecommendationCardProps {
  recommendation: RecommendationResult;
  isExpanded: boolean;
  onToggleBreakdown: () => void;
  onCompareAdd: (product: Product) => void;
  isCompared: boolean;
  onViewDetail: (product: Product) => void;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  isExpanded,
  onToggleBreakdown,
  onCompareAdd,
  isCompared,
  onViewDetail,
}) => {
  const { product, utilityScore, scoreBreakdown, reason, rank } = recommendation;

  // Rank badge styling
  const rankBadges: Record<number, { title: string; color: string }> = {
    1: { title: '1st Rank • Best Overall Match', color: 'bg-amber-500 text-slate-950 font-bold' },
    2: { title: '2nd Rank • Strong Alternative', color: 'bg-slate-300 text-slate-900 font-bold' },
    3: { title: '3rd Rank • Viable Option', color: 'bg-amber-800 text-amber-100 font-bold' },
  };

  const badge = rankBadges[rank] || { title: `Rank #${rank}`, color: 'bg-slate-200 text-slate-800' };

  return (
    <div className="bg-white border-2 border-slate-200 hover:border-indigo-300 rounded-2xl p-5 sm:p-6 shadow-xs transition-all space-y-5">
      {/* Top Banner: Rank & Utility Score */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 text-xs rounded-md uppercase tracking-wider ${badge.color}`}>
            {badge.title}
          </span>
          <span className="text-xs font-semibold text-slate-400">
            Brand: <strong className="text-slate-700">{product.brand}</strong>
          </span>
        </div>

        <div className="flex items-center gap-1.5 bg-indigo-50 border border-indigo-200/80 px-3 py-1 rounded-xl">
          <span className="text-xs font-bold text-slate-600">Suitability Score:</span>
          <span className="text-base font-extrabold text-indigo-700 font-mono">
            {utilityScore}/100
          </span>
        </div>
      </div>

      {/* Main Product Info: Image + Attributes */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
        <div className="sm:col-span-4 relative rounded-xl overflow-hidden bg-slate-100 border border-slate-200 aspect-4/3 sm:aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          <span className="absolute bottom-2 left-2 px-2 py-0.5 text-[10px] font-bold bg-slate-900/80 text-white rounded backdrop-blur-xs">
            {product.category}
          </span>
        </div>

        <div className="sm:col-span-8 space-y-3">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
              {product.name}
            </h3>
            <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Key Attributes Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
            <div className="bg-slate-50 border border-slate-200 p-2 rounded-lg">
              <span className="text-[10px] text-slate-400 block font-semibold uppercase">Price</span>
              <span className="font-extrabold text-slate-900 font-mono text-sm">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-2 rounded-lg">
              <span className="text-[10px] text-slate-400 block font-semibold uppercase">Rating</span>
              <span className="font-bold text-amber-600 flex items-center gap-1">
                ⭐ {product.rating}
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-2 rounded-lg">
              <span className="text-[10px] text-slate-400 block font-semibold uppercase">Delivery</span>
              <span className="font-semibold text-purple-700">
                {product.deliveryDays} day{product.deliveryDays > 1 ? 's' : ''}
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-2 rounded-lg">
              <span className="text-[10px] text-slate-400 block font-semibold uppercase">Quality</span>
              <span className="font-semibold text-emerald-700">
                {product.qualityTier} ({product.quality}/10)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-0.5 text-[11px] font-bold rounded-md ${
                product.availability === 'In Stock'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}
            >
              {product.availability === 'In Stock' ? 'Available in Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>
      </div>

      {/* Natural Language Reason for Recommendation */}
      <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-3.5 space-y-1">
        <span className="text-[11px] font-bold text-indigo-900 uppercase tracking-wide flex items-center gap-1">
          <Info className="w-3.5 h-3.5 text-indigo-600" />
          Agent Reasoning:
        </span>
        <p className="text-xs text-indigo-950 leading-relaxed font-medium">
          "{reason}"
        </p>
      </div>

      {/* Score Breakdown Accordion (Viva Explainability) */}
      <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
        <button
          type="button"
          onClick={onToggleBreakdown}
          className="w-full px-4 py-2.5 flex items-center justify-between text-left text-xs font-bold text-slate-800 hover:bg-slate-100 transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-indigo-600" />
            <span>Score Breakdown ({utilityScore}/100) — Viva Mathematical Analysis</span>
          </span>
          {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
        </button>

        {isExpanded && (
          <div className="p-4 bg-white border-t border-slate-200 space-y-3 animate-in fade-in-50 duration-200">
            <p className="text-[11px] text-slate-500 leading-snug">
              Normalized utility scores for each decision criteria out of their respective weight ceilings:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-xs">
              {/* Price Score: 18/20 */}
              <div className="space-y-1">
                <div className="flex justify-between font-medium">
                  <span className="text-slate-700">Price Score:</span>
                  <span className="font-bold text-emerald-700">
                    {scoreBreakdown.priceScore}/{scoreBreakdown.maxScores.price}
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-2 rounded-full transition-all"
                    style={{ width: `${(scoreBreakdown.priceScore / scoreBreakdown.maxScores.price) * 100}%` }}
                  />
                </div>
              </div>

              {/* Rating Score: 19/20 */}
              <div className="space-y-1">
                <div className="flex justify-between font-medium">
                  <span className="text-slate-700">Rating Score:</span>
                  <span className="font-bold text-amber-700">
                    {scoreBreakdown.ratingScore}/{scoreBreakdown.maxScores.rating}
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-amber-500 h-2 rounded-full transition-all"
                    style={{ width: `${(scoreBreakdown.ratingScore / scoreBreakdown.maxScores.rating) * 100}%` }}
                  />
                </div>
              </div>

              {/* Availability Score: 10/10 */}
              <div className="space-y-1">
                <div className="flex justify-between font-medium">
                  <span className="text-slate-700">Availability Score:</span>
                  <span className="font-bold text-cyan-700">
                    {scoreBreakdown.availabilityScore}/{scoreBreakdown.maxScores.availability}
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-cyan-500 h-2 rounded-full transition-all"
                    style={{
                      width: `${(scoreBreakdown.availabilityScore / scoreBreakdown.maxScores.availability) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Delivery Score: 9/10 */}
              <div className="space-y-1">
                <div className="flex justify-between font-medium">
                  <span className="text-slate-700">Delivery Score:</span>
                  <span className="font-bold text-purple-700">
                    {scoreBreakdown.deliveryScore}/{scoreBreakdown.maxScores.delivery}
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-purple-500 h-2 rounded-full transition-all"
                    style={{
                      width: `${(scoreBreakdown.deliveryScore / scoreBreakdown.maxScores.delivery) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Quality Score: 9/10 */}
              <div className="space-y-1">
                <div className="flex justify-between font-medium">
                  <span className="text-slate-700">Quality Score:</span>
                  <span className="font-bold text-rose-700">
                    {scoreBreakdown.qualityScore}/{scoreBreakdown.maxScores.quality}
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-rose-500 h-2 rounded-full transition-all"
                    style={{ width: `${(scoreBreakdown.qualityScore / scoreBreakdown.maxScores.quality) * 100}%` }}
                  />
                </div>
              </div>

              {/* Preference Score: 27/30 */}
              <div className="space-y-1">
                <div className="flex justify-between font-medium">
                  <span className="text-slate-700">Customer Preference Score (Priority):</span>
                  <span className="font-bold text-indigo-700">
                    {scoreBreakdown.preferenceScore}/{scoreBreakdown.maxScores.preference}
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-indigo-600 h-2 rounded-full transition-all"
                    style={{
                      width: `${(scoreBreakdown.preferenceScore / scoreBreakdown.maxScores.preference) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Total Formula Check */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-900">
              <span>Total Combined Utility Score:</span>
              <span className="font-mono text-sm text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md">
                {scoreBreakdown.totalScore} / 100
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Card Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <button
          type="button"
          onClick={() => onViewDetail(product)}
          className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View Specifications</span>
        </button>

        <button
          type="button"
          onClick={() => onCompareAdd(product)}
          className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
            isCompared
              ? 'bg-emerald-600 text-white'
              : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200'
          }`}
        >
          {isCompared ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Added to Comparison</span>
            </>
          ) : (
            <>
              <Scale className="w-3.5 h-3.5" />
              <span>Add to Comparison</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
