import React, { useState } from 'react';
import { Cpu, Play, CheckCircle2, TrendingUp, AlertTriangle, RefreshCw, BarChart2 } from 'lucide-react';
import { DatasetDetail, MLTrainResult } from '../types.ts';

interface ModelTrainerProps {
  currentDataset: DatasetDetail | null;
  datasetId: string;
}

export const ModelTrainer: React.FC<ModelTrainerProps> = ({ currentDataset, datasetId }) => {
  const [modelType, setModelType] = useState<string>('logistic_regression');
  const [targetCol, setTargetCol] = useState<string>('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [testSize, setTestSize] = useState<number>(0.25);
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [nClusters, setNClusters] = useState<number>(3);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [trainResult, setTrainResult] = useState<MLTrainResult | null>(null);

  const columns = currentDataset?.columns || [];
  const numericColumns = currentDataset?.numeric_columns || [];

  // Auto-pick defaults when dataset loads
  React.useEffect(() => {
    if (!currentDataset) return;
    
    // Choose sensible default target
    if (datasetId === 'iris') {
      setTargetCol('species');
      setModelType('logistic_regression');
      setSelectedFeatures(['sepal_length', 'sepal_width', 'petal_length', 'petal_width']);
    } else if (datasetId === 'advertising') {
      setTargetCol('sales');
      setModelType('linear_regression');
      setSelectedFeatures(['tv', 'radio', 'newspaper']);
    } else if (datasetId === 'customer_churn') {
      setTargetCol('churn');
      setModelType('random_forest_clf');
      setSelectedFeatures(['tenure_months', 'monthly_charges', 'total_charges', 'support_calls']);
    } else {
      // General custom dataset
      const nonNumeric = columns.find((c) => !numericColumns.includes(c));
      const chosenTarget = nonNumeric || columns[columns.length - 1] || '';
      setTargetCol(chosenTarget);
      setSelectedFeatures(numericColumns.filter((c) => c !== chosenTarget));
    }
  }, [currentDataset, datasetId]);

  const handleToggleFeature = (feat: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feat) ? prev.filter((f) => f !== feat) : [...prev, feat]
    );
  };

  const handleTrainModel = async () => {
    if (!currentDataset) return;
    setIsLoading(true);

    try {
      const payload: Record<string, any> = {
        dataset: datasetId,
        records: currentDataset.records,
        target: targetCol,
        features: selectedFeatures,
        model_type: modelType,
        test_size: testSize,
        random_state: 42,
        n_estimators: nEstimators,
        n_clusters: nClusters,
      };

      const res = await fetch('/api/ml/train', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      let data: any;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error('Server returned non-JSON response. Is the Python backend running?');
      }
      setTrainResult(data);
    } catch (err: any) {
      setTrainResult({
        task: 'classification',
        error: err?.message || 'Failed to train Scikit-Learn model',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6" id="model-trainer-container">
      {/* Top Config Card */}
      <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-emerald-700" />
              <h2 className="text-xl font-bold text-emerald-950">Scikit-Learn Model Studio</h2>
            </div>
            <p className="text-sm text-emerald-800/80 mt-1">
              Train, evaluate, and inspect machine learning models powered by Python’s scikit-learn.
            </p>
          </div>

          <button
            id="train-model-btn"
            onClick={handleTrainModel}
            disabled={isLoading || selectedFeatures.length === 0}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl font-semibold text-sm shadow-xs transition-colors"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Fitting Scikit-Learn Estimator...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                Train Model
              </>
            )}
          </button>
        </div>

        {/* Hyperparameters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5 pt-4 border-t border-emerald-100">
          <div>
            <label className="block text-xs font-semibold text-emerald-800 mb-1">
              Model Algorithm (Estimator)
            </label>
            <select
              id="select-model-type"
              value={modelType}
              onChange={(e) => setModelType(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-emerald-200 bg-emerald-50/30 text-emerald-950 font-medium focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
            >
              <optgroup label="Classification">
                <option value="logistic_regression">Logistic Regression</option>
                <option value="random_forest_clf">Random Forest Classifier</option>
                <option value="decision_tree">Decision Tree Classifier</option>
              </optgroup>
              <optgroup label="Regression">
                <option value="linear_regression">Linear Regression (OLS)</option>
                <option value="ridge">Ridge Regression (L2 Penalty)</option>
                <option value="random_forest_reg">Random Forest Regressor</option>
              </optgroup>
              <optgroup label="Unsupervised">
                <option value="kmeans">K-Means Clustering</option>
              </optgroup>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-emerald-800 mb-1">
              Target Variable (y)
            </label>
            <select
              id="select-target-col"
              value={targetCol}
              disabled={modelType === 'kmeans'}
              onChange={(e) => setTargetCol(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-emerald-200 bg-emerald-50/30 text-emerald-950 font-medium focus:outline-hidden focus:ring-1 focus:ring-emerald-600 disabled:opacity-40"
            >
              {columns.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-emerald-800 mb-1">
              Test Split: {(testSize * 100).toFixed(0)}%
            </label>
            <input
              type="range"
              min="0.1"
              max="0.4"
              step="0.05"
              value={testSize}
              onChange={(e) => setTestSize(parseFloat(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer mt-1"
            />
            <div className="flex justify-between text-[10px] text-emerald-700">
              <span>10% Test</span>
              <span>25% (Standard)</span>
              <span>40% Test</span>
            </div>
          </div>

          {modelType.includes('random_forest') ? (
            <div>
              <label className="block text-xs font-semibold text-emerald-800 mb-1">
                Estimators (Trees)
              </label>
              <input
                type="number"
                min="10"
                max="300"
                value={nEstimators}
                onChange={(e) => setNEstimators(parseInt(e.target.value) || 100)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-emerald-200 bg-emerald-50/30 text-emerald-950 font-medium"
              />
            </div>
          ) : modelType === 'kmeans' ? (
            <div>
              <label className="block text-xs font-semibold text-emerald-800 mb-1">
                Cluster Count (k)
              </label>
              <input
                type="number"
                min="2"
                max="8"
                value={nClusters}
                onChange={(e) => setNClusters(parseInt(e.target.value) || 3)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-emerald-200 bg-emerald-50/30 text-emerald-950 font-medium"
              />
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-emerald-800 mb-1">
                Scaler & Preprocessing
              </label>
              <div className="px-3 py-2 rounded-lg bg-emerald-50/40 border border-emerald-100 text-xs text-emerald-900 font-mono">
                StandardScaler() z-score
              </div>
            </div>
          )}
        </div>

        {/* Feature Checkboxes */}
        <div className="mt-4 pt-3 border-t border-emerald-100">
          <span className="text-xs font-semibold text-emerald-800 block mb-2">
            Selected Predictor Features (X):
          </span>
          <div className="flex flex-wrap gap-2">
            {columns
              .filter((c) => c !== targetCol)
              .map((col) => {
                const isChecked = selectedFeatures.includes(col);
                return (
                  <button
                    key={col}
                    onClick={() => handleToggleFeature(col)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors border ${
                      isChecked
                        ? 'bg-emerald-100 text-emerald-900 border-emerald-300 font-semibold'
                        : 'bg-white text-emerald-700 border-emerald-200 hover:bg-emerald-50'
                    }`}
                  >
                    {isChecked ? '✓ ' : '+ '}
                    {col}
                  </button>
                );
              })}
          </div>
        </div>
      </div>

      {/* Model Results Area */}
      {trainResult && (
        <div className="space-y-6">
          {trainResult.error ? (
            <div className="bg-red-50 p-4 rounded-xl border border-red-200 text-red-800 text-sm flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
              <span>{trainResult.error}</span>
            </div>
          ) : (
            <>
              {/* Primary Performance Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {trainResult.task === 'classification' && (
                  <>
                    <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-xs">
                      <p className="text-xs font-semibold text-emerald-700">Classification Accuracy</p>
                      <p className="text-3xl font-bold text-emerald-900 mt-1">
                        {((trainResult.accuracy || 0) * 100).toFixed(1)}%
                      </p>
                      <p className="text-xs text-emerald-600 mt-0.5">Out-of-sample test accuracy</p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-xs">
                      <p className="text-xs font-semibold text-emerald-700">Test Samples Evaluated</p>
                      <p className="text-3xl font-bold text-emerald-900 mt-1">
                        {trainResult.test_samples || 0}
                      </p>
                      <p className="text-xs text-emerald-600 mt-0.5">Hold-out observations</p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-xs">
                      <p className="text-xs font-semibold text-emerald-700">Training Samples</p>
                      <p className="text-3xl font-bold text-emerald-900 mt-1">
                        {trainResult.train_samples || 0}
                      </p>
                      <p className="text-xs text-emerald-600 mt-0.5">Fitted to estimator</p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-xs">
                      <p className="text-xs font-semibold text-emerald-700">Model Verification</p>
                      <div className="flex items-center gap-1 text-emerald-800 mt-2 font-semibold text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Validated
                      </div>
                      <p className="text-xs text-emerald-600 mt-0.5">Scikit-learn pipeline</p>
                    </div>
                  </>
                )}

                {trainResult.task === 'regression' && (
                  <>
                    <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-xs">
                      <p className="text-xs font-semibold text-emerald-700">R² Coefficient of Det.</p>
                      <p className="text-3xl font-bold text-emerald-900 mt-1">
                        {trainResult.r2_score !== undefined ? trainResult.r2_score.toFixed(3) : '—'}
                      </p>
                      <p className="text-xs text-emerald-600 mt-0.5">Variance explained</p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-xs">
                      <p className="text-xs font-semibold text-emerald-700">RMSE (Root MSE)</p>
                      <p className="text-3xl font-bold text-emerald-900 mt-1">
                        {trainResult.rmse !== undefined ? trainResult.rmse.toFixed(3) : '—'}
                      </p>
                      <p className="text-xs text-emerald-600 mt-0.5">Prediction deviation</p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-xs">
                      <p className="text-xs font-semibold text-emerald-700">Mean Absolute Error</p>
                      <p className="text-3xl font-bold text-emerald-900 mt-1">
                        {trainResult.mae !== undefined ? trainResult.mae.toFixed(3) : '—'}
                      </p>
                      <p className="text-xs text-emerald-600 mt-0.5">MAE metric</p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-xs">
                      <p className="text-xs font-semibold text-emerald-700">Mean Squared Error</p>
                      <p className="text-3xl font-bold text-emerald-900 mt-1">
                        {trainResult.mse !== undefined ? trainResult.mse.toFixed(3) : '—'}
                      </p>
                      <p className="text-xs text-emerald-600 mt-0.5">MSE metric</p>
                    </div>
                  </>
                )}

                {trainResult.task === 'clustering' && (
                  <>
                    <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-xs">
                      <p className="text-xs font-semibold text-emerald-700">Inertia (SSE)</p>
                      <p className="text-3xl font-bold text-emerald-900 mt-1">
                        {trainResult.inertia !== undefined ? trainResult.inertia.toFixed(1) : '—'}
                      </p>
                      <p className="text-xs text-emerald-600 mt-0.5">Sum of squared distances</p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-xs">
                      <p className="text-xs font-semibold text-emerald-700">Number of Clusters</p>
                      <p className="text-3xl font-bold text-emerald-900 mt-1">
                        {trainResult.n_clusters}
                      </p>
                      <p className="text-xs text-emerald-600 mt-0.5">Centroids fitted</p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-xs">
                      <p className="text-xs font-semibold text-emerald-700">Samples Partitioned</p>
                      <p className="text-3xl font-bold text-emerald-900 mt-1">
                        {trainResult.samples_analyzed}
                      </p>
                      <p className="text-xs text-emerald-600 mt-0.5">Total cluster assignments</p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-xs">
                      <p className="text-xs font-semibold text-emerald-700">Algorithm</p>
                      <p className="text-2xl font-bold text-emerald-900 mt-1">K-Means++</p>
                      <p className="text-xs text-emerald-600 mt-0.5">Standardized space</p>
                    </div>
                  </>
                )}
              </div>

              {/* Confusion Matrix & Feature Importance */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Confusion Matrix (Classification) */}
                {trainResult.confusion_matrix && (
                  <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs">
                    <h3 className="font-bold text-emerald-950 mb-1">
                      Scikit-Learn Confusion Matrix
                    </h3>
                    <p className="text-xs text-emerald-700 mb-4">
                      True labels (rows) vs Predicted labels (columns). High diagonal numbers indicate optimal precision.
                    </p>

                    <div className="overflow-x-auto border border-emerald-100 rounded-xl">
                      <table className="w-full text-center text-xs">
                        <thead className="bg-emerald-50 text-emerald-900 font-semibold">
                          <tr>
                            <th className="p-2.5 text-left">Actual \ Predicted</th>
                            {trainResult.confusion_matrix.labels.map((lbl) => (
                              <th key={lbl} className="p-2.5">
                                {lbl}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-emerald-50">
                          {trainResult.confusion_matrix.matrix.map((row, rowIdx) => {
                            const actualLabel = trainResult.confusion_matrix!.labels[rowIdx];
                            return (
                              <tr key={rowIdx}>
                                <td className="p-2.5 text-left font-semibold text-emerald-900 bg-emerald-50/30">
                                  {actualLabel}
                                </td>
                                {row.map((val, colIdx) => {
                                  const isDiagonal = rowIdx === colIdx;
                                  const bg = isDiagonal
                                    ? val > 0
                                      ? 'bg-emerald-200/80 text-emerald-950 font-bold'
                                      : 'bg-emerald-50 text-emerald-700'
                                    : val > 0
                                    ? 'bg-amber-100 text-amber-950 font-semibold'
                                    : 'text-emerald-400';

                                  return (
                                    <td key={colIdx} className={`p-2.5 font-mono ${bg}`}>
                                      {val}
                                    </td>
                                  );
                                })}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Feature Importance Bars */}
                {trainResult.feature_importance && (
                  <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs">
                    <h3 className="font-bold text-emerald-950 mb-1">
                      Feature Importances / Coefficients
                    </h3>
                    <p className="text-xs text-emerald-700 mb-4">
                      Relative contribution of each independent variable to the model decision boundary.
                    </p>

                    <div className="space-y-3">
                      {trainResult.feature_importance.map((f) => {
                        const maxImp = Math.max(
                          ...trainResult.feature_importance!.map((item) => item.importance)
                        );
                        const pct = maxImp > 0 ? (f.importance / maxImp) * 100 : 0;

                        return (
                          <div key={f.feature} className="space-y-1">
                            <div className="flex justify-between text-xs text-emerald-900 font-medium">
                              <span>{f.feature}</span>
                              <span className="font-mono text-emerald-700">
                                {f.importance.toFixed(4)}
                              </span>
                            </div>
                            <div className="h-2 w-full bg-emerald-100/60 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                                style={{ width: `${Math.max(5, pct)}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Sample Predictions Table */}
              {trainResult.predictions_sample && trainResult.predictions_sample.length > 0 && (
                <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs">
                  <h3 className="font-bold text-emerald-950 mb-1">
                    Hold-Out Test Sample Predictions
                  </h3>
                  <p className="text-xs text-emerald-700 mb-3">
                    Comparison between real ground truth and Scikit-Learn predictions.
                  </p>

                  <div className="overflow-x-auto border border-emerald-100 rounded-xl">
                    <table className="w-full text-left text-xs divide-y divide-emerald-100">
                      <thead className="bg-emerald-50 text-emerald-900 font-semibold">
                        <tr>
                          <th className="p-2.5">Sample #</th>
                          <th className="p-2.5">Actual Ground Truth (y_test)</th>
                          <th className="p-2.5">Model Prediction (y_pred)</th>
                          {trainResult.task === 'regression' && (
                            <th className="p-2.5">Residual Error (y - y_hat)</th>
                          )}
                          <th className="p-2.5">Match Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-emerald-50 font-mono">
                        {trainResult.predictions_sample.map((row, idx) => {
                          const isMatch =
                            String(row.actual).toLowerCase() === String(row.predicted).toLowerCase();

                          return (
                            <tr key={idx} className="hover:bg-emerald-50/40">
                              <td className="p-2.5 text-emerald-600">{idx + 1}</td>
                              <td className="p-2.5 font-semibold text-emerald-950">{row.actual}</td>
                              <td className="p-2.5 text-emerald-800">{row.predicted}</td>
                              {trainResult.task === 'regression' && (
                                <td className="p-2.5 text-emerald-700">
                                  {row.residual !== undefined ? row.residual : '—'}
                                </td>
                              )}
                              <td className="p-2.5 font-sans">
                                {isMatch ? (
                                  <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    Exact
                                  </span>
                                ) : (
                                  <span className="text-emerald-700">
                                    {trainResult.task === 'regression' ? 'Estimated' : 'Mismatch'}
                                  </span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
