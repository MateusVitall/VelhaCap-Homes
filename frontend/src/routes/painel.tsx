import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Home, LayoutDashboard, ListPlus, LogOut, Building, Menu, X } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useAuth, logout as authLogout } from "@/hooks/use-auth";

export const Route = createFileRoute("/painel")({
  head: () => ({ meta: [{ title: "Meu painel — VelhaCap-homes" }] }),
  component: DashboardLayout,
});

function DashboardLayout() {
  const { user, ready } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (ready && !user) navigate({ to: "/entrar" });
  }, [ready, user, navigate]);

  if (!ready || !user) {
    return (
      <div className="min-h-screen grid place-items-center text-muted-foreground">Carregando…</div>
    );
  }

  const items = [
    { to: "/painel", label: "Visão geral", icon: LayoutDashboard, exact: true },
    { to: "/painel/imoveis", label: "Meus imóveis", icon: Building, exact: false },
    { to: "/painel/novo", label: "Cadastrar imóvel", icon: ListPlus, exact: false },
  ] as const;

  const onLogout = () => {
    authLogout();
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 py-8 flex-1">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden mb-4 inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm"
        >
          <Menu className="h-4 w-4" />
          Menu
        </button>

        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          {sidebarOpen && (
            <div
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          <aside className={`
            fixed inset-y-0 left-0 z-50 w-[280px] bg-sidebar p-5 overflow-y-auto transition-transform duration-200 lg:static lg:translate-x-0 lg:z-auto lg:w-auto lg:self-start lg:rounded-xl lg:p-5
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}>
            <div className="flex items-center justify-between lg:hidden mb-4">
              <span className="text-sm font-medium">Menu</span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-sidebar-accent"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="rounded-xl bg-sidebar-foreground/5 p-0 lg:p-0">
              <div className="text-xs uppercase tracking-[0.2em] text-sidebar-foreground/60">
                Conectado como
              </div>
              <div className="mt-1 font-display text-xl truncate">{user.name}</div>
              <div className="text-xs text-sidebar-foreground/60 truncate">{user.email}</div>

              <nav className="mt-6 space-y-1">
                {items.map((it) => {
                  const active = it.exact ? path === it.to : path.startsWith(it.to);
                  return (
                    <Link
                      key={it.to}
                      to={it.to}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors ${
                        active
                          ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                          : "text-sidebar-foreground/80 hover:bg-sidebar-accent"
                      }`}
                    >
                      <it.icon className="h-4 w-4" />
                      {it.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-6 pt-5 border-t border-sidebar-border space-y-1">
                <Link
                  to="/"
                  className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent"
                >
                  <Home className="h-4 w-4" /> Voltar ao site
                </Link>
                <button
                  onClick={onLogout}
                  className="w-full flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent"
                >
                  <LogOut className="h-4 w-4" /> Sair
                </button>
              </div>
            </div>
          </aside>

          <section className="min-w-0">
            <Outlet />
          </section>
        </div>
      </div>
    </div>
  );
}
