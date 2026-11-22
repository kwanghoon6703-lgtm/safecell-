export default function Offline() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <h1 className="text-2xl font-bold text-white">인터넷 연결이 끊겼어요</h1>
      <p className="mt-2 text-sm text-slate-400">연결되면 센서 화면이 다시 열립니다.</p>
    </main>
  );
}
