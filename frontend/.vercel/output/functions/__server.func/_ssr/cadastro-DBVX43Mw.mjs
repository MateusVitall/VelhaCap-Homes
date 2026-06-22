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
function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${"http://localhost:3000"}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password
        })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Erro ao criar conta");
      }
      toast.success("Conta criada com sucesso!");
      navigate({
        to: "/entrar"
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao criar conta");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SiteLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-md px-4 py-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl", children: "Criar conta" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "É grátis e leva menos de um minuto" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "mt-10 space-y-4 rounded-xl border border-border bg-card p-7", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", children: "Nome completo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "name", required: true, value: name, onChange: (e) => setName(e.target.value), placeholder: "Seu nome" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "E-mail" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "email", type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), placeholder: "voce@email.com" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", children: "Senha" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "password", type: "password", required: true, minLength: 6, value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Mínimo 6 caracteres" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full", size: "lg", disabled: loading, children: loading ? "Criando..." : "Criar conta" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground", children: [
        "Já tem uma conta?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/entrar", className: "text-primary font-medium hover:underline", children: "Entrar" })
      ] })
    ] })
  ] }) });
}
export {
  RegisterPage as component
};
