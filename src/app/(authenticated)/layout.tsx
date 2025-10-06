import { Header } from "@/components";

function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="p-4">
        {children}
      </main>
    </div>
  );
}

export default AuthenticatedLayout;