# SafeCell 웹앱

전기차 충전소·지하주차장 배터리 열폭주 조기경보 대시보드입니다.

| 항목 | 결정 |
|---|---|
| 프레임워크 | Next.js 15 (App Router) + TypeScript + Tailwind CSS 4 |
| 주 사용자 | 개발자 |
| 데이터베이스 | 없음 |
| 로그인 | 없음 |
| 필수 조건 | PWA(홈 화면에 설치) · 모바일 화면 우선 |

## 실행

```bash
cd web
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # 서비스 워커는 production에서만 켜집니다
```

## 구조

| 경로 | 역할 |
|---|---|
| `src/app/page.tsx` | 첫 화면 (위험 점수 + 센서 5종 카드) |
| `src/lib/sensors.ts` | 센서 목록·경보 기준값 (장비 사양이 정해지면 여기만 수정) |
| `src/app/manifest.ts` | PWA 설치 정보 |
| `public/sw.js` | 오프라인 캐시 |
| `src/app/offline/page.tsx` | 인터넷이 끊겼을 때 화면 |

화면의 센서값은 데모용으로 1.5초마다 새로 만들어집니다.
