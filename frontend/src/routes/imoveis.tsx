import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PropertyCard } from "@/components/PropertyCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getProperties } from "@/lib/store";

type Search = { q?: string };

export const Route = createFileRoute("/imoveis")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    q: typeof s.q === "string" ? s.q : undefined,
  }),
  head: () => ({ meta: [{ title: "Imóveis para alugar em Oeiras-PI — CasaOeiras" }] }),
  component: ListingPage,
});

function ListingPage() {
  const { q: initialQ } = Route.useSearch();
  const [q, setQ] = useState(initialQ ?? "");
  const [minRooms, setMinRooms] = useState(0);
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  const properties = useMemo(() => {
    const list = getProperties();
    return list.filter((p) => {
      if (q) {
        const t = `${p.title} ${p.neighborhood} ${p.description}`.toLowerCase();
        if (!t.includes(q.toLowerCase())) return false;
      }
      if (p.bedrooms < minRooms) return false;
      if (maxPrice !== "" && p.price > Number(maxPrice)) return false;
      return true;
    });
  }, [q, minRooms, maxPrice]);

  return (
    <SiteLayout>
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Catálogo</span>
          <h1 className="font-display text-4xl md:text-5xl mt-2">Imóveis disponíveis em Oeiras</h1>

          <div className="mt-7 grid gap-3 md:grid-cols-[1fr_auto_auto_auto]">
            <div className="flex items-center gap-2 rounded-md border border-border bg-background px-3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Bairro, tipo, palavra-chave…"
                className="border-0 shadow-none focus-visible:ring-0 px-0"
              />
            </div>
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
            <Button variant="outline" onClick={() => { setQ(""); setMinRooms(0); setMaxPrice(""); }} className="gap-2">
              <SlidersHorizontal className="h-4 w-4" /> Limpar
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="mb-6 text-sm text-muted-foreground">
          {properties.length} {properties.length === 1 ? "imóvel encontrado" : "imóveis encontrados"}
        </div>
        {properties.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-16 text-center">
            <p className="font-display text-2xl">Nenhum imóvel encontrado</p>
            <p className="mt-2 text-sm text-muted-foreground">Tente ajustar os filtros.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((p) => <PropertyCard key={p.id} property={p} />)}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
