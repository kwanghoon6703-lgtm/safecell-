"use client";

import { useEffect, useState } from "react";
import { SENSORS, levelOf, riskScore, type Level, type SensorKey } from "@/lib/sensors";

type Values = Record<SensorKey, number>;

const initial = Object.fromEntries(SENSORS.map((s) => [s.key, s.base])) as Values;

const levelStyle: Record<Level, string> = {
  safe: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
  warn: "bg-amber-500/15 text-amber-300 ring-amber-500/30",
  danger: "bg-red-500/20 text-red-300 ring-red-500/40",
};
const levelText: Record<Level, string> = { safe: "정상", warn: "주의", danger: "위험" };

function format(v: number, unit: string) {
  return `${unit === "V" ? v.toFixed(2) : v.toFixed(1)}${unit}`;
}

export default function Dashboard() {
  const [values, setValues] = useState<Values>(initial);
  const [history, setHistory] = useState<number[]>([]);

  useEffect(() => {
    const id = setInterval(() => {
      setValues(() => {
        const next = Object.fromEntries(
          SENSORS.map((s) => [s.key, s.base + (Math.random() * 2 - 1) * s.jitter]),
        ) as Values;
        setHistory((h) => [...h.slice(-29), riskScore(next)]);
        return next;
      });
    }, 1500);
    return () => clearInterval(id);
  }, []);

  const score = riskScore(values);
  const overall: Level = score >= 80 ? "danger" : score >= 50 ? "warn" : "safe";

  return (
    <div className="space-y-4">
      <section className="rounded-3xl bg-slate-900 p-5 ring-1 ring-white/10">
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-400">B2 충전구역 · 1번 충전기</p>
          <span className={`rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${levelStyle[overall]}`}>
            {levelText[overall]}
          </span>
        </div>
        <p className="mt-3 text-5xl font-black tabular-nums text-white">
          {score}
          <span className="ml-1 text-lg font-semibold text-slate-400">/ 100</span>
        </p>
        <p className="mt-1 text-sm text-slate-400">열폭주 위험 점수</p>
        <svg viewBox="0 0 300 60" className="mt-4 h-14 w-full" aria-label="최근 위험 점수 추이">
          <polyline
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinejoin="round"
            className="text-orange-400"
            points={history.map((v, i) => `${(i / 29) * 300},${60 - (v / 100) * 56 - 2}`).join(" ")}
          />
        </svg>
      </section>

      <section className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
        {SENSORS.map((s) => {
          const v = values[s.key];
          const lv = levelOf(s, v);
          return (
            <div key={s.key} className="rounded-2xl bg-slate-900 p-4 ring-1 ring-white/10">
              <p className="text-xs text-slate-400">{s.label}</p>
              <p className="mt-1 text-2xl font-bold tabular-nums text-white">{format(v, s.unit)}</p>
              <span className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ${levelStyle[lv]}`}>
                {levelText[lv]}
              </span>
            </div>
          );
        })}
      </section>

      <section className="rounded-2xl bg-slate-900 p-4 ring-1 ring-white/10">
        <h2 className="text-sm font-semibold text-white">119 자동 연동</h2>
        <p className="mt-1 text-sm text-slate-400">
          위험 점수가 <strong className="font-bold text-red-400">80을 넘으면</strong> 관리자와 119에 위치·센서값을 함께 보냅니다.
        </p>
      </section>

      <p className="text-center text-[11px] text-slate-500">화면의 센서값은 데모용 데이터입니다.</p>
    </div>
  );
}
