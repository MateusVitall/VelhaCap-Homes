import { useEffect, useState } from "react";

export type User = {
  id: string;
  name: string;
  email: string;
  telefone?: string;
};

function currentUser(): User | null {
  const user = localStorage.getItem("oeiras_user");

  if (!user) return null;

  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUser(currentUser());
    setReady(true);

    const onStorage = () => {
      setUser(currentUser());
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("auth-changed", onStorage);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("auth-changed", onStorage);
    };
  }, []);

  return {
    user,
    ready,
    refresh: () => setUser(currentUser()),
  };
}

export function emitAuthChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("auth-changed"));
  }
}
