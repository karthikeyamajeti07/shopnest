import React, { useState } from 'react';
import {
  X,
  BookOpen,
  HelpCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Award,
  Zap,
  Layers,
  Activity,
  Code2,
} from 'lucide-react';

interface VivaGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VivaGuideModal: React.FC<VivaGuideModalProps> = ({ isOpen, onClose }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!isOpen) return null;

  const faqs = [
    {
      q: '1. What type of AI agent is implemented, and what is its core objective?',
      a: (
        <div className="space-y-2">
          <p>
            This application implements a <strong>Utility-Based Rational Agent</strong> following Russell & Norvig’s AI architecture.
          </p>
          <p>
            Unlike a <strong>goal-based agent</strong> that merely evaluates whether a product fulfills binary criteria (Yes/No), a utility-based agent evaluates <em>how well</em> different alternatives satisfy conflicting consumer goals by calculating a composite scalar utility score <code className="bg-slate-100 px-1 text-indigo-700 font-mono">U(Product) ∈ [0, 100]</code>.
          </p>
        </div>
      ),
    },
    {
      q: '2. What is the PEAS specification for this shopping agent?',
      a: (
        <div className="space-y-1.5 text-xs">
          <ul className="space-y-1 text-slate-700">
            <li><strong>Performance Measure:</strong> Recommendation accuracy, user satisfaction, adherence to budget, delivery speed, and high product quality.</li>
            <li><strong>Environment:</strong> Online e-commerce portal, product catalog records (32+ items), active shoppers, competing sellers, and courier logistics.</li>
            <li><strong>Actuators:</strong> Display top-3 recommendations, sort/rank candidates by utility score, filter out unviable products, generate comparison tables.</li>
            <li><strong>Sensors:</strong> Customer preference input form (budget, category, min rating, urgency, priority), database product records (price, rating, stock status, delivery days, quality tier).</li>
          </ul>
        </div>
      ),
    },
    {
      q: '3. What are the 6 task environment properties (PAGE)?',
      a: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="p-2 bg-slate-50 border rounded-lg">
            <strong>Partially Observable:</strong> Agent only sees explicit inputs and catalog snapshots, not latent user mood or external warehouse supply chains.
          </div>
          <div className="p-2 bg-slate-50 border rounded-lg">
            <strong>Dynamic:</strong> Stock levels, merchant discounts, and courier transit delays change independently while the agent is active.
          </div>
          <div className="p-2 bg-slate-50 border rounded-lg">
            <strong>Discrete:</strong> Distinct items, categories, ratings (1–5 stars), and integer delivery days (1, 2, 3 days).
          </div>
          <div className="p-2 bg-slate-50 border rounded-lg">
            <strong>Sequential:</strong> User interaction, filter revisions, and comparison queries refine subsequent recommendation runs.
          </div>
          <div className="p-2 bg-slate-50 border rounded-lg">
            <strong>Multi-Agent:</strong> Operates alongside buyer agents, merchant price-setting agents, and third-party delivery dispatchers.
          </div>
          <div className="p-2 bg-slate-50 border rounded-lg">
            <strong>Stochastic:</strong> Inventory stockouts and delivery transit times contain real-world uncertainty.
          </div>
        </div>
      ),
    },
    {
      q: '4. What is the mathematical Utility Function and why is Normalization essential?',
      a: (
        <div className="space-y-2 text-xs">
          <div className="p-3 bg-slate-900 text-indigo-300 font-mono rounded-lg">
            U(P) = w_pref·S_pref(P) + w_price·S_price(P) + w_rating·S_rating(P) + w_avail·S_avail(P) + w_deliv·S_deliv(P) + w_qual·S_qual(P)
          </div>
          <p>
            <strong>Why Normalization is critical:</strong> Different attributes have vastly different natural units (e.g., Price is in thousands of ₹, Rating is 1–5 stars, Delivery is in days). Without normalization, an unscaled ₹50,000 price would mathematically obliterate a 4.8★ rating.
          </p>
          <p>
            Our engine normalizes every dimension onto a strict weighted point scale totaling 100 points maximum:
            Preference = 30%, Price = 20%, Rating = 20%, Availability = 10%, Delivery = 10%, Quality = 10%.
          </p>
        </div>
      ),
    },
    {
      q: '5. How does the agent handle conflicts (e.g., low price vs. high build quality)?',
      a: (
        <div className="space-y-1.5 text-xs text-slate-700">
          <p>
            Real-world decisions always involve trade-offs: the highest-quality flagship device is rarely the cheapest.
          </p>
          <p>
            The agent resolves this using <strong>dynamic customer priority weighting</strong> (the 30% preference weight). If the user designates "Low Price" as priority, savings under the budget are multiplied. If the user designates "High Quality", hardware benchmark indices and premium materials dominate the ranking.
          </p>
        </div>
      ),
    },
    {
      q: '6. How is the system architected between Frontend, Backend, and Storage?',
      a: (
        <div className="space-y-1.5 text-xs text-slate-700">
          <p>
            <strong>Full-Stack Architecture:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1 pl-1">
            <li><strong>Frontend:</strong> React 19 SPA with component-based modular structure, Tailwind CSS styling, responsive desktop/tablet/mobile design.</li>
            <li><strong>Backend:</strong> Node.js with Express.js REST API providing clean separation of routes, controllers, and services.</li>
            <li><strong>Recommendation Engine:</strong> Pure algorithmic backend service (<code className="bg-slate-100 px-1 font-mono">RecommendationEngine.ts</code>) executing filtering, normalization, and ranking.</li>
            <li><strong>Database:</strong> JSON-based local database with 32 realistic products across 6 categories with INR (₹) prices. Zero external paid APIs required!</li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in-50 zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-600 rounded-xl text-white">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                College Viva & AI Case Study Guide
              </h2>
              <p className="text-xs text-indigo-300">
                Core questions, academic definitions, and mathematical answers
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* FAQs Accordion */}
        <div className="p-6 space-y-3 max-h-[75vh] overflow-y-auto">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-slate-900 hover:bg-slate-100 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>{item.q}</span>
                  </span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                </button>

                {isOpen && (
                  <div className="p-4 pt-1 bg-white border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed animate-in fade-in-50 duration-150">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Intelligent Online Shopping Agent • College AI Case Study</span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
