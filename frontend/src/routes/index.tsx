import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Building2, Search, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getProperties } from "@/lib/store";
import heroImg from "@/assets/hero-oeiras.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CasaOeiras — Aluguel de imóveis em Oeiras-PI" },
      { name: "description", content: "A plataforma para alugar casas e apartamentos em Oeiras, Piauí. Anúncios verificados e contato direto com o proprietário." },
      { property: "og:title", content: "CasaOeiras — Imóveis para alugar em Oeiras-PI" },
      { property: "og:description", content: "Encontre seu próximo lar na primeira capital do Piauí." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const properties = getProperties().slice(0, 6);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/imoveis", search: { q } as never });
  };

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={heroImg} alt="Casarão histórico em Oeiras-PI ao pôr do sol" className="h-full w-full object-cover" width={1600} height={1100} />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary/65 to-foreground/40" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20 md:py-32 text-primary-foreground">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 bg-background/10 px-3 py-1 text-xs uppercase tracking-[0.2em] backdrop-blur">
            <Sparkles className="h-3 w-3" /> Oeiras-PI · primeira capital
          </span>
          <h1 className="mt-5 font-display text-5xl md:text-7xl leading-[1.05] max-w-3xl">
            Seu próximo lar
            <span className="italic text-accent"> à beira</span> da história.
          </h1>
          <p className="mt-5 max-w-xl text-base md:text-lg text-primary-foreground/85 leading-relaxed">
            Conectamos famílias e proprietários em Oeiras. Anúncios verificados, contato direto,
            sem intermediários complicados.
          </p>

          <form onSubmit={onSearch} className="mt-9 flex max-w-xl gap-2 rounded-xl bg-background p-2 shadow-2xl">
            <div className="flex flex-1 items-center gap-2 px-3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar por bairro, tipo de imóvel…"
                className="border-0 shadow-none focus-visible:ring-0 px-0 text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <Button type="submit" size="lg" className="gap-2">
              Buscar <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <div className="mt-10 flex flex-wrap gap-6 text-sm">
            <Stat n="120+" label="Imóveis ativos" />
            <Stat n="14" label="Bairros cobertos" />
            <Stat n="100%" label="Contato direto" />
          </div>
        </div>
      </section>

      {/* DESTAQUES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
        <div className="flex items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Em destaque</span>
            <h2 className="font-display text-4xl md:text-5xl mt-2">Imóveis para alugar agora</h2>
          </div>
          <Link to="/imoveis">
            <Button variant="outline" className="gap-2 hidden sm:inline-flex">
              Ver todos <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((p) => <PropertyCard key={p.id} property={p} />)}
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="bg-secondary/50 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Como funciona</span>
            <h2 className="font-display text-4xl md:text-5xl mt-2">Simples para quem aluga, fácil para quem anuncia</h2>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            <Step n="01" icon={<Search className="h-5 w-5" />} title="Encontre">
              Pesquise por bairro, número de quartos ou preço. Filtros simples e resultados rápidos.
            </Step>
            <Step n="02" icon={<Building2 className="h-5 w-5" />} title="Visite & escolha">
              Veja fotos, descrições completas e fale direto com o proprietário, sem corretagem.
            </Step>
            <Step n="03" icon={<ShieldCheck className="h-5 w-5" />} title="Anuncie grátis">
              É proprietário? Cadastre seu imóvel em minutos e alcance interessados locais.
            </Step>
          </div>

          <div className="mt-12 flex justify-center">
            <Link to="/cadastro">
              <Button size="lg" className="gap-2">
                Anunciar meu imóvel <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl">{n}</div>
      <div className="text-xs uppercase tracking-wider text-primary-foreground/70">{label}</div>
    </div>
  );
}

function Step({ n, icon, title, children }: { n: string; icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-7">
      <div className="flex items-center justify-between">
        <span className="grid h-10 w-10 place-items-center rounded-md bg-primary/10 text-primary">{icon}</span>
        <span className="font-display text-3xl text-muted-foreground/60">{n}</span>
      </div>
      <h3 className="mt-5 font-display text-2xl">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{children}</p>
    </div>
  );
}
