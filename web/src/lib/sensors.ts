// 센서 목록과 경보 기준. 실제 장비 사양이 정해지면 이 파일만 바꾸면 됩니다.
export type SensorKey = "temp" | "gas" | "smoke" | "voltage" | "humidity";

export interface SensorDef {
  key: SensorKey;
  label: string;
  unit: string;
  base: number;
  jitter: number;
  warn: number;
  danger: number;
}

export const SENSORS: SensorDef[] = [
  { key: "temp", label: "배터리 온도", unit: "°C", base: 31, jitter: 1.5, warn: 45, danger: 60 },
  { key: "gas", label: "가스(VOC)", unit: "ppm", base: 12, jitter: 3, warn: 50, danger: 120 },
  { key: "smoke", label: "연기", unit: "%", base: 2, jitter: 1, warn: 10, danger: 25 },
  { key: "voltage", label: "셀 전압", unit: "V", base: 3.7, jitter: 0.03, warn: 4.25, danger: 4.4 },
  { key: "humidity", label: "습도", unit: "%", base: 48, jitter: 2, warn: 80, danger: 92 },
];

export type Level = "safe" | "warn" | "danger";

export function levelOf(def: SensorDef, value: number): Level {
  if (value >= def.danger) return "danger";
  if (value >= def.warn) return "warn";
  return "safe";
}

/** 0~100 위험 점수: 각 센서가 경고선에 얼마나 가까운지의 최댓값 */
export function riskScore(values: Record<SensorKey, number>): number {
  const scores = SENSORS.map((d) => {
    const v = values[d.key];
    return Math.max(0, Math.min(1, (v - d.base) / (d.danger - d.base)));
  });
  return Math.round(Math.max(...scores) * 100);
}
