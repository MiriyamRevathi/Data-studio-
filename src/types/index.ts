export interface DatasetMeta {
  id: string;
  name: string;
  task: 'classification' | 'regression' | 'clustering' | 'general';
  description: string;
  target?: string;
  features: string[];
  rows: number;
  columns: string[];
}

export interface DescribeMetrics {
  count?: number;
  mean?: number;
  std?: number;
  min?: number;
  '25%'?: number;
  '50%'?: number;
  '75%'?: number;
  max?: number;
  [key: string]: number | undefined;
}

export interface DatasetDetail {
  name: string;
  rows: number;
  columns: string[];
  numeric_columns: string[];
  records: Record<string, any>[];
  describe: Record<string, DescribeMetrics>;
  correlation: Record<string, Record<string, number>>;
  dtypes: Record<string, string>;
  null_counts: Record<string, number>;
}

export interface SystemStatus {
  status: string;
  python_version: string;
  flask_available: boolean;
  numpy_version: string | null;
  pandas_version: string | null;
  sklearn_version: string | null;
  matplotlib_version: string | null;
}

export interface MLTrainParams {
  dataset?: string;
  records?: Record<string, any>[];
  target?: string;
  features?: string[];
  model_type: string;
  test_size?: number;
  random_state?: number;
  n_estimators?: number;
  n_clusters?: number;
  alpha?: number;
}

export interface MLTrainResult {
  error?: string;
  task?: 'classification' | 'regression' | 'clustering';
  model_type?: string;
  features?: string[];
  target?: string;
  test_size?: number;
  train_samples?: number;
  test_samples?: number;
  accuracy?: number;
  confusion_matrix?: {
    labels: string[];
    matrix: number[][];
  };
  feature_importance?: Array<{
    feature: string;
    importance: number;
    raw_coef?: number;
  }>;
  predictions_sample?: Array<{
    actual: string | number;
    predicted: string | number;
    residual?: number;
  }>;
  r2_score?: number;
  mse?: number;
  rmse?: number;
  mae?: number;
  n_clusters?: number;
  inertia?: number;
  cluster_centers?: number[][];
  labels?: number[];
  samples_analyzed?: number;
}

export interface ExecutePythonResult {
  success: boolean;
  stdout: string;
  stderr: string;
  error?: string | null;
  plot_image?: string | null;
  preview_dataframe?: {
    columns: string[];
    rows: number;
    records: Record<string, any>[];
  } | null;
}
