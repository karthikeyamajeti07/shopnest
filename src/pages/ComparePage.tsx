import React from 'react';
import {
  Scale,
  Trash2,
  Plus,
  Star,
  CheckCircle2,
  XCircle,
  Truck,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { Product, ActiveTab } from '../types';

interface ComparePageProps {
  comparedProducts: Product[];
  onRemoveFromCompare: (id: number) => void;
  onClearCompare: () => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const ComparePage: React.FC<ComparePageProps> = ({
  comparedProducts,
  onRemoveFromCompare,
  onClearCompare,
  setActiveTab,
}) => {
  // Simple baseline utility score calculator for comparison display
  const calculateBaselineUtility = (p: Product): number => {
    // Normalization out of 100 based on standard baseline
    const priceScore = Math.max(10, Math.min(20, 20 - (p.price / 50000) * 5));
    const ratingScore = (p.rating / 5) * 20;
    const availScore = p.availability === 'In Stock' ? 10 : 2;
    const delivScore = Math.max(3, 10 - p.deliveryDays * 1.2);
    const qualScore = p.quality;
    const prefScore = 25; // Balanced average
    return Math.round(priceScore + ratingScore + availScore + delivScore + qualScore + prefScore);
  };

  // Find best in attributes among compared items
  const bestPrice = comparedProducts.length > 0 ? Math.min(...comparedProducts.map(p => p.price)) : 0;
  const bestRating = comparedProducts.length > 0 ? Math.max(...comparedProducts.map(p => p.rating)) : 0;
  const bestDelivery = comparedProducts.length > 0 ? Math.min(...comparedProducts.map(p => p.deliveryDays)) : 0;
  const bestQuality = comparedProducts.length > 0 ? Math.max(...comparedProducts.map(p => p.quality)) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
            <Scale className="w-3.5 h-3.5" />
            <span>Agent Multi-Product Evaluation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Product Comparison Matrix
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Compare up to 3 candidate products side-by-side across price, rating, availability, delivery, quality, and utility score.
          </p>
        </div>

        {comparedProducts.length > 0 && (
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500">
              {comparedProducts.length} of 3 slots used
            </span>
            <button
              onClick={onClearCompare}
              className="px-3 py-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          </div>
        )}
      </div>

      {/* Comparison View */}
      {comparedProducts.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center space-y-4">
          <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto text-indigo-600">
            <Scale className="w-7 h-7" />
          </div>
          <h2 className="text-lg font-bold text-slate-800">
            No Products Selected for Comparison
          </h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            You can add up to 3 products to compare their attributes and evaluate trade-offs directly from the Recommendation Results or Browse Products catalog.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => setActiveTab('recommend')}
              className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Get Recommendations</span>
            </button>
            <button
              onClick={() => setActiveTab('catalog')}
              className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Browse Catalog
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Comparison Table */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-700 uppercase tracking-wider">
                    <th className="p-4 w-48 sticky left-0 bg-slate-50 z-10">
                      Feature
                    </th>
                    {comparedProducts.map((p, idx) => (
                      <th key={p.id} className="p-4 min-w-[240px] relative">
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                            Product #{idx + 1}
                          </span>
                          <button
                            onClick={() => onRemoveFromCompare(p.id)}
                            className="p-1 text-slate-400 hover:text-rose-600 rounded-md hover:bg-slate-100 transition-colors"
                            title="Remove from comparison"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="space-y-2">
                          <div className="w-24 h-24 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 mx-auto">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <p className="font-bold text-sm text-slate-900 line-clamp-1 text-center">
                            {p.name}
                          </p>
                          <p className="text-[11px] text-slate-400 text-center font-normal">
                            {p.brand} • {p.category}
                          </p>
                        </div>
                      </th>
                    ))}
                    {/* Empty Slots */}
                    {Array.from({ length: 3 - comparedProducts.length }).map((_, idx) => (
                      <th key={`empty-${idx}`} className="p-4 min-w-[220px] bg-slate-50/50 text-center align-middle">
                        <button
                          onClick={() => setActiveTab('catalog')}
                          className="w-full h-40 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-indigo-600 hover:border-indigo-400 hover:bg-indigo-50/40 transition-all cursor-pointer"
                        >
                          <Plus className="w-6 h-6" />
                          <span className="text-xs font-semibold">Add Product Slot #{comparedProducts.length + idx + 1}</span>
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                  {/* Price */}
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 font-bold text-slate-900 sticky left-0 bg-white z-10 border-r border-slate-100">
                      Price
                    </td>
                    {comparedProducts.map(p => {
                      const isBest = p.price === bestPrice && comparedProducts.length > 1;
                      return (
                        <td key={p.id} className="p-4 align-middle">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm font-extrabold text-slate-900">
                              ₹{p.price.toLocaleString('en-IN')}
                            </span>
                            {isBest && (
                              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded">
                                Lowest Price
                              </span>
                            )}
                          </div>
                        </td>
                      );
                    })}
                    {Array.from({ length: 3 - comparedProducts.length }).map((_, i) => (
                      <td key={i} className="p-4 bg-slate-50/30 text-slate-300 text-center">—</td>
                    ))}
                  </tr>

                  {/* Rating */}
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 font-bold text-slate-900 sticky left-0 bg-white z-10 border-r border-slate-100">
                      Rating
                    </td>
                    {comparedProducts.map(p => {
                      const isBest = p.rating === bestRating && comparedProducts.length > 1;
                      return (
                        <td key={p.id} className="p-4 align-middle">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-amber-600 flex items-center gap-1 text-sm">
                              ⭐ {p.rating}
                            </span>
                            {isBest && (
                              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 rounded">
                                Highest Rated
                              </span>
                            )}
                          </div>
                        </td>
                      );
                    })}
                    {Array.from({ length: 3 - comparedProducts.length }).map((_, i) => (
                      <td key={i} className="p-4 bg-slate-50/30 text-slate-300 text-center">—</td>
                    ))}
                  </tr>

                  {/* Availability */}
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 font-bold text-slate-900 sticky left-0 bg-white z-10 border-r border-slate-100">
                      Availability
                    </td>
                    {comparedProducts.map(p => (
                      <td key={p.id} className="p-4 align-middle">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold ${
                            p.availability === 'In Stock'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          {p.availability === 'In Stock' ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <XCircle className="w-3.5 h-3.5 text-rose-600" />
                          )}
                          <span>{p.availability}</span>
                        </span>
                      </td>
                    ))}
                    {Array.from({ length: 3 - comparedProducts.length }).map((_, i) => (
                      <td key={i} className="p-4 bg-slate-50/30 text-slate-300 text-center">—</td>
                    ))}
                  </tr>

                  {/* Delivery */}
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 font-bold text-slate-900 sticky left-0 bg-white z-10 border-r border-slate-100">
                      Delivery
                    </td>
                    {comparedProducts.map(p => {
                      const isBest = p.deliveryDays === bestDelivery && comparedProducts.length > 1;
                      return (
                        <td key={p.id} className="p-4 align-middle">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-purple-700 flex items-center gap-1">
                              <Truck className="w-3.5 h-3.5" />
                              {p.deliveryDays} Day{p.deliveryDays > 1 ? 's' : ''}
                            </span>
                            {isBest && (
                              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-purple-100 text-purple-800 rounded">
                                Fastest Delivery
                              </span>
                            )}
                          </div>
                        </td>
                      );
                    })}
                    {Array.from({ length: 3 - comparedProducts.length }).map((_, i) => (
                      <td key={i} className="p-4 bg-slate-50/30 text-slate-300 text-center">—</td>
                    ))}
                  </tr>

                  {/* Quality */}
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 font-bold text-slate-900 sticky left-0 bg-white z-10 border-r border-slate-100">
                      Quality
                    </td>
                    {comparedProducts.map(p => {
                      const isBest = p.quality === bestQuality && comparedProducts.length > 1;
                      return (
                        <td key={p.id} className="p-4 align-middle">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-emerald-700">
                              {p.qualityTier} ({p.quality}/10)
                            </span>
                            {isBest && (
                              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded">
                                Peak Build
                              </span>
                            )}
                          </div>
                        </td>
                      );
                    })}
                    {Array.from({ length: 3 - comparedProducts.length }).map((_, i) => (
                      <td key={i} className="p-4 bg-slate-50/30 text-slate-300 text-center">—</td>
                    ))}
                  </tr>

                  {/* Utility Score */}
                  <tr className="bg-indigo-50/40 hover:bg-indigo-50/70 transition-colors">
                    <td className="p-4 font-bold text-indigo-950 sticky left-0 bg-indigo-50/40 z-10 border-r border-slate-200">
                      <div className="flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-indigo-600" />
                        <span>Utility Score</span>
                      </div>
                    </td>
                    {comparedProducts.map(p => {
                      const score = calculateBaselineUtility(p);
                      return (
                        <td key={p.id} className="p-4 align-middle">
                          <div className="space-y-1">
                            <span className="font-extrabold text-base text-indigo-700 font-mono">
                              {score}/100
                            </span>
                            <div className="w-32 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                              <div
                                className="bg-indigo-600 h-1.5 rounded-full"
                                style={{ width: `${score}%` }}
                              />
                            </div>
                          </div>
                        </td>
                      );
                    })}
                    {Array.from({ length: 3 - comparedProducts.length }).map((_, i) => (
                      <td key={i} className="p-4 bg-slate-50/30 text-slate-300 text-center">—</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
