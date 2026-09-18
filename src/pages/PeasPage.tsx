import React from 'react';
import {
  Layers,
  Award,
  Globe,
  Sliders,
  Eye,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { ActiveTab } from '../types';

interface PeasPageProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const PeasPage: React.FC<PeasPageProps> = ({ setActiveTab }) => {
  const peasData = [
    {
      letter: 'P',
      name: 'Performance Measure',
      subtitle: 'Evaluation criteria determining how successfully the agent achieves utility optimization.',
      icon: <Award className="w-6 h-6 text-amber-500" />,
      color: 'border-amber-400 bg-amber-50/40 text-amber-900',
      tagColor: 'bg-amber-100 text-amber-900',
      items: [
        {
          title: 'Customer Satisfaction',
          desc: 'Alignment between final recommendations and user-stated satisfaction expectations.',
        },
        {
          title: 'Recommendation Accuracy',
          desc: 'Mathematical correctness in selecting products that satisfy all hard and soft utility parameters.',
        },
        {
          title: 'Suitable Price',
          desc: 'Adherence to the maximum budget limit and rewarding cost-effective budget savings.',
        },
        {
          title: 'Product Quality',
          desc: 'Recommending items that meet or exceed the user’s expected build and specification grade.',
        },
        {
          title: 'Fast Delivery',
          desc: 'Minimizing transit duration and respecting customer fulfillment deadlines.',
        },
        {
          title: 'Product Availability',
          desc: 'Prioritizing immediately dispatchable warehouse stock over backordered items.',
        },
      ],
    },
    {
      letter: 'E',
      name: 'Environment',
      subtitle: 'The external context, platforms, and entities with which the shopping agent interacts.',
      icon: <Globe className="w-6 h-6 text-blue-500" />,
      color: 'border-blue-400 bg-blue-50/40 text-blue-900',
      tagColor: 'bg-blue-100 text-blue-900',
      items: [
        {
          title: 'Online Shopping Platform',
          desc: 'The e-commerce infrastructure, web server, and REST API channels where the agent operates.',
        },
        {
          title: 'Product Catalog',
          desc: 'Multi-category database of 30+ items containing pricing, ratings, stock status, and specifications.',
        },
        {
          title: 'Customers',
          desc: 'Active users possessing varied budgets, priorities, quality expectations, and urgency levels.',
        },
        {
          title: 'Sellers / Merchants',
          desc: 'Third-party merchants and brands who adjust listed prices, inventory stock, and product descriptions.',
        },
        {
          title: 'Delivery System',
          desc: 'Couriers, fulfillment centers, and logistics tracking networks managing shipment transit times.',
        },
      ],
    },
    {
      letter: 'A',
      name: 'Actuators',
      subtitle: 'Mechanisms and actions through which the agent influences the environment and guides users.',
      icon: <Sliders className="w-6 h-6 text-emerald-500" />,
      color: 'border-emerald-400 bg-emerald-50/40 text-emerald-900',
      tagColor: 'bg-emerald-100 text-emerald-900',
      items: [
        {
          title: 'Display Recommendations',
          desc: 'Presenting the top 3 best-matching products with transparent scoring and reasoning.',
        },
        {
          title: 'Rank Products',
          desc: 'Sorting viable candidate options in descending order of calculated total utility score (0–100).',
        },
        {
          title: 'Filter Products',
          desc: 'Pruning unviable products that breach hard constraints (budget excess, out of stock, sub-par rating).',
        },
        {
          title: 'Compare Products',
          desc: 'Generating side-by-side attribute matrices enabling the user to evaluate trade-offs directly.',
        },
        {
          title: 'Suggest Products',
          desc: 'Offering alternative suggestions and explaining trade-offs when strict constraints yield no results.',
        },
      ],
    },
    {
      letter: 'S',
      name: 'Sensors',
      subtitle: 'Input perceptual devices that collect data from the user and the surrounding environment.',
      icon: <Eye className="w-6 h-6 text-purple-500" />,
      color: 'border-purple-400 bg-purple-50/40 text-purple-900',
      tagColor: 'bg-purple-100 text-purple-900',
      items: [
        {
          title: 'Customer Preferences',
          desc: 'Perceives budget limits, target category, minimum rating, max delivery window, and priority focus.',
        },
        {
          title: 'Product Price',
          desc: 'Continuously reads live product MRP and discount pricing from database records.',
        },
        {
          title: 'Product Rating',
          desc: 'Senses average customer review scores (1.0 to 5.0 stars) from verified consumer feedback.',
        },
        {
          title: 'Availability',
          desc: 'Reads real-time warehouse inventory flags ("In Stock" vs "Out of Stock").',
        },
        {
          title: 'Delivery Time',
          desc: 'Perceives logistics transit duration estimates (e.g. 1 day, 2 days, 5 days) from shipping APIs.',
        },
        {
          title: 'Product Information',
          desc: 'Reads technical specifications, brand authenticity, hardware benchmarks, and build quality indices.',
        },
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
      {/* Page Title */}
      <div className="border-b border-slate-200 pb-5">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
          <Layers className="w-3.5 h-3.5" />
          <span>Russell & Norvig Agent Specification</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          PEAS Analysis
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed">
          In Artificial Intelligence, every rational agent is formally specified by its <strong>PEAS</strong> descriptors: 
          <strong> Performance measure</strong>, <strong>Environment</strong>, <strong>Actuators</strong>, and <strong>Sensors</strong>.
        </p>
      </div>

      {/* PEAS 4 Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {peasData.map(section => (
          <div
            key={section.letter}
            className={`bg-white border-2 rounded-2xl p-6 shadow-xs space-y-4 ${section.color}`}
          >
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white shadow-xs border border-slate-200 flex items-center justify-center font-extrabold text-lg">
                  {section.letter}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">{section.name}</h2>
                  <p className="text-[11px] text-slate-500">{section.subtitle}</p>
                </div>
              </div>
              <div className="p-2 bg-white rounded-lg border border-slate-200/80">
                {section.icon}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {section.items.map((item, idx) => (
                <div key={idx} className="bg-white/90 border border-slate-200/70 p-3 rounded-xl space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>{item.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Viva Exam Corner: Formal Agent Formulation */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>College Viva Preparation Notes</span>
        </div>
        <h3 className="text-xl font-bold text-white">
          Why PEAS Formulation is Critical for this Shopping Agent Case Study
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed max-w-4xl">
          During an academic evaluation, the examiner evaluates whether the agent behaves <em>rationally</em>. Rationality is not perfection; a rational agent is one that selects an action that is expected to <strong>maximize its performance measure</strong>, given the evidence provided by its percept sequence and whatever built-in knowledge the agent possesses.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl space-y-1.5">
            <span className="text-xs font-bold text-indigo-400">1. Percept Sequence</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Consists of user constraints + catalog state snapshot perceived across all product sensor dimensions.
            </p>
          </div>
          <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl space-y-1.5">
            <span className="text-xs font-bold text-cyan-400">2. Agent Function</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Maps Percepts → Actions: <span className="font-mono text-emerald-400 text-[11px]">f: P* → A</span>, implemented via our multi-attribute utility calculation.
            </p>
          </div>
          <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl space-y-1.5">
            <span className="text-xs font-bold text-amber-400">3. Rational Decision</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              The agent selects the action (Top 3 recommendations) that yields the highest expected utility index.
            </p>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={() => setActiveTab('environment')}
            className="text-xs font-semibold text-indigo-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Proceed to Task Environment Analysis</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
