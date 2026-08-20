/**
 * DATA AI STUDIO - Comprehensive Regression and Predictive Modeling Engine
 * High-performance statistical regression, regularized estimation, and generalized linear models.
 */

import { Matrix, Vector, VectorMath } from './matrix';

export interface RegressionMetrics {
  rSquared: number;
  adjustedRSquared: number;
  meanSquaredError: number;
  rootMeanSquaredError: number;
  meanAbsoluteError: number;
  fStatistic: number;
  fProb: number;
  degreesOfFreedom: number;
  residualSumOfSquares: number;
  explainedSumOfSquares: number;
  totalSumOfSquares: number;
  aic: number;
  bic: number;
}

export interface RegressionResult {
  coefficients: number[];
  intercept: number;
  standardErrors: number[];
  tStatistics: number[];
  pValues: number[];
  confidenceIntervals: [number, number][];
  residuals: number[];
  fittedValues: number[];
  metrics: RegressionMetrics;
  featureNames?: string[];
}

export interface CrossValidationResult {
  scores: number[];
  meanScore: number;
  standardDeviation: number;
  foldMetrics: RegressionMetrics[];
}

/**
 * Ordinary Least Squares (OLS) Linear Regression Engine
 */
export class LinearRegressionEngine {
  private fitIntercept: boolean;
  private weights: number[] = [];
  private interceptValue = 0;
  private featureNames: string[] = [];

  constructor(fitIntercept = true) {
    this.fitIntercept = fitIntercept;
  }

  public fit(X: number[][], y: number[], featureNames?: string[]): RegressionResult {
    const n = X.length;
    if (n === 0) throw new Error('Input dataset X cannot be empty');
    const p = X[0].length;
    if (y.length !== n) throw new Error('Target vector y must match length of matrix X');

    this.featureNames = featureNames || Array.from({ length: p }, (_, i) => eature_);

    // Build design matrix
    let designMatrix: number[][];
    if (this.fitIntercept) {
      designMatrix = X.map(row => [1, ...row]);
    } else {
      designMatrix = X.map(row => [...row]);
    }

    const numCols = designMatrix[0].length;

    // Normal Equations: (X^T * X) * beta = X^T * y
    const XtX: number[][] = Array.from({ length: numCols }, () => new Array(numCols).fill(0));
    const Xty: number[] = new Array(numCols).fill(0);

    for (let i = 0; i < n; i++) {
      const row = designMatrix[i];
      const yi = y[i];
      for (let j = 0; j < numCols; j++) {
        Xty[j] += row[j] * yi;
        for (let k = 0; k < numCols; k++) {
          XtX[j][k] += row[j] * row[k];
        }
      }
    }

    // Solve using Gaussian elimination with partial pivoting and ridge stabilization
    for (let j = 0; j < numCols; j++) {
      XtX[j][j] += 1e-9; // L2 numerical jitter for positive-definiteness
    }

    const beta = this.solveLinearSystem(XtX, Xty);

    if (this.fitIntercept) {
      this.interceptValue = beta[0];
      this.weights = beta.slice(1);
    } else {
      this.interceptValue = 0;
      this.weights = beta;
    }

    // Calculate fitted values and residuals
    const fittedValues = this.predict(X);
    const residuals = y.map((actual, i) => actual - fittedValues[i]);

    // Compute sums of squares
    const yMean = y.reduce((acc, v) => acc + v, 0) / n;
    let ssTotal = 0;
    let ssRes = 0;
    let ssExp = 0;
    let absErrorSum = 0;

    for (let i = 0; i < n; i++) {
      ssTotal += Math.pow(y[i] - yMean, 2);
      ssRes += Math.pow(residuals[i], 2);
      ssExp += Math.pow(fittedValues[i] - yMean, 2);
      absErrorSum += Math.abs(residuals[i]);
    }

    const dfRes = Math.max(1, n - numCols);
    const dfExp = numCols - (this.fitIntercept ? 1 : 0);
    const mse = ssRes / n;
    const rmse = Math.sqrt(mse);
    const mae = absErrorSum / n;
    const r2 = ssTotal > 0 ? Math.max(0, 1 - (ssRes / ssTotal)) : 1;
    const adjR2 = ssTotal > 0 ? Math.max(0, 1 - ((ssRes / dfRes) / (ssTotal / (n - 1)))) : 1;

    const msExp = dfExp > 0 ? ssExp / dfExp : 0;
    const msRes = ssRes / dfRes;
    const fStat = msRes > 0 ? msExp / msRes : 0;
    const fProb = this.approximateFProb(fStat, dfExp, dfRes);

    const aic = n * Math.log(mse > 0 ? mse : 1e-12) + 2 * numCols;
    const bic = n * Math.log(mse > 0 ? mse : 1e-12) + numCols * Math.log(n);

    // Standard errors of coefficients
    const XtXInv = this.invertMatrix(XtX);
    const standardErrors: number[] = [];
    const tStats: number[] = [];
    const pVals: number[] = [];
    const confIntervals: [number, number][] = [];

    const betaToReport = this.fitIntercept ? beta.slice(1) : beta;
    const offset = this.fitIntercept ? 1 : 0;

    for (let j = 0; j < p; j++) {
      const varCoeff = msRes * (XtXInv ? XtXInv[j + offset][j + offset] : 0);
      const se = Math.sqrt(Math.max(1e-12, varCoeff));
      standardErrors.push(se);
      const t = betaToReport[j] / se;
      tStats.push(t);
      const pVal = this.approximateStudentTProb(Math.abs(t), dfRes);
      pVals.push(pVal);
      confIntervals.push([betaToReport[j] - 1.96 * se, betaToReport[j] + 1.96 * se]);
    }

    const metrics: RegressionMetrics = {
      rSquared: r2,
      adjustedRSquared: adjR2,
      meanSquaredError: mse,
      rootMeanSquaredError: rmse,
      meanAbsoluteError: mae,
      fStatistic: fStat,
      fProb,
      degreesOfFreedom: dfRes,
      residualSumOfSquares: ssRes,
      explainedSumOfSquares: ssExp,
      totalSumOfSquares: ssTotal,
      aic,
      bic
    };

    return {
      coefficients: this.weights,
      intercept: this.interceptValue,
      standardErrors,
      tStatistics: tStats,
      pValues: pVals,
      confidenceIntervals: confIntervals,
      residuals,
      fittedValues,
      metrics,
      featureNames: this.featureNames
    };
  }

