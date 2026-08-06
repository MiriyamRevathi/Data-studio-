import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  FileSpreadsheet, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  Eye, 
  BarChart3, 
  Activity, 
  Database,
  Loader2
} from 'lucide-react';
import { AppView, DatasetMeta, DatasetDetail } from '../types.ts';
import { uploadCsv } from '../api/pyDataApi.ts';

interface DatasetsViewProps {
  datasets: DatasetMeta[];
  onSelectDataset: (id: string, targetView?: AppView) => void;
  onDatasetUploaded: (dataset: DatasetDetail) => void;
}

export const DatasetsView: React.FC<DatasetsViewProps> = ({
  datasets,
  onSelectDataset,
  onDatasetUploaded,
}) => {
  const [activeTab, setActiveTab] = useState<'seed' | 'upload'>('seed');
  const [dragOver, setDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const seedDatasets = datasets.filter((d) => d.is_seed !== false);
  const customDatasets = datasets.filter((d) => d.is_seed === false);

  const handleProcessFile = async (file: File) => {
    setUploadError(null);
    setUploadSuccess(null);

    // Validate extension
    if (!file.name.toLowerCase().endsWith('.csv')) {
      setUploadError('Invalid file format. Please select a valid .csv file.');
      return;
    }

    // Validate size (e.g. limit to 20MB for browser responsiveness)
    if (file.size > 20 * 1024 * 1024) {
      setUploadError('File exceeds 20MB limit for browser local processing.');
      return;
    }

    setIsUploading(true);
    try {
      const text = await file.text();
      if (!text || !text.trim()) {
        throw new Error('Uploaded CSV file is completely empty. Please select a file with data.');
      }

      // Check for at least headers and one line
      const lines = text.trim().split(/\r\n|\n/).filter((l) => l.trim().length > 0);
      if (lines.length < 2) {
        throw new Error('CSV must contain at least one header row and at least one data row.');
      }

      // Upload and process locally via backend
      const result = await uploadCsv(file.name, text);
      if (result.error) {
        throw new Error(result.error);
      }

      setUploadSuccess(`Successfully loaded '${result.name}' with ${result.rows} rows and ${result.columns.length} columns!`);
      onDatasetUploaded(result);
    } catch (err: any) {
      setUploadError(err.message || 'Failed to process the CSV file.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleProcessFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Datasets Management
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Access preloaded seed datasets or upload your own CSV files for instant local profiling.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('seed')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'seed'
                ? 'bg-white text-emerald-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Seed Datasets ({seedDatasets.length})
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'upload'
                ? 'bg-white text-emerald-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Upload CSV {customDatasets.length > 0 && `(${customDatasets.length})`}
          </button>
        </div>
      </div>

      {/* SEED DATASETS TAB */}
      {activeTab === 'seed' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {seedDatasets.map((d) => (
              <div
                key={d.id}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs hover:border-emerald-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                        <FileSpreadsheet className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-mono text-slate-400 font-semibold">{d.filename}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Seed Data
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-1">{d.name}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">{d.description}</p>

                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 mb-4 space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Total Rows:</span>
                      <span className="font-semibold text-slate-900">{d.rows.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Total Columns:</span>
                      <span className="font-semibold text-slate-900">{d.columns.length} attributes</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Analysis Category:</span>
                      <span className="font-medium text-emerald-800">{d.task || 'Analytics'}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelectDataset(d.id, 'dataset-preview')}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview</span>
                  </button>
                  <button
                    onClick={() => onSelectDataset(d.id, 'visualization')}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
                  >
                    <BarChart3 className="w-3.5 h-3.5" />
                    <span>Visualize</span>
                  </button>
                  <button
                    onClick={() => onSelectDataset(d.id, 'analytics')}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
                  >
                    <Activity className="w-3.5 h-3.5" />
                    <span>Analyze</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Custom datasets section if any exist */}
          {customDatasets.length > 0 && (
            <div className="mt-8 pt-6 border-t border-slate-200">
              <h3 className="text-base font-bold text-slate-900 mb-3">Custom Uploaded Datasets</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {customDatasets.map((d) => (
                  <div
                    key={d.id}
                    className="bg-white border border-emerald-200 rounded-xl p-5 shadow-2xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono text-slate-400 font-semibold">{d.filename}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                          Uploaded
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900 mb-1">{d.name}</h4>
                      <p className="text-xs text-slate-500 mb-3">{d.description}</p>
                      <div className="text-xs text-slate-600 space-y-1 bg-slate-50 p-2.5 rounded mb-4">
                        <div>Rows: <strong className="text-slate-900">{d.rows.toLocaleString()}</strong></div>
                        <div>Columns: <strong className="text-slate-900">{d.columns.length}</strong></div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => onSelectDataset(d.id, 'dataset-preview')}
                        className="flex-1 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
                      >
                        Preview
                      </button>
                      <button
                        onClick={() => onSelectDataset(d.id, 'visualization')}
                        className="flex-1 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg"
                      >
                        Visualize
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* UPLOAD CSV TAB */}
      {activeTab === 'upload' && (
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Upload Drop Zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all bg-white ${
              dragOver
                ? 'border-emerald-500 bg-emerald-50/50'
                : 'border-slate-300 hover:border-slate-400'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,text/csv"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleProcessFile(e.target.files[0]);
                }
              }}
            />

            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <UploadCloud className="w-7 h-7" />
            </div>

            <h3 className="text-lg font-bold text-slate-900">
              Drag & Drop Your CSV File
            </h3>
            <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              Drop any CSV dataset here or browse your local file system. All computation executes locally inside your browser & container.
            </p>

            <button
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-xs disabled:opacity-50 transition-all"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing Dataset...</span>
                </>
              ) : (
                <>
                  <span>Select CSV File</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="mt-4 text-xs text-slate-400">
              Supported format: .csv (UTF-8 formatted with comma separation)
            </div>
          </div>

          {/* Validation Feedback */}
          {uploadError && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3 text-rose-800 text-xs">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold block text-sm mb-0.5">Upload Error</strong>
                <span>{uploadError}</span>
              </div>
            </div>
          )}

          {uploadSuccess && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3 text-emerald-800 text-xs">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold block text-sm mb-0.5">Dataset Ready</strong>
                <span>{uploadSuccess}</span>
              </div>
            </div>
          )}

          {/* Guidelines info card */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">CSV Requirements:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Header row required as the first non-empty line.</li>
              <li>Values must be separated by standard commas (,).</li>
              <li>Numeric columns should contain valid integers or floating-point numbers.</li>
              <li>Dates formatted as YYYY-MM-DD will automatically be parsed as temporal axes.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
