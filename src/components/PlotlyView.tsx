import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import Plotly from 'plotly.js-dist-min';

export interface PlotlyViewRef {
  exportImage: (format: 'png' | 'svg' | 'jpeg', filename?: string) => Promise<string>;
  printChart: () => void;
}

interface PlotlyViewProps {
  data: any[];
  layout?: Record<string, any>;
  config?: Record<string, any>;
  className?: string;
  id?: string;
}

export const PlotlyView = forwardRef<PlotlyViewRef, PlotlyViewProps>(({
  data,
  layout = {},
  config = {},
  className = 'w-full h-80',
  id = 'plotly-chart-canvas',
}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    exportImage: async (format: 'png' | 'svg' | 'jpeg', filename = 'data_ai_studio_chart') => {
      if (!containerRef.current) throw new Error('Chart container not ready');
      return await Plotly.downloadImage(containerRef.current, {
        format,
        width: 1280,
        height: 720,
        filename,
      });
    },
    printChart: () => {
      if (!containerRef.current) return;
      window.print();
    },
  }));

  useEffect(() => {
    if (!containerRef.current) return;

    const defaultLayout: Record<string, any> = {
      autosize: true,
      paper_bgcolor: '#ffffff',
      plot_bgcolor: '#fafafa',
      font: {
        family: 'Plus Jakarta Sans, sans-serif',
        color: '#1e293b',
        size: 12,
      },
      margin: { l: 60, r: 40, t: 50, b: 60 },
      xaxis: {
        gridcolor: '#e2e8f0',
        zerolinecolor: '#cbd5e1',
        tickfont: { color: '#475569', size: 11 },
        linecolor: '#cbd5e1',
      },
      yaxis: {
        gridcolor: '#e2e8f0',
        zerolinecolor: '#cbd5e1',
        tickfont: { color: '#475569', size: 11 },
        linecolor: '#cbd5e1',
      },
      ...layout,
    };

    const defaultConfig: Record<string, any> = {
      responsive: true,
      displayModeBar: true,
      displaylogo: false,
      modeBarButtonsToRemove: ['lasso2d', 'select2d'],
      toImageButtonOptions: {
        format: 'png',
        filename: 'data_ai_studio_chart',
        height: 720,
        width: 1280,
        scale: 2,
      },
      ...config,
    };

    Plotly.newPlot(containerRef.current, data, defaultLayout, defaultConfig);

    const handleResize = () => {
      if (containerRef.current) {
        Plotly.Plots.resize(containerRef.current);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        Plotly.purge(containerRef.current);
      }
    };
  }, [data, layout, config]);

  return <div ref={containerRef} className={className} id={id} />;
});
