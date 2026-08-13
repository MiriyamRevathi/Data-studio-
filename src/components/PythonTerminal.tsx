import React, { useState } from 'react';
import { Terminal as TerminalIcon, Play, RefreshCw, Copy, Check, Code, Sparkles, Download } from 'lucide-react';
import { PythonExecutionResult } from '../types.ts';

const SAMPLE_SCRIPTS = [
  {
    name: 'NumPy Linear Algebra & Stats',
    description: 'Matrix multiplication, eigenvalues, and normal distribution sampling',
    code: `import numpy as np

# 1. Generate Gaussian distribution
samples = np.random.normal(loc=10.0, scale=2.5, size=1000)
print(f"Sample Mean: {np.mean(samples):.4f}")
print(f"Sample Variance: {np.var(samples):.4f}")
print(f"95th Percentile: {np.percentile(samples, 95):.4f}")

# 2. Linear Algebra Operations
A = np.array([[3, 1], [1, 2]])
B = np.array([[2, 0], [1, 4]])
dot_product = np.dot(A, B)
eigenvalues, eigenvectors = np.linalg.eig(A)

print("\\nMatrix A @ B:\\n", dot_product)
print("\\nEigenvalues of A:\\n", eigenvalues)
`,
  },
  {
    name: 'Pandas GroupBy & Aggregations',
    description: 'Perform statistical groupby aggregations on active DataFrame (df)',
    code: `# 'df' is automatically loaded into scope from the active dataset
print(f"Working with DataFrame shape: {df.shape}")
print("\\nGroupby summary statistics:")

if 'species' in df.columns:
    summary = df.groupby('species').agg({
        'sepal_length': ['mean', 'std', 'min', 'max'],
        'petal_length': ['mean', 'std', 'min', 'max']
    })
    print(summary)
else:
    print(df.describe())
`,
  },
  {
    name: 'Scikit-Learn PCA Projection',
    description: 'Dimensionality reduction to 2 Principal Components',
    code: `from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler

# Extract continuous columns
features = [c for c in df.columns if df[c].dtype in ['float64', 'int64']]
X = df[features]

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

pca = PCA(n_components=2)
components = pca.fit_transform(X_scaled)

print("Explained Variance Ratio by Component:")
for i, ratio in enumerate(pca.explained_variance_ratio_):
    print(f"  PC{i+1}: {ratio * 100:.2f}%")

print(f"Total Variance Retained: {np.sum(pca.explained_variance_ratio_) * 100:.2f}%")
print("\\nFirst 5 PCA coordinate vectors:\\n", components[:5])
`,
  },
  {
    name: 'Matplotlib Green-Themed Figure',
    description: 'Generates a custom publication figure rendered by Python Matplotlib',
    code: `import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 10, 100)
y1 = np.sin(x)
y2 = np.cos(x)

fig, ax = plt.subplots(figsize=(7, 4), facecolor='#FFFFFF')
ax.set_facecolor('#F8FAF9')

ax.plot(x, y1, color='#059669', linewidth=2.5, label='sin(x)')
ax.plot(x, y2, color='#10B981', linestyle='--', linewidth=2, label='cos(x)')
ax.fill_between(x, y1, y2, color='#A7F3D0', alpha=0.3)

ax.set_title('Trigonometric Waveforms (PyData Matplotlib)', color='#064E3B', fontweight='bold')
ax.set_xlabel('Time Domain (s)', color='#065F46')
ax.set_ylabel('Amplitude', color='#065F46')
ax.legend(facecolor='#FFFFFF', edgecolor='#CBD5E1')
ax.grid(True, linestyle=':', alpha=0.6, color='#CBD5E1')

plt.tight_layout()
plt.savefig('custom_plot.png')
print("Custom Matplotlib figure successfully rendered and returned to canvas.")
`,
  },
];

interface PythonTerminalProps {
  datasetId: string;
}

