import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, e as useRouterState, L as Link, O as Outlet } from "../_libs/tanstack__react-router.mjs";
import { N as Navbar } from "./Navbar-c4GzZ7Y4.mjs";
import { u as useAuth, e as emitAuthChange } from "./use-auth-Chpoy13v.mjs";
import { L as LayoutDashboard, B as Building, a as ListPlus, H as House, b as LogOut } from "../_libs/lucide-react.mjs";
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
import "./button-BY9TN_vO.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
function DashboardLayout() {
  const {
    user,
    ready
  } = useAuth();
  console.log("PAINEL USER:", user);
  console.log("PAINEL READY:", ready);
  const navigate = useNavigate();
  const path = useRouterState({
    select: (s) => s.location.pathname
  });
  reactExports.useEffect(() => {
    if (ready && !user) navigate({
      to: "/entrar"
    });
  }, [ready, user, navigate]);
  if (!ready || !user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen grid place-items-center text-muted-foreground", children: "Carregando…" });
  }
  const items = [{
    to: "/painel",
    label: "Visão geral",
    icon: LayoutDashboard,
    exact: true
  }, {
    to: "/painel/imoveis",
    label: "Meus imóveis",
    icon: Building,
    exact: false
  }, {
    to: "/painel/novo",
    label: "Cadastrar imóvel",
    icon: ListPlus,
    exact: false
  }];
  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("oeiras_user");
    emitAuthChange();
    navigate({
      to: "/"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl w-full px-4 sm:px-6 py-8 flex-1 grid gap-8 lg:grid-cols-[240px_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "lg:sticky lg:top-24 lg:self-start", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-sidebar text-sidebar-foreground p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.2em] text-sidebar-foreground/60", children: "Conectado como" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-display text-xl truncate", children: user.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-sidebar-foreground/60 truncate", children: user.email }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "mt-6 space-y-1", children: items.map((it) => {
          const active = it.exact ? path === it.to : path.startsWith(it.to);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: it.to, className: `flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors ${active ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium" : "text-sidebar-foreground/80 hover:bg-sidebar-accent"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(it.icon, { className: "h-4 w-4" }),
            it.label
          ] }, it.to);
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 pt-5 border-t border-sidebar-border space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "h-4 w-4" }),
            " Voltar ao site"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onLogout, className: "w-full flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
            " Sair"
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
    ] })
  ] });
}
export {
  DashboardLayout as component
};
