import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth } from "./use-auth-Chpoy13v.mjs";
import { S as SiteLayout } from "./SiteLayout-CdlCJ80Z.mjs";
import { P as PropertyCard } from "./PropertyCard-1wVFVp0d.mjs";
import { B as Button } from "./button-BY9TN_vO.mjs";
import { I as Input } from "./input-B7aXx4WY.mjs";
import { S as Sparkles, c as Search, A as ArrowRight, d as Building2, e as ShieldCheck } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
const heroImg = "/assets/hero-oeiras-D5xz8A4h.jpg";
function HomePage() {
  const navigate = useNavigate();
  const {
    user
  } = useAuth();
  const [q, setQ] = reactExports.useState("");
  const [properties, setProperties] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    async function loadProperties() {
      try {
        const response = await fetch(`${"http://localhost:3000"}/imoveis`);
        if (!response.ok) {
          throw new Error("Erro ao carregar imóveis");
        }
        const data = await response.json();
        setProperties(data.slice(0, 6));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadProperties();
  }, []);
  const onSearch = (e) => {
    e.preventDefault();
    navigate({
      to: "/imoveis",
      search: {
        q
      }
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 -z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroImg, alt: "Casarão histórico em Oeiras-PI ao pôr do sol", className: "h-full w-full object-cover", width: 1600, height: 1100 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/85 via-primary/65 to-foreground/40" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 py-20 md:py-32 text-primary-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 bg-background/10 px-3 py-1 text-xs uppercase tracking-[0.2em] backdrop-blur", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3" }),
          "Oeiras-PI · primeira capital"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-5 font-display text-5xl md:text-7xl leading-[1.05] max-w-3xl", children: [
          "Seu próximo lar",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-accent", children: " à beira" }),
          " da história."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 max-w-xl text-base md:text-lg text-primary-foreground/85 leading-relaxed", children: "Conectamos famílias e proprietários em Oeiras. Anúncios verificados, contato direto, sem intermediários complicados." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: onSearch, className: "mt-9 flex max-w-xl gap-2 rounded-xl bg-background p-2 shadow-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 items-center gap-2 px-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Buscar por bairro, tipo de imóvel…", className: "border-0 shadow-none focus-visible:ring-0 px-0 text-foreground placeholder:text-muted-foreground" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", size: "lg", className: "gap-2", children: [
            "Buscar",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-4 sm:px-6 py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between gap-4 mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Em destaque" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl md:text-5xl mt-2", children: "Imóveis para alugar agora" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/imoveis", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "gap-2 hidden sm:inline-flex", children: [
          "Ver todos",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
        ] }) })
      ] }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-10", children: "Carregando imóveis..." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: properties.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(PropertyCard, { property: {
        id: p.id,
        titulo: p.titulo,
        preco: p.preco,
        cidade: p.cidade,
        bairro: p.bairro,
        tipo: p.tipo ?? "Casa",
        quartos: p.quartos,
        banheiros: p.banheiros,
        garagem: p.garagem,
        imagens: p.imagens && p.imagens.length > 0 ? p.imagens : ["https://placehold.co/800x600?text=Imovel"]
      } }, p.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-secondary/50 border-y border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-2xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Como funciona" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl md:text-5xl mt-2", children: "Simples para quem aluga, fácil para quem anuncia" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-14 grid gap-8 md:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Step, { n: "01", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-5 w-5" }), title: "Encontre", children: "Pesquise por bairro, número de quartos ou preço. Filtros simples e resultados rápidos." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Step, { n: "02", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-5 w-5" }), title: "Visite & escolha", children: "Veja fotos, descrições completas e fale direto com o proprietário, sem corretagem." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Step, { n: "03", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-5 w-5" }), title: "Anuncie grátis", children: "É proprietário? Cadastre seu imóvel em minutos e alcance interessados locais." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: user ? "/painel/novo" : "/cadastro", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "lg", className: "gap-2", children: [
        "Anunciar meu imóvel",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
      ] }) }) })
    ] }) })
  ] });
}
function Step({
  n,
  icon,
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-7", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-10 w-10 place-items-center rounded-md bg-primary/10 text-primary", children: icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-3xl text-muted-foreground/60", children: n })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-5 font-display text-2xl", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground leading-relaxed", children })
  ] });
}
export {
  HomePage as component
};