export const PythonTerminal: React.FC<PythonTerminalProps> = ({ datasetId }) => {
  const [code, setCode] = useState<string>(SAMPLE_SCRIPTS[0].code);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<PythonExecutionResult | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const handleExecute = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          dataset: datasetId,
        }),
      });

      const text = await res.text();
      let data: any;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error('Server returned non-JSON response. Is the Python backend running?');
      }
      setResult(data);
    } catch (err: any) {
      setResult({
        success: false,
        stdout: '',
        stderr: err?.message || 'Failed to execute Python script',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6" id="python-terminal-container">
      {/* Code Editor Header & Recipe Selection */}
      <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <TerminalIcon className="w-5 h-5 text-emerald-700" />
              <h2 className="text-xl font-bold text-emerald-950">
                Interactive Python Terminal & REPL
              </h2>
            </div>
            <p className="text-sm text-emerald-800/80 mt-1">
              Execute Python code directly with in-scope Pandas, NumPy, Scikit-Learn, and Matplotlib.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy Code'}
            </button>

            <button
              id="run-python-code-btn"
              onClick={handleExecute}
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl font-semibold text-xs shadow-xs transition-colors"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  Running in Python Subprocess...
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Run Python Script
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Recipe Chips */}
        <div className="mt-4 pt-3 border-t border-emerald-100 flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-emerald-800 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Pre-built Recipes:
          </span>
          {SAMPLE_SCRIPTS.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setCode(s.code)}
              className="px-2.5 py-1 text-xs rounded-lg bg-emerald-50/70 hover:bg-emerald-100 text-emerald-900 border border-emerald-200/80 transition-colors font-medium"
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      {/* Editor & Output Dual Panes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor Pane */}
        <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-xs flex flex-col">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-emerald-100 text-xs font-semibold text-emerald-900">
            <span className="flex items-center gap-1.5">
              <Code className="w-4 h-4 text-emerald-600" />
              Python Script Input (script.py)
            </span>
            <span className="font-mono text-emerald-600 text-[11px]">Python 3.11</span>
          </div>

          <textarea
            id="python-code-editor"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={15}
            spellCheck={false}
            className="w-full h-full min-h-[340px] p-3.5 font-mono text-xs text-emerald-950 bg-emerald-50/20 border border-emerald-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 leading-relaxed resize-y"
          />
        </div>

        {/* Execution Output Pane */}
        <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-xs flex flex-col">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-emerald-100 text-xs font-semibold text-emerald-900">
            <span className="flex items-center gap-1.5">
              <TerminalIcon className="w-4 h-4 text-emerald-600" />
              Standard Output & Console
            </span>
            {result && (
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                  result.success ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                }`}
              >
                {result.success ? 'EXIT CODE 0' : 'EXECUTION ERROR'}
              </span>
            )}
          </div>

          <div className="bg-[#064e3b] text-emerald-100 font-mono text-xs p-4 rounded-xl min-h-[340px] overflow-auto whitespace-pre-wrap leading-relaxed">
            {isLoading ? (
              <div className="text-emerald-300 flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                Executing in Python 3.11 kernel...
              </div>
            ) : result ? (
              <div>
                {result.stdout && <div>{result.stdout}</div>}
                {result.stderr && (
                  <div className="text-amber-300 mt-2 font-semibold">
                    {result.stderr}
                  </div>
                )}
                {result.error && (
                  <div className="text-red-300 mt-2 font-bold">{result.error}</div>
                )}
                {!result.stdout && !result.stderr && !result.error && (
                  <div className="text-emerald-400">Process completed with no console output.</div>
                )}
              </div>
            ) : (
              <div className="text-emerald-400/70">
                Click &quot;Run Python Script&quot; above to execute the code in the live Python environment.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Rendered Matplotlib Figure from Execution */}
      {result?.plot_image && (
        <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-emerald-950">
                Generated Matplotlib Figure Output
              </h3>
              <p className="text-xs text-emerald-700">
                Rendered directly via <code className="font-mono">plt.savefig()</code> from execution.
              </p>
            </div>
            <a
              href={result.plot_image}
              download="python_execution_plot.png"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 text-white rounded-lg text-xs font-semibold hover:bg-emerald-800 transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              Download Figure
            </a>
          </div>

          <div className="flex justify-center bg-[#f8faf9] p-4 rounded-xl border border-emerald-100">
            <img
              src={result.plot_image}
              alt="Generated Matplotlib Output"
              className="max-h-[400px] rounded-lg shadow-xs object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};
