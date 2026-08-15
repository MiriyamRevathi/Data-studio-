import React, { useState, useEffect } from 'react';
import { X, Download, Copy, Check, FileCode, BookOpen, Database, Sparkles } from 'lucide-react';
import { DatasetDetail } from '../types.ts';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  datasetId: string;
  currentDataset: DatasetDetail | null;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  datasetId,
  currentDataset,
}) => {
  const [activeFormat, setActiveFormat] = useState<'python' | 'jupyter' | 'csv' | 'requirements'>('python');
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) return;

    const fetchExport = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/export', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            dataset: datasetId,
            features: currentDataset?.numeric_columns || [],
            target: currentDataset?.columns?.[currentDataset.columns.length - 1] || 'target',
          }),
        });
        const text = await res.text();
      let data: any;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error('Server returned non-JSON response. Is the Python backend running?');
      }
        setGeneratedCode(data.python_script || '');
      } catch (err) {
        console.error('Failed to generate export script', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExport();
  }, [isOpen, datasetId, currentDataset]);

  if (!isOpen) return null;

  const handleCopy = () => {
    let content = generatedCode;
    if (activeFormat === 'requirements') {
      content = 'flask>=3.0.0\nnumpy>=1.24.0\npandas>=1.5.0\nscikit-learn>=1.2.0\nmatplotlib>=3.6.0\n';
    } else if (activeFormat === 'csv') {
      content = getCsvString();
    } else if (activeFormat === 'jupyter') {
      content = getJupyterNotebook();
    }

    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCsvString = () => {
    if (!currentDataset?.records || currentDataset.records.length === 0) return '';
    const cols = currentDataset.columns;
    const header = cols.join(',');
    const rows = currentDataset.records.map((r) => cols.map((c) => r[c]).join(','));
    return [header, ...rows].join('\n');
  };

  const getJupyterNotebook = () => {
    const notebook = {
      cells: [
        {
          cell_type: 'markdown',
          metadata: {},
          source: [
            `# PyData Analytics Studio Pipeline\n`,
            `Exported workflow for dataset: **${datasetId}**\n`,
            `Libraries: Pandas, NumPy, Scikit-Learn, Matplotlib`,
          ],
        },
        {
          cell_type: 'code',
          execution_count: 1,
          metadata: {},
          outputs: [],
          source: generatedCode.split('\n').map((l) => l + '\n'),
        },
      ],
      metadata: {
        language_info: { name: 'python', version: '3.11' },
      },
      nbformat: 4,
      nbformat_minor: 2,
    };
    return JSON.stringify(notebook, null, 2);
  };

  const handleDownload = () => {
    let filename = `pipeline_${datasetId}.py`;
    let content = generatedCode;
    let mime = 'text/x-python';

    if (activeFormat === 'requirements') {
      filename = 'requirements.txt';
      content = 'flask>=3.0.0\nnumpy>=1.24.0\npandas>=1.5.0\nscikit-learn>=1.2.0\nmatplotlib>=3.6.0\n';
      mime = 'text/plain';
    } else if (activeFormat === 'csv') {
      filename = `${datasetId}_data.csv`;
      content = getCsvString();
      mime = 'text/csv';
    } else if (activeFormat === 'jupyter') {
      filename = `pipeline_${datasetId}.ipynb`;
      content = getJupyterNotebook();
      mime = 'application/x-ipynb+json';
    }

    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/40 backdrop-blur-xs">
      <div className="bg-white w-full max-w-3xl rounded-2xl border border-emerald-100 shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-emerald-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-mono font-bold text-sm">
              Py
            </div>
            <div>
              <h2 className="text-lg font-bold text-emerald-950">
                Export Python Pipeline & Libraries
              </h2>
              <p className="text-xs text-emerald-700">
                Download ready-to-run Python pipelines utilizing Pandas, NumPy, Scikit-Learn, and Matplotlib.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-800 hover:bg-emerald-50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Format Switcher */}
        <div className="px-5 pt-4 flex items-center gap-2 border-b border-emerald-50 pb-3 flex-wrap">
          <button
            onClick={() => setActiveFormat('python')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeFormat === 'python'
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            Python Script (.py)
          </button>

          <button
            onClick={() => setActiveFormat('jupyter')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeFormat === 'jupyter'
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Jupyter Notebook (.ipynb)
          </button>

          <button
            onClick={() => setActiveFormat('csv')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeFormat === 'csv'
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            Dataset CSV (.csv)
          </button>

          <button
            onClick={() => setActiveFormat('requirements')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeFormat === 'requirements'
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            requirements.txt
          </button>
        </div>

        {/* Code Content Preview */}
        <div className="p-5 flex-1 overflow-auto">
          <div className="bg-[#064e3b] text-emerald-100 p-4 rounded-xl font-mono text-xs overflow-auto max-h-[380px] leading-relaxed">
            {isLoading ? (
              <div className="text-emerald-300">Generating Python pipeline...</div>
            ) : activeFormat === 'python' ? (
              <pre>{generatedCode}</pre>
            ) : activeFormat === 'jupyter' ? (
              <pre>{getJupyterNotebook()}</pre>
            ) : activeFormat === 'csv' ? (
              <pre>{getCsvString().slice(0, 1000)}... (truncated preview)</pre>
            ) : (
              <pre>
                flask&gt;=3.0.0{'\n'}
                numpy&gt;=1.24.0{'\n'}
                pandas&gt;=1.5.0{'\n'}
                scikit-learn&gt;=1.2.0{'\n'}
                matplotlib&gt;=3.6.0{'\n'}
              </pre>
            )}
          </div>
        </div>

        {/* Footer with Actions */}
        <div className="p-4 border-t border-emerald-100 flex items-center justify-between bg-emerald-50/40">
          <span className="text-xs text-emerald-800 font-medium">
            Compatible with Python 3.9+, Anaconda, Google Colab & JupyterLab
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white text-emerald-800 border border-emerald-300 hover:bg-emerald-50 transition-colors shadow-xs"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied' : 'Copy'}
            </button>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-700 text-white hover:bg-emerald-800 transition-colors shadow-xs"
            >
              <Download className="w-4 h-4" />
              Download File
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
