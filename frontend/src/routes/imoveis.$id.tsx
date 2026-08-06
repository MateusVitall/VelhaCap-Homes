import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  Car,
  ChevronLeft,
  ChevronRight,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";

import { API_URL } from "@/lib/config";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { formatBRL } from "@/lib/utils";

export const Route = createFileRoute("/imoveis/$id")({
  head: () => ({ meta: [{ title: "Detalhes do Imóvel — VelhaCap-homes" }] }),
  component: PropertyDetail,
});

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
  ownerName?: string;
  ownerPhone?: string;
  imagens: string[];
};

function PropertyDetail() {
  const { id } = Route.useParams();

  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(true);
  const [property, setProperty] = useState<Property | null>(null);
  const touchStart = useRef<number | null>(null);
  const touchEnd = useRef<number | null>(null);

  const images =
    property?.imagens?.length > 0
      ? property.imagens
      : ["https://placehold.co/800x600?text=Sem+Imagem"];

  const minSwipeDistance = 50;

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchEnd.current = null;
    touchStart.current = e.targetTouches[0].clientX;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && active < images.length - 1) {
      setActive((prev) => prev + 1);
    }
    if (isRightSwipe && active > 0) {
      setActive((prev) => prev - 1);
    }
  }, [active, images.length]);

  useEffect(() => {
    async function loadProperty() {
      try {
        const response = await fetch(`${API_URL}/imoveis/${id}`);

        if (!response.ok) {
          throw new Error("Imóvel não encontrado");
        }

        const data = await response.json();

        setProperty(data);

        fetch(`${API_URL}/imoveis/${id}/view`, { method: "POST" }).catch(() => {});
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadProperty();
  }, [id]);

  if (loading) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-7xl px-4 py-20 text-center">Carregando imóvel...</div>
      </SiteLayout>
    );
  }

  if (!property) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-7xl px-4 py-20 text-center">
          <h1 className="font-display text-4xl">Imóvel não encontrado</h1>

          <Link to="/imoveis">
            <Button className="mt-6">Ver todos os imóveis</Button>
          </Link>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <Link
          to="/imoveis"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar aos imóveis
        </Link>
      </div>

      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Desktop: Grid layout */}
        <div className="hidden md:grid gap-3 md:grid-cols-[2fr_1fr]">
          <div className="aspect-[16/11] overflow-hidden rounded-xl bg-muted">
            <img
              src={images[active]}
              alt={property.titulo}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {images.slice(0, 3).map((src, i) => (
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

        {/* Mobile: Swipeable carousel */}
        <div className="md:hidden">
          <div
            className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <img
              src={images[active]}
              alt={property.titulo}
              className="h-full w-full object-cover"
            />

            {/* Navigation arrows */}
            {active > 0 && (
              <button
                onClick={() => setActive((prev) => prev - 1)}
                className="absolute left-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/50 text-white flex items-center justify-center"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}
            {active < images.length - 1 && (
              <button
                onClick={() => setActive((prev) => prev + 1)}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/50 text-white flex items-center justify-center"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            )}

            {/* Counter */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
              {active + 1} / {images.length}
            </div>
          </div>

          {/* Thumbnail strip */}
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`flex-shrink-0 w-16 h-16 overflow-hidden rounded-lg ring-2 transition-all ${
                  active === i ? "ring-primary" : "ring-transparent"
                }`}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {property.tipo} · {property.bairro} · {property.cidade}
          </div>

          <h1 className="mt-2 font-display text-4xl md:text-5xl leading-tight">
            {property.titulo}
          </h1>

          <div className="mt-6 flex flex-wrap gap-6 text-sm">
            <Feature
              icon={<BedDouble className="h-5 w-5" />}
              label={`${property.quartos} ${pluralize(property.quartos, "quarto", "quartos")}`}
            />

            <Feature
              icon={<Bath className="h-5 w-5" />}
              label={`${property.banheiros} ${pluralize(property.banheiros, "banheiro", "banheiros")}`}
            />

            <Feature
              icon={<Car className="h-5 w-5" />}
              label={property.garagem ? "Com garagem" : "Sem garagem"}
            />

            <Feature
              icon={<MapPin className="h-5 w-5" />}
              label={`${property.bairro}, ${property.cidade}-PI`}
            />
          </div>

          <div className="mt-10">
            <h2 className="font-display text-2xl">Sobre este imóvel</h2>

            <p className="mt-3 text-foreground/80 leading-relaxed whitespace-pre-line">
              {property.descricao}
            </p>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 self-start">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Aluguel mensal
            </div>

            <div className="mt-1 font-display text-4xl text-primary">
              {formatBRL(property.preco)}
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
                Anunciante
              </div>

              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-primary/10 text-primary">
                  <User className="h-5 w-5" />
                </span>

                <div>
                  <div className="font-medium">{property.ownerName || "Proprietário"}</div>

                  <div className="text-xs text-muted-foreground">Proprietário verificado</div>
                </div>
              </div>
            </div>

            {property.ownerPhone && (
              <>
                <Button
                  size="lg"
                  className="w-full mt-5 gap-2"
                  onClick={() => {
                    fetch(`${API_URL}/imoveis/${id}/contato`, { method: "POST" }).catch(() => {});
                    const digits = property.ownerPhone!.replace(/\D/g, "");
                    if (digits.length >= 10 && digits.length <= 13) {
                      const msg = encodeURIComponent(
                        `Olá ${property.ownerName || "proprietário"}, Vi seu anúncio no VelhaCap Homes e fiquei interessado!`,
                      );
                      window.open(`https://wa.me/55${digits}?text=${msg}`, "_blank", "noreferrer");
                    }
                  }}
                >
                  <Phone className="h-4 w-4" />
                  Entrar em contato
                </Button>

                <p className="mt-3 text-xs text-muted-foreground text-center">
                  {property.ownerPhone}
                </p>
              </>
            )}

            <a
              href={`mailto:contato@casaoeiras.com.br?subject=Interesse em ${encodeURIComponent(
                property.titulo,
              )}`}
            >
              <Button size="lg" variant="outline" className="w-full mt-2 gap-2">
                <Mail className="h-4 w-4" />
                Enviar e-mail
              </Button>
            </a>
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

function pluralize(value: number, singular: string, plural: string) {
  return value === 1 ? singular : plural;
}
