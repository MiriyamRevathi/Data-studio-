import { describe, it } from 'node:test';
import assert from 'node:assert';

describe('Data AI Studio - Client Engine Test Suite', () => {
  it('should calculate mean, median and variance correctly', () => {
    const values = [10, 20, 30, 40, 50];
    const sum = values.reduce((a, b) => a + b, 0);
    const mean = sum / values.length;
    assert.strictEqual(mean, 30);

    const sorted = [...values].sort((a, b) => a - b);
    const median = sorted[Math.floor(sorted.length / 2)];
    assert.strictEqual(median, 30);
  });

  it('should compute Pearson correlation between two vectors', () => {
    const x = [1, 2, 3, 4, 5];
    const y = [2, 4, 6, 8, 10];
    
    const n = x.length;
    const meanX = x.reduce((a, b) => a + b) / n;
    const meanY = y.reduce((a, b) => a + b) / n;
    
    let num = 0;
    let denX = 0;
    let denY = 0;
    
    for (let i = 0; i < n; i++) {
      const dx = x[i] - meanX;
      const dy = y[i] - meanY;
      num += dx * dy;
      denX += dx * dx;
      denY += dy * dy;
    }
    
    const r = num / Math.sqrt(denX * denY);
    assert.ok(Math.abs(r - 1.0) < 1e-6);
  });

  it('should detect outliers using IQR method', () => {
    const data = [10, 12, 11, 13, 12, 10, 11, 95];
    const sorted = [...data].sort((a, b) => a - b);
    const q1 = sorted[Math.floor(sorted.length * 0.25)];
    const q3 = sorted[Math.floor(sorted.length * 0.75)];
    const iqr = q3 - q1;
    const upperBound = q3 + 1.5 * iqr;
    const outliers = data.filter(v => v > upperBound);
    assert.ok(outliers.includes(95));
  });
});
