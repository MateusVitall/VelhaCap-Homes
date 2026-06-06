import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import { PropertyForm } from "@/components/PropertyForm";
import { saveProperty } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/painel/novo")({
  component: NewProperty,
});

function NewProperty() {
  const { user } = useAuth();
  const navigate = useNavigate();
  if (!user) return null;

  return (
    <div>
      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Novo anúncio</span>
      <h1 className="font-display text-4xl mt-1 mb-8">Cadastrar imóvel</h1>

      <PropertyForm
        submitLabel="Publicar imóvel"
        defaultOwnerName={user.name}
        onSubmit={(values) => {
          try {
            console.log("ANTES SAVE");

            saveProperty({
              ...values,
             id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
              ownerId: user.id,
              createdAt: Date.now(),
            });

            console.log("DEPOIS SAVE");

            toast.success("Imóvel publicado com sucesso!");

            navigate({ to: "/painel/imoveis" });
          } catch (error) {
            console.error("ERRO NO SAVE:", error);
          }
        }}
      />
    </div>
  );
}
