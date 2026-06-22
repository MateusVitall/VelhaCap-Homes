import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PropertyCard } from "@/components/PropertyCard";
import { Input } from "@/components/ui/input";
import { API_URL } from "@/lib/config";
import { Button } from "@/components/ui/button";

type SearchParams = {
  q?: string;
};

type Property = {
  id: string;
  titulo: string;
  descricao: string;
  preco: number;
  cidade: string;
  bairro: string;
  tipo: string;
  quartos: number;
  banheiros: number;
  garagem: boolean;
  disponivel?: boolean;
  imagens?: string[];
};

export const Route = createFileRoute("/imoveis/")({
  head: () => ({ meta: [{ title: "Imóveis — CasaOeiras" }] }),
  validateSearch: (s: Record<string, unknown>): SearchParams => ({
    q: typeof s.q === "string" ? s.q : undefined,
  }),
  component: ListingPage,
});

function ListingPage() {
  const { q: initialQ } = Route.useSearch();

  const [q, setQ] = useState(initialQ ?? "");
  const [tipoFilter, setTipoFilter] = useState("");
  const [minRooms, setMinRooms] = useState(0);
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProperties() {
      try {
        const response = await fetch(`${API_URL}/imoveis`);
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadProperties();
  }, []);

  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      if (q) {
        const text = `${p.titulo} ${p.bairro} ${p.descricao}`.toLowerCase();

        if (!text.includes(q.toLowerCase())) {
          return false;
        }
      }

      if (tipoFilter && p.tipo !== tipoFilter) {
        return false;
      }

      if (p.quartos < minRooms) {
        return false;
      }

      if (maxPrice !== "" && p.preco > Number(maxPrice)) {
        return false;
      }

      return true;
    });
  }, [properties, q, tipoFilter, minRooms, maxPrice]);

  console.log("Primeiro imóvel:", filteredProperties[0]);
  return (
    <SiteLayout>
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Catálogo</span>

          <h1 className="font-display text-4xl md:text-5xl mt-2">Imóveis disponíveis em Oeiras</h1>

          <div className="mt-7 grid gap-3 md:grid-cols-[1fr_auto_auto_auto_auto]">
            <div className="flex items-center gap-2 rounded-md border border-border bg-background px-3">
              <Search className="h-4 w-4 text-muted-foreground" />

              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Bairro, palavra-chave..."
                className="border-0 shadow-none focus-visible:ring-0 px-0"
              />
            </div>

            <select
              value={tipoFilter}
              onChange={(e) => setTipoFilter(e.target.value)}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm"
            >
              <option value="">Tipo: todos</option>
              <option value="Casa">Casa</option>
              <option value="Apartamento">Apartamento</option>
              <option value="Kitnet">Kitnet</option>
              <option value="Sobrado">Sobrado</option>
              <option value="Sala Comercial">Sala Comercial</option>
            </select>

            <select
              value={minRooms}
              onChange={(e) => setMinRooms(Number(e.target.value))}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm"
            >
              <option value={0}>Quartos: qualquer</option>
              <option value={1}>1+ quartos</option>
              <option value={2}>2+ quartos</option>
              <option value={3}>3+ quartos</option>
              <option value={4}>4+ quartos</option>
            </select>

            <Input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))}
              placeholder="Preço máx (R$)"
              className="md:w-44"
            />

            <Button
              variant="outline"
              className="gap-2"
              onClick={() => {
                setQ("");
                setTipoFilter("");
                setMinRooms(0);
                setMaxPrice("");
              }}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Limpar
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        {loading ? (
          <div className="text-center">Carregando imóveis...</div>
        ) : (
          <>
            <div className="mb-6 text-sm text-muted-foreground">
              {filteredProperties.length}{" "}
              {filteredProperties.length === 1 ? "imóvel encontrado" : "imóveis encontrados"}
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProperties.map((p) => (
                <PropertyCard
                  key={p.id}
                  property={{
                    id: p.id,
                    titulo: p.titulo,
                    preco: p.preco,
                    cidade: p.cidade,
                    bairro: p.bairro,
                    tipo: p.tipo ?? "Casa",
                    quartos: p.quartos,
                    banheiros: p.banheiros,
                    garagem: p.garagem,
                    imagens: p.imagens ?? [],
                  }}
                />
              ))}
            </div>
          </>
        )}
      </section>
    </SiteLayout>
  );
}
