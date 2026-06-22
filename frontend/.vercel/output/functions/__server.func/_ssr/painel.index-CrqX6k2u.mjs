import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as Button } from "./button-BY9TN_vO.mjs";
import { u as useAuth } from "./use-auth-Chpoy13v.mjs";
import { a as ListPlus, B as Building, T as TrendingUp } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
function DashboardHome() {
  const {
    user
  } = useAuth();
  const [totalImoveis, setTotalImoveis] = reactExports.useState(0);
  reactExports.useEffect(() => {
    async function carregarResumo() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${"http://localhost:3000"}/imoveis/meus-imoveis`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error("Erro ao carregar imóveis");
        }
        const data = await response.json();
        setTotalImoveis(data.length);
      } catch (error) {
        console.error(error);
      }
    }
    carregarResumo();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Painel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl mt-1", children: [
          "Olá, ",
          user?.name.split(" ")[0],
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/painel/novo", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ListPlus, { className: "h-4 w-4" }),
        "Novo imóvel"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid gap-4 sm:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Building, { className: "h-5 w-5" }), label: "Imóveis ativos", value: String(totalImoveis) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-5 w-5" }), label: "Visualizações", value: "—" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ListPlus, { className: "h-5 w-5" }), label: "Contatos recebidos", value: "—" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 rounded-xl border border-border bg-card p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl", children: "Comece por aqui" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground max-w-lg", children: "Cadastre seu primeiro imóvel para começar a receber interessados. É grátis e leva poucos minutos." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/painel/novo", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { children: "Cadastrar imóvel" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/painel/imoveis", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", children: "Ver meus imóveis" }) })
      ] })
    ] })
  ] });
}
function Card({
  icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-9 w-9 place-items-center rounded-md bg-primary/10 text-primary", children: icon }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 font-display text-3xl", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wider text-muted-foreground mt-1", children: label })
  ] });
}
export {
  DashboardHome as component
};
