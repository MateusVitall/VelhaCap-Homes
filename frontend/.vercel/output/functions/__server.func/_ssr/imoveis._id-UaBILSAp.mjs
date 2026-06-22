import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { S as SiteLayout } from "./SiteLayout-CdlCJ80Z.mjs";
import { B as Button, f as formatBRL } from "./button-BY9TN_vO.mjs";
import { a as Route$1 } from "./router-C8cjMUA1.mjs";
import "../_libs/sonner.mjs";
import { k as ArrowLeft, g as BedDouble, h as Bath, C as Car, M as MapPin, U as User, l as Phone, m as Mail } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "./Navbar-c4GzZ7Y4.mjs";
import "./use-auth-Chpoy13v.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
function PropertyDetail() {
  const {
    id
  } = Route$1.useParams();
  const [active, setActive] = reactExports.useState(0);
  const [loading, setLoading] = reactExports.useState(true);
  const [property, setProperty] = reactExports.useState(null);
  reactExports.useEffect(() => {
    async function loadProperty() {
      try {
        const response = await fetch(`${"http://localhost:3000"}/imoveis/${id}`);
        if (!response.ok) {
          throw new Error("Imóvel não encontrado");
        }
        const data = await response.json();
        setProperty(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadProperty();
  }, [id]);
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SiteLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-4 py-20 text-center", children: "Carregando imóvel..." }) });
  }
  if (!property) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SiteLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-20 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl", children: "Imóvel não encontrado" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/imoveis", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "mt-6", children: "Ver todos os imóveis" }) })
    ] }) });
  }
  const images = property.imagens?.length > 0 ? property.imagens : ["https://placehold.co/800x600?text=Sem+Imagem"];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/imoveis", className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
      "Voltar aos imóveis"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 md:grid-cols-[2fr_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[16/11] overflow-hidden rounded-xl bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: images[active], alt: property.titulo, className: "h-full w-full object-cover" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 md:grid-cols-1 gap-3", children: images.slice(0, 3).map((src, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActive(i), className: `aspect-[4/3] overflow-hidden rounded-lg bg-muted ring-2 transition-all ${active === i ? "ring-primary" : "ring-transparent hover:ring-border"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src, alt: "", className: "h-full w-full object-cover" }) }, i)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-4 sm:px-6 py-10 grid gap-10 lg:grid-cols-[1fr_360px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: [
          property.tipo,
          " · ",
          property.bairro,
          " · ",
          property.cidade
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-4xl md:text-5xl leading-tight", children: property.titulo }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap gap-6 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Feature, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BedDouble, { className: "h-5 w-5" }), label: `${property.quartos} quartos` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Feature, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bath, { className: "h-5 w-5" }), label: `${property.banheiros} banheiros` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Feature, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { className: "h-5 w-5" }), label: property.garagem ? "Com garagem" : "Sem garagem" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Feature, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-5 w-5" }), label: `${property.bairro}, ${property.cidade}-PI` })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl", children: "Sobre este imóvel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-foreground/80 leading-relaxed whitespace-pre-line", children: property.descricao })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "lg:sticky lg:top-24 self-start", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Aluguel mensal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-display text-4xl text-primary", children: formatBRL(property.preco) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 pt-6 border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3", children: "Anunciante" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-11 w-11 place-items-center rounded-full bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: property.ownerName || "Proprietário" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Proprietário verificado" })
            ] })
          ] })
        ] }),
        property.ownerPhone && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `https://wa.me/55${property.ownerPhone.replace(/\D/g, "")}`, target: "_blank", rel: "noreferrer", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "lg", className: "w-full mt-5 gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4" }),
            "Entrar em contato"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs text-muted-foreground text-center", children: property.ownerPhone })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `mailto:contato@casaoeiras.com.br?subject=Interesse em ${encodeURIComponent(property.titulo)}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "lg", variant: "outline", className: "w-full mt-2 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4" }),
          "Enviar e-mail"
        ] }) })
      ] }) })
    ] })
  ] });
}
function Feature({
  icon,
  label
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-foreground/80", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label })
  ] });
}
export {
  PropertyDetail as component
};
