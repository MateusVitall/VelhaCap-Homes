import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { S as SiteLayout } from "./SiteLayout-CdlCJ80Z.mjs";
import { B as Button } from "./button-BY9TN_vO.mjs";
import { I as Input } from "./input-B7aXx4WY.mjs";
import { L as Label } from "./label-BydSRJ0F.mjs";
import { t as toast } from "../_libs/sonner.mjs";
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
import "../_libs/lucide-react.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${"http://localhost:3000"}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email.trim(),
          password
        })
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.error || "Erro ao entrar");
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("oeiras_session", data.user.id);
      localStorage.setItem("oeiras_user", JSON.stringify(data.user));
      console.log("TOKEN:", data.token);
      console.log("USER:", data.user);
      toast.success("Bem-vindo de volta!");
      navigate({
        to: "/painel"
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao entrar");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SiteLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-md px-4 py-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl", children: "Entrar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Acesse sua conta para gerenciar seus imóveis" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "mt-10 space-y-4 rounded-xl border border-border bg-card p-7", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "E-mail" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "email", type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), placeholder: "voce@email.com" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", children: "Senha" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "password", type: "password", required: true, value: password, onChange: (e) => setPassword(e.target.value), placeholder: "••••••••" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full", size: "lg", disabled: loading, children: loading ? "Entrando..." : "Entrar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground", children: [
        "Ainda não tem conta?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/cadastro", className: "text-primary font-medium hover:underline", children: "Cadastre-se" })
      ] })
    ] })
  ] }) });
}
export {
  LoginPage as component
};
