import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
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
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const appCss = "/assets/styles-CShAEWRB.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$b = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Casa Oeiras" },
      { name: "description", content: "Aluguel de imóveis em Oeiras" },
      { property: "og:title", content: "Casa Oeiras" },
      { property: "og:description", content: "Aluguel de imóveis em Oeiras" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$b.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, position: "top-right" })
  ] });
}
const $$splitComponentImporter$a = () => import("./painel--AgxgV2o.mjs");
const Route$a = createFileRoute("/painel")({
  head: () => ({
    meta: [{
      title: "Meu painel — CasaOeiras"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./imoveis-C_fDHZOp.mjs");
const Route$9 = createFileRoute("/imoveis")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./entrar-CbB8tMId.mjs");
const Route$8 = createFileRoute("/entrar")({
  head: () => ({
    meta: [{
      title: "Entrar — CasaOeiras"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./cadastro-DBVX43Mw.mjs");
const Route$7 = createFileRoute("/cadastro")({
  head: () => ({
    meta: [{
      title: "Criar conta — CasaOeiras"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./index-DGifS-po.mjs");
const Route$6 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "CasaOeiras — Aluguel de imóveis em Oeiras-PI"
    }, {
      name: "description",
      content: "A plataforma para alugar casas e apartamentos em Oeiras, Piauí. Anúncios verificados e contato direto com o proprietário."
    }, {
      property: "og:title",
      content: "CasaOeiras — Imóveis para alugar em Oeiras-PI"
    }, {
      property: "og:description",
      content: "Encontre seu próximo lar na primeira capital do Piauí."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./painel.index-CrqX6k2u.mjs");
const Route$5 = createFileRoute("/painel/")({
  head: () => ({
    meta: [{
      title: "Painel — CasaOeiras"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./imoveis.index-D8gAJh5c.mjs");
const Route$4 = createFileRoute("/imoveis/")({
  head: () => ({
    meta: [{
      title: "Imóveis — CasaOeiras"
    }]
  }),
  validateSearch: (s) => ({
    q: typeof s.q === "string" ? s.q : void 0
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./painel.novo-Bgpw60Ti.mjs");
const Route$3 = createFileRoute("/painel/novo")({
  head: () => ({
    meta: [{
      title: "Novo Imóvel — CasaOeiras"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./painel.imoveis-LsYE0Ehi.mjs");
const Route$2 = createFileRoute("/painel/imoveis")({
  head: () => ({
    meta: [{
      title: "Meus Imóveis — CasaOeiras"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./imoveis._id-UaBILSAp.mjs");
const Route$1 = createFileRoute("/imoveis/$id")({
  head: () => ({
    meta: [{
      title: "Detalhes do Imóvel — CasaOeiras"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./painel.editar._id-CA9wjXQm.mjs");
const Route = createFileRoute("/painel/editar/$id")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const PainelRoute = Route$a.update({
  id: "/painel",
  path: "/painel",
  getParentRoute: () => Route$b
});
const ImoveisRoute = Route$9.update({
  id: "/imoveis",
  path: "/imoveis",
  getParentRoute: () => Route$b
});
const EntrarRoute = Route$8.update({
  id: "/entrar",
  path: "/entrar",
  getParentRoute: () => Route$b
});
const CadastroRoute = Route$7.update({
  id: "/cadastro",
  path: "/cadastro",
  getParentRoute: () => Route$b
});
const IndexRoute = Route$6.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$b
});
const PainelIndexRoute = Route$5.update({
  id: "/",
  path: "/",
  getParentRoute: () => PainelRoute
});
const ImoveisIndexRoute = Route$4.update({
  id: "/",
  path: "/",
  getParentRoute: () => ImoveisRoute
});
const PainelNovoRoute = Route$3.update({
  id: "/novo",
  path: "/novo",
  getParentRoute: () => PainelRoute
});
const PainelImoveisRoute = Route$2.update({
  id: "/imoveis",
  path: "/imoveis",
  getParentRoute: () => PainelRoute
});
const ImoveisIdRoute = Route$1.update({
  id: "/$id",
  path: "/$id",
  getParentRoute: () => ImoveisRoute
});
const PainelEditarIdRoute = Route.update({
  id: "/editar/$id",
  path: "/editar/$id",
  getParentRoute: () => PainelRoute
});
const ImoveisRouteChildren = {
  ImoveisIdRoute,
  ImoveisIndexRoute
};
const ImoveisRouteWithChildren = ImoveisRoute._addFileChildren(ImoveisRouteChildren);
const PainelRouteChildren = {
  PainelImoveisRoute,
  PainelNovoRoute,
  PainelIndexRoute,
  PainelEditarIdRoute
};
const PainelRouteWithChildren = PainelRoute._addFileChildren(PainelRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  CadastroRoute,
  EntrarRoute,
  ImoveisRoute: ImoveisRouteWithChildren,
  PainelRoute: PainelRouteWithChildren
};
const routeTree = Route$b._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$4 as R,
  Route$1 as a,
  Route as b,
  router as r
};
