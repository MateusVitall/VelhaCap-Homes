import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as Button } from "./button-BY9TN_vO.mjs";
import { u as useAuth, e as emitAuthChange } from "./use-auth-Chpoy13v.mjs";
import { H as House, U as User, b as LogOut, n as Menu } from "../_libs/lucide-react.mjs";
function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = reactExports.useState(false);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("oeiras_user");
    emitAuthChange();
    navigate({ to: "/" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2.5 group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground transition-transform group-hover:scale-105", children: /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "h-4.5 w-4.5", strokeWidth: 2.2 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "leading-tight", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-xl", children: [
            "Casa",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Oeiras" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-[0.18em] text-muted-foreground -mt-0.5", children: "Imóveis · Piauí" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden md:flex items-center gap-7 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/",
            className: "text-foreground/70 hover:text-foreground transition-colors",
            activeOptions: { exact: true },
            activeProps: { className: "text-foreground" },
            children: "Início"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/imoveis",
            className: "text-foreground/70 hover:text-foreground transition-colors",
            activeProps: { className: "text-foreground" },
            children: "Imóveis"
          }
        ),
        user && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/painel",
            className: "text-foreground/70 hover:text-foreground transition-colors",
            activeProps: { className: "text-foreground" },
            children: "Meu painel"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:flex items-center gap-2", children: user ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/painel", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4" }),
          user.name.split(" ")[0]
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: handleLogout, className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
          " Sair"
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/entrar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", children: "Entrar" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/cadastro", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", children: "Cadastrar" }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-border",
          onClick: () => setOpen((v) => !v),
          "aria-label": "Abrir menu",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-4 w-4" })
        }
      )
    ] }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:hidden border-t border-border bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-3 flex flex-col gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", onClick: () => setOpen(false), className: "py-2", children: "Início" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/imoveis", onClick: () => setOpen(false), className: "py-2", children: "Imóveis" }),
      user && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/painel", onClick: () => setOpen(false), className: "py-2", children: "Meu painel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex gap-2", children: user ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          className: "flex-1",
          onClick: () => {
            handleLogout();
            setOpen(false);
          },
          children: "Sair"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/entrar", className: "flex-1", onClick: () => setOpen(false), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "w-full", children: "Entrar" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/cadastro", className: "flex-1", onClick: () => setOpen(false), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full", children: "Cadastrar" }) })
      ] }) })
    ] }) })
  ] });
}
export {
  Navbar as N
};
