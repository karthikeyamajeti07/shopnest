import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  Package,
  Layers,
  Star,
  CheckCircle2,
  Truck,
  Sparkles,
  RefreshCw,
  Clock,
  TrendingUp,
  Activity,
  AlertCircle,
} from 'lucide-react';
import { DashboardStats } from '../types';
import { ApiService } from '../services/api';

export const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await ApiService.getStats();
      setStats(res.stats);
    } catch (err: any) {
      console.error('Failed to load dashboard statistics:', err);
      setError(err.message || 'Failed to load dashboard metrics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Operational Telemetry & Performance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            System & Recommendation Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time catalog metrics, recommendation engine throughput, and customer preference distributions.
          </p>
        </div>

        <button
          onClick={fetchStats}
          disabled={loading}
          className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-1.5 self-start md:self-auto cursor-pointer shadow-xs disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-indigo-600' : ''}`} />
          <span>Refresh Metrics</span>
        </button>
      </div>

      {loading && !stats ? (
        <div className="py-20 text-center space-y-3">
          <div className="w-10 h-10 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-500">Loading system metrics from backend API...</p>
        </div>
      ) : error ? (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-center text-xs text-rose-700 flex items-center justify-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-500" />
          <span>{error}</span>
        </div>
      ) : stats ? (
        <div className="space-y-8">
          {/* Top 6 KPI Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Total Products */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4.5 space-y-2 shadow-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Total Products</span>
                <Package className="w-4 h-4 text-indigo-500" />
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
                {stats.totalProducts}
              </p>
              <p className="text-[11px] text-slate-500">Stored in database</p>
            </div>

            {/* Categories */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4.5 space-y-2 shadow-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Categories</span>
                <Layers className="w-4 h-4 text-blue-500" />
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
                {stats.totalCategories}
              </p>
              <p className="text-[11px] text-slate-500">Diverse domains</p>
            </div>

            {/* Average Rating */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4.5 space-y-2 shadow-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Avg Rating</span>
                <Star className="w-4 h-4 text-amber-500" />
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-amber-600 font-mono">
                {stats.averageRating}★
              </p>
              <p className="text-[11px] text-slate-500">Across catalog</p>
            </div>

            {/* In Stock Count */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4.5 space-y-2 shadow-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">In Stock</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono">
                {stats.inStockCount}
              </p>
              <p className="text-[11px] text-slate-500">{stats.outOfStockCount} out of stock</p>
            </div>

            {/* Avg Delivery Time */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4.5 space-y-2 shadow-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Avg Delivery</span>
                <Truck className="w-4 h-4 text-purple-500" />
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-purple-600 font-mono">
                {stats.averageDeliveryDays}d
              </p>
              <p className="text-[11px] text-slate-500">Transit duration</p>
            </div>

            {/* Total Recommendation Requests */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4.5 space-y-2 shadow-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Total Requests</span>
                <Sparkles className="w-4 h-4 text-amber-500" />
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-indigo-600 font-mono">
                {stats.totalRecommendationRequests}
              </p>
              <p className="text-[11px] text-slate-500">Agent runs executed</p>
            </div>
          </div>

          {/* Charts / Distribution Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category Distribution Chart */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Package className="w-4 h-4 text-indigo-600" />
                  <span>Product Category Volume</span>
                </h3>
                <span className="text-xs text-slate-400">Catalog distribution</span>
              </div>

              <div className="space-y-3 pt-1">
                {Object.entries(stats.categoryCounts).map(([catName, count]) => {
                  const percent = Math.round((count / (stats.totalRecommendationRequests || 1)) * 100);
                  return (
                    <div key={catName} className="space-y-1 text-xs">
                      <div className="flex justify-between font-medium">
                        <span className="text-slate-800">{catName}</span>
                        <span className="font-bold text-indigo-600 font-mono">
                          {count} queries
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(100, Math.max(8, percent * 2))}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Priority Preference Distribution */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span>Customer Priority Preferences</span>
                </h3>
                <span className="text-xs text-slate-400">30% Weight Distribution</span>
              </div>

              <div className="space-y-3 pt-1">
                {Object.entries(stats.priorityCounts).map(([priorityName, count]) => {
                  const colors: Record<string, string> = {
                    'Overall Balance': 'bg-indigo-600',
                    'Low Price': 'bg-emerald-600',
                    'High Rating': 'bg-amber-600',
                    'Fast Delivery': 'bg-purple-600',
                    'High Quality': 'bg-rose-600',
                  };
                  const color = colors[priorityName] || 'bg-slate-600';
                  return (
                    <div key={priorityName} className="space-y-1 text-xs">
                      <div className="flex justify-between font-medium">
                        <span className="text-slate-800">{priorityName}</span>
                        <span className="font-bold text-slate-700 font-mono">
                          {count} selections
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                        <div
                          className={`${color} h-2.5 rounded-full transition-all duration-500`}
                          style={{
                            width: `${Math.min(100, Math.max(12, (count / (stats.totalRecommendationRequests || 1)) * 180))}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recent Recommendation Activity Log */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-500" />
                <span>Recent Agent Recommendation Runs</span>
              </h3>
              <span className="text-xs text-slate-400">Logged sequentially</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-700 border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold">
                    <th className="py-2.5 px-4">Log ID</th>
                    <th className="py-2.5 px-4">Time</th>
                    <th className="py-2.5 px-4">Category</th>
                    <th className="py-2.5 px-4">Budget Max</th>
                    <th className="py-2.5 px-4">Priority Chosen</th>
                    <th className="py-2.5 px-4">Top Suggested Product</th>
                    <th className="py-2.5 px-4">Top Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {stats.recentLogs.map(log => (
                    <tr key={log.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-4 font-mono font-medium text-slate-500">{log.id}</td>
                      <td className="py-3 px-4 text-slate-500">{log.timestamp}</td>
                      <td className="py-3 px-4 font-semibold text-slate-900">{log.category}</td>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-700">
                        ₹{log.maxBudget.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-700 font-medium rounded-md">
                          {log.priority}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900">{log.topProductName}</td>
                      <td className="py-3 px-4">
                        <span className="font-mono font-extrabold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                          {log.topProductScore}/100
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
