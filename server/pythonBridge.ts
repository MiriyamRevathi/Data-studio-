import { spawn } from 'child_process';
import path from 'path';

export interface PythonResponse<T = any> {
  success?: boolean;
  data?: T;
  error?: string;
  [key: string]: any;
}

export function executePythonRunner<T = any>(command: string, payload: any = {}): Promise<T> {
  return new Promise((resolve) => {
    const runnerPath = path.resolve(process.cwd(), 'backend', 'runner.py');
    const pyCmd = process.platform === 'win32' ? 'python' : 'python3';
    const py = spawn(pyCmd, [runnerPath, command]);

    let stdout = '';
    let stderr = '';

    py.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    py.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    py.on('error', (err) => {
      resolve({
        error: `Failed to invoke python3: ${err.message}`,
        python_available: false,
      } as unknown as T);
    });

    py.on('close', (code) => {
      if (code !== 0 && !stdout.trim()) {
        resolve({
          error: stderr.trim() || `Python process exited with code ${code}`,
          code,
        } as unknown as T);
        return;
      }

      try {
        const parsed = JSON.parse(stdout.trim());
        resolve(parsed as T);
      } catch {
        resolve({
          raw: stdout,
          stderr: stderr.trim(),
          error: 'Failed to parse JSON output from python runner',
        } as unknown as T);
      }
    });

    if (payload) {
      py.stdin.write(JSON.stringify(payload));
      py.stdin.end();
    } else {
      py.stdin.end();
    }
  });
}
