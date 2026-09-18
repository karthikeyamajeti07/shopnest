import React, { useState } from 'react';
import {
  BrainCircuit,
  Sliders,
  TrendingUp,
  Award,
  Layers,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  ArrowDown,
  Info,
  BookOpen,
} from 'lucide-react';
import { Product } from '../types';

export const AgentArchitecturePage: React.FC = () => {
  // Interactive Simulator State for Live College Viva Demonstration
  const [prefWeight, setPrefWeight] = useState<number>(30);
  const [priceWeight, setPriceWeight] = useState<number>(20);
  const [ratingWeight, setRatingWeight] = useState<number>(20);
  const [availWeight, setAvailWeight] = useState<number>(10);
  const [delivWeight, setDelivWeight] = useState<number>(10);
  const [qualWeight, setQualWeight] = useState<number>(10);

  const totalWeight =
    prefWeight + priceWeight + ratingWeight + availWeight + delivWeight + qualWeight;

  // Sample candidate products for real-time calculation demonstration
  const sampleDemonstrations = [
    {
      name: 'OnePlus Nord CE4 5G',
      brand: 'OnePlus',
      price: 24999,
      rating: 4.5,
      deliveryDays: 2,
      quality: 9,
      availability: 'In Stock',
      // Base normalized components (0.0 to 1.0)
      rawScores: {
        price: 0.9,      // Good savings under ₹30k budget
        rating: 0.9,     // 4.5/5.0
        avail: 1.0,      // In Stock
        deliv: 0.9,      // 2 days
        qual: 0.9,       // 9/10
        pref: 0.9,       // Balanced match
      },
    },
    {
      name: 'Samsung Galaxy M35 5G',
      brand: 'Samsung',
      price: 19999,
      rating: 4.2,
      deliveryDays: 3,
      quality: 8,
      availability: 'In Stock',
      rawScores: {
        price: 0.98,     // Outstanding savings
        rating: 0.84,    // 4.2/5.0
        avail: 1.0,      // In Stock
        deliv: 0.8,      // 3 days
        qual: 0.8,       // 8/10
        pref: 0.88,      // Strong value match
      },
    },
    {
      name: 'Apple iPhone 15',
      brand: 'Apple',
      price: 69900,
      rating: 4.8,
      deliveryDays: 1,
      quality: 10,
      availability: 'In Stock',
      rawScores: {
        price: 0.5,      // Premium price
        rating: 0.96,    // 4.8/5.0
        avail: 1.0,      // In Stock
        deliv: 1.0,      // 1 day
        qual: 1.0,       // 10/10
        pref: 0.92,      // Highest quality preference
      },
    },
  ];

  const calculateCustomUtility = (raw: (typeof sampleDemonstrations)[0]['rawScores']) => {
    if (totalWeight === 0) return 0;
    const weightedSum =
      raw.pref * prefWeight +
      raw.price * priceWeight +
      raw.rating * ratingWeight +
      raw.avail * availWeight +
      raw.deliv * delivWeight +
      raw.qual * qualWeight;
    // Normalize to 100 scale
    return Math.round((weightedSum / totalWeight) * 100);
  };

  const handleResetWeights = () => {
    setPrefWeight(30);
    setPriceWeight(20);
    setRatingWeight(20);
    setAvailWeight(10);
    setDelivWeight(10);
    setQualWeight(10);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
          <BrainCircuit className="w-3.5 h-3.5" />
          <span>AI Agent Architecture & Decision Theory</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Utility-Based Agent Architecture
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed">
          Comprehensive breakdown of how our shopping agent applies <strong>Multi-Attribute Utility Theory (MAUT)</strong> to evaluate, score, and rank competing alternatives.
        </p>
      </div>

      {/* Core Definition Banner */}
      <div className="bg-white border-2 border-indigo-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider">
          <Info className="w-4 h-4" />
          <span>Fundamental Agent Classification</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
          Why is this a Utility-Based Agent?
        </h2>
        <blockquote className="p-4 bg-indigo-50/70 border-l-4 border-indigo-600 text-indigo-950 font-medium text-sm sm:text-base rounded-r-xl leading-relaxed">
          "The shopping agent is a utility-based agent because it evaluates multiple product attributes and calculates an overall utility score before recommending products."
        </blockquote>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
          Unlike simple reflex agents that respond with rigid if-then lookups, or goal-based agents that only ask "Does this product satisfy the binary goal?", a <strong>utility-based agent</strong> asks: <em>"How happy (utility index) will the user be with this outcome, balancing conflicting trade-offs like price vs. quality vs. delivery time?"</em>
        </p>
      </div>

      {/* Complete Decision Flowchart */}
      <div className="space-y-4">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Agent Reasoning & Perception Pipeline
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Sequential stages executed on the Node.js Express backend during <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-700">POST /api/recommend</code>
          </p>
        </div>

        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-800">
          <div className="max-w-2xl mx-auto space-y-3 text-center">
            {/* Stage 1 */}
            <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl flex items-center justify-between">
              <div className="text-left">
                <span className="text-[10px] font-bold text-indigo-400 uppercase">Input</span>
                <h3 className="text-sm font-bold text-white">Customer Preferences</h3>
                <p className="text-xs text-slate-400">Budget, Category, Min Rating, Delivery SLA, Priority</p>
              </div>
              <span className="text-xl">👤</span>
            </div>

            <ArrowDown className="w-5 h-5 text-indigo-400 mx-auto animate-bounce" />

            {/* Stage 2 */}
            <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl flex items-center justify-between">
              <div className="text-left">
                <span className="text-[10px] font-bold text-cyan-400 uppercase">Perception</span>
                <h3 className="text-sm font-bold text-white">Product Data & Sensor Snapshot</h3>
                <p className="text-xs text-slate-400">Retrieve 32+ catalog items with live price, stock, ratings, and days</p>
              </div>
              <span className="text-xl">📦</span>
            </div>

            <ArrowDown className="w-5 h-5 text-cyan-400 mx-auto" />

            {/* Stage 3 */}
            <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl flex items-center justify-between">
              <div className="text-left">
                <span className="text-[10px] font-bold text-amber-400 uppercase">Reasoning Step 1</span>
                <h3 className="text-sm font-bold text-white">Constraint Filtering</h3>
                <p className="text-xs text-slate-400">Filter unviable products (price &gt; maxBudget, rating &lt; minRating, out of stock)</p>
              </div>
              <span className="text-xl">✂️</span>
            </div>

            <ArrowDown className="w-5 h-5 text-amber-400 mx-auto" />

            {/* Stage 4 */}
            <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl flex items-center justify-between">
              <div className="text-left">
                <span className="text-[10px] font-bold text-purple-400 uppercase">Reasoning Step 2</span>
                <h3 className="text-sm font-bold text-white">Utility Calculation (0–100 Scale)</h3>
                <p className="text-xs text-slate-400">Normalize sub-scores & apply multi-attribute weight vector</p>
              </div>
              <span className="text-xl">🧮</span>
            </div>

            <ArrowDown className="w-5 h-5 text-purple-400 mx-auto" />

            {/* Stage 5 */}
            <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl flex items-center justify-between">
              <div className="text-left">
                <span className="text-[10px] font-bold text-emerald-400 uppercase">Decision</span>
                <h3 className="text-sm font-bold text-white">Ranking Products</h3>
                <p className="text-xs text-slate-400">Sort candidates descending by total calculated utility score</p>
              </div>
              <span className="text-xl">📊</span>
            </div>

            <ArrowDown className="w-5 h-5 text-emerald-400 mx-auto" />

            {/* Stage 6 */}
            <div className="bg-gradient-to-r from-indigo-900 to-indigo-800 border border-indigo-600 p-4 rounded-xl flex items-center justify-between shadow-lg">
              <div className="text-left">
                <span className="text-[10px] font-bold text-amber-300 uppercase">Action</span>
                <h3 className="text-sm font-bold text-white">Recommendation & Natural Language Reasoning</h3>
                <p className="text-xs text-indigo-200">Return Top 3 matched products with score breakdown and decision justification</p>
              </div>
              <span className="text-xl">🏆</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mathematical Formulation Detail */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>Mathematical Formulation for College Viva</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900">
          The Multi-Attribute Weighted Utility Algorithm
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          The total utility <span className="font-mono font-bold text-indigo-700">U(P)</span> of product <span className="font-mono">P</span> is computed as the linear weighted sum of normalized sub-attribute scoring functions:
        </p>

        <div className="bg-slate-950 text-indigo-300 font-mono text-xs sm:text-sm p-4 rounded-xl overflow-x-auto leading-relaxed border border-slate-800">
          <p className="text-emerald-400">// Utility Function Equation</p>
          <p>U(P) = w_pref · S_pref(P) + w_price · S_price(P) + w_rating · S_rating(P) + w_avail · S_avail(P) + w_deliv · S_deliv(P) + w_qual · S_qual(P)</p>
          <p className="text-slate-400 mt-2">// Weights Constraint:</p>
          <p>Σ w_i = 30% + 20% + 20% + 10% + 10% + 10% = 100%</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl space-y-1">
            <span className="font-bold text-slate-800">Price Normalization:</span>
            <p className="text-slate-600 leading-relaxed">
              Price score is bounded by budget ceiling: products comfortably below max budget receive up to 20 points for surplus value savings.
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl space-y-1">
            <span className="font-bold text-slate-800">Rating Normalization:</span>
            <p className="text-slate-600 leading-relaxed">
              Mapped linearly from 1.0–5.0 star interval to a 0–20 score: <span className="font-mono text-[11px] bg-slate-200/60 px-1 rounded">(Rating / 5.0) × 20</span>.
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl space-y-1">
            <span className="font-bold text-slate-800">Preference Biasing:</span>
            <p className="text-slate-600 leading-relaxed">
              Allocates 30% of the decision weight to whichever criterion the consumer specifically prioritized (Price, Rating, Speed, Quality).
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Weight Simulator */}
      <div className="bg-slate-50 border border-slate-300/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider">
              <Sliders className="w-4 h-4" />
              <span>Interactive Viva Demonstration Sandbox</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mt-1">
              Live Utility Weight Simulator
            </h3>
            <p className="text-xs text-slate-500">
              Adjust the weight distribution below to see how the agent alters utility scores in real-time.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${
              totalWeight === 100 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}>
              Total Weights: {totalWeight}% {totalWeight !== 100 && '(Auto-Normalized)'}
            </span>
            <button
              onClick={handleResetWeights}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset Default</span>
            </button>
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
          <div className="bg-white border border-slate-200 p-4 rounded-xl space-y-2">
            <div className="flex justify-between font-bold">
              <span>Customer Priority Weight:</span>
              <span className="text-indigo-600 font-mono">{prefWeight}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={60}
              value={prefWeight}
              onChange={e => setPrefWeight(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>

          <div className="bg-white border border-slate-200 p-4 rounded-xl space-y-2">
            <div className="flex justify-between font-bold">
              <span>Price Weight:</span>
              <span className="text-emerald-600 font-mono">{priceWeight}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={50}
              value={priceWeight}
              onChange={e => setPriceWeight(Number(e.target.value))}
              className="w-full accent-emerald-600"
            />
          </div>

          <div className="bg-white border border-slate-200 p-4 rounded-xl space-y-2">
            <div className="flex justify-between font-bold">
              <span>Rating Weight:</span>
              <span className="text-amber-600 font-mono">{ratingWeight}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={50}
              value={ratingWeight}
              onChange={e => setRatingWeight(Number(e.target.value))}
              className="w-full accent-amber-600"
            />
          </div>

          <div className="bg-white border border-slate-200 p-4 rounded-xl space-y-2">
            <div className="flex justify-between font-bold">
              <span>Availability Weight:</span>
              <span className="text-cyan-600 font-mono">{availWeight}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={30}
              value={availWeight}
              onChange={e => setAvailWeight(Number(e.target.value))}
              className="w-full accent-cyan-600"
            />
          </div>

          <div className="bg-white border border-slate-200 p-4 rounded-xl space-y-2">
            <div className="flex justify-between font-bold">
              <span>Delivery Speed Weight:</span>
              <span className="text-purple-600 font-mono">{delivWeight}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={30}
              value={delivWeight}
              onChange={e => setDelivWeight(Number(e.target.value))}
              className="w-full accent-purple-600"
            />
          </div>

          <div className="bg-white border border-slate-200 p-4 rounded-xl space-y-2">
            <div className="flex justify-between font-bold">
              <span>Quality Index Weight:</span>
              <span className="text-rose-600 font-mono">{qualWeight}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={30}
              value={qualWeight}
              onChange={e => setQualWeight(Number(e.target.value))}
              className="w-full accent-rose-600"
            />
          </div>
        </div>

        {/* Live Simulation Output Cards */}
        <div className="pt-2">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
            Real-Time Output on Sample Products:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sampleDemonstrations.map(demo => {
              const liveScore = calculateCustomUtility(demo.rawScores);
              return (
                <div
                  key={demo.name}
                  className="bg-white border border-slate-200 rounded-xl p-4 space-y-2 shadow-xs"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-bold text-xs text-slate-900">{demo.name}</h5>
                      <span className="text-[10px] text-slate-400">{demo.brand}</span>
                    </div>
                    <span className="font-mono font-extrabold text-sm text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                      {liveScore}/100
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${liveScore}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500 pt-1">
                    <span>₹{demo.price.toLocaleString('en-IN')}</span>
                    <span>⭐ {demo.rating}</span>
                    <span>{demo.deliveryDays}d delivery</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
