const API_URL = "http://localhost:3000";

export async function getImoveis() {
  const response = await fetch(`${API_URL}/imoveis`);

  if (!response.ok) {
    throw new Error("Erro ao carregar imóveis");
  }

  return response.json();
}

export async function getImovel(id: string) {
  const response = await fetch(`${API_URL}/imoveis/${id}`);

  if (!response.ok) {
    throw new Error("Imóvel não encontrado");
  }

  return response.json();
}

export async function getMeusImoveis() {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/imoveis/meus-imoveis`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao carregar imóveis");
  }

  return response.json();
}

export async function deleteImovel(id: string) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/imoveis/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao excluir");
  }
}