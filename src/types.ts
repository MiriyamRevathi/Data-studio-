export interface DatasetMeta {
  id: string;
  name: string;
  filename?: string;
  task?: string;
  description: string;
  rows: number;
  columns: string[];
  is_seed?: boolean;
}

export interface ColumnTypes {
  numeric: string[];
  categorical: string[];
  date: string[];
  boolean: string[];
}

export interface MissingValueInfo {
  column: string;
  missing_count: number;
  missing_percentage: number;
}

export interface OutlierInfo {
  column: string;
  outlier_count: number;
  outlier_percentage: number;
  lower_bound: number;
  upper_bound: number;
}

export interface DataQuality {
  total_rows: number;
  total_columns: number;
  duplicate_rows: number;
  missing_values: MissingValueInfo[];
  outliers: OutlierInfo[];
  numeric_count: number;
  categorical_count: number;
  date_count: number;
  boolean_count: number;
}

export interface NumericStats {
  count: number;
  mean: number;
  median: number;
  min: number;
  max: number;
  std: number;
  q25?: number;
  q75?: number;
}

export interface CategoricalStats {
  unique_values: number;
  most_frequent: string;
  frequency: number;
  frequency_percentage: number;
}

export interface CorrelationPair {
  col1: string;
  col2: string;
  correlation: number;
  strength: 'Strong' | 'Moderate' | 'Weak';
  direction: 'Positive' | 'Negative' | 'Neutral';
}

export interface CorrelationData {
  matrix: Record<string, Record<string, number>>;
  pairs: CorrelationPair[];
}

export interface DatasetDetail {
  id: string;
  name: string;
  filename?: string;
  task?: string;
  description: string;
  rows: number;
  columns: string[];
  column_types: ColumnTypes;
  records: Record<string, any>[];
  quality: DataQuality;
  statistics: {
    numeric: Record<string, NumericStats>;
    categorical: Record<string, CategoricalStats>;
  };
  correlations: CorrelationData;
  insights: string[];
  error?: string;
}

export interface User {
  name: string;
  email: string;
  role: string;
}

export interface SystemStatus {
  app_name: string;
  status: string;
  local_mode: boolean;
  external_api_dependent: boolean;
  python_version: string;
  engine: string;
  seed_datasets_count: number;
}

export interface ReportItem {
  id: string;
  name: string;
  datasetId: string;
  datasetName: string;
  createdAt: string;
  status: 'Ready' | 'Generated';
  datasetRows: number;
  datasetCols: number;
  quality: {
    duplicateRows: number;
    missingCells: number;
    outlierCount: number;
  };
  insights: string[];
  topCorrelation?: string;
}

export interface MLTrainResult {
  model_type: string;
  task: string;
  features: string[];
  target: string;
  metrics: Record<string, number>;
  predictions_sample: { actual: any; predicted: any }[];
  feature_importance?: Record<string, number>;
  duration_seconds: number;
}

export interface PythonExecutionResult {
  stdout: string;
  stderr: string;
  execution_time: number;
  chart_base64?: string;
}

export type AppView = 
  | 'landing' 
  | 'login' 
  | 'dashboard' 
  | 'datasets' 
  | 'dataset-preview' 
  | 'data-quality'
  | 'visualization' 
  | 'analytics' 
  | 'reports' 
  | 'settings';
