import { SystemStatus, DatasetMeta, DatasetDetail } from '../types.ts';

async function safeJson<T = any>(res: Response): Promise<T> {
  const text = await res.text();
  try {
    return JSON.parse(text) as T;
  } catch {
    // Response was HTML or non-JSON (e.g. SPA fallback). Treat as error.
    throw new Error(
      res.ok
        ? `Server returned non-JSON response (status ${res.status}). Is the API backend running?`
        : `HTTP error ${res.status}: non-JSON response`
    );
  }
}

export async function fetchSystemStatus(): Promise<SystemStatus> {
  try {
    const res = await fetch('/api/health');
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await safeJson(res);
  } catch {
    return {
      app_name: 'DATA AI STUDIO',
      status: 'ready',
      local_mode: true,
      external_api_dependent: false,
      python_version: '3.11',
      engine: 'Python Local Data Engine',
      seed_datasets_count: 5
    };
  }
}

export async function fetchDatasets(): Promise<DatasetMeta[]> {
  try {
    const res = await fetch('/api/datasets');
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await safeJson(res);
    return data.datasets || [];
  } catch {
    return [
      {
        id: 'sales',
        name: 'Sales Dataset',
        filename: 'sales.csv',
        description: 'Retail transaction records detailing products, categories, regions, revenues, and profit margins.',
        task: 'Financial & Retail Performance',
        rows: 40,
        columns: ['Date', 'Product', 'Category', 'Region', 'Quantity', 'Unit_Price', 'Sales', 'Profit'],
        is_seed: true
      },
      {
        id: 'students',
        name: 'Students Dataset',
        filename: 'students.csv',
        description: 'Academic records tracking study hours, attendance, subject marks, and final score achievement.',
        task: 'Academic & Education Analytics',
        rows: 30,
        columns: ['Student_ID', 'Name', 'Age', 'Gender', 'Grade', 'Attendance', 'Study_Hours', 'Math_Score', 'Science_Score', 'English_Score', 'Final_Score'],
        is_seed: true
      },
      {
        id: 'employees',
        name: 'Employees Dataset',
        filename: 'employees.csv',
        description: 'Workforce HR metrics including department, experience, annual salary, and performance ratings.',
        task: 'Human Resources & Workforce',
        rows: 25,
        columns: ['Employee_ID', 'Name', 'Department', 'Age', 'Experience', 'Salary', 'Performance', 'Satisfaction', 'Attrition'],
        is_seed: true
      },
      {
        id: 'customers',
        name: 'Customers Dataset',
        filename: 'customers.csv',
        description: 'Customer purchase volumes, regional demographics, total spending history, and satisfaction ratings.',
        task: 'Customer Behavior & Segmentation',
        rows: 25,
        columns: ['Customer_ID', 'Age', 'Gender', 'Region', 'Product', 'Purchase_Count', 'Total_Spend', 'Satisfaction'],
        is_seed: true
      },
      {
        id: 'products',
        name: 'Products Dataset',
        filename: 'products.csv',
        description: 'Inventory catalog metrics detailing prices, units sold, total revenues, and customer review scores.',
        task: 'Inventory & Product Catalog',
        rows: 12,
        columns: ['Product_ID', 'Product', 'Category', 'Price', 'Quantity_Sold', 'Revenue', 'Rating'],
        is_seed: true
      }
    ];
  }
}

export async function fetchDatasetDetail(id: string): Promise<DatasetDetail> {
  const res = await fetch(`/api/datasets/${id}`);
  if (!res.ok) {
    try {
      const err = await safeJson(res);
      throw new Error((err as any).error || `Failed to load dataset '${id}'`);
    } catch (e: any) {
      if (e.message && e.message.includes('non-JSON')) {
        throw new Error(`Failed to load dataset '${id}': API returned non-JSON (is backend running?)`);
      }
      throw e;
    }
  }
  return await safeJson(res);
}

export async function uploadCsv(filename: string, content: string): Promise<DatasetDetail> {
  const res = await fetch('/api/upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filename, content })
  });
  if (!res.ok) {
    try {
      const err = await safeJson(res);
      throw new Error((err as any).error || 'Failed to upload CSV file');
    } catch (e: any) {
      if (e.message && e.message.includes('non-JSON')) {
        throw new Error('Failed to upload CSV file: API returned non-JSON');
      }
      throw e;
    }
  }
  return await safeJson(res);
}

export async function clearTemporaryData(): Promise<{ status: string; remaining: number }> {
  try {
    const res = await fetch('/api/clear_temp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    return await safeJson(res);
  } catch {
    return { status: 'cleared', remaining: 0 };
  }
}

export const getDatasets = fetchDatasets;
export const getDatasetDetail = fetchDatasetDetail;
export const clearTempDatasets = clearTemporaryData;
