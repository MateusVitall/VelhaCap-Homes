import { createFileRoute, Link } from "@tanstack/react-router";
import { Building, ListPlus, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/lib/config";
import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/painel/")({
  head: () => ({ meta: [{ title: "Painel — VelhaCap-homes" }] }),
  component: DashboardHome,
});

function DashboardHome() {
  const { user } = useAuth();

  const [stats, setStats] = useState({ totalImoveis: 0, totalViews: 0, totalContatos: 0 });

  useEffect(() => {
    async function carregarResumo() {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${API_URL}/imoveis/stats`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao carregar estatísticas");
        }

        const data = await response.json();

        setStats(data);
      } catch (error) {
        console.error(error);
      }
    }

    carregarResumo();
  }, []);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Painel</span>

          <h1 className="font-display text-4xl mt-1">Olá, {user?.name.split(" ")[0]}.</h1>
        </div>

        <Link to="/painel/novo">
          <Button className="gap-2">
            <ListPlus className="h-4 w-4" />
            Novo imóvel
          </Button>
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Card
          icon={<Building className="h-5 w-5" />}
          label="Imóveis ativos"
          value={String(stats.totalImoveis)}
        />

        <Card
          icon={<TrendingUp className="h-5 w-5" />}
          label="Visualizações"
          value={String(stats.totalViews)}
        />

        <Card
          icon={<ListPlus className="h-5 w-5" />}
          label="Contatos recebidos"
          value={String(stats.totalContatos)}
        />
      </div>

      <div className="mt-10 rounded-xl border border-border bg-card p-8">
        <h2 className="font-display text-2xl">Comece por aqui</h2>

        <p className="mt-2 text-sm text-muted-foreground max-w-lg">
          Cadastre seu primeiro imóvel para começar a receber interessados. É grátis e leva poucos
          minutos.
        </p>

        <div className="mt-5 flex gap-3">
          <Link to="/painel/novo">
            <Button>Cadastrar imóvel</Button>
          </Link>

          <Link to="/painel/imoveis">
            <Button variant="outline">Ver meus imóveis</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function Card({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <span className="grid h-9 w-9 place-items-center rounded-md bg-primary/10 text-primary">
          {icon}
        </span>
      </div>

      <div className="mt-4 font-display text-3xl">{value}</div>

      <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{label}</div>
    </div>
  );
}
