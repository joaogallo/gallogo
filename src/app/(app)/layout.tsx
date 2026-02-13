import { Header } from "@/components/layout/Header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col bg-surface">
      <Header />
      <main className="min-h-0 flex-1">{children}</main>
    </div>
  );
}
