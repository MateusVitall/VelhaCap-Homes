import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { PropertyForm } from "@/components/PropertyForm";
import { toast } from "sonner";

export const Route = createFileRoute("/painel/editar/$id")({
  component: EditProperty,
});

function EditProperty() {
  const { id } = Route.useParams();

  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [property, setProperty] = useState<any>(null);

  useEffect(() => {
    async function loadProperty() {
      try {
        const response = await fetch(`http://localhost:3000/imoveis/${id}`);

        if (!response.ok) {
          throw new Error();
        }

        const data = await response.json();

        setProperty({
          title: data.titulo,
          description: data.descricao,
          price: data.preco,
          city: data.cidade,
          neighborhood: data.bairro,
          bedrooms: data.quartos,
          bathrooms: data.banheiros,
          garage: data.garagem,
          ownerName: data.ownerName ?? "",
          ownerPhone: data.ownerPhone ?? "",
          images: data.imagens ?? [],
        });
      } catch (error) {
        console.error(error);
        toast.error("Erro ao carregar imóvel");
      } finally {
        setLoading(false);
      }
    }

    loadProperty();
  }, [id]);

  if (!user) return null;

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!property) {
    return <div>Imóvel não encontrado.</div>;
  }

  return (
    <div>
      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Editar</span>

      <h1 className="font-display text-4xl mt-1 mb-8">Editar imóvel</h1>

      <PropertyForm
        initial={property}
        submitLabel="Salvar alterações"
        defaultOwnerName={user.name}
        onSubmit={async (values) => {
          try {
            const token = localStorage.getItem("token");

            console.log("ID SENDO EDITADO:", id);

            console.log("VALORES ENVIADOS:", {
              titulo: values.title,
              preco: values.price,
            });

            const response = await fetch(`http://localhost:3000/imoveis/${id}`, {
              method: "PUT",
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
              throw new Error();
            }

            toast.success("Alterações salvas!");

            navigate({
              to: "/painel/imoveis",
            });
          } catch (error) {
            console.error(error);
            toast.error("Erro ao atualizar imóvel");
          }
        }}
      />
    </div>
  );
}
