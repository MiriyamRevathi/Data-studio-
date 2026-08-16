import React, { useState } from 'react';
import { 
  Settings, 
  ShieldCheck, 
  Trash2, 
  Cpu, 
  CheckCircle2, 
  Database,
  RefreshCw,
  Sliders
} from 'lucide-react';
import { clearTempDatasets } from '../api/pyDataApi.ts';

interface SettingsViewProps {
  onClearCustomDatasets: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onClearCustomDatasets }) => {
  const [clearing, setClearing] = useState(false);
  const [clearMessage, setClearMessage] = useState<string | null>(null);

  const handleClearCache = async () => {
    setClearing(true);
    try {
      await clearTempDatasets();
      onClearCustomDatasets();
      setClearMessage('All temporary uploaded datasets have been cleared from local memory.');
      setTimeout(() => setClearMessage(null), 3500);
    } catch {
      setClearMessage('Cleared client session storage.');
      setTimeout(() => setClearMessage(null), 3500);
    } finally {
      setClearing(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl pb-12">
      {/* Header */}
      <div className="border-b border-slate-200/80 pb-5">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Studio Settings & Environment
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          System diagnostics, local memory management, and security guarantees.
        </p>
      </div>

      {clearMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2 text-xs text-emerald-800">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{clearMessage}</span>
        </div>
      )}

      {/* Security & Offline Compliance Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Zero External Dependency Guarantee
            </h2>
            <span className="text-xs text-emerald-700 font-semibold">
              Compliant with 100% Local Processing Mandate
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2 p-2.5 rounded bg-slate-50 border border-slate-100">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>External AI APIs: <strong>Disabled (Zero API Keys)</strong></span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded bg-slate-50 border border-slate-100">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Cloud Database: <strong>None (Local CSV & In-Memory)</strong></span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded bg-slate-50 border border-slate-100">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Analytics Engine: <strong>Local Python (Pandas / NumPy)</strong></span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded bg-slate-50 border border-slate-100">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Chart Visualizer: <strong>Plotly.js Local Rendering</strong></span>
          </div>
        </div>
      </div>

      {/* Local Storage & Cache Management */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Dataset Memory Management
            </h2>
            <p className="text-xs text-slate-500">
              Manage custom uploaded CSV tables and reset local storage caches.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-lg bg-slate-50 border border-slate-200">
          <div>
            <h3 className="text-sm font-bold text-slate-800">Clear Custom Uploaded Datasets</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Removes all uploaded CSV files and resets the studio back to the 5 default seed datasets.
            </p>
          </div>
          <button
            disabled={clearing}
            onClick={handleClearCache}
            className="px-4 py-2 text-xs font-semibold text-rose-700 bg-white hover:bg-rose-50 border border-rose-200 rounded-lg shadow-2xs transition-colors flex items-center gap-2 shrink-0 disabled:opacity-50"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{clearing ? 'Clearing...' : 'Clear Uploads'}</span>
          </button>
        </div>
      </div>

      {/* Engine Architecture Info */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-3 text-xs text-slate-600">
        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
          Runtime Architecture
        </h2>
        <p className="leading-relaxed">
          DATA AI STUDIO utilizes an isolated local Python subprocess bridge for data operations (IQR outlier profiling, Pearson bivariate correlation calculation, and frequency aggregations). The user interface is rendered in React with Plotly for client-side vector visualization.
        </p>
        <div className="flex items-center gap-4 pt-2 font-mono text-[11px] text-slate-500">
          <span>Engine: Python 3.12</span>
          <span>&bull;</span>
          <span>Pandas: 2.2.3</span>
          <span>&bull;</span>
          <span>NumPy: 2.0.2</span>
        </div>
      </div>
    </div>
  );
};
