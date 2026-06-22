import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth } from "./use-auth-Chpoy13v.mjs";
import { P as PropertyForm } from "./PropertyForm-CA42oSEU.mjs";
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
import "./button-BY9TN_vO.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "./input-B7aXx4WY.mjs";
import "./label-BydSRJ0F.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "./switch-BQ2QSOpD.mjs";
import "../_libs/radix-ui__react-switch.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/lucide-react.mjs";
function NewProperty() {
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  if (!user) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Novo anúncio" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl mt-1 mb-8", children: "Cadastrar imóvel" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PropertyForm, { submitLabel: "Publicar imóvel", defaultOwnerName: user.name, onSubmit: async (values) => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${"http://localhost:3000"}/imoveis`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            titulo: values.title,
            descricao: values.description,
            preco: values.price,
            cidade: values.city,
            bairro: values.neighborhood,
            tipo: values.tipo,
            quartos: values.bedrooms,
            banheiros: values.bathrooms,
            garagem: values.garage,
            ownerName: values.ownerName,
            ownerPhone: values.ownerPhone,
            imagens: values.images
          })
        });
        const data = await response.json();
        if (!response.ok) {
          console.log(data);
          throw new Error("Erro ao publicar imóvel");
        }
        toast.success("Imóvel publicado com sucesso!");
        navigate({
          to: "/painel/imoveis"
        });
      } catch (error) {
        console.error(error);
        toast.error("Erro ao publicar imóvel");
      }
    } })
  ] });
}
export {
  NewProperty as component
};
