import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  Layers, 
  Download, 
  RotateCcw, 
  AlertCircle, 
  CheckCircle2,
  Sparkles,
  Sliders,
  Printer
} from 'lucide-react';
import { DatasetDetail, DatasetMeta } from '../types.ts';
import { PlotlyView, PlotlyViewRef } from './PlotlyView.tsx';
import { jsPDF } from 'jspdf';

interface VisualizationStudioViewProps {
  currentDataset: DatasetDetail;
  allDatasets: DatasetMeta[];
  onSelectDataset: (id: string) => void;
  onChartGenerated?: () => void;
}

type ChartType = 'bar' | 'line' | 'scatter' | 'histogram' | 'pie';

export const VisualizationStudioView: React.FC<VisualizationStudioViewProps> = ({
  currentDataset,
  allDatasets,
  onSelectDataset,
  onChartGenerated,
}) => {
  const chartRef = useRef<PlotlyViewRef>(null);

  // Studio configuration states
  const [chartType, setChartType] = useState<ChartType>('bar');
  const [xCol, setXCol] = useState<string>('');
  const [yCol, setYCol] = useState<string>('');
  const [chartTitle, setChartTitle] = useState<string>('');
  const [xAxisTitle, setXAxisTitle] = useState<string>('');
  const [yAxisTitle, setYAxisTitle] = useState<string>('');
  const [showLegend, setShowLegend] = useState<boolean>(true);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [sortOrder, setSortOrder] = useState<'none' | 'asc' | 'desc'>('none');
  const [histogramBins, setHistogramBins] = useState<number>(15);

  const [exportMessage, setExportMessage] = useState<string | null>(null);

  const numCols = currentDataset.column_types?.numeric || [];
  const catCols = currentDataset.column_types?.categorical || [];
  const dateCols = currentDataset.column_types?.date || [];
  const catAndDateCols = [...catCols, ...dateCols];

  // SECTION 19: Dynamic Column Selectors Logic
  // Auto-initialize compatible default columns when dataset or chart type changes
  useEffect(() => {
    if (chartType === 'bar') {
      const defaultX = catAndDateCols[0] || currentDataset.columns[0] || '';
      const defaultY = numCols[0] || '';
      setXCol(defaultX);
      setYCol(defaultY);
      setChartTitle(`${defaultY ? defaultY.replace('_', ' ') : 'Metric'} by ${defaultX ? defaultX.replace('_', ' ') : 'Category'}`);
      setXAxisTitle(defaultX);
      setYAxisTitle(defaultY);
    } else if (chartType === 'line') {
      const defaultX = dateCols[0] || catCols[0] || currentDataset.columns[0] || '';
      const defaultY = numCols[0] || '';
      setXCol(defaultX);
      setYCol(defaultY);
      setChartTitle(`${defaultY ? defaultY.replace('_', ' ') : 'Trend'} over ${defaultX ? defaultX.replace('_', ' ') : 'Time'}`);
      setXAxisTitle(defaultX);
      setYAxisTitle(defaultY);
    } else if (chartType === 'scatter') {
      const defaultX = numCols[0] || '';
      const defaultY = numCols[1] || numCols[0] || '';
      setXCol(defaultX);
      setYCol(defaultY);
      setChartTitle(`${defaultY ? defaultY.replace('_', ' ') : 'Y'} vs ${defaultX ? defaultX.replace('_', ' ') : 'X'}`);
      setXAxisTitle(defaultX);
      setYAxisTitle(defaultY);
    } else if (chartType === 'histogram') {
      const defaultCol = numCols[0] || '';
      setXCol(defaultCol);
      setYCol('');
      setChartTitle(`Distribution of ${defaultCol ? defaultCol.replace('_', ' ') : 'Values'}`);
      setXAxisTitle(defaultCol);
      setYAxisTitle('Frequency');
    } else if (chartType === 'pie') {
      const defaultCat = catCols[0] || currentDataset.columns[0] || '';
      const defaultVal = numCols[0] || '';
      setXCol(defaultCat);
      setYCol(defaultVal);
      setChartTitle(`Share of ${defaultVal || 'Volume'} by ${defaultCat || 'Category'}`);
      setXAxisTitle('');
      setYAxisTitle('');
    }
  }, [currentDataset.id, chartType]);

  // Validation warning
  const validationWarning = useMemo(() => {
    if (chartType === 'scatter' && numCols.length < 2) {
      return 'Scatter plot requires at least two numeric columns to analyze correlation.';
    }
    if ((chartType === 'bar' || chartType === 'line') && numCols.length === 0) {
      return 'Requires at least one numeric column for the Y axis values.';
    }
    if (chartType === 'histogram' && numCols.length === 0) {
      return 'Histogram requires at least one numeric column.';
    }
    return null;
  }, [chartType, numCols.length]);

  // Compute Plotly Data Object based on selections
  const { plotData, plotLayout, summaryStats } = useMemo(() => {
    const records = currentDataset.records || [];
    let data: any[] = [];
    let statText = '';

    if (chartType === 'bar') {
      if (xCol && yCol) {
        const agg: Record<string, number[]> = {};
        records.forEach((r) => {
          const k = String(r[xCol] ?? 'Unknown');
          const v = r[yCol];
          if (typeof v === 'number' && !isNaN(v)) {
            if (!agg[k]) agg[k] = [];
            agg[k].push(v);
          }
        });

        let entries = Object.entries(agg).map(([k, vals]) => ({
          category: k,
          value: vals.reduce((a, b) => a + b, 0) / vals.length,
          count: vals.length,
        }));

        if (sortOrder === 'asc') entries.sort((a, b) => a.value - b.value);
        if (sortOrder === 'desc') entries.sort((a, b) => b.value - a.value);

        data = [
          {
            x: entries.map((e) => e.category),
            y: entries.map((e) => Number(e.value.toFixed(2))),
            type: 'bar',
            name: yCol,
            marker: {
              color: '#059669',
              line: { color: '#047857', width: 1 },
            },
            hoverinfo: 'x+y',
          },
        ];
        statText = `Aggregated mean of ${yCol} across ${entries.length} distinct '${xCol}' categories.`;
      }
    } else if (chartType === 'line') {
      if (xCol && yCol) {
        const agg: Record<string, number[]> = {};
        records.forEach((r) => {
          const k = String(r[xCol] ?? 'Unknown');
          const v = r[yCol];
          if (typeof v === 'number' && !isNaN(v)) {
            if (!agg[k]) agg[k] = [];
            agg[k].push(v);
          }
        });

        let entries = Object.entries(agg).map(([k, vals]) => ({
          category: k,
          value: vals.reduce((a, b) => a + b, 0) / vals.length,
        }));

        // Sort sequence
        entries.sort((a, b) => a.category.localeCompare(b.category));

        data = [
          {
            x: entries.map((e) => e.category),
            y: entries.map((e) => Number(e.value.toFixed(2))),
            type: 'scatter',
            mode: 'lines+markers',
            name: yCol,
            line: { color: '#059669', width: 3 },
            marker: { color: '#047857', size: 6 },
            fill: 'tozeroy',
            fillcolor: 'rgba(16, 185, 129, 0.1)',
          },
        ];
        statText = `Tracking progression of '${yCol}' over ${entries.length} points along '${xCol}'.`;
      }
    } else if (chartType === 'scatter') {
      if (xCol && yCol) {
        const points: { x: number; y: number }[] = [];
        records.forEach((r) => {
          const xv = r[xCol];
          const yv = r[yCol];
          if (typeof xv === 'number' && typeof yv === 'number') {
            points.push({ x: xv, y: yv });
          }
        });

        data = [
          {
            x: points.map((p) => p.x),
            y: points.map((p) => p.y),
            mode: 'markers',
            type: 'scatter',
            name: `${xCol} vs ${yCol}`,
            marker: {
              color: '#059669',
              size: 8,
              opacity: 0.8,
              line: { color: '#064e3b', width: 1 },
            },
          },
        ];
        statText = `Plotted ${points.length} coordinate pairs between numeric variables '${xCol}' and '${yCol}'.`;
      }
    } else if (chartType === 'histogram') {
      if (xCol) {
        const values = records
          .map((r) => r[xCol])
          .filter((v): v is number => typeof v === 'number' && !isNaN(v));

        data = [
          {
            x: values,
            type: 'histogram',
            nbinsx: histogramBins,
            name: xCol,
            marker: {
              color: '#10b981',
              line: { color: '#ffffff', width: 1 },
            },
          },
        ];
        statText = `Computed frequency distribution of '${xCol}' across ${histogramBins} uniform bins (${values.length} observations).`;
      }
    } else if (chartType === 'pie') {
      if (xCol) {
        const agg: Record<string, number> = {};
        records.forEach((r) => {
          const k = String(r[xCol] ?? 'Unknown');
          const v = yCol ? r[yCol] : 1;
          const numV = typeof v === 'number' ? v : 1;
          agg[k] = (agg[k] || 0) + numV;
        });

        const entries = Object.entries(agg)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10);

        const colors = ['#059669', '#10b981', '#34d399', '#6ee7b7', '#a7f3d0', '#047857', '#065f46', '#022c22'];

        data = [
          {
            labels: entries.map((e) => e[0]),
            values: entries.map((e) => Number(e[1].toFixed(2))),
            type: 'pie',
            textinfo: 'label+percent',
            marker: { colors },
            hoverinfo: 'label+value+percent',
          },
        ];
        statText = `Breakdown of ${entries.length} categorical segments for '${xCol}' (${yCol ? `weighted by ${yCol}` : 'frequency count'}).`;
      }
    }

    const layout = {
      title: {
        text: chartTitle || 'Data Visualization',
        font: { family: 'Plus Jakarta Sans, sans-serif', size: 16, color: '#0f172a', weight: 'bold' },
      },
      showlegend: showLegend,
      xaxis: {
        title: { text: xAxisTitle },
        showgrid: showGrid,
        gridcolor: '#f1f5f9',
      },
      yaxis: {
        title: { text: yAxisTitle },
        showgrid: showGrid,
        gridcolor: '#f1f5f9',
      },
    };

    return { plotData: data, plotLayout: layout, summaryStats: statText };
  }, [
    chartType,
    xCol,
    yCol,
    chartTitle,
    xAxisTitle,
    yAxisTitle,
    showLegend,
    showGrid,
    sortOrder,
    histogramBins,
    currentDataset.records,
  ]);

  const handleGenerate = () => {
    onChartGenerated?.();
    setExportMessage('Chart rendered successfully with latest parameters.');
    setTimeout(() => setExportMessage(null), 3000);
  };

  const handleExportPNG = async () => {
    try {
      if (chartRef.current) {
        await chartRef.current.exportImage('png', `${currentDataset.id}_${chartType}_chart`);
        setExportMessage('PNG image exported to your downloads folder!');
        setTimeout(() => setExportMessage(null), 3500);
      }
    } catch {
      setExportMessage('Exporting image...');
    }
  };

  const handleExportSVG = async () => {
    try {
      if (chartRef.current) {
        await chartRef.current.exportImage('svg', `${currentDataset.id}_${chartType}_chart`);
        setExportMessage('SVG vector chart exported successfully!');
        setTimeout(() => setExportMessage(null), 3500);
      }
    } catch {
      setExportMessage('Exporting SVG...');
    }
  };

  const handleExportPDF = async () => {
    try {
      if (chartRef.current && (window as any).Plotly) {
        const Plotly = (window as any).Plotly;
        const imgData = await Plotly.toImage(chartRef.current, {
          format: 'png',
          width: 1100,
          height: 650,
        });

        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'mm',
          format: 'a4',
        });

        pdf.setFontSize(16);
        pdf.setTextColor(6, 78, 59);
        pdf.text(`DATA AI STUDIO — ${chartTitle}`, 15, 16);

        pdf.setFontSize(10);
        pdf.setTextColor(100, 116, 139);
        pdf.text(
          `Dataset: ${currentDataset.name} (${currentDataset.id}.csv) | Observations: ${currentDataset.rows} | Exported: ${new Date().toLocaleDateString()}`,
          15,
          23
        );

        pdf.addImage(imgData, 'PNG', 15, 28, 267, 155);

        const cleanTitle = (chartTitle || 'visualization').toLowerCase().replace(/\s+/g, '_');
        pdf.save(`${cleanTitle}_${Date.now()}.pdf`);

        setExportMessage('Chart exported as PDF document successfully!');
        setTimeout(() => setExportMessage(null), 3500);

        try {
          window.print();
        } catch {}
        return;
      }
    } catch (err) {
      console.warn('PDF export fallback:', err);
    }

    try {
      window.print();
    } catch {
      setExportMessage('Printing initiated.');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Visualization Studio
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Design, customize, and export interactive high-resolution charts powered by local data.
          </p>
        </div>

        {/* Global Export Bar */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportPNG}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-2xs transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-emerald-600" />
            <span>Export PNG</span>
          </button>
          <button
            onClick={handleExportSVG}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-2xs transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-emerald-600" />
            <span>Export SVG</span>
          </button>
          <button
            onClick={handleExportPDF}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-2xs transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      {exportMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2 text-xs text-emerald-800 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{exportMessage}</span>
        </div>
      )}

      {/* Main Studio Grid: Left Controls (1 col) + Right Chart Workspace (2 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT CONTROLS PANEL */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-emerald-600" /> Chart Configuration
            </span>
            <span className="text-[11px] font-mono font-medium text-emerald-700">
              {currentDataset.id}.csv
            </span>
          </div>

          {/* Dataset Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Active Dataset
            </label>
            <select
              value={currentDataset.id}
              onChange={(e) => onSelectDataset(e.target.value)}
              className="w-full text-xs font-medium py-2 px-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              {allDatasets.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.rows} rows)
                </option>
              ))}
            </select>
          </div>

          {/* Chart Type Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Chart Type
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {[
                { id: 'bar', label: 'Bar', icon: BarChart3 },
                { id: 'line', label: 'Line', icon: LineChart },
                { id: 'scatter', label: 'Scatter', icon: Sparkles },
                { id: 'histogram', label: 'Hist', icon: Layers },
                { id: 'pie', label: 'Pie', icon: PieChart },
              ].map((c) => {
                const Icon = c.icon;
                const isSelected = chartType === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setChartType(c.id as ChartType)}
                    className={`flex flex-col items-center justify-center p-2 rounded-lg border text-center transition-all ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs font-bold'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-4 h-4 mb-1" />
                    <span className="text-[10px]">{c.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Warning if column types missing */}
          {validationWarning && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2 text-xs text-amber-800">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{validationWarning}</span>
            </div>
          )}

          {/* Dynamic Column Selectors */}
          <div className="space-y-3 pt-1">
            {/* X-Axis / Primary Column */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                {chartType === 'histogram'
                  ? 'Numeric Value Column'
                  : chartType === 'pie'
                  ? 'Categorical Group'
                  : 'X Axis (Dimension)'}
              </label>
              <select
                value={xCol}
                onChange={(e) => setXCol(e.target.value)}
                className="w-full text-xs font-mono py-2 px-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                {chartType === 'histogram' || chartType === 'scatter' ? (
                  numCols.map((col) => (
                    <option key={col} value={col}>
                      {col} [numeric]
                    </option>
                  ))
                ) : chartType === 'pie' ? (
                  catAndDateCols.map((col) => (
                    <option key={col} value={col}>
                      {col} [category]
                    </option>
                  ))
                ) : (
                  currentDataset.columns.map((col) => (
                    <option key={col} value={col}>
                      {col} {numCols.includes(col) ? '[numeric]' : '[category/date]'}
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* Y-Axis / Metric Column (if applicable) */}
            {chartType !== 'histogram' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  {chartType === 'pie' ? 'Value Metric (Optional)' : 'Y Axis (Metric)'}
                </label>
                <select
                  value={yCol}
                  onChange={(e) => setYCol(e.target.value)}
                  className="w-full text-xs font-mono py-2 px-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  {chartType === 'pie' && <option value="">Count of Records (Frequency)</option>}
                  {numCols.map((col) => (
                    <option key={col} value={col}>
                      {col} [numeric]
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Histogram Bin Slider */}
            {chartType === 'histogram' && (
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  <span>Bin Count</span>
                  <span className="font-mono text-emerald-700 font-bold">{histogramBins} bins</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={50}
                  step={1}
                  value={histogramBins}
                  onChange={(e) => setHistogramBins(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>
            )}

            {/* Sort Order (for Bar charts) */}
            {chartType === 'bar' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Sort Order
                </label>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as any)}
                  className="w-full text-xs py-2 px-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                >
                  <option value="none">Original Order</option>
                  <option value="asc">Ascending (Low to High)</option>
                  <option value="desc">Descending (High to Low)</option>
                </select>
              </div>
            )}
          </div>

          {/* Chart Customization Fields */}
          <div className="space-y-2.5 pt-3 border-t border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Labels & Presentation
            </span>

            <div>
              <label className="block text-[11px] text-slate-600 font-medium mb-1">Chart Title</label>
              <input
                type="text"
                value={chartTitle}
                onChange={(e) => setChartTitle(e.target.value)}
                placeholder="Visualization Title"
                className="w-full text-xs py-1.5 px-2.5 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] text-slate-600 font-medium mb-1">X-Axis Label</label>
                <input
                  type="text"
                  value={xAxisTitle}
                  onChange={(e) => setXAxisTitle(e.target.value)}
                  placeholder="X Label"
                  className="w-full text-xs py-1.5 px-2.5 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-600 font-medium mb-1">Y-Axis Label</label>
                <input
                  type="text"
                  value={yAxisTitle}
                  onChange={(e) => setYAxisTitle(e.target.value)}
                  placeholder="Y Label"
                  className="w-full text-xs py-1.5 px-2.5 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Toggles */}
            <div className="pt-2 flex items-center justify-between text-xs text-slate-600">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showLegend}
                  onChange={(e) => setShowLegend(e.target.checked)}
                  className="accent-emerald-600 rounded"
                />
                <span>Show Legend</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showGrid}
                  onChange={(e) => setShowGrid(e.target.checked)}
                  className="accent-emerald-600 rounded"
                />
                <span>Show Gridlines</span>
              </label>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              onClick={handleGenerate}
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Generate Chart</span>
            </button>
          </div>
        </div>

        {/* RIGHT CHART WORKSPACE */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Chart Workspace
              </span>
            </div>
            <span className="text-xs text-slate-500 font-mono">
              Plotly.js Interactive Canvas
            </span>
          </div>

          {/* Canvas */}
          <div className="w-full h-[480px] bg-slate-50/50 rounded-lg p-2 border border-slate-100 flex items-center justify-center relative overflow-hidden">
            {plotData.length > 0 ? (
              <PlotlyView
                ref={chartRef}
                data={plotData}
                layout={plotLayout}
                className="w-full h-full"
              />
            ) : (
              <div className="text-center text-slate-400 text-xs">
                Select columns to render the visualization.
              </div>
            )}
          </div>

          {/* Footer Metrics / Summary Bar */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-600 gap-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-800">Observation Note:</span>
              <span>{summaryStats}</span>
            </div>
            <span className="text-[11px] text-emerald-800 font-semibold shrink-0 bg-emerald-100/60 px-2 py-0.5 rounded">
              High-DPI Vector Export Ready
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
