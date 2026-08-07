import React, { useState } from 'react';
import { Table, BarChart2, Layers, Search, Upload, RefreshCw, CheckCircle } from 'lucide-react';
import { DatasetDetail, DatasetMeta } from '../types.ts';

interface DatasetExplorerProps {
  datasets: DatasetMeta[];
  currentDataset: DatasetDetail | null;
  selectedDatasetId: string;
  onSelectDataset: (id: string) => void;
  isLoading: boolean;
  onCustomDataUpload: (name: string, records: Record<string, any>[]) => void;
}

export const DatasetExplorer: React.FC<DatasetExplorerProps> = ({
  datasets,
  currentDataset,
  selectedDatasetId,
  onSelectDataset,
  isLoading,
  onCustomDataUpload,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [csvInputOpen, setCsvInputOpen] = useState(false);
  const [rawCsvText, setRawCsvText] = useState('');

  const records = currentDataset?.records || [];
  const columns = currentDataset?.columns || [];
  const describe = currentDataset?.describe || {};
  const correlation = currentDataset?.correlation || {};

  const filteredRecords = records.filter((r) => {
    if (!searchTerm) return true;
    return Object.values(r).some((v) =>
      String(v).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredRecords.length / pageSize) || 1;
  const paginatedRecords = filteredRecords.slice((page - 1) * pageSize, page * pageSize);

  const handleParseCsv = () => {
    if (!rawCsvText.trim()) return;
    try {
      const lines = rawCsvText.trim().split('\n').map((l) => l.trim()).filter(Boolean);
      if (lines.length < 2) return;
      const headers = lines[0].split(',').map((h) => h.trim().replace(/^["']|["']$/g, ''));
      const parsedRecords: Record<string, any>[] = [];

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map((v) => v.trim().replace(/^["']|["']$/g, ''));
        const row: Record<string, any> = {};
        headers.forEach((h, idx) => {
          const rawVal = values[idx] ?? '';
          const num = Number(rawVal);
          row[h] = !isNaN(num) && rawVal !== '' ? num : rawVal;
        });
        parsedRecords.push(row);
      }

      onCustomDataUpload('Custom Dataset', parsedRecords);
      setCsvInputOpen(false);
      setRawCsvText('');
    } catch (err) {
      alert('Failed to parse CSV. Please check formatting.');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        setRawCsvText(text);
        setCsvInputOpen(true);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6" id="dataset-explorer-container">
      {/* Top Controls: Dataset Selector and Summary Cards */}
      <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
              Pandas DataFrame Source
            </span>
            <h2 className="text-xl font-bold text-emerald-950 mt-0.5">
              Select or Import Dataset
            </h2>
            <p className="text-sm text-emerald-800/80 mt-1">
              Data is loaded into in-memory Pandas DataFrames with NumPy numerical matrices.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {datasets.map((ds) => (
              <button
                key={ds.id}
                id={`dataset-select-${ds.id}`}
                onClick={() => onSelectDataset(ds.id)}
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all border ${
                  selectedDatasetId === ds.id
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                    : 'bg-emerald-50/60 text-emerald-900 border-emerald-200/80 hover:bg-emerald-100/70'
                }`}
              >
                {ds.name}
              </button>
            ))}

            <label className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold bg-white text-emerald-800 border border-emerald-300 hover:bg-emerald-50 transition-colors shadow-xs">
              <Upload className="w-4 h-4 text-emerald-600" />
              Upload CSV
              <input
                type="file"
                accept=".csv,.txt"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          </div>
        </div>

        {/* Upload Modal / Drawer if open */}
        {csvInputOpen && (
          <div className="mt-4 pt-4 border-t border-emerald-100 space-y-3">
            <h3 className="text-sm font-semibold text-emerald-950">CSV Data Preview / Input</h3>
            <textarea
              rows={4}
              value={rawCsvText}
              onChange={(e) => setRawCsvText(e.target.value)}
              placeholder="col1,col2,col3&#10;1.2,3.4,setosa&#10;5.1,2.3,versicolor"
              className="w-full p-3 rounded-lg border border-emerald-200 text-xs font-mono text-emerald-900 bg-emerald-50/30 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setCsvInputOpen(false)}
                className="px-3 py-1.5 text-xs text-emerald-800 hover:bg-emerald-50 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleParseCsv}
                className="px-3 py-1.5 text-xs bg-emerald-700 text-white font-medium rounded-lg hover:bg-emerald-800"
              >
                Load into Pandas
              </button>
            </div>
          </div>
        )}

        {/* Summary Metric Cards */}
        {currentDataset && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-emerald-100">
            <div className="bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-100">
              <p className="text-xs font-semibold text-emerald-700">Total Observations</p>
              <p className="text-2xl font-bold text-emerald-950 mt-1">{currentDataset.rows}</p>
              <p className="text-xs text-emerald-600 mt-0.5">Rows in DataFrame</p>
            </div>
            <div className="bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-100">
              <p className="text-xs font-semibold text-emerald-700">Features / Columns</p>
              <p className="text-2xl font-bold text-emerald-950 mt-1">{currentDataset.columns.length}</p>
              <p className="text-xs text-emerald-600 mt-0.5">Pandas Series</p>
            </div>
            <div className="bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-100">
              <p className="text-xs font-semibold text-emerald-700">Numeric Variables</p>
              <p className="text-2xl font-bold text-emerald-950 mt-1">
                {currentDataset.numeric_columns?.length || 0}
              </p>
              <p className="text-xs text-emerald-600 mt-0.5">NumPy Floats & Ints</p>
            </div>
            <div className="bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-100">
              <p className="text-xs font-semibold text-emerald-700">Missing Values</p>
              <p className="text-2xl font-bold text-emerald-950 mt-1">
                {Object.values(currentDataset.null_counts || {}).reduce((a: number, b: any) => a + Number(b), 0)}
              </p>
              <p className="text-xs text-emerald-600 mt-0.5">NaN / Null cells</p>
            </div>
          </div>
        )}
      </div>

      {/* Pandas Describe & NumPy Correlation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pandas df.describe() */}
        <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-emerald-700" />
              <h3 className="font-bold text-emerald-950">Pandas df.describe()</h3>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md">
              Descriptive Statistics
            </span>
          </div>
          <p className="text-xs text-emerald-700 mb-3">
            Parametric metrics: mean, standard deviation, quartiles, and extremes.
          </p>

          <div className="overflow-x-auto border border-emerald-100 rounded-xl">
            <table className="w-full text-left text-xs text-emerald-950 divide-y divide-emerald-100">
              <thead className="bg-emerald-50/70 font-semibold text-emerald-900">
                <tr>
                  <th className="p-2.5">Metric</th>
                  {Object.keys(describe).map((col) => (
                    <th key={col} className="p-2.5 whitespace-nowrap">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-50 font-mono">
                {['count', 'mean', 'std', 'min', '25%', '50%', '75%', 'max'].map((stat) => (
                  <tr key={stat} className="hover:bg-emerald-50/40">
                    <td className="p-2.5 font-sans font-semibold text-emerald-800 capitalize bg-emerald-50/20">
                      {stat}
                    </td>
                    {Object.keys(describe).map((col) => (
                      <td key={col} className="p-2.5 whitespace-nowrap">
                        {describe[col]?.[stat] !== undefined && describe[col]?.[stat] !== null
                          ? Number(describe[col][stat]).toFixed(2)
                          : '—'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* NumPy Correlation Matrix */}
        <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-700" />
              <h3 className="font-bold text-emerald-950">NumPy Correlation Matrix</h3>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md">
              np.corrcoef
            </span>
          </div>
          <p className="text-xs text-emerald-700 mb-3">
            Pearson linear correlation coefficient (-1.00 to +1.00) between continuous features.
          </p>

          <div className="overflow-x-auto border border-emerald-100 rounded-xl">
            <table className="w-full text-left text-xs divide-y divide-emerald-100">
              <thead className="bg-emerald-50/70 font-semibold text-emerald-900">
                <tr>
                  <th className="p-2.5">Feature</th>
                  {Object.keys(correlation).map((col) => (
                    <th key={col} className="p-2.5 whitespace-nowrap">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-50 font-mono">
                {Object.keys(correlation).map((rowCol) => (
                  <tr key={rowCol} className="hover:bg-emerald-50/40">
                    <td className="p-2.5 font-sans font-semibold text-emerald-900 bg-emerald-50/20">
                      {rowCol}
                    </td>
                    {Object.keys(correlation).map((colCol) => {
                      const val = correlation[rowCol]?.[colCol] ?? 0;
                      // Heatmap color logic: positive green, negative soft slate
                      const isHigh = Math.abs(val) > 0.7;
                      const bgClass =
                        val === 1
                          ? 'bg-emerald-200 text-emerald-950 font-bold'
                          : val > 0.5
                          ? 'bg-emerald-100 text-emerald-900'
                          : val > 0.2
                          ? 'bg-emerald-50 text-emerald-800'
                          : val < -0.2
                          ? 'bg-amber-50 text-amber-900'
                          : 'text-emerald-700';

                      return (
                        <td
                          key={colCol}
                          className={`p-2.5 whitespace-nowrap text-center ${bgClass}`}
                          title={`Correlation between ${rowCol} and ${colCol}: ${val}`}
                        >
                          {val.toFixed(2)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Raw Data Table with Search and Pagination */}
      <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <Table className="w-5 h-5 text-emerald-700" />
              <h3 className="font-bold text-emerald-950">DataFrame Records Preview</h3>
            </div>
            <p className="text-xs text-emerald-700 mt-0.5">
              Inspecting active rows loaded into memory.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-emerald-600 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
                placeholder="Search rows..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-emerald-200 bg-emerald-50/20 text-emerald-900 placeholder:text-emerald-500 focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto border border-emerald-100 rounded-xl">
          <table className="w-full text-left text-xs divide-y divide-emerald-100">
            <thead className="bg-emerald-50 text-emerald-900 font-semibold">
              <tr>
                <th className="p-2.5 w-12 text-center text-emerald-600">#</th>
                {columns.map((col) => (
                  <th key={col} className="p-2.5 whitespace-nowrap">
                    <div>{col}</div>
                    <span className="text-[10px] font-mono font-normal text-emerald-600">
                      {currentDataset?.dtypes?.[col] || 'float64'}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-50">
              {isLoading ? (
                <tr>
                  <td colSpan={columns.length + 1} className="p-8 text-center text-emerald-700">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-emerald-600" />
                    Loading Pandas DataFrame...
                  </td>
                </tr>
              ) : paginatedRecords.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className="p-8 text-center text-emerald-700">
                    No matching records found.
                  </td>
                </tr>
              ) : (
                paginatedRecords.map((row, idx) => (
                  <tr key={idx} className="hover:bg-emerald-50/50">
                    <td className="p-2.5 font-mono text-center text-emerald-600">
                      {(page - 1) * pageSize + idx + 1}
                    </td>
                    {columns.map((col) => (
                      <td key={col} className="p-2.5 font-mono whitespace-nowrap text-emerald-900">
                        {String(row[col])}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="flex items-center justify-between mt-4 text-xs text-emerald-800">
          <div>
            Showing {(page - 1) * pageSize + 1} to{' '}
            {Math.min(page * pageSize, filteredRecords.length)} of {filteredRecords.length} entries
          </div>
          <div className="flex items-center gap-1.5">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-2.5 py-1 rounded-md border border-emerald-200 bg-white disabled:opacity-40 hover:bg-emerald-50 font-medium"
            >
              Previous
            </button>
            <span className="px-2 font-mono font-semibold">
              {page} / {totalPages}
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="px-2.5 py-1 rounded-md border border-emerald-200 bg-white disabled:opacity-40 hover:bg-emerald-50 font-medium"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
