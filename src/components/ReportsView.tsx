import React, { useState, useRef } from 'react';
import { 
  FileText, 
  Printer, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Table, 
  ArrowLeft,
  Loader2,
  ExternalLink,
  X,
  AlertCircle
} from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { DatasetDetail, DatasetMeta, AppView } from '../types.ts';

interface ReportsViewProps {
  currentDataset: DatasetDetail;
  allDatasets: DatasetMeta[];
  onSelectDataset: (id: string) => void;
  onNavigate: (view: AppView) => void;
}

export const ReportsView: React.FC<ReportsViewProps> = ({
  currentDataset,
  allDatasets,
  onSelectDataset,
  onNavigate,
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const generatePrintableHTML = () => {
    const reportDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>DATA AI STUDIO - Audit Report: ${currentDataset.name}</title>
  <style>
    @media print {
      @page { margin: 12mm; size: A4 portrait; }
      body { margin: 0; padding: 0; background: #ffffff !important; color: #0f172a !important; }
      .no-print { display: none !important; }
      .page-break-inside-avoid { page-break-inside: avoid; }
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      color: #0f172a;
      line-height: 1.5;
      max-width: 850px;
      margin: 20px auto;
      padding: 0 20px;
      background: #f8fafc;
    }
    .print-bar {
      position: sticky;
      top: 10px;
      background: #064e3b;
      color: #ffffff;
      padding: 12px 20px;
      border-radius: 8px;
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      z-index: 1000;
    }
    .btn-print {
      background: #10b981;
      color: #ffffff;
      font-weight: 700;
      border: none;
      padding: 8px 18px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 13px;
    }
    .btn-print:hover { background: #059669; }
    .report-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 32px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    .header {
      border-bottom: 2px solid #059669;
      padding-bottom: 16px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .title-group h1 {
      margin: 0 0 4px 0;
      font-size: 22px;
      color: #064e3b;
      letter-spacing: -0.02em;
    }
    .title-group p {
      margin: 0;
      font-size: 12px;
      color: #64748b;
      font-family: monospace;
    }
    .meta-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 14px 18px;
      margin-bottom: 24px;
      font-size: 13px;
      line-height: 1.6;
    }
    .section-title {
      font-size: 13px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #064e3b;
      border-bottom: 2px solid #10b981;
      padding-bottom: 6px;
      margin: 28px 0 14px 0;
    }
    .grid-metrics {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin-bottom: 16px;
    }
    .metric-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 12px 14px;
    }
    .metric-card .label {
      font-size: 11px;
      color: #64748b;
      display: block;
      margin-bottom: 4px;
    }
    .metric-card .val {
      font-size: 18px;
      font-weight: 800;
      color: #0f172a;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 12px 0;
      font-size: 12px;
    }
    th, td {
      border: 1px solid #e2e8f0;
      padding: 8px 12px;
      text-align: left;
    }
    th {
      background: #f1f5f9;
      font-weight: 600;
      color: #334155;
    }
    .badge {
      display: inline-block;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 10px;
      font-weight: 700;
      background: #d1fae5;
      color: #065f46;
    }
    .insight-item {
      background: #f8fafc;
      border-left: 3px solid #059669;
      border-radius: 0 6px 6px 0;
      padding: 10px 14px;
      margin-bottom: 8px;
      font-size: 12px;
      border-top: 1px solid #e2e8f0;
      border-right: 1px solid #e2e8f0;
      border-bottom: 1px solid #e2e8f0;
    }
    .footer {
      margin-top: 36px;
      border-top: 1px solid #e2e8f0;
      padding-top: 14px;
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      color: #94a3b8;
    }
  </style>
</head>
<body>
  <div class="print-bar no-print">
    <div style="font-weight: 600; font-size: 13px;">
      Print-Ready Audit Report &bull; ${currentDataset.name}
    </div>
    <div style="display: flex; gap: 8px;">
      <button class="btn-print" onclick="window.print()">Print / Save as PDF</button>
    </div>
  </div>

  <div class="report-card">
    <div class="header">
      <div class="title-group">
        <h1>DATA AI STUDIO &bull; LOCAL DATA AUDIT REPORT</h1>
        <p>DOCUMENT ID: DAS-${currentDataset.id.toUpperCase()}-${Date.now().toString().slice(-6)} &bull; 100% LOCAL EXECUTION</p>
      </div>
      <div style="text-align: right; font-size: 12px; color: #64748b;">
        <div>Date: <strong>${reportDate}</strong></div>
        <div style="color: #059669; font-weight: 600;">Engine: Local Client</div>
      </div>
    </div>

    <div class="meta-box">
      <strong>Dataset Name:</strong> ${currentDataset.name} (<code>${currentDataset.filename || currentDataset.id + '.csv'}</code>)<br/>
      <strong>Total Observations:</strong> ${currentDataset.rows.toLocaleString()} verified records &times; ${currentDataset.columns.length} columns<br/>
      <strong>Description:</strong> ${currentDataset.description}
    </div>

    <div class="section-title">1. Data Integrity & Quality Evaluation</div>
    <div class="grid-metrics">
      <div class="metric-card">
        <span class="label">Duplicate Rows</span>
        <span class="val">${currentDataset.quality?.duplicate_rows || 0}</span>
      </div>
      <div class="metric-card">
        <span class="label">Missing Cells</span>
        <span class="val">${currentDataset.quality?.missing_values?.reduce((a, b) => a + b.missing_count, 0) || 0}</span>
      </div>
      <div class="metric-card">
        <span class="label">IQR Outliers</span>
        <span class="val">${currentDataset.quality?.outliers?.reduce((a, b) => a + b.outlier_count, 0) || 0}</span>
      </div>
    </div>

    <table>
      <thead>
        <tr><th>Attribute</th><th>Missing Count</th><th>Missing %</th><th>Status</th></tr>
      </thead>
      <tbody>
        ${(currentDataset.quality?.missing_values || [])
          .map(
            (m) =>
              `<tr><td>${m.column}</td><td>${m.missing_count}</td><td>${m.missing_percentage}%</td><td>${
                m.missing_count === 0 ? '<span class="badge">CLEAN</span>' : 'GAPS DETECTED'
              }</td></tr>`
          )
          .join('')}
      </tbody>
    </table>

    <div class="section-title">2. Key Statistical Findings & Insights</div>
    <div>
      ${(currentDataset.insights || [])
        .map((i, idx) => `<div class="insight-item"><strong>${idx + 1}.</strong> ${i}</div>`)
        .join('')}
    </div>

    ${
      currentDataset.correlations?.pairs && currentDataset.correlations.pairs.length > 0
        ? `
    <div class="section-title">3. Bivariate Linear Relationships</div>
    <table>
      <thead>
        <tr><th>Variable 1</th><th>Variable 2</th><th>Pearson r</th><th>Association</th></tr>
      </thead>
      <tbody>
        ${currentDataset.correlations.pairs
          .slice(0, 6)
          .map(
            (p) =>
              `<tr><td>${p.col1}</td><td>${p.col2}</td><td><strong>${p.correlation.toFixed(3)}</strong></td><td>${p.strength} (${p.direction})</td></tr>`
          )
          .join('')}
      </tbody>
    </table>
    `
        : ''
    }

    <div class="footer">
      <span>Verified Local Studio Engine: Data never transmitted off this machine.</span>
      <span>Document Finalized</span>
    </div>
  </div>

  <script>
    window.onload = function() {
      // Small timeout to allow styling render before triggering print
      setTimeout(function() {
        try {
          window.print();
        } catch(e) {}
      }, 500);
    };
  </script>
</body>
</html>`;
  };

  const handleOpenPrintWindow = () => {
    const html = generatePrintableHTML();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  // Main Print / PDF Action Handler
  const handlePrintPDF = async () => {
    setIsGenerating(true);
    let pdfDownloaded = false;

    // 1. Generate & download high-resolution PDF directly
    if (reportRef.current) {
      try {
        const element = reportRef.current;
        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
        });

        const pdfWidth = 210; // A4 mm
        const pdfHeight = 297; // A4 mm
        const imgWidth = pdfWidth - 20; // 10mm margins
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 10; // 10mm top margin

        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= (pdfHeight - 20);

        while (heightLeft > 0) {
          position = heightLeft - imgHeight + 10;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
          heightLeft -= (pdfHeight - 20);
        }

        const cleanName = currentDataset.name.replace(/\s+/g, '_');
        pdf.save(`Audit_Report_${cleanName}_${Date.now()}.pdf`);
        pdfDownloaded = true;
      } catch (err) {
        console.error('HTML2Canvas / jsPDF export error:', err);
      }
    }

    // 2. Safely attempt browser print
    let printAttempted = false;
    try {
      window.print();
      printAttempted = true;
    } catch (err) {
      console.log('window.print blocked or restricted by iframe environment:', err);
    }

    setIsGenerating(false);

    if (pdfDownloaded) {
      setDownloadSuccess('PDF Audit Report successfully generated and downloaded!');
      setTimeout(() => setDownloadSuccess(null), 4000);
    }

    // Show modal dialog offering print options (open print window, re-download, etc.)
    setShowPrintModal(true);
  };

  const handleDownloadHTML = () => {
    const htmlContent = generatePrintableHTML();
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `report_${currentDataset.id}_${Date.now()}.html`;
    a.click();
    URL.revokeObjectURL(url);

    setDownloadSuccess('HTML Report generated and downloaded successfully!');
    setTimeout(() => setDownloadSuccess(null), 3500);
  };

  const handleDownloadJSON = () => {
    const reportData = {
      title: 'DATA AI STUDIO Audit Report',
      dataset: currentDataset.id,
      name: currentDataset.name,
      exported_at: new Date().toISOString(),
      rows: currentDataset.rows,
      columns: currentDataset.columns,
      quality: currentDataset.quality,
      statistics: currentDataset.statistics,
      correlations: currentDataset.correlations,
      insights: currentDataset.insights,
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit_${currentDataset.id}_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);

    setDownloadSuccess('JSON Data Audit exported successfully!');
    setTimeout(() => setDownloadSuccess(null), 3500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5 no-print">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Audit Reports
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Generate, print, and export comprehensive local audit reports ready for distribution.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={currentDataset.id}
            onChange={(e) => onSelectDataset(e.target.value)}
            className="text-xs font-semibold py-2 px-3 bg-white border border-slate-300 rounded-lg text-slate-800 shadow-2xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            {allDatasets.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleDownloadHTML}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-2xs transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-emerald-600" />
            <span>Download HTML</span>
          </button>

          <button
            onClick={handleDownloadJSON}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-2xs transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-slate-600" />
            <span>Audit JSON</span>
          </button>

          {/* Primary Print / PDF Button */}
          <button
            id="print-pdf-button"
            onClick={handlePrintPDF}
            disabled={isGenerating}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-75 rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Preparing PDF...</span>
              </>
            ) : (
              <>
                <Printer className="w-3.5 h-3.5" />
                <span>Print / PDF</span>
              </>
            )}
          </button>
        </div>
      </div>

      {downloadSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2 text-xs text-emerald-800 no-print animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{downloadSuccess}</span>
        </div>
      )}

      {/* Main Printable Document Card */}
      <div 
        ref={reportRef} 
        id="printable-report" 
        className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm space-y-8 print:border-none print:shadow-none print:p-0"
      >
        {/* Document Header */}
        <div className="border-b border-slate-200 pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-lg">
                D
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  DATA AI STUDIO &bull; LOCAL DATA AUDIT REPORT
                </h2>
                <p className="text-xs text-slate-500 font-mono">
                  Document ID: DAS-{currentDataset.id.toUpperCase()}-{Date.now().toString().slice(-6)}
                </p>
              </div>
            </div>

            <div className="text-right text-xs text-slate-500">
              <div>Date: <strong>{new Date().toLocaleDateString()}</strong></div>
              <div className="text-emerald-700 font-semibold">Local Execution Engine</div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 space-y-1">
            <p>
              <strong>Dataset Name:</strong> {currentDataset.name} ({currentDataset.filename || currentDataset.id + '.csv'})
            </p>
            <p>
              <strong>Description:</strong> {currentDataset.description}
            </p>
            <p>
              <strong>Dimensions:</strong> {currentDataset.rows.toLocaleString()} verified observations &times; {currentDataset.columns.length} attributes.
            </p>
          </div>
        </div>

        {/* Section 1: Quality Summary */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-emerald-500 pb-1 mb-4">
            1. Data Integrity & Quality Evaluation
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs">
              <span className="text-slate-500 block">Duplicate Rows</span>
              <strong className="text-base text-slate-900">{currentDataset.quality.duplicate_rows}</strong>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs">
              <span className="text-slate-500 block">Missing Cells</span>
              <strong className="text-base text-slate-900">
                {currentDataset.quality.missing_values.reduce((a, b) => a + b.missing_count, 0)}
              </strong>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs">
              <span className="text-slate-500 block">IQR Statistical Outliers</span>
              <strong className="text-base text-slate-900">
                {currentDataset.quality.outliers?.reduce((a, b) => a + b.outlier_count, 0) || 0}
              </strong>
            </div>
          </div>
        </div>

        {/* Section 2: Deterministic Insights */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-emerald-500 pb-1 mb-4">
            2. Key Statistical Findings & Insights
          </h3>
          <div className="space-y-2">
            {currentDataset.insights?.map((insight, idx) => (
              <div
                key={idx}
                className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700 flex items-start gap-2.5"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 text-[10px] font-bold">
                  {idx + 1}
                </div>
                <span className="leading-relaxed">{insight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Correlations */}
        {currentDataset.correlations?.pairs && currentDataset.correlations.pairs.length > 0 && (
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-emerald-500 pb-1 mb-4">
              3. Significant Bivariate Linear Relationships
            </h3>
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                  <th className="py-2 px-3">Variable 1</th>
                  <th className="py-2 px-3">Variable 2</th>
                  <th className="py-2 px-3">Pearson r</th>
                  <th className="py-2 px-3">Association</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {currentDataset.correlations.pairs.slice(0, 5).map((p, idx) => (
                  <tr key={idx}>
                    <td className="py-2 px-3 font-semibold text-slate-900">{p.col1}</td>
                    <td className="py-2 px-3 font-semibold text-slate-900">{p.col2}</td>
                    <td className="py-2 px-3 font-bold text-emerald-800">{p.correlation.toFixed(3)}</td>
                    <td className="py-2 px-3 font-sans text-slate-600">{p.strength} ({p.direction})</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Audit Sign-off footer */}
        <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Verified Local Studio Engine: Data never transmitted off this machine.</span>
          </div>
          <span>Report End</span>
        </div>
      </div>

      {/* Print & PDF Modal */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs no-print">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 border border-slate-200 relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setShowPrintModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                <Printer className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Audit Report Ready
                </h3>
                <p className="text-xs text-slate-500">
                  {currentDataset.name} &bull; {currentDataset.rows} records
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 mb-5 leading-relaxed">
              Your audit report PDF has been generated. Because browsers restrict printer popups inside embedded previews, you can also open the clean printable version in a new window or re-download the PDF.
            </p>

            <div className="space-y-2.5">
              <button
                onClick={handleOpenPrintWindow}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open Clean Print Window</span>
              </button>

              <button
                onClick={handlePrintPDF}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs font-semibold rounded-lg shadow-2xs transition-colors"
              >
                <Download className="w-4 h-4 text-emerald-600" />
                <span>Re-Download PDF Document</span>
              </button>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowPrintModal(false)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-3 py-1.5 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
