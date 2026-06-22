import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { N as Navbar } from "./Navbar-c4GzZ7Y4.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { H as House } from "../_libs/lucide-react.mjs";
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "mt-24 border-t border-border bg-secondary/40", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 py-14 grid gap-10 md:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-xl", children: [
            "Casa",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Oeiras" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-muted-foreground leading-relaxed", children: "A plataforma de locação de imóveis da primeira capital do Piauí. Conectando moradores e proprietários com simplicidade." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display text-lg mb-3", children: "Navegação" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-foreground", children: "Início" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/imoveis", className: "hover:text-foreground", children: "Ver imóveis" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/cadastro", className: "hover:text-foreground", children: "Anunciar imóvel" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/entrar", className: "hover:text-foreground", children: "Entrar" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display text-lg mb-3", children: "Sobre" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: "Anuncie gratuitamente e alcance milhares de famílias buscando uma nova casa em Oeiras." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 py-5 text-xs text-muted-foreground flex flex-wrap items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " CasaOeiras. Todos os direitos reservados."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Feito com cuidado em Oeiras-PI." })
    ] }) })
  ] });
}
function SiteLayout({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1", children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  SiteLayout as S
};
