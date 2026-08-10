import React, { useState } from 'react';
import { 
  Activity, 
  Sparkles, 
  Table, 
  Layers, 
  BarChart2, 
  CheckCircle2, 
  HelpCircle,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { DatasetDetail, DatasetMeta, AppView } from '../types.ts';

interface AnalyticsViewProps {
  currentDataset: DatasetDetail;
  allDatasets: DatasetMeta[];
  onSelectDataset: (id: string) => void;
  onNavigate: (view: AppView) => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  currentDataset,
  allDatasets,
  onSelectDataset,
  onNavigate,
}) => {
  const [activeSection, setActiveSection] = useState<'insights' | 'correlation' | 'stats'>('insights');

  const numericCols = currentDataset.column_types?.numeric || [];
  const correlationMatrix = currentDataset.correlations?.matrix || {};
  const correlationPairs = currentDataset.correlations?.pairs || [];

  // Helper for heatmap cell color
  const getCorrelationColor = (val: number) => {
    if (val === 1) return 'bg-emerald-600 text-white font-bold';
    if (val > 0.7) return 'bg-emerald-500 text-white font-semibold';
    if (val > 0.4) return 'bg-emerald-200 text-emerald-950 font-medium';
    if (val > 0) return 'bg-emerald-50 text-emerald-900';
    if (val === 0) return 'bg-slate-50 text-slate-500';
    if (val > -0.4) return 'bg-rose-50 text-rose-900';
    if (val > -0.7) return 'bg-rose-200 text-rose-950 font-medium';
    return 'bg-rose-500 text-white font-semibold';
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Analytics & Correlations
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Multi-variable statistical profiling, Pearson correlation matrix, and deterministic insights.
          </p>
        </div>

        {/* Dataset selector */}
        <div className="flex items-center gap-3">
          <label className="text-xs font-semibold text-slate-600 uppercase">Dataset:</label>
          <select
            value={currentDataset.id}
            onChange={(e) => onSelectDataset(e.target.value)}
            className="text-xs font-semibold py-2 px-3 bg-white border border-slate-300 rounded-lg text-slate-800 shadow-2xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            {allDatasets.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.rows} rows)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Rows Profiled</span>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">{currentDataset.rows.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Attributes</span>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">{currentDataset.columns.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Numeric Attributes</span>
          <p className="text-2xl font-extrabold text-emerald-800 mt-1">{numericCols.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Correlation Pairs</span>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">{correlationPairs.length}</p>
        </div>
      </div>

      {/* Subnav Tabs */}
      <div className="flex border-b border-slate-200 space-x-2">
        <button
          onClick={() => setActiveSection('insights')}
          className={`flex items-center gap-2 py-2.5 px-4 text-xs font-bold border-b-2 transition-all ${
            activeSection === 'insights'
              ? 'border-emerald-600 text-emerald-900 bg-emerald-50/50'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Deterministic Insights ({currentDataset.insights?.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveSection('correlation')}
          className={`flex items-center gap-2 py-2.5 px-4 text-xs font-bold border-b-2 transition-all ${
            activeSection === 'correlation'
              ? 'border-emerald-600 text-emerald-900 bg-emerald-50/50'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Pearson Correlation Matrix</span>
        </button>

        <button
          onClick={() => setActiveSection('stats')}
          className={`flex items-center gap-2 py-2.5 px-4 text-xs font-bold border-b-2 transition-all ${
            activeSection === 'stats'
              ? 'border-emerald-600 text-emerald-900 bg-emerald-50/50'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Table className="w-4 h-4" />
          <span>Descriptive Statistics</span>
        </button>
      </div>

      {/* SECTION 1: DETERMINISTIC INSIGHTS */}
      {activeSection === 'insights' && (
        <div className="space-y-4">
          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-start justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-emerald-950 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-700" />
                Rule-Based Deterministic Findings
              </h3>
              <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                These findings are mathematically computed from genuine dataset totals, extrema, quartiles, and Pearson correlation coefficients — without calling any external AI APIs.
              </p>
            </div>
            <button
              onClick={() => onNavigate('reports')}
              className="px-3 py-1.5 text-xs font-semibold text-emerald-900 bg-white hover:bg-emerald-100 rounded-md border border-emerald-300 shrink-0 transition-colors"
            >
              Export in Report
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentDataset.insights && currentDataset.insights.length > 0 ? (
              currentDataset.insights.map((text, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-xl border border-slate-200 hover:border-emerald-300 shadow-2xs flex items-start gap-3 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block mb-1">
                      Insight {idx + 1}
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">{text}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 bg-white rounded-xl border border-slate-200 text-center text-slate-500 text-xs">
                No insights calculated for this dataset yet.
              </div>
            )}
          </div>
        </div>
      )}

      {/* SECTION 2: PEARSON CORRELATION MATRIX */}
      {activeSection === 'correlation' && (
        <div className="space-y-6">
          {numericCols.length >= 2 ? (
            <>
              {/* Correlation Heatmap */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                      Pearson Correlation Heatmap Matrix
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Measures the strength of linear association (r ranges from -1.0 to +1.0).
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <span className="w-3 h-3 bg-rose-500 rounded"></span> Negative
                    <span className="w-3 h-3 bg-slate-100 rounded ml-2"></span> None (0)
                    <span className="w-3 h-3 bg-emerald-500 rounded ml-2"></span> Positive
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="border-collapse text-xs">
                    <thead>
                      <tr>
                        <th className="p-2 border border-slate-200 bg-slate-50 text-left font-mono text-[11px] text-slate-600">
                          Variable
                        </th>
                        {numericCols.map((c) => (
                          <th
                            key={c}
                            className="p-2 border border-slate-200 bg-slate-50 text-center font-mono text-[11px] text-slate-700 min-w-[80px]"
                          >
                            {c}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {numericCols.map((rowCol) => (
                        <tr key={rowCol}>
                          <td className="p-2 border border-slate-200 bg-slate-50 font-mono font-semibold text-slate-900 whitespace-nowrap">
                            {rowCol}
                          </td>
                          {numericCols.map((colCol) => {
                            const val = correlationMatrix[rowCol]?.[colCol] ?? 0;
                            return (
                              <td
                                key={colCol}
                                className={`p-2 border border-slate-200 text-center font-mono transition-colors ${getCorrelationColor(
                                  val
                                )}`}
                                title={`${rowCol} vs ${colCol}: r = ${val}`}
                              >
                                {val.toFixed(3)}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Significant Pairs Table */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-3">
                  Pairwise Correlation Ranking
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase border-b border-slate-200">
                        <th className="py-2.5 px-3">Variable 1</th>
                        <th className="py-2.5 px-3">Variable 2</th>
                        <th className="py-2.5 px-3">Correlation (r)</th>
                        <th className="py-2.5 px-3">Strength</th>
                        <th className="py-2.5 px-3">Direction</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
                      {correlationPairs.map((p, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/70">
                          <td className="py-2 px-3 font-semibold text-emerald-900">{p.col1}</td>
                          <td className="py-2 px-3 font-semibold text-emerald-900">{p.col2}</td>
                          <td className="py-2 px-3 font-bold">
                            <span className={p.correlation >= 0 ? 'text-emerald-700' : 'text-rose-700'}>
                              {p.correlation.toFixed(3)}
                            </span>
                          </td>
                          <td className="py-2 px-3 font-sans">
                            <span
                              className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                                p.strength === 'Strong'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : p.strength === 'Moderate'
                                  ? 'bg-slate-100 text-slate-800'
                                  : 'bg-slate-50 text-slate-500'
                              }`}
                            >
                              {p.strength}
                            </span>
                          </td>
                          <td className="py-2 px-3 font-sans text-xs">{p.direction}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <div className="p-8 bg-white border border-slate-200 rounded-xl text-center text-slate-500 text-xs">
              Correlation analysis requires at least two numeric variables in the dataset.
            </div>
          )}
        </div>
      )}

      {/* SECTION 3: DESCRIPTIVE STATS */}
      {activeSection === 'stats' && (
        <div className="space-y-6">
          {/* Numeric Table */}
          {currentDataset.statistics?.numeric && (
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-3">
                Continuous Metrics Summary
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase border-b border-slate-200">
                      <th className="py-2.5 px-3">Attribute</th>
                      <th className="py-2.5 px-3">Count</th>
                      <th className="py-2.5 px-3">Mean</th>
                      <th className="py-2.5 px-3">Median</th>
                      <th className="py-2.5 px-3">Min</th>
                      <th className="py-2.5 px-3">Max</th>
                      <th className="py-2.5 px-3">Std Dev</th>
                      <th className="py-2.5 px-3">25% (Q1)</th>
                      <th className="py-2.5 px-3">75% (Q3)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
                    {(Object.entries(currentDataset.statistics.numeric) as [string, any][]).map(([col, s]) => (
                      <tr key={col} className="hover:bg-slate-50/70">
                        <td className="py-2 px-3 font-semibold text-slate-900">{col}</td>
                        <td className="py-2 px-3">{s.count}</td>
                        <td className="py-2 px-3 font-semibold text-emerald-800">{s.mean.toLocaleString()}</td>
                        <td className="py-2 px-3">{s.median.toLocaleString()}</td>
                        <td className="py-2 px-3">{s.min.toLocaleString()}</td>
                        <td className="py-2 px-3">{s.max.toLocaleString()}</td>
                        <td className="py-2 px-3">{s.std.toLocaleString()}</td>
                        <td className="py-2 px-3">{s.q25?.toLocaleString()}</td>
                        <td className="py-2 px-3">{s.q75?.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Categorical Table */}
          {currentDataset.statistics?.categorical && (
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-3">
                Categorical Frequencies
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase border-b border-slate-200">
                      <th className="py-2.5 px-3">Attribute</th>
                      <th className="py-2.5 px-3">Unique Values</th>
                      <th className="py-2.5 px-3">Mode (Most Frequent)</th>
                      <th className="py-2.5 px-3">Count</th>
                      <th className="py-2.5 px-3">Percentage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
                    {(Object.entries(currentDataset.statistics.categorical) as [string, any][]).map(([col, s]) => (
                      <tr key={col} className="hover:bg-slate-50/70">
                        <td className="py-2 px-3 font-semibold text-slate-900">{col}</td>
                        <td className="py-2 px-3">{s.unique_values}</td>
                        <td className="py-2 px-3 font-semibold text-emerald-800">"{s.most_frequent}"</td>
                        <td className="py-2 px-3">{s.frequency}</td>
                        <td className="py-2 px-3">{s.frequency_percentage}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
