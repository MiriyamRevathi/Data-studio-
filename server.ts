import express, { Request, Response } from 'express';
import path from 'path';
import { executePythonRunner } from './server/pythonBridge.ts';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Health endpoint
app.get('/api/health', async (_req: Request, res: Response) => {
  const result = await executePythonRunner('health');
  res.json(result);
});

// List datasets
app.get('/api/datasets', async (_req: Request, res: Response) => {
  const result = await executePythonRunner('datasets');
  res.json(result);
});

// Get specific dataset data and stats
app.get('/api/datasets/:id', async (req: Request, res: Response) => {
  const result = await executePythonRunner('dataset', { id: req.params.id });
  res.json(result);
});

// Upload CSV dataset
app.post('/api/upload', async (req: Request, res: Response) => {
  const result = await executePythonRunner('upload', req.body);
  res.json(result);
});

// Generate local chart
app.post('/api/chart', async (req: Request, res: Response) => {
  const result = await executePythonRunner('chart', req.body);
  res.json(result);
});

// Clear temporary data
app.post('/api/clear_temp', async (_req: Request, res: Response) => {
  const result = await executePythonRunner('clear_temp');
  res.json(result);
});

// Train Machine Learning model
app.post('/api/ml/train', async (req: Request, res: Response) => {
  const result = await executePythonRunner('train', req.body);
  res.json(result);
});

// Generate Matplotlib chart
app.post('/api/chart/matplotlib', async (req: Request, res: Response) => {
  const result = await executePythonRunner('matplotlib', req.body);
  res.json(result);
});

// Execute arbitrary Python code
app.post('/api/execute', async (req: Request, res: Response) => {
  const result = await executePythonRunner('execute', req.body);
  res.json(result);
});

// Export pipeline code
app.post('/api/export', async (req: Request, res: Response) => {
  const result = await executePythonRunner('export', req.body);
  res.json(result);
});

// Ensure any unmatched /api/* still returns JSON (never HTML)
app.use('/api', (_req: Request, res: Response) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Serve frontend static assets in production
const distPath = path.resolve(process.cwd(), 'dist');
app.use(express.static(distPath));

app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`PyData Analytics Studio server listening on http://0.0.0.0:${PORT}`);
});
