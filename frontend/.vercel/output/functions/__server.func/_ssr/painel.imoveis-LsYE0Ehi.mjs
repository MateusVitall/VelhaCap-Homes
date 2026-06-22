import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as Button } from "./button-BY9TN_vO.mjs";
import { S as Switch } from "./switch-BQ2QSOpD.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { P as Plus, i as SquarePen, j as Trash2 } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-switch.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
function formatBRL(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}
function MyProperties() {
  const navigate = useNavigate();
  const [imoveis, setImoveis] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  async function carregarImoveis() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${"http://localhost:3000"}/imoveis/meus-imoveis`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      setImoveis(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  reactExports.useEffect(() => {
    carregarImoveis();
  }, []);
  async function onDelete(id) {
    if (!confirm("Excluir este imóvel?")) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${"http://localhost:3000"}/imoveis/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error();
      }
      setImoveis((prev) => prev.filter((item) => item.id !== id));
      toast.success("Imóvel excluído");
    } catch {
      toast.error("Erro ao excluir imóvel");
    }
  }
  async function onToggle(id, current) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${"http://localhost:3000"}/imoveis/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          disponivel: !current
        })
      });
      if (!response.ok) {
        throw new Error();
      }
      setImoveis((prev) => prev.map((item) => item.id === id ? {
        ...item,
        disponivel: !current
      } : item));
      toast.success(!current ? "Imóvel disponibilizado" : "Imóvel indisibilizado");
    } catch {
      toast.error("Erro ao alterar status");
    }
  }
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Carregando..." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Catálogo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl mt-1", children: "Meus imóveis" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/painel/novo", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        "Adicionar"
      ] }) })
    ] }),
    imoveis.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 rounded-xl border border-dashed border-border p-16 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl", children: "Nenhum imóvel ainda" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid gap-4", children: imoveis.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `overflow-hidden rounded-xl border border-border bg-card ${!p.disponivel ? "opacity-60" : ""}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.imagens?.length > 0 ? p.imagens[0] : "https://placehold.co/800x600?text=Sem+Imagem", alt: p.titulo, className: "h-56 w-full object-cover" }),
        !p.disponivel && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-3 top-3 rounded-full bg-destructive/90 px-3 py-1 text-xs font-medium text-destructive-foreground", children: "Indisponível" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl", children: p.titulo }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
          p.tipo,
          " · ",
          p.bairro,
          " · ",
          p.quartos,
          " quartos · ",
          p.banheiros,
          " banheiros"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 font-display text-xl text-primary", children: formatBRL(p.preco) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: p.disponivel, onCheckedChange: () => onToggle(p.id, p.disponivel) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: p.disponivel ? "Disponível" : "Indisponível" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: () => navigate({
              to: "/painel/editar/$id",
              params: {
                id: p.id
              }
            }), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "mr-1 h-4 w-4" }),
              "Editar"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: () => onDelete(p.id), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "mr-1 h-4 w-4" }),
              "Excluir"
            ] })
          ] })
        ] })
      ] })
    ] }, p.id)) })
  ] });
}
export {
  MyProperties as component
};
