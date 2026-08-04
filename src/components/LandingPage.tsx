import React from 'react';
import { 
  ArrowRight, 
  BarChart3, 
  LineChart, 
  PieChart, 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  FileSpreadsheet, 
  CheckCircle2, 
  FileText,
  Activity,
  Layers
} from 'lucide-react';
import { AppView, DatasetMeta } from '../types.ts';

interface LandingPageProps {
  onNavigate: (view: AppView) => void;
  onExploreDemo: () => void;
  seedDatasets: DatasetMeta[];
}

export const LandingPage: React.FC<LandingPageProps> = ({ 
  onNavigate, 
  onExploreDemo,
  seedDatasets
}) => {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
      {/* Top Simple Header */}
      <header className="border-b border-slate-100 bg-white/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
              D
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              DATA AI STUDIO
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 ml-2 px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              <ShieldCheck className="w-3 h-3" /> Local Only
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('login')}
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={onExploreDemo}
              className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-all"
            >
              Launch Studio
            </button>
          </div>
        </div>
      </header>

      {/* Main Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 border-b border-slate-100 bg-gradient-to-b from-emerald-50/40 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100/70 text-emerald-800 border border-emerald-200">
                <Cpu className="w-3.5 h-3.5 text-emerald-700" />
                <span>Zero Cloud Dependency &bull; 100% Local Engine</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Explore. Understand. <span className="text-emerald-700">Visualize.</span>
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                Turn datasets into meaningful insights with powerful local data analysis and visualization tools. No cloud subscriptions, no external APIs, and total privacy for your sensitive data.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('login')}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm hover:shadow transition-all"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onExploreDemo}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-all"
                >
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Explore Demo</span>
                </button>
              </div>

              {/* Security Points */}
              <div className="pt-4 grid grid-cols-3 gap-3 text-xs text-slate-500 border-t border-slate-200/80">
                <div>&bull; Instant CSV Processing</div>
                <div>&bull; Outliers & IQR Profiling</div>
                <div>&bull; Local Chart Export</div>
              </div>
            </div>

            {/* Right SVG Data Analytics Artwork */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-lg bg-white rounded-xl border border-slate-200 p-6 shadow-md shadow-emerald-950/5 relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                    <span className="text-xs font-mono text-slate-400 ml-2">DATA_AI_STUDIO :: Local Pipeline</span>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    r = +0.94
                  </span>
                </div>

                {/* SVG Visual Graphic */}
                <svg viewBox="0 0 460 270" className="w-full h-auto text-emerald-600" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Grid Lines */}
                  <line x1="40" y1="30" x2="440" y2="30" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="40" y1="80" x2="440" y2="80" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="40" y1="130" x2="440" y2="130" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="40" y1="180" x2="440" y2="180" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="40" y1="230" x2="440" y2="230" stroke="#e2e8f0" strokeWidth="1.5" />
                  <line x1="40" y1="30" x2="40" y2="230" stroke="#e2e8f0" strokeWidth="1.5" />

                  {/* Histogram / Bar Chart Shapes */}
                  <rect x="65" y="140" width="30" height="90" rx="3" fill="#10b981" fillOpacity="0.85" />
                  <rect x="115" y="90" width="30" height="140" rx="3" fill="#059669" fillOpacity="0.9" />
                  <rect x="165" y="120" width="30" height="110" rx="3" fill="#047857" fillOpacity="0.85" />
                  <rect x="215" y="60" width="30" height="170" rx="3" fill="#10b981" fillOpacity="0.95" />
                  <rect x="265" y="100" width="30" height="130" rx="3" fill="#059669" fillOpacity="0.85" />
                  <rect x="315" y="45" width="30" height="185" rx="3" fill="#047857" fillOpacity="0.9" />
                  <rect x="365" y="110" width="30" height="120" rx="3" fill="#34d399" fillOpacity="0.9" />

                  {/* Trend Line with Nodes */}
                  <path 
                    d="M 80 130 Q 130 80 180 100 T 280 50 T 380 40" 
                    stroke="#064e3b" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    fill="none" 
                  />

                  {/* Data Points */}
                  <circle cx="80" cy="130" r="5" fill="#ffffff" stroke="#064e3b" strokeWidth="2.5" />
                  <circle cx="180" cy="100" r="5" fill="#ffffff" stroke="#064e3b" strokeWidth="2.5" />
                  <circle cx="280" cy="50" r="5" fill="#ffffff" stroke="#064e3b" strokeWidth="2.5" />
                  <circle cx="380" cy="40" r="5" fill="#ffffff" stroke="#064e3b" strokeWidth="2.5" />

                  {/* Annotation Badge */}
                  <rect x="240" y="20" width="130" height="24" rx="4" fill="#065f46" />
                  <text x="305" y="36" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                    Peak Value: $42,000
                  </text>
                </svg>

                <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-100 text-center">
                  <div className="bg-slate-50 p-2 rounded">
                    <span className="text-[10px] text-slate-500 uppercase block font-medium">Rows</span>
                    <span className="text-sm font-bold text-slate-800">132 records</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded">
                    <span className="text-[10px] text-slate-500 uppercase block font-medium">Missing</span>
                    <span className="text-sm font-bold text-emerald-700">0% Clean</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded">
                    <span className="text-[10px] text-slate-500 uppercase block font-medium">Accuracy</span>
                    <span className="text-sm font-bold text-slate-800">100% Local</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU CAN DO */}
      <section className="py-16 bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">Capabilities</h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">What You Can Do</h3>
            <p className="text-slate-600 mt-2">Comprehensive local data analytics without cloud accounts or subscription keys.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs hover:border-emerald-300 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-1">Data Analysis</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Compute mean, median, standard deviations, and quartile distributions across all attributes.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs hover:border-emerald-300 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                <LineChart className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-1">Visualization</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Render interactive Bar, Line, Scatter, Histogram, and Pie charts directly in the browser.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs hover:border-emerald-300 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-1">Data Quality</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Automated detection of null values, duplicate rows, and statistical IQR outliers.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs hover:border-emerald-300 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                <Activity className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-1">Insights</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Deterministic findings derived directly from mathematical properties of the dataset.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs hover:border-emerald-300 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-1">Reports</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Compile comprehensive audit reports ready to print or export as HTML and JSON.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">Workflow</h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">How It Works</h3>
            <p className="text-slate-600 mt-2">A streamlined 5-step process designed for fast, frictionless local analysis.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {[
              { step: '1', title: 'Choose Dataset', desc: 'Select one of 5 seed datasets or upload any local CSV.' },
              { step: '2', title: 'Analyze Data', desc: 'Instant profiling computes data types, statistics, and null counts.' },
              { step: '3', title: 'Create Visualization', desc: 'Pick chart types with dynamic X/Y column mappings.' },
              { step: '4', title: 'Generate Insights', desc: 'Examine Pearson correlations and deterministic metrics.' },
              { step: '5', title: 'Export Results', desc: 'Download charts as PNG/SVG and reports as HTML.' },
            ].map((s, idx) => (
              <div key={s.step} className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 relative">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-sm flex items-center justify-center mb-3">
                  {s.step}
                </div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">{s.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUPPORTED CHARTS */}
      <section className="py-16 bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">Visualization Suite</h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">Supported Chart Types</h3>
            <p className="text-slate-600 mt-2">Five foundational chart types with interactive tooltips, sorting, and export.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {[
              { type: 'Bar Chart', icon: BarChart3, desc: 'Ideal for comparing aggregated numeric metrics across discrete categories.' },
              { type: 'Line Chart', icon: LineChart, desc: 'Tracks numeric trends and continuous progression over time or sequence.' },
              { type: 'Scatter Plot', icon: Sparkles, desc: 'Visualizes the relationship and correlation between two numeric variables.' },
              { type: 'Histogram', icon: Layers, desc: 'Examines the frequency distribution and spread of continuous values.' },
              { type: 'Pie Chart', icon: PieChart, desc: 'Displays proportions and percentage breakdowns of categorical groups.' },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.type} className="bg-white p-5 rounded-xl border border-slate-200 text-center flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">{c.type}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{c.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SEED DATASETS INCLUDED */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">Embedded Library</h2>
              <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">Seed Datasets Included</h3>
              <p className="text-slate-600 mt-1">Real-world preloaded samples ready to explore with zero configuration.</p>
            </div>
            <button
              onClick={onExploreDemo}
              className="mt-4 md:mt-0 text-sm font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <span>Explore all in Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {seedDatasets.map((d) => (
              <div 
                key={d.id} 
                className="p-5 rounded-xl border border-slate-200 hover:border-emerald-400 bg-white shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2 text-emerald-700">
                    <FileSpreadsheet className="w-4 h-4" />
                    <span className="text-xs font-mono font-semibold uppercase">{d.id}.csv</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-base mb-1">{d.name}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-4">{d.description}</p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <span>{d.rows} rows</span>
                  <span className="font-semibold text-emerald-700">{d.columns.length} cols</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 bg-emerald-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Start Exploring Your Data
          </h2>
          <p className="mt-3 text-base text-emerald-100 max-w-xl mx-auto">
            Ready to profile, visualize, and generate audit-ready reports without sending a single byte to external servers?
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={onExploreDemo}
              className="px-8 py-3.5 rounded-lg bg-white text-emerald-950 font-bold text-base hover:bg-emerald-50 shadow-md transition-all flex items-center gap-2"
            >
              <span>Launch Studio Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-auto py-8 bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
              D
            </div>
            <span className="font-bold text-white">DATA AI STUDIO</span>
            <span className="text-slate-500 ml-2">&bull; Local Data Analytics & Visualization Workbench</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>No External APIs</span>
            <span>&bull;</span>
            <span>No Cloud Database</span>
            <span>&bull;</span>
            <span>100% Private</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
