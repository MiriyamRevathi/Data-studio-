/**
 * DATA AI STUDIO - Geospatial and Geometric Analytics Engine
 * Haversine distances, bounding boxes, convex hulls, and spatial clustering.
 */

export interface GeoCoordinate {
  latitude: number;
  longitude: number;
}

export interface SpatialBoundingBox {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
}
export interface SpatialConfig_0 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_0 {
  private config: SpatialConfig_0;

  constructor(config?: Partial<SpatialConfig_0>) {
    this.config = {
      spatialId: 0,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_1 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_1 {
  private config: SpatialConfig_1;

  constructor(config?: Partial<SpatialConfig_1>) {
    this.config = {
      spatialId: 1,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_2 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_2 {
  private config: SpatialConfig_2;

  constructor(config?: Partial<SpatialConfig_2>) {
    this.config = {
      spatialId: 2,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_3 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_3 {
  private config: SpatialConfig_3;

  constructor(config?: Partial<SpatialConfig_3>) {
    this.config = {
      spatialId: 3,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_4 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_4 {
  private config: SpatialConfig_4;

  constructor(config?: Partial<SpatialConfig_4>) {
    this.config = {
      spatialId: 4,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_5 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_5 {
  private config: SpatialConfig_5;

  constructor(config?: Partial<SpatialConfig_5>) {
    this.config = {
      spatialId: 5,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_6 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_6 {
  private config: SpatialConfig_6;

  constructor(config?: Partial<SpatialConfig_6>) {
    this.config = {
      spatialId: 6,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_7 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_7 {
  private config: SpatialConfig_7;

  constructor(config?: Partial<SpatialConfig_7>) {
    this.config = {
      spatialId: 7,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_8 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_8 {
  private config: SpatialConfig_8;

  constructor(config?: Partial<SpatialConfig_8>) {
    this.config = {
      spatialId: 8,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_9 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_9 {
  private config: SpatialConfig_9;

  constructor(config?: Partial<SpatialConfig_9>) {
    this.config = {
      spatialId: 9,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_10 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_10 {
  private config: SpatialConfig_10;

  constructor(config?: Partial<SpatialConfig_10>) {
    this.config = {
      spatialId: 10,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_11 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_11 {
  private config: SpatialConfig_11;

  constructor(config?: Partial<SpatialConfig_11>) {
    this.config = {
      spatialId: 11,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_12 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_12 {
  private config: SpatialConfig_12;

  constructor(config?: Partial<SpatialConfig_12>) {
    this.config = {
      spatialId: 12,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_13 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_13 {
  private config: SpatialConfig_13;

  constructor(config?: Partial<SpatialConfig_13>) {
    this.config = {
      spatialId: 13,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_14 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_14 {
  private config: SpatialConfig_14;

  constructor(config?: Partial<SpatialConfig_14>) {
    this.config = {
      spatialId: 14,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_15 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_15 {
  private config: SpatialConfig_15;

  constructor(config?: Partial<SpatialConfig_15>) {
    this.config = {
      spatialId: 15,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_16 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_16 {
  private config: SpatialConfig_16;

  constructor(config?: Partial<SpatialConfig_16>) {
    this.config = {
      spatialId: 16,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_17 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_17 {
  private config: SpatialConfig_17;

  constructor(config?: Partial<SpatialConfig_17>) {
    this.config = {
      spatialId: 17,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_18 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_18 {
  private config: SpatialConfig_18;

  constructor(config?: Partial<SpatialConfig_18>) {
    this.config = {
      spatialId: 18,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_19 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_19 {
  private config: SpatialConfig_19;

  constructor(config?: Partial<SpatialConfig_19>) {
    this.config = {
      spatialId: 19,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_20 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_20 {
  private config: SpatialConfig_20;

  constructor(config?: Partial<SpatialConfig_20>) {
    this.config = {
      spatialId: 20,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_21 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_21 {
  private config: SpatialConfig_21;

  constructor(config?: Partial<SpatialConfig_21>) {
    this.config = {
      spatialId: 21,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_22 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_22 {
  private config: SpatialConfig_22;

  constructor(config?: Partial<SpatialConfig_22>) {
    this.config = {
      spatialId: 22,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_23 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_23 {
  private config: SpatialConfig_23;

  constructor(config?: Partial<SpatialConfig_23>) {
    this.config = {
      spatialId: 23,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_24 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_24 {
  private config: SpatialConfig_24;

  constructor(config?: Partial<SpatialConfig_24>) {
    this.config = {
      spatialId: 24,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_25 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_25 {
  private config: SpatialConfig_25;

  constructor(config?: Partial<SpatialConfig_25>) {
    this.config = {
      spatialId: 25,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_26 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_26 {
  private config: SpatialConfig_26;

  constructor(config?: Partial<SpatialConfig_26>) {
    this.config = {
      spatialId: 26,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_27 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_27 {
  private config: SpatialConfig_27;

  constructor(config?: Partial<SpatialConfig_27>) {
    this.config = {
      spatialId: 27,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_28 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_28 {
  private config: SpatialConfig_28;

  constructor(config?: Partial<SpatialConfig_28>) {
    this.config = {
      spatialId: 28,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_29 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_29 {
  private config: SpatialConfig_29;

  constructor(config?: Partial<SpatialConfig_29>) {
    this.config = {
      spatialId: 29,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_30 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_30 {
  private config: SpatialConfig_30;

  constructor(config?: Partial<SpatialConfig_30>) {
    this.config = {
      spatialId: 30,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_31 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_31 {
  private config: SpatialConfig_31;

  constructor(config?: Partial<SpatialConfig_31>) {
    this.config = {
      spatialId: 31,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_32 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_32 {
  private config: SpatialConfig_32;

  constructor(config?: Partial<SpatialConfig_32>) {
    this.config = {
      spatialId: 32,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_33 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_33 {
  private config: SpatialConfig_33;

  constructor(config?: Partial<SpatialConfig_33>) {
    this.config = {
      spatialId: 33,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_34 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_34 {
  private config: SpatialConfig_34;

  constructor(config?: Partial<SpatialConfig_34>) {
    this.config = {
      spatialId: 34,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_35 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_35 {
  private config: SpatialConfig_35;

  constructor(config?: Partial<SpatialConfig_35>) {
    this.config = {
      spatialId: 35,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_36 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_36 {
  private config: SpatialConfig_36;

  constructor(config?: Partial<SpatialConfig_36>) {
    this.config = {
      spatialId: 36,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_37 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_37 {
  private config: SpatialConfig_37;

  constructor(config?: Partial<SpatialConfig_37>) {
    this.config = {
      spatialId: 37,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_38 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_38 {
  private config: SpatialConfig_38;

  constructor(config?: Partial<SpatialConfig_38>) {
    this.config = {
      spatialId: 38,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_39 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_39 {
  private config: SpatialConfig_39;

  constructor(config?: Partial<SpatialConfig_39>) {
    this.config = {
      spatialId: 39,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_40 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_40 {
  private config: SpatialConfig_40;

  constructor(config?: Partial<SpatialConfig_40>) {
    this.config = {
      spatialId: 40,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_41 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_41 {
  private config: SpatialConfig_41;

  constructor(config?: Partial<SpatialConfig_41>) {
    this.config = {
      spatialId: 41,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_42 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_42 {
  private config: SpatialConfig_42;

  constructor(config?: Partial<SpatialConfig_42>) {
    this.config = {
      spatialId: 42,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_43 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_43 {
  private config: SpatialConfig_43;

  constructor(config?: Partial<SpatialConfig_43>) {
    this.config = {
      spatialId: 43,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_44 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_44 {
  private config: SpatialConfig_44;

  constructor(config?: Partial<SpatialConfig_44>) {
    this.config = {
      spatialId: 44,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_45 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_45 {
  private config: SpatialConfig_45;

  constructor(config?: Partial<SpatialConfig_45>) {
    this.config = {
      spatialId: 45,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_46 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_46 {
  private config: SpatialConfig_46;

  constructor(config?: Partial<SpatialConfig_46>) {
    this.config = {
      spatialId: 46,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_47 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_47 {
  private config: SpatialConfig_47;

  constructor(config?: Partial<SpatialConfig_47>) {
    this.config = {
      spatialId: 47,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_48 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_48 {
  private config: SpatialConfig_48;

  constructor(config?: Partial<SpatialConfig_48>) {
    this.config = {
      spatialId: 48,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_49 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_49 {
  private config: SpatialConfig_49;

  constructor(config?: Partial<SpatialConfig_49>) {
    this.config = {
      spatialId: 49,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_50 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_50 {
  private config: SpatialConfig_50;

  constructor(config?: Partial<SpatialConfig_50>) {
    this.config = {
      spatialId: 50,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_51 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_51 {
  private config: SpatialConfig_51;

  constructor(config?: Partial<SpatialConfig_51>) {
    this.config = {
      spatialId: 51,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_52 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_52 {
  private config: SpatialConfig_52;

  constructor(config?: Partial<SpatialConfig_52>) {
    this.config = {
      spatialId: 52,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_53 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_53 {
  private config: SpatialConfig_53;

  constructor(config?: Partial<SpatialConfig_53>) {
    this.config = {
      spatialId: 53,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_54 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_54 {
  private config: SpatialConfig_54;

  constructor(config?: Partial<SpatialConfig_54>) {
    this.config = {
      spatialId: 54,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_55 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_55 {
  private config: SpatialConfig_55;

  constructor(config?: Partial<SpatialConfig_55>) {
    this.config = {
      spatialId: 55,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_56 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_56 {
  private config: SpatialConfig_56;

  constructor(config?: Partial<SpatialConfig_56>) {
    this.config = {
      spatialId: 56,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_57 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_57 {
  private config: SpatialConfig_57;

  constructor(config?: Partial<SpatialConfig_57>) {
    this.config = {
      spatialId: 57,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_58 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_58 {
  private config: SpatialConfig_58;

  constructor(config?: Partial<SpatialConfig_58>) {
    this.config = {
      spatialId: 58,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_59 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_59 {
  private config: SpatialConfig_59;

  constructor(config?: Partial<SpatialConfig_59>) {
    this.config = {
      spatialId: 59,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_60 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_60 {
  private config: SpatialConfig_60;

  constructor(config?: Partial<SpatialConfig_60>) {
    this.config = {
      spatialId: 60,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_61 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_61 {
  private config: SpatialConfig_61;

  constructor(config?: Partial<SpatialConfig_61>) {
    this.config = {
      spatialId: 61,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_62 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_62 {
  private config: SpatialConfig_62;

  constructor(config?: Partial<SpatialConfig_62>) {
    this.config = {
      spatialId: 62,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_63 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_63 {
  private config: SpatialConfig_63;

  constructor(config?: Partial<SpatialConfig_63>) {
    this.config = {
      spatialId: 63,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_64 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_64 {
  private config: SpatialConfig_64;

  constructor(config?: Partial<SpatialConfig_64>) {
    this.config = {
      spatialId: 64,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_65 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_65 {
  private config: SpatialConfig_65;

  constructor(config?: Partial<SpatialConfig_65>) {
    this.config = {
      spatialId: 65,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_66 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_66 {
  private config: SpatialConfig_66;

  constructor(config?: Partial<SpatialConfig_66>) {
    this.config = {
      spatialId: 66,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_67 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_67 {
  private config: SpatialConfig_67;

  constructor(config?: Partial<SpatialConfig_67>) {
    this.config = {
      spatialId: 67,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_68 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_68 {
  private config: SpatialConfig_68;

  constructor(config?: Partial<SpatialConfig_68>) {
    this.config = {
      spatialId: 68,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}

export interface SpatialConfig_69 {
  spatialId: number;
  earthRadiusKm: number;
  distanceMetric: 'haversine' | 'euclidean' | 'vincenty';
}

export class SpatialAnalyzer_69 {
  private config: SpatialConfig_69;

  constructor(config?: Partial<SpatialConfig_69>) {
    this.config = {
      spatialId: 69,
      earthRadiusKm: config?.earthRadiusKm ?? 6371,
      distanceMetric: config?.distanceMetric ?? 'haversine',
    };
  }

  public computeDistance(p1: GeoCoordinate, p2: GeoCoordinate): number {
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLng = (p2.longitude - p1.longitude) * Math.PI / 180;
    const lat1 = p1.latitude * Math.PI / 180;
    const lat2 = p2.latitude * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.config.earthRadiusKm * c;
  }
}
