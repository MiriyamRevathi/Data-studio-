import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { LandingPage } from './components/LandingPage.tsx';
import { LoginPage } from './components/LoginPage.tsx';
import { DashboardView } from './components/DashboardView.tsx';
import { DatasetsView } from './components/DatasetsView.tsx';
import { DatasetPreviewView } from './components/DatasetPreviewView.tsx';
import { VisualizationStudioView } from './components/VisualizationStudioView.tsx';
import { AnalyticsView } from './components/AnalyticsView.tsx';
import { ReportsView } from './components/ReportsView.tsx';
import { SettingsView } from './components/SettingsView.tsx';
import { AppView, DatasetMeta, DatasetDetail, User } from './types.ts';
import { getDatasets, getDatasetDetail } from './api/pyDataApi.ts';
import { Loader2 } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [datasets, setDatasets] = useState<DatasetMeta[]>([]);
  const [selectedDatasetId, setSelectedDatasetId] = useState<string>('sales');
  const [currentDataset, setCurrentDataset] = useState<DatasetDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [chartsCount, setChartsCount] = useState<number>(1);

  // Load initial dataset catalog
  useEffect(() => {
    const initData = async () => {
      try {
        const list = await getDatasets();
        if (list && list.length > 0) {
          setDatasets(list);
          setSelectedDatasetId(list[0].id);
          const detail = await getDatasetDetail(list[0].id);
          setCurrentDataset(detail);
        }
      } catch (err) {
        console.error('Failed to initialize datasets:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initData();
  }, []);

  // Guard protected routes if user is not logged in
  useEffect(() => {
    if (!user && !['landing', 'login', 'dashboard'].includes(currentView)) {
      setCurrentView('login');
    }
  }, [currentView, user]);

  // When selectedDatasetId changes, fetch its detail
  const handleSelectDataset = async (id: string, targetView?: AppView) => {
    if (!user && targetView && targetView !== 'dashboard' && targetView !== 'landing' && targetView !== 'login') {
      setCurrentView('login');
      return;
    }
    setSelectedDatasetId(id);
    setIsLoading(true);
    try {
      const detail = await getDatasetDetail(id);
      setCurrentDataset(detail);
      if (targetView) {
        setCurrentView(targetView);
      }
    } catch (err) {
      console.error(`Failed to fetch dataset ${id}:`, err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSuccess = () => {
    setUser({
      name: 'Data Analyst',
      email: 'analyst@dataaistudio.local',
      role: 'Local Analyst',
    });
    setCurrentView('dashboard');
  };

  const handleExploreDemo = () => {
    setUser(null); // Unauthenticated guest session: clicking dashboard cards redirects to login
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('dashboard');
  };

  const handleDatasetUploaded = (newDataset: DatasetDetail) => {
    const meta: DatasetMeta = {
      id: newDataset.id,
      name: newDataset.name,
      description: newDataset.description,
      rows: newDataset.rows,
      columns: newDataset.columns,
      task: newDataset.task || 'Custom Upload',
      filename: newDataset.filename,
      is_seed: false,
    };

    setDatasets((prev) => [meta, ...prev.filter((d) => d.id !== meta.id)]);
    setSelectedDatasetId(newDataset.id);
    setCurrentDataset(newDataset);
    setCurrentView('dataset-preview');
  };

  const handleClearCustomDatasets = () => {
    setDatasets((prev) => prev.filter((d) => d.is_seed !== false));
    if (datasets.length > 0) {
      handleSelectDataset(datasets[0].id);
    }
  };

  // If user is on landing page or login page, render full screen without app header
  if (currentView === 'landing') {
    return (
      <LandingPage
        onNavigate={setCurrentView}
        onExploreDemo={handleExploreDemo}
        seedDatasets={datasets.filter((d) => d.is_seed !== false)}
      />
    );
  }

  if (currentView === 'login') {
    return (
      <LoginPage
        onLoginSuccess={handleLoginSuccess}
        onNavigate={setCurrentView}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#fafbfa] text-slate-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Application Navigation Header */}
      <Header
        activeView={currentView}
        onNavigate={setCurrentView}
        user={user}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        {isLoading && !currentDataset ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mb-3" />
            <p className="text-sm">Loading local analytics engine...</p>
          </div>
        ) : (
          <>
            {currentView === 'dashboard' && (
              <DashboardView
                user={user}
                datasets={datasets}
                chartsCount={chartsCount}
                onSelectDataset={handleSelectDataset}
                onNavigate={setCurrentView}
              />
            )}

            {currentView === 'datasets' && (
              <DatasetsView
                datasets={datasets}
                onSelectDataset={handleSelectDataset}
                onDatasetUploaded={handleDatasetUploaded}
              />
            )}

            {currentView === 'dataset-preview' && currentDataset && (
              <DatasetPreviewView
                dataset={currentDataset}
                allDatasets={datasets}
                onSelectDataset={handleSelectDataset}
                onNavigate={setCurrentView}
                initialTab="overview"
              />
            )}

            {currentView === 'data-quality' && currentDataset && (
              <DatasetPreviewView
                dataset={currentDataset}
                allDatasets={datasets}
                onSelectDataset={handleSelectDataset}
                onNavigate={setCurrentView}
                initialTab="quality"
              />
            )}

            {currentView === 'visualization' && currentDataset && (
              <VisualizationStudioView
                currentDataset={currentDataset}
                allDatasets={datasets}
                onSelectDataset={handleSelectDataset}
                onChartGenerated={() => setChartsCount((c) => c + 1)}
              />
            )}

            {currentView === 'analytics' && currentDataset && (
              <AnalyticsView
                currentDataset={currentDataset}
                allDatasets={datasets}
                onSelectDataset={handleSelectDataset}
                onNavigate={setCurrentView}
              />
            )}

            {currentView === 'reports' && currentDataset && (
              <ReportsView
                currentDataset={currentDataset}
                allDatasets={datasets}
                onSelectDataset={handleSelectDataset}
                onNavigate={setCurrentView}
              />
            )}

            {currentView === 'settings' && (
              <SettingsView
                onClearCustomDatasets={handleClearCustomDatasets}
              />
            )}
          </>
        )}
      </main>

      {/* Global Application Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="font-semibold text-slate-800">DATA AI STUDIO</span>
            <span>&bull;</span>
            <span>100% Local Data Processing</span>
          </div>
          <div className="flex items-center gap-3 font-mono text-[11px] text-slate-400">
            <span>Python 3.12</span>
            <span>&bull;</span>
            <span>Pandas 2.2</span>
            <span>&bull;</span>
            <span>Plotly.js</span>
            <span>&bull;</span>
            <span>Zero Cloud APIs</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
