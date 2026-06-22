import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Edit, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { API_URL } from "@/lib/config";
import { toast } from "sonner";

export const Route = createFileRoute("/painel/imoveis")({
  head: () => ({ meta: [{ title: "Meus Imóveis — CasaOeiras" }] }),
  component: MyProperties,
});

type Imovel = {
  id: string;
  titulo: string;
  preco: number;
  bairro: string;
  tipo: string;
  quartos: number;
  banheiros: number;
  disponivel: boolean;
  imagens: string[];
};

function formatBRL(valor: number) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function MyProperties() {
  const navigate = useNavigate();

  const [imoveis, setImoveis] = useState<Imovel[]>([]);
  const [loading, setLoading] = useState(true);

  async function carregarImoveis() {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/imoveis/meus-imoveis`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      setImoveis(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarImoveis();
  }, []);

  async function onDelete(id: string) {
    if (!confirm("Excluir este imóvel?")) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/imoveis/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error();
      }

      setImoveis((prev) => prev.filter((item) => item.id !== id));

      toast.success("Imóvel excluído");
    } catch {
      toast.error("Erro ao excluir imóvel");
    }
  }

  async function onToggle(id: string, current: boolean) {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/imoveis/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ disponivel: !current }),
      });

      if (!response.ok) {
        throw new Error();
      }

      setImoveis((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, disponivel: !current } : item
        )
      );

      toast.success(!current ? "Imóvel disponibilizado" : "Imóvel indisibilizado");
    } catch {
      toast.error("Erro ao alterar status");
    }
  }

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Catálogo</span>
          <h1 className="font-display text-4xl mt-1">Meus imóveis</h1>
        </div>

        <Link to="/painel/novo">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Adicionar
          </Button>
        </Link>
      </div>

      {imoveis.length === 0 ? (
        <div className="mt-10 rounded-xl border border-dashed border-border p-16 text-center">
          <h2 className="font-display text-2xl">Nenhum imóvel ainda</h2>
        </div>
      ) : (
        <div className="mt-8 grid gap-4">
          {imoveis.map((p) => (
            <div
              key={p.id}
              className={`overflow-hidden rounded-xl border border-border bg-card ${
                !p.disponivel ? "opacity-60" : ""
              }`}
            >
              <div className="relative">
                <img
                  src={
                    p.imagens?.length > 0
                      ? p.imagens[0]
                      : "https://placehold.co/800x600?text=Sem+Imagem"
                  }
                  alt={p.titulo}
                  className="h-56 w-full object-cover"
                />
                {!p.disponivel && (
                  <span className="absolute right-3 top-3 rounded-full bg-destructive/90 px-3 py-1 text-xs font-medium text-destructive-foreground">
                    Indisponível
                  </span>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-display text-xl">{p.titulo}</h3>

                <div className="text-sm text-muted-foreground">
                  {p.tipo} · {p.bairro} · {p.quartos} quartos · {p.banheiros} banheiros
                </div>

                <div className="mt-2 font-display text-xl text-primary">{formatBRL(p.preco)}</div>

                <div className="mt-4 flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={p.disponivel}
                      onCheckedChange={() => onToggle(p.id, p.disponivel)}
                    />
                    <span className="text-sm text-muted-foreground">
                      {p.disponivel ? "Disponível" : "Indisponível"}
                    </span>
                  </div>

                  <div className="ml-auto flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        navigate({
                          to: "/painel/editar/$id",
                          params: { id: p.id },
                        })
                      }
                    >
                      <Edit className="mr-1 h-4 w-4" />
                      Editar
                    </Button>

                    <Button variant="outline" size="sm" onClick={() => onDelete(p.id)}>
                      <Trash2 className="mr-1 h-4 w-4" />
                      Excluir
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