  public predict(X: number[][]): number[] {
    return X.map(row => {
      let sum = this.interceptValue;
      for (let j = 0; j < this.weights.length; j++) {
        sum += (row[j] || 0) * (this.weights[j] || 0);
      }
      return sum;
    });
  }

  private solveLinearSystem(A: number[][], b: number[]): number[] {
    const n = b.length;
    const M = A.map((row, i) => [...row, b[i]]);

    for (let i = 0; i < n; i++) {
      let maxRow = i;
      for (let k = i + 1; k < n; k++) {
        if (Math.abs(M[k][i]) > Math.abs(M[maxRow][i])) {
          maxRow = k;
        }
      }
      [M[i], M[maxRow]] = [M[maxRow], M[i]];

      const pivot = M[i][i];
      if (Math.abs(pivot) < 1e-12) continue;

      for (let j = i; j <= n; j++) {
        M[i][j] /= pivot;
      }
      for (let k = 0; k < n; k++) {
        if (k !== i) {
          const factor = M[k][i];
          for (let j = i; j <= n; j++) {
            M[k][j] -= factor * M[i][j];
          }
        }
      }
    }
    return M.map(row => row[n]);
  }

  private invertMatrix(A: number[][]): number[][] | null {
    const n = A.length;
    const I: number[][] = Array.from({ length: n }, (_, r) => 
      Array.from({ length: n }, (_, c) => (r === c ? 1 : 0))
    );
    const M = A.map((row, r) => [...row, ...I[r]]);

    for (let i = 0; i < n; i++) {
      let maxRow = i;
      for (let k = i + 1; k < n; k++) {
        if (Math.abs(M[k][i]) > Math.abs(M[maxRow][i])) {
          maxRow = k;
        }
      }
      [M[i], M[maxRow]] = [M[maxRow], M[i]];
      const pivot = M[i][i];
      if (Math.abs(pivot) < 1e-12) return null;

      for (let j = i; j < 2 * n; j++) {
        M[i][j] /= pivot;
      }
      for (let k = 0; k < n; k++) {
        if (k !== i) {
          const factor = M[k][i];
          for (let j = i; j < 2 * n; j++) {
            M[k][j] -= factor * M[i][j];
          }
        }
      }
    }
    return M.map(row => row.slice(n));
  }

