import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import { PropertyForm } from "@/components/PropertyForm";
import { getProperty, saveProperty } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/painel/editar/$id")({
  loader: ({ params }) => {
    const property = getProperty(params.id);
    if (!property) throw notFound();
    return { property };
  },
  notFoundComponent: () => <div className="p-8">Imóvel não encontrado.</div>,
  errorComponent: ({ reset }) => (
    <div className="p-8">
      Erro. <button onClick={reset} className="underline">Tentar novamente</button>
    </div>
  ),
  component: EditProperty,
});

function EditProperty() {
  const { property } = Route.useLoaderData();
  const { user } = useAuth();
  const navigate = useNavigate();
  if (!user) return null;

  return (
    <div>
      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Editar</span>
      <h1 className="font-display text-4xl mt-1 mb-8">Editar imóvel</h1>

      <PropertyForm
        initial={property}
        submitLabel="Salvar alterações"
        defaultOwnerName={user.name}
        onSubmit={(values) => {
          saveProperty({
            ...property,
            ...values,
          });
          toast.success("Alterações salvas!");
          navigate({ to: "/painel/imoveis" });
        }}
      />
    </div>
  );
}
