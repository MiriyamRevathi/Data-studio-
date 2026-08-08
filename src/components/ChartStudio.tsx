import React, { useState, useEffect } from 'react';
import { BarChart3, Image as ImageIcon, Sparkles, Download, RefreshCw, Sliders } from 'lucide-react';
import { PlotlyView } from './PlotlyView.tsx';
import { DatasetDetail } from '../types.ts';

interface ChartStudioProps {
  currentDataset: DatasetDetail | null;
}

export const ChartStudio: React.FC<ChartStudioProps> = ({ currentDataset }) => {
  const [engine, setEngine] = useState<'plotly' | 'matplotlib'>('plotly');
  const [chartType, setChartType] = useState<'scatter' | 'bar' | 'line' | 'hist'>('scatter');
  
  const numericColumns = currentDataset?.numeric_columns || [];
  const allColumns = currentDataset?.columns || [];

  const [xCol, setXCol] = useState<string>('');
  const [yCol, setYCol] = useState<string>('');
  const [colorCol, setColorCol] = useState<string>('');

  // Matplotlib server state
  const [mplImage, setMplImage] = useState<string | null>(null);
  const [mplLoading, setMplLoading] = useState(false);

  // Initialize columns when dataset loads
  useEffect(() => {
    if (numericColumns.length >= 2) {
      setXCol(numericColumns[0]);
      setYCol(numericColumns[1]);
    } else if (allColumns.length >= 2) {
      setXCol(allColumns[0]);
      setYCol(allColumns[1]);
    }
    // Pick a categorical column for color if available
    const catCol = allColumns.find((c) => !numericColumns.includes(c));
    if (catCol) {
      setColorCol(catCol);
    }
  }, [currentDataset]);

  // Request server-side Matplotlib chart
  const fetchMatplotlibChart = async () => {
    if (!xCol || !currentDataset) return;
    setMplLoading(true);

    try {
      const records = currentDataset.records || [];
      const xVals = records.map((r) => r[xCol]);
      const yVals = yCol ? records.map((r) => r[yCol]) : [];

      const res = await fetch('/api/chart/matplotlib', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: chartType,
          x: xVals,
          y: yVals,
          title: `${yCol ? `${yCol} vs ${xCol}` : `Distribution of ${xCol}`} (Matplotlib)`,
          xlabel: xCol,
          ylabel: yCol || 'Frequency',
        }),
      });

      const text = await res.text();
      let data: any;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error('Server returned non-JSON response. Is the Python backend running?');
      }
      if (data.image) {
        setMplImage(data.image);
      }
    } catch (err) {
      console.error('Failed to fetch Matplotlib chart', err);
    } finally {
      setMplLoading(false);
    }
  };

  useEffect(() => {
    if (engine === 'matplotlib') {
      fetchMatplotlibChart();
    }
  }, [engine, chartType, xCol, yCol, currentDataset]);

  // Prepare Plotly data
  const getPlotlyData = () => {
    if (!currentDataset || !xCol) return [];
    const records = currentDataset.records || [];

    // Grouping by color column if selected
    if (colorCol && colorCol !== 'none') {
      const categories = Array.from(new Set(records.map((r) => String(r[colorCol]))));
      const greenTones = ['#059669', '#10b981', '#34d399', '#047857', '#064e3b', '#6ee7b7'];

      return categories.map((cat, i) => {
        const catRecords = records.filter((r) => String(r[colorCol]) === cat);
        const xVals = catRecords.map((r) => r[xCol]);
        const yVals = yCol ? catRecords.map((r) => r[yCol]) : [];
        const color = greenTones[i % greenTones.length];

        if (chartType === 'scatter') {
          return {
            x: xVals,
            y: yVals,
            mode: 'markers',
            type: 'scatter',
            name: cat,
            marker: {
              color,
              size: 10,
              opacity: 0.85,
              line: { color: '#064e3b', width: 1 },
            },
          };
        } else if (chartType === 'bar') {
          return {
            x: xVals,
            y: yVals,
            type: 'bar',
            name: cat,
            marker: { color, opacity: 0.85 },
          };
        } else if (chartType === 'line') {
          return {
            x: xVals,
            y: yVals,
            type: 'scatter',
            mode: 'lines+markers',
            name: cat,
            line: { color, width: 2.5 },
            marker: { size: 6 },
          };
        } else {
          return {
            x: xVals,
            type: 'histogram',
            name: cat,
            marker: { color, opacity: 0.75 },
          };
        }
      });
    }

    // Single series
    const xVals = records.map((r) => r[xCol]);
    const yVals = yCol ? records.map((r) => r[yCol]) : [];

    if (chartType === 'scatter') {
      return [
        {
          x: xVals,
          y: yVals,
          mode: 'markers',
          type: 'scatter',
          marker: {
            color: '#059669',
            size: 10,
            opacity: 0.85,
            line: { color: '#064e3b', width: 1 },
          },
        },
      ];
    } else if (chartType === 'bar') {
      return [
        {
          x: xVals,
          y: yVals,
          type: 'bar',
          marker: { color: '#059669', opacity: 0.85 },
        },
      ];
    } else if (chartType === 'line') {
      return [
        {
          x: xVals,
          y: yVals,
          type: 'scatter',
          mode: 'lines+markers',
          line: { color: '#047857', width: 2.5 },
          marker: { color: '#34d399', size: 6, line: { color: '#064e3b', width: 1 } },
        },
      ];
    } else {
      return [
        {
          x: xVals,
          type: 'histogram',
          marker: { color: '#059669', opacity: 0.85 },
        },
      ];
    }
  };

  const plotlyLayout = {
    title: {
      text: yCol ? `${yCol} vs ${xCol}` : `Distribution of ${xCol}`,
      font: { color: '#064e3b', size: 16, weight: 700 },
    },
    xaxis: {
      title: { text: xCol, font: { color: '#065f46', size: 12 } },
      gridcolor: '#e2e8f0',
      tickfont: { color: '#065f46' },
    },
    yaxis: {
      title: { text: yCol || 'Count', font: { color: '#065f46', size: 12 } },
      gridcolor: '#e2e8f0',
      tickfont: { color: '#065f46' },
    },
    paper_bgcolor: '#ffffff',
    plot_bgcolor: '#f8faf9',
    hoverlabel: {
      bgcolor: '#064e3b',
      font: { color: '#ffffff', family: 'Plus Jakarta Sans' },
    },
  };

  return (
    <div className="space-y-6" id="chart-studio-container">
      {/* Engine Switcher and Chart Configuration */}
      <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-700" />
              <h2 className="text-xl font-bold text-emerald-950">Visual Analytics Studio</h2>
            </div>
            <p className="text-sm text-emerald-800/80 mt-1">
              Toggle between interactive Plotly.js charts and server-rendered Python Matplotlib figures.
            </p>
          </div>

          {/* Engine Selector */}
          <div className="flex items-center p-1 bg-emerald-50 rounded-xl border border-emerald-200">
            <button
              id="engine-btn-plotly"
              onClick={() => setEngine('plotly')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                engine === 'plotly'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-emerald-900 hover:text-emerald-950'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Interactive Plotly
            </button>
            <button
              id="engine-btn-matplotlib"
              onClick={() => setEngine('matplotlib')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                engine === 'matplotlib'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-emerald-900 hover:text-emerald-950'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              Python Matplotlib
            </button>
          </div>
        </div>

        {/* Controls Bar: Type, X, Y, Color */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5 pt-4 border-t border-emerald-100">
          <div>
            <label className="block text-xs font-semibold text-emerald-800 mb-1">Chart Type</label>
            <select
              id="select-chart-type"
              value={chartType}
              onChange={(e) => setChartType(e.target.value as any)}
              className="w-full px-3 py-1.5 text-xs rounded-lg border border-emerald-200 bg-emerald-50/30 text-emerald-950 font-medium focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
            >
              <option value="scatter">Scatter Plot</option>
              <option value="bar">Bar Chart</option>
              <option value="line">Line Series</option>
              <option value="hist">Histogram / Distribution</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-emerald-800 mb-1">X Axis Variable</label>
            <select
              id="select-x-col"
              value={xCol}
              onChange={(e) => setXCol(e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded-lg border border-emerald-200 bg-emerald-50/30 text-emerald-950 font-medium focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
            >
              {allColumns.map((col) => (
                <option key={col} value={col}>
                  {col}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-emerald-800 mb-1">
              Y Axis Variable {chartType === 'hist' && '(N/A for histogram)'}
            </label>
            <select
              id="select-y-col"
              disabled={chartType === 'hist'}
              value={yCol}
              onChange={(e) => setYCol(e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded-lg border border-emerald-200 bg-emerald-50/30 text-emerald-950 font-medium focus:outline-hidden focus:ring-1 focus:ring-emerald-600 disabled:opacity-40"
            >
              <option value="">None</option>
              {numericColumns.map((col) => (
                <option key={col} value={col}>
                  {col}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-emerald-800 mb-1">
              Color Hue / Category
            </label>
            <select
              id="select-color-col"
              value={colorCol}
              onChange={(e) => setColorCol(e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded-lg border border-emerald-200 bg-emerald-50/30 text-emerald-950 font-medium focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
            >
              <option value="none">Single Green Palette</option>
              {allColumns.map((col) => (
                <option key={col} value={col}>
                  Group by: {col}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Chart Canvas Area */}
      <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="text-sm font-bold text-emerald-950">
              {engine === 'plotly' ? 'Interactive Plotly.js Stage' : 'Python Matplotlib Figure'}
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-mono">
              {engine === 'plotly' ? 'SVG / WebGL' : 'Agg Backend 150 DPI'}
            </span>
          </div>

          {engine === 'matplotlib' && mplImage && (
            <a
              href={mplImage}
              download={`matplotlib_${chartType}_${xCol}.png`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-medium transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              Download PNG
            </a>
          )}
        </div>

        {/* Display Canvas */}
        <div className="min-h-[380px] flex items-center justify-center bg-[#f8faf9] rounded-xl border border-emerald-100 p-2">
          {engine === 'plotly' ? (
            <PlotlyView
              data={getPlotlyData()}
              layout={plotlyLayout}
              className="w-full h-[420px]"
            />
          ) : mplLoading ? (
            <div className="text-center py-12 text-emerald-700">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-emerald-600" />
              <p className="text-xs font-semibold">Generating Python Matplotlib figure...</p>
            </div>
          ) : mplImage ? (
            <div className="w-full flex justify-center">
              <img
                src={mplImage}
                alt="Matplotlib Plot"
                className="max-h-[440px] rounded-lg shadow-xs border border-emerald-200/50 object-contain"
              />
            </div>
          ) : (
            <div className="text-center text-emerald-700 text-xs">
              No Matplotlib chart generated yet. Select variables above.
            </div>
          )}
        </div>

        {/* Caption */}
        <div className="mt-3 flex items-center justify-between text-xs text-emerald-700">
          <span>
            Displaying {currentDataset?.records?.length || 0} observations with green & white optical contrast.
          </span>
          <span className="font-mono">
            {engine === 'plotly' ? 'plotly.js-dist-min' : 'matplotlib.pyplot.savefig()'}
          </span>
        </div>
      </div>
    </div>
  );
};
