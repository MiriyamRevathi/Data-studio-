import React from 'react';
import { 
  Database, 
  FileSpreadsheet, 
  BarChart3, 
  Activity, 
  FileText, 
  ArrowRight, 
  Table,
  UploadCloud,
  Lock
} from 'lucide-react';
import { AppView, DatasetMeta, User } from '../types.ts';

interface DashboardViewProps {
  user: User | null;
  datasets: DatasetMeta[];
  chartsCount: number;
  onSelectDataset: (id: string, targetView?: AppView) => void;
  onNavigate: (view: AppView) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  datasets,
  chartsCount,
  onSelectDataset,
  onNavigate,
}) => {
  const totalRows = datasets.reduce((acc, d) => acc + (d.rows || 0), 0);
  const totalCols = datasets.reduce((acc, d) => acc + (d.columns?.length || 0), 0);

  // When user is not logged in, clicking any card redirects to login
  const handleCardClick = (action: () => void) => {
    if (!user) {
      onNavigate('login');
      return;
    }
    action();
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Guest Mode Notification when user is not logged in */}
      {!user && (
        <div className="bg-amber-50/90 border border-amber-200/90 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-amber-900 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-amber-900">Guest Preview Mode</p>
              <p className="text-xs text-amber-700">You are not signed in. Clicking any dashboard card will redirect you to the login page.</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('login')}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-2xs transition-colors shrink-0"
          >
            <span>Sign In</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Data Overview
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Analyze your datasets and discover useful patterns across local tables.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => handleCardClick(() => onNavigate('datasets'))}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-2xs transition-colors"
          >
            <UploadCloud className="w-3.5 h-3.5 text-emerald-600" />
            <span>Upload CSV</span>
          </button>
          <button
            onClick={() => handleCardClick(() => onNavigate('visualization'))}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors"
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Create Visualization</span>
          </button>
        </div>
      </div>

      {/* Summary Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          onClick={() => handleCardClick(() => onNavigate('datasets'))}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleCardClick(() => onNavigate('datasets'));
            }
          }}
          role="button"
          tabIndex={0}
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs cursor-pointer hover:border-emerald-500 hover:shadow-sm transition-all group focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 group-hover:text-emerald-700 transition-colors">
              Total Datasets
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Database className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{datasets.length}</span>
            <span className="text-xs text-emerald-700 font-medium">Ready in memory</span>
          </div>
        </div>

        <div 
          onClick={() => handleCardClick(() => onNavigate('datasets'))}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleCardClick(() => onNavigate('datasets'));
            }
          }}
          role="button"
          tabIndex={0}
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs cursor-pointer hover:border-emerald-500 hover:shadow-sm transition-all group focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 group-hover:text-emerald-700 transition-colors">
              Total Records
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Table className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{totalRows.toLocaleString()}</span>
            <span className="text-xs text-slate-500 font-medium">Verified rows</span>
          </div>
        </div>

        <div 
          onClick={() => handleCardClick(() => onNavigate('datasets'))}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleCardClick(() => onNavigate('datasets'));
            }
          }}
          role="button"
          tabIndex={0}
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs cursor-pointer hover:border-emerald-500 hover:shadow-sm transition-all group focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 group-hover:text-emerald-700 transition-colors">
              Total Attributes
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{totalCols}</span>
            <span className="text-xs text-slate-500 font-medium">Analyzed columns</span>
          </div>
        </div>

        <div 
          onClick={() => handleCardClick(() => onNavigate('visualization'))}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleCardClick(() => onNavigate('visualization'));
            }
          }}
          role="button"
          tabIndex={0}
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs cursor-pointer hover:border-emerald-500 hover:shadow-sm transition-all group focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 group-hover:text-emerald-700 transition-colors">
              Charts Created
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <BarChart3 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{chartsCount}</span>
            <span className="text-xs text-emerald-700 font-medium">Rendered locally</span>
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS CARDS */}
      <div className="bg-emerald-950/5 border border-emerald-950/10 rounded-xl p-5">
        <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-3">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            onClick={() => handleCardClick(() => onNavigate('datasets'))}
            className="flex items-center gap-3 p-3 bg-white rounded-lg border border-emerald-950/10 hover:border-emerald-500 hover:shadow-xs text-left transition-all group"
          >
            <div className="w-9 h-9 rounded-md bg-emerald-100/70 text-emerald-800 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block group-hover:text-emerald-800">Analyze Dataset</span>
              <span className="text-[11px] text-slate-500">Inspect data & quality</span>
            </div>
          </button>

          <button
            onClick={() => handleCardClick(() => onNavigate('visualization'))}
            className="flex items-center gap-3 p-3 bg-white rounded-lg border border-emerald-950/10 hover:border-emerald-500 hover:shadow-xs text-left transition-all group"
          >
            <div className="w-9 h-9 rounded-md bg-emerald-100/70 text-emerald-800 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block group-hover:text-emerald-800">Create Visualization</span>
              <span className="text-[11px] text-slate-500">Bar, Line, Scatter, Pie</span>
            </div>
          </button>

          <button
            onClick={() => handleCardClick(() => onNavigate('analytics'))}
            className="flex items-center gap-3 p-3 bg-white rounded-lg border border-emerald-950/10 hover:border-emerald-500 hover:shadow-xs text-left transition-all group"
          >
            <div className="w-9 h-9 rounded-md bg-emerald-100/70 text-emerald-800 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block group-hover:text-emerald-800">View Analytics</span>
              <span className="text-[11px] text-slate-500">Correlations & Insights</span>
            </div>
          </button>

          <button
            onClick={() => handleCardClick(() => onNavigate('reports'))}
            className="flex items-center gap-3 p-3 bg-white rounded-lg border border-emerald-950/10 hover:border-emerald-500 hover:shadow-xs text-left transition-all group"
          >
            <div className="w-9 h-9 rounded-md bg-emerald-100/70 text-emerald-800 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block group-hover:text-emerald-800">Generate Report</span>
              <span className="text-[11px] text-slate-500">Export audit summaries</span>
            </div>
          </button>
        </div>
      </div>

      {/* RECENT DATASETS LIST */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Recent Datasets</h2>
            <p className="text-xs text-slate-500">Available datasets ready for local exploration and visualization.</p>
          </div>
          <button
            onClick={() => handleCardClick(() => onNavigate('datasets'))}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/75 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Dataset Name</th>
                  <th className="py-3 px-4">Category / Task</th>
                  <th className="py-3 px-4">Rows</th>
                  <th className="py-3 px-4">Columns</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {datasets.map((d) => (
                  <tr 
                    key={d.id} 
                    onClick={() => handleCardClick(() => onSelectDataset(d.id, 'dataset-preview'))}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                  >
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900 flex items-center gap-2">
                        <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                        <span>{d.name}</span>
                        {d.is_seed && (
                          <span className="text-[10px] font-medium px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Seed
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-500 block line-clamp-1">{d.description}</span>
                    </td>
                    <td className="py-3 px-4 text-xs font-medium text-slate-600">
                      {d.task || 'General Analysis'}
                    </td>
                    <td className="py-3 px-4 text-xs font-semibold text-slate-800">
                      {d.rows.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-xs text-slate-600">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {d.columns.slice(0, 3).map((c) => (
                          <span key={c} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-mono">
                            {c}
                          </span>
                        ))}
                        {d.columns.length > 3 && (
                          <span className="text-[11px] text-slate-400">+{d.columns.length - 3}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCardClick(() => onSelectDataset(d.id, 'dataset-preview'));
                          }}
                          className="px-2.5 py-1 text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded transition-colors"
                        >
                          Preview
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCardClick(() => onSelectDataset(d.id, 'visualization'));
                          }}
                          className="px-2.5 py-1 text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded transition-colors"
                        >
                          Visualize
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCardClick(() => onSelectDataset(d.id, 'analytics'));
                          }}
                          className="px-2.5 py-1 text-xs font-medium text-slate-700 hover:text-emerald-700 bg-white border border-slate-200 hover:border-slate-300 rounded transition-colors"
                        >
                          Analytics
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
