import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { S as SiteLayout } from "./SiteLayout-CdlCJ80Z.mjs";
import { P as PropertyCard } from "./PropertyCard-1wVFVp0d.mjs";
import { I as Input } from "./input-B7aXx4WY.mjs";
import { B as Button } from "./button-BY9TN_vO.mjs";
import { R as Route$4 } from "./router-C8cjMUA1.mjs";
import "../_libs/sonner.mjs";
import { c as Search, f as SlidersHorizontal } from "../_libs/lucide-react.mjs";
import "./Navbar-c4GzZ7Y4.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "./use-auth-Chpoy13v.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
function ListingPage() {
  const {
    q: initialQ
  } = Route$4.useSearch();
  const [q, setQ] = reactExports.useState(initialQ ?? "");
  const [tipoFilter, setTipoFilter] = reactExports.useState("");
  const [minRooms, setMinRooms] = reactExports.useState(0);
  const [maxPrice, setMaxPrice] = reactExports.useState("");
  const [properties, setProperties] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    async function loadProperties() {
      try {
        const response = await fetch(`${"http://localhost:3000"}/imoveis`);
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
  const filteredProperties = reactExports.useMemo(() => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-b border-border bg-secondary/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Catálogo" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl mt-2", children: "Imóveis disponíveis em Oeiras" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-7 grid gap-3 md:grid-cols-[1fr_auto_auto_auto_auto]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-md border border-border bg-background px-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Bairro, palavra-chave...", className: "border-0 shadow-none focus-visible:ring-0 px-0" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: tipoFilter, onChange: (e) => setTipoFilter(e.target.value), className: "rounded-md border border-border bg-background px-3 py-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Tipo: todos" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Casa", children: "Casa" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Apartamento", children: "Apartamento" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Kitnet", children: "Kitnet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Sobrado", children: "Sobrado" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Sala Comercial", children: "Sala Comercial" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: minRooms, onChange: (e) => setMinRooms(Number(e.target.value)), className: "rounded-md border border-border bg-background px-3 py-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 0, children: "Quartos: qualquer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 1, children: "1+ quartos" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 2, children: "2+ quartos" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 3, children: "3+ quartos" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 4, children: "4+ quartos" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: maxPrice, onChange: (e) => setMaxPrice(e.target.value === "" ? "" : Number(e.target.value)), placeholder: "Preço máx (R$)", className: "md:w-44" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "gap-2", onClick: () => {
          setQ("");
          setTipoFilter("");
          setMinRooms(0);
          setMaxPrice("");
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "h-4 w-4" }),
          "Limpar"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-4 sm:px-6 py-12", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: "Carregando imóveis..." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 text-sm text-muted-foreground", children: [
        filteredProperties.length,
        " ",
        filteredProperties.length === 1 ? "imóvel encontrado" : "imóveis encontrados"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: filteredProperties.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(PropertyCard, { property: {
        id: p.id,
        titulo: p.titulo,
        preco: p.preco,
        cidade: p.cidade,
        bairro: p.bairro,
        tipo: p.tipo ?? "Casa",
        quartos: p.quartos,
        banheiros: p.banheiros,
        garagem: p.garagem,
        imagens: p.imagens ?? []
      } }, p.id)) })
    ] }) })
  ] });
}
export {
  ListingPage as component
};
