import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import { spawn } from 'child_process';

function pythonApiPlugin(): Plugin {
  return {
    name: 'python-api-dev-server',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/')) {
          return next();
        }

        const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost:3000'}`);
        const pathname = parsedUrl.pathname;

        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });

        req.on('end', async () => {
          let payload: any = {};
          if (body) {
            try {
              payload = JSON.parse(body);
            } catch {
              payload = {};
            }
          }

          let command = '';
          if (pathname === '/api/health') {
            command = 'health';
          } else if (pathname === '/api/datasets') {
            command = 'datasets';
          } else if (pathname.startsWith('/api/datasets/')) {
            command = 'dataset';
            const id = pathname.replace('/api/datasets/', '');
            payload.id = id;
          } else if (pathname === '/api/upload') {
            command = 'upload';
          } else if (pathname === '/api/chart') {
            command = 'chart';
          } else if (pathname === '/api/clear_temp') {
            command = 'clear_temp';
          } else if (pathname === '/api/ml/train') {
            command = 'train';
          } else if (pathname === '/api/chart/matplotlib') {
            command = 'matplotlib';
          } else if (pathname === '/api/execute') {
            command = 'execute';
          } else if (pathname === '/api/export') {
            command = 'export';
          } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Endpoint not found' }));
            return;
          }

          try {
            const runnerPath = path.resolve(process.cwd(), 'backend', 'runner.py');
            const pyCmd = process.platform === 'win32' ? 'python' : 'python3';
            const py = spawn(pyCmd, [runnerPath, command]);

            let stdout = '';
            let stderr = '';

            py.stdout.on('data', (d) => {
              stdout += d.toString();
            });

            py.stderr.on('data', (d) => {
              stderr += d.toString();
            });

            py.on('close', (code) => {
              res.setHeader('Content-Type', 'application/json');
              if (stdout.trim()) {
                res.end(stdout.trim());
              } else {
                res.statusCode = code === 0 ? 200 : 500;
                res.end(JSON.stringify({ error: stderr.trim() || `Python exited with code ${code}` }));
              }
            });

            py.on('error', (err) => {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message }));
            });

            if (payload) {
              py.stdin.write(JSON.stringify(payload));
            }
            py.stdin.end();
          } catch (err: any) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err?.message || 'Server error' }));
          }
        });
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), pythonApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify — file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
