import { createFileRoute, Outlet } from "@tanstack/react-router";

function AgentsLayout() {
  return (
    <div className="flex min-h-screen">
      <main className="flex-1 bg-background">
        <div className="max-w-7xl mx-auto py-8 px-4">
          <nav className="mb-4 text-sm text-muted-foreground">
            <span>Agents</span>
          </nav>
          <div className="mb-4 p-2 bg-green-100 text-green-800 rounded text-xs">
            Sidebar and breadcrumb are active (Agents layout)
          </div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export const Route = createFileRoute("/agents/_layout")({
  component: AgentsLayout,
});
