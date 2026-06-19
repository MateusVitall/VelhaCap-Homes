import { useState, type ReactNode } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export type PropertyFormValues = {
  title: string;
  description: string;
  price: number;
  city: string;
  neighborhood: string;
  bedrooms: number;
  bathrooms: number;
  garage: boolean;
  images: string[];
  ownerName: string;
  ownerPhone: string;
};

export function PropertyForm({
  initial,
  submitLabel,
  onSubmit,
  defaultOwnerName,
}: {
  initial?: Partial<PropertyFormValues>;
  submitLabel: string;
  defaultOwnerName: string;
  onSubmit: (values: PropertyFormValues) => void;
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [price, setPrice] = useState<number | "">(initial?.price ?? "");
  const [city, setCity] = useState(initial?.city ?? "Oeiras");
  const [neighborhood, setNeighborhood] = useState(initial?.neighborhood ?? "");
  const [bedrooms, setBedrooms] = useState<number>(initial?.bedrooms ?? 1);
  const [bathrooms, setBathrooms] = useState<number>(initial?.bathrooms ?? 1);
  const [garage, setGarage] = useState<boolean>(initial?.garage ?? false);
  const [ownerName, setOwnerName] = useState(initial?.ownerName ?? defaultOwnerName);
  const [ownerPhone, setOwnerPhone] = useState(initial?.ownerPhone ?? "");
  const [images, setImages] = useState<string[]>(initial?.images ?? []);

  const onFiles = (files: FileList | null) => {
    if (!files) return;
    Array.from(files)
      .slice(0, 6 - images.length)
      .forEach((f) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result;
          if (typeof result === "string") setImages((prev) => [...prev, result]);
        };
        reader.readAsDataURL(f);
      });
  };

  const submit = (e: React.FormEvent) => {
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
      images,
    });

    onSubmit({
      title,
      description,
      price: Number(price),
      city,
      neighborhood,
      bedrooms,
      bathrooms,
      garage,
      images,
      ownerName,
      ownerPhone,
    });
  };

  return (
    <form onSubmit={submit} className="space-y-8">
      <Section title="Informações principais">
        <Field label="Título do anúncio">
          <Input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Casa charmosa no Centro Histórico"
          />
        </Field>
        <Field label="Descrição">
          <Textarea
            required
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descreva o imóvel, diferenciais, mobília, proximidade…"
          />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Preço mensal (R$)">
            <Input
              required
              type="number"
              min={0}
              value={price}
              onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
              placeholder="1500"
            />
          </Field>
          <Field label="Cidade">
            <Input required value={city} onChange={(e) => setCity(e.target.value)} />
          </Field>
          <Field label="Bairro">
            <Input
              required
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              placeholder="Centro Histórico"
            />
          </Field>
        </div>
      </Section>

      <Section title="Características">
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Quartos">
            <Input
              type="number"
              min={0}
              value={bedrooms}
              onChange={(e) => setBedrooms(Number(e.target.value))}
            />
          </Field>
          <Field label="Banheiros">
            <Input
              type="number"
              min={0}
              value={bathrooms}
              onChange={(e) => setBathrooms(Number(e.target.value))}
            />
          </Field>
          <Field label="Garagem">
            <div className="flex items-center gap-3 h-10">
              <Switch checked={garage} onCheckedChange={setGarage} />
              <span className="text-sm text-muted-foreground">
                {garage ? "Possui" : "Não possui"}
              </span>
            </div>
          </Field>
        </div>
      </Section>

      <Section title="Contato do anunciante">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nome">
            <Input required value={ownerName} onChange={(e) => setOwnerName(e.target.value)} />
          </Field>
          <Field label="Telefone / WhatsApp">
            <Input
              required
              value={ownerPhone}
              onChange={(e) => setOwnerPhone(e.target.value)}
              placeholder="(89) 99999-0000"
            />
          </Field>
        </div>
      </Section>

      <Section title="Fotos do imóvel">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {images.map((src, i) => (
            <div
              key={i}
              className="relative aspect-[4/3] overflow-hidden rounded-md border border-border bg-muted"
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => setImages((p) => p.filter((_, idx) => idx !== i))}
                className="absolute right-1.5 top-1.5 grid h-7 w-7 place-items-center rounded-full bg-background/90 hover:bg-background"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          {images.length < 6 && (
            <label className="flex aspect-[4/3] cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors">
              <Upload className="h-5 w-5" />
              <span className="text-xs">Adicionar foto</span>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => onFiles(e.target.files)}
              />
            </label>
          )}
        </div>
        <p className="text-xs text-muted-foreground">Até 6 imagens. JPG ou PNG.</p>
      </Section>

      <div className="flex justify-end">
        <Button type="submit" size="lg">
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 space-y-4">
      <h2 className="font-display text-xl">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
