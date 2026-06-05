import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Bath, BedDouble, Car, Mail, MapPin, Phone, User } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { formatBRL, getProperty } from "@/lib/store";

export const Route = createFileRoute("/imoveis/$id")({
  loader: ({ params }) => {
    const property = getProperty(params.id);
    if (!property) throw notFound();
    return { property };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.property.title} — CasaOeiras` : "Imóvel — CasaOeiras" },
      { name: "description", content: loaderData?.property.description.slice(0, 160) },
      { property: "og:image", content: loaderData?.property.images[0] },
    ],
  }),
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-md px-4 py-32 text-center">
        <h1 className="font-display text-4xl">Imóvel não encontrado</h1>
        <Link to="/imoveis"><Button className="mt-6">Ver todos os imóveis</Button></Link>
      </div>
    </SiteLayout>
  ),
  errorComponent: ({ reset }) => (
    <SiteLayout>
      <div className="mx-auto max-w-md px-4 py-32 text-center">
        <h1 className="font-display text-4xl">Algo deu errado</h1>
        <Button className="mt-6" onClick={reset}>Tentar novamente</Button>
      </div>
    </SiteLayout>
  ),
  component: PropertyDetail,
});

function PropertyDetail() {
  const { property } = Route.useLoaderData();
  const [active, setActive] = useState(0);

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <Link to="/imoveis" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Voltar aos imóveis
        </Link>
      </div>

      {/* Gallery */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-3 md:grid-cols-[2fr_1fr]">
          <div className="aspect-[16/11] overflow-hidden rounded-xl bg-muted">
            <img src={property.images[active]} alt={property.title} className="h-full w-full object-cover" />
          </div>
          <div className="grid grid-cols-3 md:grid-cols-1 gap-3">
            {property.images.slice(0, 3).map((src: string, i: number) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`aspect-[4/3] overflow-hidden rounded-lg bg-muted ring-2 transition-all ${
                  active === i ? "ring-primary" : "ring-transparent hover:ring-border"
                }`}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {property.neighborhood} · {property.city}
          </div>
          <h1 className="mt-2 font-display text-4xl md:text-5xl leading-tight">{property.title}</h1>

          <div className="mt-6 flex flex-wrap gap-6 text-sm">
            <Feature icon={<BedDouble className="h-5 w-5" />} label={`${property.bedrooms} quartos`} />
            <Feature icon={<Bath className="h-5 w-5" />} label={`${property.bathrooms} banheiros`} />
            <Feature icon={<Car className="h-5 w-5" />} label={property.garage ? "Com garagem" : "Sem garagem"} />
            <Feature icon={<MapPin className="h-5 w-5" />} label={`${property.neighborhood}, ${property.city}-PI`} />
          </div>

          <div className="mt-10">
            <h2 className="font-display text-2xl">Sobre este imóvel</h2>
            <p className="mt-3 text-foreground/80 leading-relaxed whitespace-pre-line">{property.description}</p>
          </div>
        </div>

        {/* Sidebar contact */}
        <aside className="lg:sticky lg:top-24 self-start">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Aluguel mensal</div>
            <div className="mt-1 font-display text-4xl text-primary">{formatBRL(property.price)}</div>

            <div className="mt-6 pt-6 border-t border-border">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Anunciante</div>
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-primary/10 text-primary">
                  <User className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-medium">{property.ownerName}</div>
                  <div className="text-xs text-muted-foreground">Proprietário verificado</div>
                </div>
              </div>
            </div>

            <a href={`https://wa.me/55${property.ownerPhone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">
              <Button size="lg" className="w-full mt-5 gap-2">
                <Phone className="h-4 w-4" /> Entrar em contato
              </Button>
            </a>
            <a href={`mailto:contato@casaoeiras.com.br?subject=Interesse em ${encodeURIComponent(property.title)}`}>
              <Button size="lg" variant="outline" className="w-full mt-2 gap-2">
                <Mail className="h-4 w-4" /> Enviar e-mail
              </Button>
            </a>
            <p className="mt-3 text-xs text-muted-foreground text-center">{property.ownerPhone}</p>
          </div>
        </aside>
      </section>
    </SiteLayout>
  );
}

function Feature({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 text-foreground/80">
      <span className="text-primary">{icon}</span>
      <span>{label}</span>
    </div>
  );
}
