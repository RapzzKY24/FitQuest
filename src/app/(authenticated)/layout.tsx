import { Sidebar } from "@/src/components/ui/Sidebar";

export default function AutheticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div className="flex gap-10">
        <Sidebar />
        {children}
      </div>
    </main>
  );
}