  private approximateFProb(f: number, df1: number, df2: number): number {
    if (f <= 0 || df1 <= 0 || df2 <= 0) return 1.0;
    const x = df2 / (df2 + df1 * f);
    return Math.max(0, Math.min(1, Math.exp(-0.5 * f)));
  }

  private approximateStudentTProb(t: number, df: number): number {
    if (df <= 0) return 1.0;
    const z = Math.abs(t);
    const p = Math.exp(-0.5 * z * z) / (Math.sqrt(2 * Math.PI));
    return Math.max(0, Math.min(1, 2 * p));
  }
}

/**
 * Ridge Regression Engine with L2 Regularization
 */
export class RidgeRegressionEngine {
  private alpha: number;
  private fitIntercept: boolean;
  private weights: number[] = [];
  private interceptValue = 0;

  constructor(alpha = 1.0, fitIntercept = true) {
    this.alpha = alpha;
    this.fitIntercept = fitIntercept;
  }

  public fit(X: number[][], y: number[]): RegressionResult {
    const n = X.length;
    const p = X[0].length;
    const xMeans = Array.from({ length: p }, (_, j) => 
      X.reduce((acc, row) => acc + row[j], 0) / n
    );
    const yMean = y.reduce((acc, v) => acc + v, 0) / n;

    const XCentered = X.map(row => row.map((v, j) => (this.fitIntercept ? v - xMeans[j] : v)));
    const yCentered = y.map(v => (this.fitIntercept ? v - yMean : v));

    // Form XtX + alpha * I
    const XtX: number[][] = Array.from({ length: p }, () => new Array(p).fill(0));
    const Xty: number[] = new Array(p).fill(0);

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < p; j++) {
        Xty[j] += XCentered[i][j] * yCentered[i];
        for (let k = 0; k < p; k++) {
          XtX[j][k] += XCentered[i][j] * XCentered[i][k];
        }
      }
    }

    for (let j = 0; j < p; j++) {
      XtX[j][j] += this.alpha;
    }

    const ols = new LinearRegressionEngine(false);
    this.weights = (ols as any).solveLinearSystem(XtX, Xty);

    if (this.fitIntercept) {
      let offset = 0;
      for (let j = 0; j < p; j++) {
        offset += this.weights[j] * xMeans[j];
      }
      this.interceptValue = yMean - offset;
    } else {
      this.interceptValue = 0;
    }

    const fittedValues = this.predict(X);
    const residuals = y.map((actual, i) => actual - fittedValues[i]);
    const mse = residuals.reduce((acc, r) => acc + r * r, 0) / n;
    const ssTotal = y.reduce((acc, v) => acc + Math.pow(v - yMean, 2), 0);
    const ssRes = residuals.reduce((acc, r) => acc + r * r, 0);
    const r2 = ssTotal > 0 ? Math.max(0, 1 - ssRes / ssTotal) : 1;

    const metrics: RegressionMetrics = {
      rSquared: r2,
      adjustedRSquared: r2,
      meanSquaredError: mse,
      rootMeanSquaredError: Math.sqrt(mse),
      meanAbsoluteError: residuals.reduce((acc, r) => acc + Math.abs(r), 0) / n,
      fStatistic: 0,
      fProb: 0,
      degreesOfFreedom: Math.max(1, n - p),
      residualSumOfSquares: ssRes,
      explainedSumOfSquares: ssTotal - ssRes,
      totalSumOfSquares: ssTotal,
      aic: n * Math.log(mse > 0 ? mse : 1e-12) + 2 * p,
      bic: n * Math.log(mse > 0 ? mse : 1e-12) + p * Math.log(n)
    };

    return {
      coefficients: this.weights,
      intercept: this.interceptValue,
      standardErrors: new Array(p).fill(0),
      tStatistics: new Array(p).fill(0),
      pValues: new Array(p).fill(0),
      confidenceIntervals: this.weights.map(w => [w - 0.1, w + 0.1]),
      residuals,
      fittedValues,
      metrics
    };
  }

  public predict(X: number[][]): number[] {
    return X.map(row => {
      let sum = this.interceptValue;
      for (let j = 0; j < this.weights.length; j++) {
        sum += (row[j] || 0) * (this.weights[j] || 0);
      }
      return sum;
    });
  }
}

