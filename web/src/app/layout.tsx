import type { Metadata, Viewport } from "next";
import RegisterSW from "@/components/RegisterSW";
import "./globals.css";

export const metadata: Metadata = {
  title: "SafeCell | 배터리 열폭주 조기경보",
  description: "전기차 충전소·지하주차장 배터리 열폭주를 미리 알려 주는 멀티센서 AI 경보",
  applicationName: "SafeCell",
  appleWebApp: { capable: true, title: "SafeCell", statusBarStyle: "black-translucent" },
  icons: { icon: "/icons/icon-192.png", apple: "/icons/apple-touch-icon.png" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#020617",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
        <RegisterSW />
      </body>
    </html>
  );
}
