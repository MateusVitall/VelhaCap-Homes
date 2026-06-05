import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Edit, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { deleteProperty, formatBRL, getMyProperties } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/painel/imoveis")({
  component: MyProperties,
});

function MyProperties() {
  const { user } = useAuth();
  const [, setBump] = useState(0);
  const navigate = useNavigate();
  if (!user) return null;
  const props = getMyProperties(user.id);

  const onDelete = (id: string) => {
    if (!confirm("Excluir este imóvel? Esta ação não pode ser desfeita.")) return;
    deleteProperty(id);
    toast.success("Imóvel excluído.");
    setBump((n) => n + 1);
  };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Catálogo</span>
          <h1 className="font-display text-4xl mt-1">Meus imóveis</h1>
        </div>
        <Link to="/painel/novo">
          <Button className="gap-2"><Plus className="h-4 w-4" /> Adicionar</Button>
        </Link>
      </div>

      {props.length === 0 ? (
        <div className="mt-10 rounded-xl border border-dashed border-border p-16 text-center">
          <h2 className="font-display text-2xl">Nenhum imóvel ainda</h2>
          <p className="mt-2 text-sm text-muted-foreground">Cadastre seu primeiro anúncio agora.</p>
          <Link to="/painel/novo"><Button className="mt-5">Cadastrar imóvel</Button></Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-4">
          {props.map((p) => (
            <div key={p.id} className="rounded-xl border border-border bg-card overflow-hidden grid gap-4 sm:grid-cols-[200px_1fr_auto] items-center p-4">
              <img src={p.images[0]} alt={p.title} className="h-32 w-full sm:w-[200px] object-cover rounded-md" />
              <div className="min-w-0">
                <h3 className="font-display text-xl truncate">{p.title}</h3>
                <div className="text-sm text-muted-foreground">{p.neighborhood} · {p.bedrooms} quartos · {p.bathrooms} banh.</div>
                <div className="mt-2 font-display text-xl text-primary">{formatBRL(p.price)} <span className="text-xs text-muted-foreground font-sans">/ mês</span></div>
              </div>
              <div className="flex gap-2 sm:flex-col">
                <Button variant="outline" size="sm" className="gap-1.5" onClick={() => navigate({ to: "/painel/editar/$id", params: { id: p.id } })}>
                  <Edit className="h-3.5 w-3.5" /> Editar
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5 text-destructive hover:text-destructive" onClick={() => onDelete(p.id)}>
                  <Trash2 className="h-3.5 w-3.5" /> Excluir
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
