import { Link } from "@tanstack/react-router";
import { Bath, BedDouble, Car, MapPin } from "lucide-react";

type Property = {
  id: string;
  titulo: string;
  preco: number;
  cidade: string;
  bairro: string;
  tipo: string;
  quartos: number;
  banheiros: number;
  garagem: boolean;
  disponivel?: boolean;
  imagens: string[];
};

function formatBRL(valor?: number) {
  return (valor ?? 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function PropertyCard({ property }: { property: Property }) {
  const isUnavailable = property.disponivel === false;

  return (
    <Link
      to="/imoveis/$id"
      params={{ id: String(property.id) }}
      className={`group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg hover:-translate-y-0.5 ${
        isUnavailable ? "opacity-60 pointer-events-none" : ""
      }`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={property.imagens?.[0] || "https://placehold.co/800x600?text=Sem+Imagem"}
          alt={property.titulo}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute left-3 top-3 flex gap-2">
          <span className="rounded-full bg-background/95 px-3 py-1 text-xs font-medium shadow-sm">
            {property.tipo}
          </span>
          <span className="rounded-full bg-background/95 px-3 py-1 text-xs font-medium shadow-sm">
            {property.bairro}
          </span>
        </div>

        {isUnavailable && (
          <span className="absolute right-3 top-3 rounded-full bg-destructive/90 px-3 py-1 text-xs font-medium text-destructive-foreground shadow-sm">
            Indisponível
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {property.titulo}
        </h3>

        <div className="mt-1.5 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          {property.bairro}, {property.cidade}
        </div>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-foreground/80">
          <span className="inline-flex items-center gap-1.5">
            <BedDouble className="h-4 w-4 text-primary" />
            {property.quartos} quartos
          </span>

          <span className="inline-flex items-center gap-1.5">
            <Bath className="h-4 w-4 text-primary" />
            {property.banheiros} banh.
          </span>

          {property.garagem && (
            <span className="inline-flex items-center gap-1.5">
              <Car className="h-4 w-4 text-primary" />
              Garagem
            </span>
          )}
        </div>

        <div className="mt-5 pt-4 border-t border-border flex items-baseline justify-between">
          <div>
            <span className="font-display text-2xl text-primary">{formatBRL(property.preco)}</span>

            <span className="text-xs text-muted-foreground"> / mês</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
