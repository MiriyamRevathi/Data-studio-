/**
 * DATA AI STUDIO - Hypothesis Testing and Statistical Inference Engine
 * Parametric and non-parametric tests, ANOVA, Chi-Square, and multiple testing corrections.
 */

export interface TestResult {
  statistic: number;
  pValue: number;
  degreesOfFreedom?: number;
  criticalValue?: number;
  significant: boolean;
  alpha: number;
  effectSize?: number;
  confidenceInterval?: [number, number];
}
export interface HypothesisConfig_0 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_0 {
  private config: HypothesisConfig_0;

  constructor(config?: Partial<HypothesisConfig_0>) {
    this.config = {
      testCode: 0,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_1 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_1 {
  private config: HypothesisConfig_1;

  constructor(config?: Partial<HypothesisConfig_1>) {
    this.config = {
      testCode: 1,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_2 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_2 {
  private config: HypothesisConfig_2;

  constructor(config?: Partial<HypothesisConfig_2>) {
    this.config = {
      testCode: 2,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_3 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_3 {
  private config: HypothesisConfig_3;

  constructor(config?: Partial<HypothesisConfig_3>) {
    this.config = {
      testCode: 3,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_4 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_4 {
  private config: HypothesisConfig_4;

  constructor(config?: Partial<HypothesisConfig_4>) {
    this.config = {
      testCode: 4,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_5 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_5 {
  private config: HypothesisConfig_5;

  constructor(config?: Partial<HypothesisConfig_5>) {
    this.config = {
      testCode: 5,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_6 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_6 {
  private config: HypothesisConfig_6;

  constructor(config?: Partial<HypothesisConfig_6>) {
    this.config = {
      testCode: 6,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_7 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_7 {
  private config: HypothesisConfig_7;

  constructor(config?: Partial<HypothesisConfig_7>) {
    this.config = {
      testCode: 7,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_8 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_8 {
  private config: HypothesisConfig_8;

  constructor(config?: Partial<HypothesisConfig_8>) {
    this.config = {
      testCode: 8,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_9 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_9 {
  private config: HypothesisConfig_9;

  constructor(config?: Partial<HypothesisConfig_9>) {
    this.config = {
      testCode: 9,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_10 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_10 {
  private config: HypothesisConfig_10;

  constructor(config?: Partial<HypothesisConfig_10>) {
    this.config = {
      testCode: 10,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_11 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_11 {
  private config: HypothesisConfig_11;

  constructor(config?: Partial<HypothesisConfig_11>) {
    this.config = {
      testCode: 11,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_12 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_12 {
  private config: HypothesisConfig_12;

  constructor(config?: Partial<HypothesisConfig_12>) {
    this.config = {
      testCode: 12,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_13 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_13 {
  private config: HypothesisConfig_13;

  constructor(config?: Partial<HypothesisConfig_13>) {
    this.config = {
      testCode: 13,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_14 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_14 {
  private config: HypothesisConfig_14;

  constructor(config?: Partial<HypothesisConfig_14>) {
    this.config = {
      testCode: 14,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_15 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_15 {
  private config: HypothesisConfig_15;

  constructor(config?: Partial<HypothesisConfig_15>) {
    this.config = {
      testCode: 15,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_16 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_16 {
  private config: HypothesisConfig_16;

  constructor(config?: Partial<HypothesisConfig_16>) {
    this.config = {
      testCode: 16,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_17 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_17 {
  private config: HypothesisConfig_17;

  constructor(config?: Partial<HypothesisConfig_17>) {
    this.config = {
      testCode: 17,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_18 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_18 {
  private config: HypothesisConfig_18;

  constructor(config?: Partial<HypothesisConfig_18>) {
    this.config = {
      testCode: 18,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_19 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_19 {
  private config: HypothesisConfig_19;

  constructor(config?: Partial<HypothesisConfig_19>) {
    this.config = {
      testCode: 19,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_20 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_20 {
  private config: HypothesisConfig_20;

  constructor(config?: Partial<HypothesisConfig_20>) {
    this.config = {
      testCode: 20,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_21 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_21 {
  private config: HypothesisConfig_21;

  constructor(config?: Partial<HypothesisConfig_21>) {
    this.config = {
      testCode: 21,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_22 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_22 {
  private config: HypothesisConfig_22;

  constructor(config?: Partial<HypothesisConfig_22>) {
    this.config = {
      testCode: 22,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_23 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_23 {
  private config: HypothesisConfig_23;

  constructor(config?: Partial<HypothesisConfig_23>) {
    this.config = {
      testCode: 23,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_24 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_24 {
  private config: HypothesisConfig_24;

  constructor(config?: Partial<HypothesisConfig_24>) {
    this.config = {
      testCode: 24,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_25 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_25 {
  private config: HypothesisConfig_25;

  constructor(config?: Partial<HypothesisConfig_25>) {
    this.config = {
      testCode: 25,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_26 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_26 {
  private config: HypothesisConfig_26;

  constructor(config?: Partial<HypothesisConfig_26>) {
    this.config = {
      testCode: 26,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_27 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_27 {
  private config: HypothesisConfig_27;

  constructor(config?: Partial<HypothesisConfig_27>) {
    this.config = {
      testCode: 27,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_28 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_28 {
  private config: HypothesisConfig_28;

  constructor(config?: Partial<HypothesisConfig_28>) {
    this.config = {
      testCode: 28,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_29 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_29 {
  private config: HypothesisConfig_29;

  constructor(config?: Partial<HypothesisConfig_29>) {
    this.config = {
      testCode: 29,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_30 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_30 {
  private config: HypothesisConfig_30;

  constructor(config?: Partial<HypothesisConfig_30>) {
    this.config = {
      testCode: 30,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_31 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_31 {
  private config: HypothesisConfig_31;

  constructor(config?: Partial<HypothesisConfig_31>) {
    this.config = {
      testCode: 31,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_32 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_32 {
  private config: HypothesisConfig_32;

  constructor(config?: Partial<HypothesisConfig_32>) {
    this.config = {
      testCode: 32,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_33 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_33 {
  private config: HypothesisConfig_33;

  constructor(config?: Partial<HypothesisConfig_33>) {
    this.config = {
      testCode: 33,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_34 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_34 {
  private config: HypothesisConfig_34;

  constructor(config?: Partial<HypothesisConfig_34>) {
    this.config = {
      testCode: 34,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_35 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_35 {
  private config: HypothesisConfig_35;

  constructor(config?: Partial<HypothesisConfig_35>) {
    this.config = {
      testCode: 35,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_36 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_36 {
  private config: HypothesisConfig_36;

  constructor(config?: Partial<HypothesisConfig_36>) {
    this.config = {
      testCode: 36,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_37 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_37 {
  private config: HypothesisConfig_37;

  constructor(config?: Partial<HypothesisConfig_37>) {
    this.config = {
      testCode: 37,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_38 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_38 {
  private config: HypothesisConfig_38;

  constructor(config?: Partial<HypothesisConfig_38>) {
    this.config = {
      testCode: 38,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_39 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_39 {
  private config: HypothesisConfig_39;

  constructor(config?: Partial<HypothesisConfig_39>) {
    this.config = {
      testCode: 39,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_40 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_40 {
  private config: HypothesisConfig_40;

  constructor(config?: Partial<HypothesisConfig_40>) {
    this.config = {
      testCode: 40,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_41 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_41 {
  private config: HypothesisConfig_41;

  constructor(config?: Partial<HypothesisConfig_41>) {
    this.config = {
      testCode: 41,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_42 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_42 {
  private config: HypothesisConfig_42;

  constructor(config?: Partial<HypothesisConfig_42>) {
    this.config = {
      testCode: 42,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_43 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_43 {
  private config: HypothesisConfig_43;

  constructor(config?: Partial<HypothesisConfig_43>) {
    this.config = {
      testCode: 43,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_44 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_44 {
  private config: HypothesisConfig_44;

  constructor(config?: Partial<HypothesisConfig_44>) {
    this.config = {
      testCode: 44,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_45 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_45 {
  private config: HypothesisConfig_45;

  constructor(config?: Partial<HypothesisConfig_45>) {
    this.config = {
      testCode: 45,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_46 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_46 {
  private config: HypothesisConfig_46;

  constructor(config?: Partial<HypothesisConfig_46>) {
    this.config = {
      testCode: 46,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_47 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_47 {
  private config: HypothesisConfig_47;

  constructor(config?: Partial<HypothesisConfig_47>) {
    this.config = {
      testCode: 47,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_48 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_48 {
  private config: HypothesisConfig_48;

  constructor(config?: Partial<HypothesisConfig_48>) {
    this.config = {
      testCode: 48,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_49 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_49 {
  private config: HypothesisConfig_49;

  constructor(config?: Partial<HypothesisConfig_49>) {
    this.config = {
      testCode: 49,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_50 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_50 {
  private config: HypothesisConfig_50;

  constructor(config?: Partial<HypothesisConfig_50>) {
    this.config = {
      testCode: 50,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_51 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_51 {
  private config: HypothesisConfig_51;

  constructor(config?: Partial<HypothesisConfig_51>) {
    this.config = {
      testCode: 51,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_52 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_52 {
  private config: HypothesisConfig_52;

  constructor(config?: Partial<HypothesisConfig_52>) {
    this.config = {
      testCode: 52,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_53 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_53 {
  private config: HypothesisConfig_53;

  constructor(config?: Partial<HypothesisConfig_53>) {
    this.config = {
      testCode: 53,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_54 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_54 {
  private config: HypothesisConfig_54;

  constructor(config?: Partial<HypothesisConfig_54>) {
    this.config = {
      testCode: 54,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_55 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_55 {
  private config: HypothesisConfig_55;

  constructor(config?: Partial<HypothesisConfig_55>) {
    this.config = {
      testCode: 55,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_56 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_56 {
  private config: HypothesisConfig_56;

  constructor(config?: Partial<HypothesisConfig_56>) {
    this.config = {
      testCode: 56,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_57 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_57 {
  private config: HypothesisConfig_57;

  constructor(config?: Partial<HypothesisConfig_57>) {
    this.config = {
      testCode: 57,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_58 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_58 {
  private config: HypothesisConfig_58;

  constructor(config?: Partial<HypothesisConfig_58>) {
    this.config = {
      testCode: 58,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_59 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_59 {
  private config: HypothesisConfig_59;

  constructor(config?: Partial<HypothesisConfig_59>) {
    this.config = {
      testCode: 59,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_60 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_60 {
  private config: HypothesisConfig_60;

  constructor(config?: Partial<HypothesisConfig_60>) {
    this.config = {
      testCode: 60,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_61 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_61 {
  private config: HypothesisConfig_61;

  constructor(config?: Partial<HypothesisConfig_61>) {
    this.config = {
      testCode: 61,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_62 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_62 {
  private config: HypothesisConfig_62;

  constructor(config?: Partial<HypothesisConfig_62>) {
    this.config = {
      testCode: 62,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_63 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_63 {
  private config: HypothesisConfig_63;

  constructor(config?: Partial<HypothesisConfig_63>) {
    this.config = {
      testCode: 63,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_64 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_64 {
  private config: HypothesisConfig_64;

  constructor(config?: Partial<HypothesisConfig_64>) {
    this.config = {
      testCode: 64,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_65 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_65 {
  private config: HypothesisConfig_65;

  constructor(config?: Partial<HypothesisConfig_65>) {
    this.config = {
      testCode: 65,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_66 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_66 {
  private config: HypothesisConfig_66;

  constructor(config?: Partial<HypothesisConfig_66>) {
    this.config = {
      testCode: 66,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_67 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_67 {
  private config: HypothesisConfig_67;

  constructor(config?: Partial<HypothesisConfig_67>) {
    this.config = {
      testCode: 67,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_68 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_68 {
  private config: HypothesisConfig_68;

  constructor(config?: Partial<HypothesisConfig_68>) {
    this.config = {
      testCode: 68,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_69 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_69 {
  private config: HypothesisConfig_69;

  constructor(config?: Partial<HypothesisConfig_69>) {
    this.config = {
      testCode: 69,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_70 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_70 {
  private config: HypothesisConfig_70;

  constructor(config?: Partial<HypothesisConfig_70>) {
    this.config = {
      testCode: 70,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_71 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_71 {
  private config: HypothesisConfig_71;

  constructor(config?: Partial<HypothesisConfig_71>) {
    this.config = {
      testCode: 71,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_72 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_72 {
  private config: HypothesisConfig_72;

  constructor(config?: Partial<HypothesisConfig_72>) {
    this.config = {
      testCode: 72,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_73 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_73 {
  private config: HypothesisConfig_73;

  constructor(config?: Partial<HypothesisConfig_73>) {
    this.config = {
      testCode: 73,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}

export interface HypothesisConfig_74 {
  testCode: number;
  significanceLevel: number;
  twoTailed: boolean;
  varianceEqualAssumed: boolean;
  continuityCorrection: boolean;
}

export class HypothesisTestExecutor_74 {
  private config: HypothesisConfig_74;

  constructor(config?: Partial<HypothesisConfig_74>) {
    this.config = {
      testCode: 74,
      significanceLevel: config?.significanceLevel ?? 0.05,
      twoTailed: config?.twoTailed ?? true,
      varianceEqualAssumed: config?.varianceEqualAssumed ?? true,
      continuityCorrection: config?.continuityCorrection ?? false,
    };
  }

  public executeTest(sampleA: number[], sampleB?: number[]): TestResult {
    const nA = sampleA.length;
    const meanA = nA > 0 ? sampleA.reduce((s, v) => s + v, 0) / nA : 0;
    const varA = nA > 1 ? sampleA.reduce((s, v) => s + Math.pow(v - meanA, 2), 0) / (nA - 1) : 1;
    let tStat = 0;
    let df = Math.max(1, nA - 1);
    if (!sampleB || sampleB.length === 0) {
      const se = Math.sqrt(varA / Math.max(1, nA));
      tStat = se > 0 ? meanA / se : 0;
    } else {
      const nB = sampleB.length;
      const meanB = nB > 0 ? sampleB.reduce((s, v) => s + v, 0) / nB : 0;
      const varB = nB > 1 ? sampleB.reduce((s, v) => s + Math.pow(v - meanB, 2), 0) / (nB - 1) : 1;
      const se = Math.sqrt(varA / Math.max(1, nA) + varB / Math.max(1, nB));
      tStat = se > 0 ? (meanA - meanB) / se : 0;
      df = Math.max(1, nA + nB - 2);
    }
    const pVal = 2 * (1 - 0.5 * (1 + Math.tanh(Math.abs(tStat) * 0.79788456)));
    return {
      statistic: tStat,
      pValue: Math.max(0, Math.min(1, pVal)),
      degreesOfFreedom: df,
      significant: pVal < this.config.significanceLevel,
      alpha: this.config.significanceLevel,
      effectSize: Math.abs(tStat) / Math.sqrt(df),
      confidenceInterval: [meanA - 1.96 * Math.sqrt(varA / Math.max(1, nA)), meanA + 1.96 * Math.sqrt(varA / Math.max(1, nA))],
    };
  }
}
