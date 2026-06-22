import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { B as Button, c as cn } from "./button-BY9TN_vO.mjs";
import { I as Input } from "./input-B7aXx4WY.mjs";
import { L as Label } from "./label-BydSRJ0F.mjs";
import { S as Switch } from "./switch-BQ2QSOpD.mjs";
import { X, o as LoaderCircle, p as Upload } from "../_libs/lucide-react.mjs";
const Textarea = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
const API_URL = "http://localhost:3000";
async function uploadImage(file) {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("imagem", file);
  const response = await fetch(`${API_URL}/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  });
  if (!response.ok) {
    throw new Error("Erro ao enviar imagem");
  }
  const data = await response.json();
  return data.url;
}
function PropertyForm({
  initial,
  submitLabel,
  onSubmit,
  defaultOwnerName
}) {
  const [title, setTitle] = reactExports.useState(initial?.title ?? "");
  const [description, setDescription] = reactExports.useState(initial?.description ?? "");
  const [price, setPrice] = reactExports.useState(initial?.price ?? "");
  const [city, setCity] = reactExports.useState(initial?.city ?? "Oeiras");
  const [neighborhood, setNeighborhood] = reactExports.useState(initial?.neighborhood ?? "");
  const [tipo, setTipo] = reactExports.useState(initial?.tipo ?? "Casa");
  const [bedrooms, setBedrooms] = reactExports.useState(initial?.bedrooms ?? 1);
  const [bathrooms, setBathrooms] = reactExports.useState(initial?.bathrooms ?? 1);
  const [garage, setGarage] = reactExports.useState(initial?.garage ?? false);
  const [ownerName, setOwnerName] = reactExports.useState(initial?.ownerName ?? defaultOwnerName);
  const [ownerPhone, setOwnerPhone] = reactExports.useState(initial?.ownerPhone ?? "");
  const [images, setImages] = reactExports.useState(initial?.images ?? []);
  const [uploading, setUploading] = reactExports.useState(false);
  const onFiles = async (files) => {
    if (!files) return;
    const toUpload = Array.from(files).slice(0, 6 - images.length);
    if (toUpload.length === 0) return;
    setUploading(true);
    for (const file of toUpload) {
      try {
        const url = await uploadImage(file);
        setImages((prev) => [...prev, url]);
      } catch (err) {
        console.error("Erro ao enviar imagem:", err);
      }
    }
    setUploading(false);
  };
  const submit = (e) => {
    e.preventDefault();
    console.log("SUBMIT DISPARADO");
    console.log({
      title,
      description,
      price,
      city,
      neighborhood,
      bedrooms,
      bathrooms,
      garage,
      ownerName,
      ownerPhone,
      images
    });
    onSubmit({
      title,
      description,
      price: Number(price),
      city,
      neighborhood,
      tipo,
      bedrooms,
      bathrooms,
      garage,
      images,
      ownerName,
      ownerPhone
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Informações principais", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Título do anúncio", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          required: true,
          value: title,
          onChange: (e) => setTitle(e.target.value),
          placeholder: "Casa charmosa no Centro Histórico"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Descrição", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Textarea,
        {
          required: true,
          rows: 5,
          value: description,
          onChange: (e) => setDescription(e.target.value),
          placeholder: "Descreva o imóvel, diferenciais, mobília, proximidade…"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Preço mensal (R$)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            required: true,
            type: "number",
            min: 0,
            value: price,
            onChange: (e) => setPrice(e.target.value === "" ? "" : Number(e.target.value)),
            placeholder: "1500"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Cidade", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { required: true, value: city, onChange: (e) => setCity(e.target.value) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Bairro", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            required: true,
            value: neighborhood,
            onChange: (e) => setNeighborhood(e.target.value),
            placeholder: "Centro Histórico"
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Características", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Tipo do imóvel", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: tipo,
          onChange: (e) => setTipo(e.target.value),
          className: "flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Casa", children: "Casa" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Apartamento", children: "Apartamento" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Kitnet", children: "Kitnet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Sobrado", children: "Sobrado" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Sala Comercial", children: "Sala Comercial" })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Quartos", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "number",
            min: 0,
            value: bedrooms,
            onChange: (e) => setBedrooms(Number(e.target.value))
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Banheiros", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "number",
            min: 0,
            value: bathrooms,
            onChange: (e) => setBathrooms(Number(e.target.value))
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Garagem", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 h-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: garage, onCheckedChange: setGarage }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: garage ? "Possui" : "Não possui" })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Contato do anunciante", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nome", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { required: true, value: ownerName, onChange: (e) => setOwnerName(e.target.value) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Telefone / WhatsApp", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          required: true,
          value: ownerPhone,
          onChange: (e) => setOwnerPhone(e.target.value),
          placeholder: "(89) 99999-0000"
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Fotos do imóvel", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3", children: [
        images.map((src, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative aspect-[4/3] overflow-hidden rounded-md border border-border bg-muted",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src, alt: "", className: "h-full w-full object-cover" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setImages((p) => p.filter((_, idx) => idx !== i)),
                  className: "absolute right-1.5 top-1.5 grid h-7 w-7 place-items-center rounded-full bg-background/90 hover:bg-background",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" })
                }
              )
            ]
          },
          i
        )),
        images.length < 6 && /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex aspect-[4/3] cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors", children: [
          uploading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-5 w-5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: uploading ? "Enviando..." : "Adicionar foto" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "file",
              accept: "image/*",
              multiple: true,
              className: "hidden",
              onChange: (e) => onFiles(e.target.files),
              disabled: uploading
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Até 6 imagens. JPG ou PNG." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", size: "lg", children: submitLabel }) })
  ] });
}
function Section({ title, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-6 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children })
  ] });
}
function Field({ label, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: label }),
    children
  ] });
}
export {
  PropertyForm as P
};