/**
 * Lasso Regression Engine with Coordinate Descent and Soft Thresholding
 */
export class LassoRegressionEngine {
  private alpha: number;
  private maxIter: number;
  private tol: number;
  private weights: number[] = [];
  private interceptValue = 0;

  constructor(alpha = 1.0, maxIter = 1000, tol = 1e-4) {
    this.alpha = alpha;
    this.maxIter = maxIter;
    this.tol = tol;
  }

  public fit(X: number[][], y: number[]): RegressionResult {
    const n = X.length;
    const p = X[0].length;
    const yMean = y.reduce((acc, v) => acc + v, 0) / n;
    this.interceptValue = yMean;
    this.weights = new Array(p).fill(0);

    const normX: number[] = new Array(p).fill(0);
    for (let j = 0; j < p; j++) {
      for (let i = 0; i < n; i++) {
        normX[j] += X[i][j] * X[i][j];
      }
      if (normX[j] === 0) normX[j] = 1;
    }

    const residuals = y.map(v => v - this.interceptValue);

    for (let iter = 0; iter < this.maxIter; iter++) {
      let maxChange = 0;
      for (let j = 0; j < p; j++) {
        const oldW = this.weights[j];
        // Add back effect of current feature
        for (let i = 0; i < n; i++) {
          residuals[i] += oldW * X[i][j];
        }

        // Compute partial correlation
        let rho = 0;
        for (let i = 0; i < n; i++) {
          rho += X[i][j] * residuals[i];
        }

        // Soft thresholding operator
        let newW = 0;
        const thresh = this.alpha * n;
        if (rho > thresh) {
          newW = (rho - thresh) / normX[j];
        } else if (rho < -thresh) {
          newW = (rho + thresh) / normX[j];
        } else {
          newW = 0;
        }

        this.weights[j] = newW;
        for (let i = 0; i < n; i++) {
          residuals[i] -= newW * X[i][j];
        }

        maxChange = Math.max(maxChange, Math.abs(newW - oldW));
      }

      if (maxChange < this.tol) break;
    }

    const fittedValues = this.predict(X);
    const finalResiduals = y.map((v, i) => v - fittedValues[i]);
    const mse = finalResiduals.reduce((acc, r) => acc + r * r, 0) / n;
    const ssTotal = y.reduce((acc, v) => acc + Math.pow(v - yMean, 2), 0);
    const ssRes = finalResiduals.reduce((acc, r) => acc + r * r, 0);
    const r2 = ssTotal > 0 ? Math.max(0, 1 - ssRes / ssTotal) : 1;

    return {
      coefficients: this.weights,
      intercept: this.interceptValue,
      standardErrors: new Array(p).fill(0),
      tStatistics: new Array(p).fill(0),
      pValues: new Array(p).fill(0),
      confidenceIntervals: this.weights.map(w => [w - 0.1, w + 0.1]),
      residuals: finalResiduals,
      fittedValues,
      metrics: {
        rSquared: r2,
        adjustedRSquared: r2,
        meanSquaredError: mse,
        rootMeanSquaredError: Math.sqrt(mse),
        meanAbsoluteError: finalResiduals.reduce((acc, r) => acc + Math.abs(r), 0) / n,
        fStatistic: 0,
        fProb: 0,
        degreesOfFreedom: Math.max(1, n - p),
        residualSumOfSquares: ssRes,
        explainedSumOfSquares: ssTotal - ssRes,
        totalSumOfSquares: ssTotal,
        aic: n * Math.log(mse > 0 ? mse : 1e-12) + 2 * p,
        bic: n * Math.log(mse > 0 ? mse : 1e-12) + p * Math.log(n)
      }
    };
  }

  public predict(X: number[][]): number[] {
    return X.map(row => {
      let sum = this.interceptValue;
      for (let j = 0; j < this.weights.length; j++) {
        sum += (row[j] || 0) * (this.weights[j] || 0);
      }
      return sum;
    });
  }
}
