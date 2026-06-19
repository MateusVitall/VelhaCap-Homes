import { Link, useNavigate } from "@tanstack/react-router";
import { Home, LogOut, Menu, User as UserIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth, emitAuthChange } from "@/hooks/use-auth";

export function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("oeiras_user");

    emitAuthChange();

    navigate({ to: "/" });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground transition-transform group-hover:scale-105">
            <Home className="h-4.5 w-4.5" strokeWidth={2.2} />
          </span>
          <div className="leading-tight">
            <div className="font-display text-xl">
              Casa<span className="text-primary">Oeiras</span>
            </div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground -mt-0.5">
              Imóveis · Piauí
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm">
          <Link
            to="/"
            className="text-foreground/70 hover:text-foreground transition-colors"
            activeOptions={{ exact: true }}
            activeProps={{ className: "text-foreground" }}
          >
            Início
          </Link>
          <Link
            to="/imoveis"
            className="text-foreground/70 hover:text-foreground transition-colors"
            activeProps={{ className: "text-foreground" }}
          >
            Imóveis
          </Link>
          {user && (
            <Link
              to="/painel"
              className="text-foreground/70 hover:text-foreground transition-colors"
              activeProps={{ className: "text-foreground" }}
            >
              Meu painel
            </Link>
          )}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <>
              <Link to="/painel">
                <Button variant="ghost" size="sm" className="gap-2">
                  <UserIcon className="h-4 w-4" />
                  {user.name.split(" ")[0]}
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
                <LogOut className="h-4 w-4" /> Sair
              </Button>
            </>
          ) : (
            <>
              <Link to="/entrar">
                <Button variant="ghost" size="sm">
                  Entrar
                </Button>
              </Link>
              <Link to="/cadastro">
                <Button size="sm">Cadastrar</Button>
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-border"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menu"
        >
          <Menu className="h-4 w-4" />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-1">
            <Link to="/" onClick={() => setOpen(false)} className="py-2">
              Início
            </Link>
            <Link to="/imoveis" onClick={() => setOpen(false)} className="py-2">
              Imóveis
            </Link>
            {user && (
              <Link to="/painel" onClick={() => setOpen(false)} className="py-2">
                Meu painel
              </Link>
            )}
            <div className="mt-2 flex gap-2">
              {user ? (
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                >
                  Sair
                </Button>
              ) : (
                <>
                  <Link to="/entrar" className="flex-1" onClick={() => setOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Entrar
                    </Button>
                  </Link>
                  <Link to="/cadastro" className="flex-1" onClick={() => setOpen(false)}>
                    <Button className="w-full">Cadastrar</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
