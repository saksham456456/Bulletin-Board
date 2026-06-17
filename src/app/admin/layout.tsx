export const metadata = {
  title: 'Admin Panel | SAKSHAM.DEV',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-base text-primary font-sans flex">
      {/* Sidebar */}
      <aside className="w-[180px] bg-surface border-r border-border flex flex-col fixed inset-y-0 left-0 z-20">
        <div className="p-6">
          <div className="font-display font-bold text-accent-cork tracking-tight">SAKSHAM.DEV</div>
          <div className="text-secondary text-sm mb-6">Admin Panel</div>
          <hr className="border-border mb-6" />
          
          <nav className="flex flex-col gap-2">
            <div className="flex items-center justify-between px-3 py-2 rounded bg-elevated text-primary font-medium text-sm">
              <span className="flex items-center gap-2">📌 Notices</span>
            </div>
          </nav>
        </div>
        
        <div className="mt-auto p-6 text-xs text-muted">
          <hr className="border-border mb-4" />
          Logged in as Admin
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-[180px] relative min-h-screen overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
