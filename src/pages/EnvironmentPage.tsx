import React from 'react';
import {
  Activity,
  EyeOff,
  Flame,
  Grid,
  GitCommit,
  Users,
  Shuffle,
  CheckCircle2,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { ActiveTab } from '../types';

interface EnvironmentPageProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const EnvironmentPage: React.FC<EnvironmentPageProps> = ({ setActiveTab }) => {
  const dimensions = [
    {
      title: 'Partially Observable',
      tag: 'Partially Observable',
      icon: <EyeOff className="w-5 h-5 text-indigo-500" />,
      tagColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      shortExplanation:
        'The agent does not have complete, omniscient access to the entire world state.',
      detailedExplanation:
        'The agent only observes explicit user inputs and a snapshot of current catalog records. It cannot directly observe the user\'s unstated emotional biases, competitors\' confidential inventory buffers, or exact transit bottlenecks.',
      opposite: 'Fully Observable (e.g., Chess, Crosswords)',
      agentRelevance: 'Must make optimal recommendations despite incomplete user profile knowledge.',
    },
    {
      title: 'Dynamic',
      tag: 'Dynamic',
      icon: <Flame className="w-5 h-5 text-rose-500" />,
      tagColor: 'bg-rose-100 text-rose-800 border-rose-200',
      shortExplanation:
        'The environment can change while the agent is deliberating or executing its decision.',
      detailedExplanation:
        'Product availability changes in real-time as other consumers place orders; merchants flash-change prices, and delivery couriers update weather-dependent transit estimates independent of the agent’s actions.',
      opposite: 'Static (e.g., Solving Sudoku puzzles)',
      agentRelevance: 'Requires frequent perception updates to avoid recommending out-of-stock items.',
    },
    {
      title: 'Discrete',
      tag: 'Discrete',
      icon: <Grid className="w-5 h-5 text-emerald-500" />,
      tagColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      shortExplanation:
        'The environment has a finite, countable number of distinct states, percepts, and actions.',
      detailedExplanation:
        'Products, categories (Smartphones, Laptops, etc.), stock statuses (In Stock / Out of Stock), delivery days (1, 2, 3 days), and rating stars (1 to 5) are discrete attributes rather than infinite continuous time steps.',
      opposite: 'Continuous (e.g., Autonomous Taxi driving)',
      agentRelevance: 'Allows structured categorical matrix scoring and clean normalization formulas.',
    },
    {
      title: 'Sequential',
      tag: 'Sequential',
      icon: <GitCommit className="w-5 h-5 text-purple-500" />,
      tagColor: 'bg-purple-100 text-purple-800 border-purple-200',
      shortExplanation:
        'Current decisions affect future percepts, feedback, and subsequent recommendation queries.',
      detailedExplanation:
        'A user\'s interaction with an initial recommendation (e.g., adding to comparison, adjusting budget) triggers a sequence of iterative preference refinements. The agent logs history to observe evolving preferences over time.',
      opposite: 'Episodic (e.g., Single-image defect classification)',
      agentRelevance: 'Allows multi-turn discovery and interactive comparison workflows.',
    },
    {
      title: 'Multi-Agent',
      tag: 'Multi-Agent',
      icon: <Users className="w-5 h-5 text-amber-500" />,
      tagColor: 'bg-amber-100 text-amber-800 border-amber-200',
      shortExplanation:
        'The agent shares the environment with other independent autonomous agents.',
      detailedExplanation:
        'The shopping agent operates in an ecosystem alongside customer agents (buyers seeking max value), seller agents (maximizing profit and moving old stock), and logistics dispatch agents (optimizing routes).',
      opposite: 'Single-Agent (e.g., Solitaire puzzle solver)',
      agentRelevance: 'Must balance user utility against competitive supplier behaviors.',
    },
    {
      title: 'Stochastic',
      tag: 'Stochastic',
      icon: <Shuffle className="w-5 h-5 text-cyan-500" />,
      tagColor: 'bg-cyan-100 text-cyan-800 border-cyan-200',
      shortExplanation:
        'The next state of the environment is not completely determined by the current state and agent action.',
      detailedExplanation:
        'Unpredictable factors like sudden warehouse stock depletion, courier transit delays, and post-purchase price variations introduce randomness and uncertainty into fulfillment outcomes.',
      opposite: 'Deterministic (e.g., Tic-Tac-Toe, Calculator)',
      agentRelevance: 'Utility scores compute expected utility under probabilistic availability conditions.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
          <Activity className="w-3.5 h-3.5" />
          <span>Russell & Norvig Environment Properties</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Task Environment Classification
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed">
          The complexity of designing a rational agent is directly dictated by the properties of its task environment. Below is the formal categorization for the <strong>Intelligent Shopping Agent</strong>.
        </p>
      </div>

      {/* 6 Dimensions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dimensions.map(dim => (
          <div
            key={dim.title}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:border-indigo-300 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                  {dim.icon}
                </div>
                <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full border ${dim.tagColor}`}>
                  {dim.tag}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">{dim.title}</h3>
                <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">
                  "{dim.shortExplanation}"
                </p>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed pt-1">
                {dim.detailedExplanation}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-1 text-[11px]">
              <div className="flex items-center justify-between text-slate-500">
                <span>Contrast:</span>
                <span className="font-semibold text-slate-700">{dim.opposite}</span>
              </div>
              <div className="flex items-start gap-1 text-indigo-700 pt-0.5">
                <CheckCircle2 className="w-3 h-3 text-indigo-600 shrink-0 mt-0.5" />
                <span><strong>Agent Strategy:</strong> {dim.agentRelevance}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Matrix for College Examination */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-800 space-y-5">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>Quick Viva Cheat Sheet: Environment Summary</span>
        </div>

        <h3 className="text-xl font-bold text-white">
          Formal Task Environment Summary Table
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-300 border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400 uppercase font-semibold">
                <th className="py-2.5 px-3">Dimension</th>
                <th className="py-2.5 px-3">Classification</th>
                <th className="py-2.5 px-3">Primary Reason in Shopping Agent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              <tr>
                <td className="py-2.5 px-3 font-semibold text-white">Observability</td>
                <td className="py-2.5 px-3 text-indigo-300 font-bold">Partially Observable</td>
                <td className="py-2.5 px-3 text-slate-300">Latent customer needs and unknown external warehouse logistics.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-white">Determinism</td>
                <td className="py-2.5 px-3 text-cyan-300 font-bold">Stochastic</td>
                <td className="py-2.5 px-3 text-slate-300">Inventory levels and delivery transit times involve uncertainty.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-white">Episodic / Sequential</td>
                <td className="py-2.5 px-3 text-purple-300 font-bold">Sequential</td>
                <td className="py-2.5 px-3 text-slate-300">Prior actions, user comparison selections, and query history guide future recommendations.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-white">Static / Dynamic</td>
                <td className="py-2.5 px-3 text-rose-300 font-bold">Dynamic</td>
                <td className="py-2.5 px-3 text-slate-300">Prices and stock availability shift independently during session deliberation.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-white">Discrete / Continuous</td>
                <td className="py-2.5 px-3 text-emerald-300 font-bold">Discrete</td>
                <td className="py-2.5 px-3 text-slate-300">Discrete number of catalog products, rating stars, and delivery day intervals.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-white">Single / Multi-Agent</td>
                <td className="py-2.5 px-3 text-amber-300 font-bold">Multi-Agent</td>
                <td className="py-2.5 px-3 text-slate-300">Competitor sellers, independent delivery couriers, and multiple shoppers.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={() => setActiveTab('agent-architecture')}
            className="text-xs font-semibold text-indigo-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Explore Utility-Based Agent Architecture</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
