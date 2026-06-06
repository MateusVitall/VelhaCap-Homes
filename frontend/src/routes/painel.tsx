import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { Home, LayoutDashboard, ListPlus, LogOut, Building } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useAuth, emitAuthChange } from "@/hooks/use-auth";
import { logoutUser } from "@/lib/store";

export const Route = createFileRoute("/painel")({
  head: () => ({ meta: [{ title: "Meu painel — CasaOeiras" }] }),
  component: DashboardLayout,
});

function DashboardLayout() {
  const { user, ready } = useAuth();

  console.log("PAINEL USER:", user);
  console.log("PAINEL READY:", ready);

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
    logoutUser();
    emitAuthChange();
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 py-8 flex-1 grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl bg-sidebar text-sidebar-foreground p-5">
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
  );
}
