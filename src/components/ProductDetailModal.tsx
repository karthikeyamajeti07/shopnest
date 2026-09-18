import React from 'react';
import {
  X,
  Star,
  Truck,
  CheckCircle2,
  XCircle,
  Scale,
  Sparkles,
  ShieldCheck,
  Check,
  ShoppingCart,
  Heart,
} from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onCompareAdd: (product: Product) => void;
  isCompared: boolean;
  onEvaluateWithAgent: (category: string, budget: number) => void;
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onCompareAdd,
  isCompared,
  onEvaluateWithAgent,
  onAddToCart,
  onToggleWishlist,
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in-50 zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-0.5 bg-indigo-50 text-indigo-700 rounded-md">
              {product.category}
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-600">{product.brand}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Top Banner Image & Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
            <div className="sm:col-span-5 aspect-4/3 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="sm:col-span-7 space-y-3">
              <h2 className="text-xl font-bold text-slate-900 leading-tight">
                {product.name}
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                {product.description}
              </p>

              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-extrabold text-slate-900 font-mono">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span className="text-xs font-bold text-amber-600 flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  ⭐ {product.rating} / 5.0
                </span>
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md font-semibold ${
                    product.availability === 'In Stock'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}
                >
                  {product.availability === 'In Stock' ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5" />
                  )}
                  <span>{product.availability}</span>
                </span>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-md font-semibold">
                  <Truck className="w-3.5 h-3.5" />
                  <span>{product.deliveryDays} Days Transit</span>
                </span>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-700 border border-slate-200 rounded-md font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Quality: {product.qualityTier} ({product.quality}/10)</span>
                </span>
              </div>
            </div>
          </div>

          {/* Technical Specifications */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="space-y-2.5 pt-2 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Technical Specifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {Object.entries(product.specs).map(([specKey, specVal]) => (
                  <div
                    key={specKey}
                    className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-lg flex justify-between"
                  >
                    <span className="text-slate-500 font-medium">{specKey}:</span>
                    <span className="font-bold text-slate-800 text-right">{specVal}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Product Features */}
          {product.features && product.features.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Key Highlights
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-700">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          {onAddToCart && <button onClick={() => { onAddToCart(product); onClose(); }} className="px-4 py-2 text-xs font-bold rounded-full bg-[#ffd814] text-slate-900 flex items-center gap-1.5"><ShoppingCart className="w-3.5 h-3.5" /> Add to cart</button>}
          {onToggleWishlist && <button onClick={() => onToggleWishlist(product)} className="px-4 py-2 text-xs font-semibold rounded-full bg-white text-[#007185] border border-slate-300 flex items-center gap-1.5"><Heart className="w-3.5 h-3.5" /> Save</button>}
          <button
            onClick={() => onCompareAdd(product)}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              isCompared
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-indigo-700 border border-indigo-200 hover:bg-indigo-50'
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
                <span>Add to Comparison Matrix</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              onClose();
              onEvaluateWithAgent(product.category, product.price * 1.15);
            }}
            className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Evaluate Category in Recommendation Engine</span>
          </button>
        </div>
      </div>
    </div>
  );
};
