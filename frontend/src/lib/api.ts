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

export async function uploadImage(file: File): Promise<string> {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("imagem", file);

  const response = await fetch(`${API_URL}/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Erro ao enviar imagem");
  }

  const data = await response.json();
  return data.url;
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