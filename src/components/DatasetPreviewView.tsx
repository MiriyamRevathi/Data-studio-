import React, { useState, useMemo } from 'react';
import { 
  Table, 
  Layers, 
  Activity, 
  ShieldCheck, 
  Search, 
  BarChart3, 
  ArrowLeft, 
  Filter,
  CheckCircle2,
  AlertTriangle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { DatasetDetail, DatasetMeta, AppView } from '../types.ts';

interface DatasetPreviewViewProps {
  dataset: DatasetDetail;
  allDatasets: DatasetMeta[];
  onSelectDataset: (id: string) => void;
  onNavigate: (view: AppView) => void;
  initialTab?: 'overview' | 'data' | 'stats' | 'quality';
}

export const DatasetPreviewView: React.FC<DatasetPreviewViewProps> = ({
  dataset,
  allDatasets,
  onSelectDataset,
  onNavigate,
  initialTab = 'overview',
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'data' | 'stats' | 'quality'>(initialTab);

  // Sync activeTab if initialTab changes
  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(dataset.columns);

  // Filtered rows for Data preview tab
  const filteredRecords = useMemo(() => {
    if (!searchTerm.trim()) return dataset.records;
    const term = searchTerm.toLowerCase();
    return dataset.records.filter((row) =>
      Object.values(row).some((val) => String(val).toLowerCase().includes(term))
    );
  }, [dataset.records, searchTerm]);

  // Paginated records
  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / pageSize));
  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredRecords.slice(start, start + pageSize);
  }, [filteredRecords, currentPage, pageSize]);

  const toggleColumnVisibility = (col: string) => {
    if (visibleColumns.includes(col)) {
      if (visibleColumns.length > 1) {
        setVisibleColumns(visibleColumns.filter((c) => c !== col));
      }
    } else {
      setVisibleColumns([...visibleColumns, col]);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Breadcrumb & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('datasets')}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            title="Back to Datasets"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                {dataset.name}
              </h1>
              <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                {dataset.rows.toLocaleString()} Rows
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-slate-100 text-slate-700">
                {dataset.columns.length} Cols
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{dataset.description}</p>
          </div>
        </div>

        {/* Dataset Switcher & Visualizer Shortcut */}
        <div className="flex items-center gap-2.5">
          <select
            value={dataset.id}
            onChange={(e) => onSelectDataset(e.target.value)}
            className="text-xs font-semibold py-2 px-3 bg-white border border-slate-300 rounded-lg text-slate-800 shadow-2xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            {allDatasets.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.rows} rows)
              </option>
            ))}
          </select>

          <button
            onClick={() => onNavigate('visualization')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors"
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Open in Studio</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'overview'
              ? 'border-emerald-600 text-emerald-900 bg-emerald-50/40'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('data')}
          className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'data'
              ? 'border-emerald-600 text-emerald-900 bg-emerald-50/40'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Table className="w-4 h-4" />
          <span>Data Preview</span>
        </button>

        <button
          onClick={() => setActiveTab('stats')}
          className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'stats'
              ? 'border-emerald-600 text-emerald-900 bg-emerald-50/40'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Summary Statistics</span>
        </button>

        <button
          onClick={() => setActiveTab('quality')}
          className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'quality'
              ? 'border-emerald-600 text-emerald-900 bg-emerald-50/40'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Data Quality & Outliers</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Rows</span>
              <p className="text-2xl font-extrabold text-slate-900 mt-2">{dataset.rows.toLocaleString()}</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Columns</span>
              <p className="text-2xl font-extrabold text-slate-900 mt-2">{dataset.columns.length}</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Numeric Columns</span>
              <p className="text-2xl font-extrabold text-emerald-800 mt-2">{dataset.column_types?.numeric?.length || 0}</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Categorical Columns</span>
              <p className="text-2xl font-extrabold text-slate-900 mt-2">{dataset.column_types?.categorical?.length || 0}</p>
            </div>
          </div>

          {/* Detected Data Types */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
              Detected Schema & Attributes
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              {/* Numeric */}
              <div className="p-4 rounded-lg bg-emerald-50/50 border border-emerald-200/70">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-emerald-900">Numeric Attributes</span>
                  <span className="text-xs font-mono font-semibold text-emerald-700">
                    {dataset.column_types?.numeric?.length || 0}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {dataset.column_types?.numeric?.map((col) => (
                    <span key={col} className="px-2 py-0.5 rounded bg-white text-emerald-900 text-xs font-mono border border-emerald-200">
                      {col}
                    </span>
                  ))}
                </div>
              </div>

              {/* Categorical */}
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-800">Categorical Attributes</span>
                  <span className="text-xs font-mono font-semibold text-slate-600">
                    {dataset.column_types?.categorical?.length || 0}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {dataset.column_types?.categorical?.map((col) => (
                    <span key={col} className="px-2 py-0.5 rounded bg-white text-slate-700 text-xs font-mono border border-slate-200">
                      {col}
                    </span>
                  ))}
                </div>
              </div>

              {/* Date */}
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-800">Temporal / Date Attributes</span>
                  <span className="text-xs font-mono font-semibold text-slate-600">
                    {dataset.column_types?.date?.length || 0}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {dataset.column_types?.date?.length ? (
                    dataset.column_types.date.map((col) => (
                      <span key={col} className="px-2 py-0.5 rounded bg-white text-slate-700 text-xs font-mono border border-slate-200">
                        {col}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400 italic">None detected</span>
                  )}
                </div>
              </div>

              {/* Boolean */}
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-800">Boolean Flags</span>
                  <span className="text-xs font-mono font-semibold text-slate-600">
                    {dataset.column_types?.boolean?.length || 0}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {dataset.column_types?.boolean?.length ? (
                    dataset.column_types.boolean.map((col) => (
                      <span key={col} className="px-2 py-0.5 rounded bg-white text-slate-700 text-xs font-mono border border-slate-200">
                        {col}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400 italic">None detected</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DATA PREVIEW */}
      {activeTab === 'data' && (
        <div className="space-y-4">
          {/* Controls: Search, Page Size, Column Visibility */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search in data table..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-900"
                />
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto text-xs text-slate-500">
                <span>Rows per page:</span>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="py-1 px-2 border border-slate-300 rounded bg-white text-slate-700 font-medium"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                <span className="ml-2 font-medium text-slate-700">
                  Showing {paginatedRecords.length} of {filteredRecords.length} records
                </span>
              </div>
            </div>

            {/* Column Visibility Selector */}
            <div className="pt-2 border-t border-slate-100 flex items-center gap-2 overflow-x-auto text-xs">
              <span className="text-slate-500 flex items-center gap-1 font-semibold shrink-0">
                <Filter className="w-3 h-3" /> Visible Cols:
              </span>
              <div className="flex flex-wrap gap-1">
                {dataset.columns.map((col) => {
                  const isVisible = visibleColumns.includes(col);
                  return (
                    <button
                      key={col}
                      onClick={() => toggleColumnVisibility(col)}
                      className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                        isVisible
                          ? 'bg-emerald-100 text-emerald-900 font-semibold'
                          : 'bg-slate-100 text-slate-400 hover:text-slate-700'
                      }`}
                    >
                      {col}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
            <div className="overflow-x-auto max-h-[520px]">
              <table className="w-full text-left border-collapse text-xs">
                <thead className="sticky top-0 bg-slate-50 border-b border-slate-200 z-10 shadow-2xs">
                  <tr>
                    <th className="py-2.5 px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider w-12 text-center">
                      #
                    </th>
                    {visibleColumns.map((col) => (
                      <th key={col} className="py-2.5 px-3 text-[11px] font-bold text-slate-700 font-mono whitespace-nowrap">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedRecords.map((row, idx) => (
                    <tr key={idx} className="hover:bg-emerald-50/30 transition-colors font-mono text-slate-800">
                      <td className="py-2 px-3 text-slate-400 text-center font-sans text-[11px]">
                        {(currentPage - 1) * pageSize + idx + 1}
                      </td>
                      {visibleColumns.map((col) => {
                        const val = row[col];
                        return (
                          <td key={col} className="py-2 px-3 whitespace-nowrap">
                            {val === null || val === undefined ? (
                              <span className="text-slate-300 italic">null</span>
                            ) : typeof val === 'number' ? (
                              <span className="text-slate-900 font-semibold">{val.toLocaleString()}</span>
                            ) : (
                              String(val)
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
              <span className="text-slate-500">
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="p-1 rounded border border-slate-300 disabled:opacity-30 hover:bg-white text-slate-700"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="p-1 rounded border border-slate-300 disabled:opacity-30 hover:bg-white text-slate-700"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SUMMARY STATISTICS */}
      {activeTab === 'stats' && (
        <div className="space-y-6">
          {/* Numeric Stats */}
          {dataset.statistics?.numeric && Object.keys(dataset.statistics.numeric).length > 0 && (
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-3">
                Numeric Attributes Summary Statistics
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase border-b border-slate-200">
                      <th className="py-2.5 px-3">Column</th>
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
                    {(Object.entries(dataset.statistics.numeric) as [string, any][]).map(([col, s]) => (
                      <tr key={col} className="hover:bg-slate-50/70">
                        <td className="py-2 px-3 font-semibold text-emerald-900">{col}</td>
                        <td className="py-2 px-3">{s.count}</td>
                        <td className="py-2 px-3 font-semibold">{s.mean.toLocaleString()}</td>
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

          {/* Categorical Stats */}
          {dataset.statistics?.categorical && Object.keys(dataset.statistics.categorical).length > 0 && (
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-3">
                Categorical Attributes Distribution
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase border-b border-slate-200">
                      <th className="py-2.5 px-3">Column</th>
                      <th className="py-2.5 px-3">Unique Values</th>
                      <th className="py-2.5 px-3">Most Frequent (Mode)</th>
                      <th className="py-2.5 px-3">Frequency</th>
                      <th className="py-2.5 px-3">Frequency %</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
                    {(Object.entries(dataset.statistics.categorical) as [string, any][]).map(([col, s]) => (
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

      {/* TAB 4: DATA QUALITY & OUTLIERS */}
      {activeTab === 'quality' && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Duplicate Rows</span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-extrabold text-slate-900">{dataset.quality.duplicate_rows}</span>
                <span className="text-xs text-emerald-700 font-medium">
                  {dataset.quality.duplicate_rows === 0 ? 'Zero duplicates (Clean)' : 'Duplicates detected'}
                </span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Missing Values</span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-extrabold text-slate-900">
                  {dataset.quality.missing_values.reduce((a, b) => a + b.missing_count, 0)}
                </span>
                <span className="text-xs text-emerald-700 font-medium">
                  {dataset.quality.missing_values.every((m) => m.missing_count === 0) ? '100% Complete' : 'Gaps detected'}
                </span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Outliers (IQR Method)</span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-extrabold text-slate-900">
                  {dataset.quality.outliers?.reduce((a, b) => a + b.outlier_count, 0) || 0}
                </span>
                <span className="text-xs text-slate-500 font-medium">Across all numeric cols</span>
              </div>
            </div>
          </div>

          {/* Missing Values Table */}
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-3">
              Completeness & Missing Values Analysis
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase border-b border-slate-200">
                    <th className="py-2.5 px-3">Column</th>
                    <th className="py-2.5 px-3">Missing Count</th>
                    <th className="py-2.5 px-3">Missing Percentage</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
                  {dataset.quality.missing_values.map((m) => (
                    <tr key={m.column} className="hover:bg-slate-50/70">
                      <td className="py-2 px-3 font-semibold text-slate-900">{m.column}</td>
                      <td className="py-2 px-3">{m.missing_count}</td>
                      <td className="py-2 px-3">{m.missing_percentage}%</td>
                      <td className="py-2 px-3 font-sans">
                        {m.missing_count === 0 ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                            <CheckCircle2 className="w-3 h-3" /> Clean
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                            <AlertTriangle className="w-3 h-3" /> Missing Values
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Outliers Table (IQR Method) */}
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                  Statistical Outliers (Interquartile Range Method)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Identified values falling outside [Q1 - 1.5 &times; IQR, Q3 + 1.5 &times; IQR].
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase border-b border-slate-200">
                    <th className="py-2.5 px-3">Numeric Column</th>
                    <th className="py-2.5 px-3">Outlier Count</th>
                    <th className="py-2.5 px-3">Outlier Percentage</th>
                    <th className="py-2.5 px-3">Lower Bound</th>
                    <th className="py-2.5 px-3">Upper Bound</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
                  {dataset.quality.outliers?.map((o) => (
                    <tr key={o.column} className="hover:bg-slate-50/70">
                      <td className="py-2 px-3 font-semibold text-emerald-900">{o.column}</td>
                      <td className="py-2 px-3 font-bold">
                        {o.outlier_count > 0 ? (
                          <span className="text-amber-700 font-semibold">{o.outlier_count}</span>
                        ) : (
                          <span className="text-slate-400">0</span>
                        )}
                      </td>
                      <td className="py-2 px-3">{o.outlier_percentage}%</td>
                      <td className="py-2 px-3">{o.lower_bound.toLocaleString()}</td>
                      <td className="py-2 px-3">{o.upper_bound.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
