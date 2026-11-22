import Dashboard from "@/components/Dashboard";
import InstallButton from "@/components/InstallButton";

export default function Home() {
  return (
    <main className="mx-auto min-h-dvh w-full max-w-5xl px-4 pb-10 pt-[max(1rem,env(safe-area-inset-top))]">
      <header className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black tracking-tight text-white">
            Safe<span className="text-orange-400">Cell</span>
          </h1>
          <p className="text-xs text-slate-400">배터리 열폭주 조기경보</p>
        </div>
        <InstallButton />
      </header>
      <Dashboard />
    </main>
  );
}
