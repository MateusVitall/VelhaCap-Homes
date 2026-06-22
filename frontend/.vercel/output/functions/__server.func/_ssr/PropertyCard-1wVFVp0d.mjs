import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { M as MapPin, g as BedDouble, h as Bath, C as Car } from "../_libs/lucide-react.mjs";
function formatBRL(valor) {
  return (valor ?? 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}
function PropertyCard({ property }) {
  const isUnavailable = property.disponivel === false;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/imoveis/$id",
      params: { id: String(property.id) },
      className: `group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg hover:-translate-y-0.5 ${isUnavailable ? "opacity-60 pointer-events-none" : ""}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/3] overflow-hidden bg-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: property.imagens?.[0] || "https://placehold.co/800x600?text=Sem+Imagem",
              alt: property.titulo,
              loading: "lazy",
              className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute left-3 top-3 flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-background/95 px-3 py-1 text-xs font-medium shadow-sm", children: property.tipo }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-background/95 px-3 py-1 text-xs font-medium shadow-sm", children: property.bairro })
          ] }),
          isUnavailable && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-3 top-3 rounded-full bg-destructive/90 px-3 py-1 text-xs font-medium text-destructive-foreground shadow-sm", children: "Indisponível" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl leading-snug line-clamp-2 group-hover:text-primary transition-colors", children: property.titulo }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5 flex items-center gap-1 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
            property.bairro,
            ", ",
            property.cidade
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-foreground/80", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BedDouble, { className: "h-4 w-4 text-primary" }),
              property.quartos,
              " quartos"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bath, { className: "h-4 w-4 text-primary" }),
              property.banheiros,
              " banh."
            ] }),
            property.garagem && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { className: "h-4 w-4 text-primary" }),
              "Garagem"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 pt-4 border-t border-border flex items-baseline justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl text-primary", children: formatBRL(property.preco) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: " / mês" })
          ] }) })
        ] })
      ]
    }
  );
}
export {
  PropertyCard as P
};
