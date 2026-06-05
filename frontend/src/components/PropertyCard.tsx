import { Link } from "@tanstack/react-router";
import { Bath, BedDouble, Car, MapPin } from "lucide-react";
import { formatBRL, type Property } from "@/lib/store";

export function PropertyCard({ property }: { property: Property }) {
  return (
    <Link
      to="/imoveis/$id"
      params={{ id: property.id }}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg hover:-translate-y-0.5"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={property.images[0]}
          alt={property.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 rounded-full bg-background/95 px-3 py-1 text-xs font-medium shadow-sm">
          {property.neighborhood}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {property.title}
        </h3>
        <div className="mt-1.5 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          {property.neighborhood}, {property.city}
        </div>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-foreground/80">
          <span className="inline-flex items-center gap-1.5">
            <BedDouble className="h-4 w-4 text-primary" /> {property.bedrooms} quartos
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Bath className="h-4 w-4 text-primary" /> {property.bathrooms} banh.
          </span>
          {property.garage && (
            <span className="inline-flex items-center gap-1.5">
              <Car className="h-4 w-4 text-primary" /> Garagem
            </span>
          )}
        </div>

        <div className="mt-5 pt-4 border-t border-border flex items-baseline justify-between">
          <div>
            <span className="font-display text-2xl text-primary">{formatBRL(property.price)}</span>
            <span className="text-xs text-muted-foreground"> / mês</span>
          </div>
          <span className="text-xs font-medium uppercase tracking-wider text-accent-foreground/80">Ver detalhes →</span>
        </div>
      </div>
    </Link>
  );
}
