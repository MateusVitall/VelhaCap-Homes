import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import { PropertyForm } from "@/components/PropertyForm";
import { toast } from "sonner";

export const Route = createFileRoute("/painel/novo")({
  head: () => ({ meta: [{ title: "Novo Imóvel — CasaOeiras" }] }),
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
        onSubmit={async (values) => {
          try {
            const token = localStorage.getItem("token");

            const response = await fetch("http://localhost:3000/imoveis", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
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
                imagens: values.images,
              }),
            });

            const data = await response.json();

            if (!response.ok) {
              console.log(data);
              throw new Error("Erro ao publicar imóvel");
            }

            toast.success("Imóvel publicado com sucesso!");

            navigate({ to: "/painel/imoveis" });
          } catch (error) {
            console.error(error);
            toast.error("Erro ao publicar imóvel");
          }
        }}
      />
    </div>
  );
}
