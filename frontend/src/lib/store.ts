// Local persistence layer for users + properties (mock).
// Swap to Lovable Cloud for real auth & DB.
import prop1 from "@/assets/prop-1.jpg";
import prop2 from "@/assets/prop-2.jpg";
import prop3 from "@/assets/prop-3.jpg";
import prop4 from "@/assets/prop-4.jpg";
import prop5 from "@/assets/prop-5.jpg";
import prop6 from "@/assets/prop-6.jpg";

export type Property = {
  id: string;
  title: string;
  description: string;
  price: number;
  city: string;
  neighborhood: string;
  bedrooms: number;
  bathrooms: number;
  garage: boolean;
  images: string[];
  ownerId: string;
  ownerName: string;
  ownerPhone: string;
  createdAt: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string; // mock only
  phone?: string;
};

const USERS_KEY = "oeiras_users";
const SESSION_KEY = "oeiras_session";
const PROPS_KEY = "oeiras_properties";

const seedProps: Property[] = [
  {
    id: "seed-1",
    title: "Casa colonial restaurada no Centro Histórico",
    description:
      "Charmosa casa colonial completamente restaurada, com pé-direito alto, portas de madeira maciça e vista para a Praça das Vitórias. Mobiliada, pronta para morar.",
    price: 2200,
    city: "Oeiras",
    neighborhood: "Centro Histórico",
    bedrooms: 3,
    bathrooms: 2,
    garage: true,
    images: [prop2, prop1, prop4],
    ownerId: "seed",
    ownerName: "Maria das Graças",
    ownerPhone: "(89) 99999-1010",
    createdAt: Date.now() - 86400000 * 3,
  },
  {
    id: "seed-2",
    title: "Apartamento moderno próximo à Catedral",
    description:
      "Apartamento de 2 quartos com cozinha americana, totalmente reformado, a 5 minutos a pé da Catedral de Nossa Senhora da Vitória.",
    price: 1450,
    city: "Oeiras",
    neighborhood: "Bairro Pirajá",
    bedrooms: 2,
    bathrooms: 1,
    garage: true,
    images: [prop1, prop3, prop4],
    ownerId: "seed",
    ownerName: "João Carvalho",
    ownerPhone: "(89) 99999-2020",
    createdAt: Date.now() - 86400000 * 5,
  },
  {
    id: "seed-3",
    title: "Casa ampla com quintal no Bairro Cajueiro",
    description:
      "Excelente casa familiar com 4 quartos, área gourmet, quintal arborizado e garagem para 2 carros. Bairro tranquilo e arborizado.",
    price: 2850,
    city: "Oeiras",
    neighborhood: "Cajueiro",
    bedrooms: 4,
    bathrooms: 3,
    garage: true,
    images: [prop5, prop1, prop3],
    ownerId: "seed",
    ownerName: "Antônio Ribeiro",
    ownerPhone: "(89) 99999-3030",
    createdAt: Date.now() - 86400000 * 7,
  },
  {
    id: "seed-4",
    title: "Studio aconchegante para solteiros",
    description:
      "Studio bem localizado, ideal para estudantes ou profissionais. Mobiliado, com internet inclusa.",
    price: 850,
    city: "Oeiras",
    neighborhood: "Bairro do Rosário",
    bedrooms: 1,
    bathrooms: 1,
    garage: false,
    images: [prop6, prop1],
    ownerId: "seed",
    ownerName: "Patrícia Lima",
    ownerPhone: "(89) 99999-4040",
    createdAt: Date.now() - 86400000 * 10,
  },
  {
    id: "seed-5",
    title: "Casa térrea com varanda — Bairro Bequimão",
    description:
      "Casa térrea 3 quartos, sendo 1 suíte, sala ampla, varanda frontal e cozinha planejada. Próxima ao comércio.",
    price: 1850,
    city: "Oeiras",
    neighborhood: "Bequimão",
    bedrooms: 3,
    bathrooms: 2,
    garage: true,
    images: [prop2, prop4, prop1],
    ownerId: "seed",
    ownerName: "Francisca Souza",
    ownerPhone: "(89) 99999-5050",
    createdAt: Date.now() - 86400000 * 12,
  },
  {
    id: "seed-6",
    title: "Quitinete reformada — ideal para casal",
    description:
      "Quitinete recém-reformada com piso novo, banheiro completo e cozinha integrada. Bairro central.",
    price: 720,
    city: "Oeiras",
    neighborhood: "Centro",
    bedrooms: 1,
    bathrooms: 1,
    garage: false,
    images: [prop3, prop6],
    ownerId: "seed",
    ownerName: "Rafael Mendes",
    ownerPhone: "(89) 99999-6060",
    createdAt: Date.now() - 86400000 * 15,
  },
];

const isBrowser = typeof window !== "undefined";

function read<T>(key: string, fallback: T): T {
  if (!isBrowser) return fallback;
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}
function write<T>(key: string, value: T) {
  if (!isBrowser) return;
  localStorage.setItem(key, JSON.stringify(value));
}

export function getProperties(): Property[] {
  const stored = read<Property[] | null>(PROPS_KEY, null);
  if (stored && stored.length) return stored;
  write(PROPS_KEY, seedProps);
  return seedProps;
}
export function getProperty(id: string): Property | undefined {
  return getProperties().find((p) => p.id === id);
}
export function saveProperty(p: Property) {
  const all = getProperties();
  const idx = all.findIndex((x) => x.id === p.id);
  if (idx >= 0) all[idx] = p;
  else all.unshift(p);
  write(PROPS_KEY, all);
}
export function deleteProperty(id: string) {
  const all = getProperties().filter((p) => p.id !== id);
  write(PROPS_KEY, all);
}
export function getMyProperties(userId: string): Property[] {
  return getProperties().filter((p) => p.ownerId === userId);
}

// --- Auth (mock) ---
export function getUsers(): User[] {
  return read<User[]>(USERS_KEY, []);
}
export function registerUser(name: string, email: string, password: string): User {
  const users = getUsers();
  if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error("Já existe uma conta com este e-mail.");
  }
  const user: User = { id: crypto.randomUUID(), name, email, password };
  users.push(user);
  write(USERS_KEY, users);
  write(SESSION_KEY, user.id);
  return user;
}
export function loginUser(email: string, password: string): User {
  const user = getUsers().find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password,
  );
  if (!user) throw new Error("E-mail ou senha incorretos.");
  write(SESSION_KEY, user.id);
  return user;
}
export function logoutUser() {
  if (!isBrowser) return;
  localStorage.removeItem(SESSION_KEY);
}
export function currentUser(): User | null {
  if (!isBrowser) return null;
  const id = read<string | null>(SESSION_KEY, null);
  if (!id) return null;
  return getUsers().find((u) => u.id === id) ?? null;
}

export function formatBRL(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}
