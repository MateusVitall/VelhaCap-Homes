import { useEffect, useState } from "react";
import { currentUser, type User } from "@/lib/store";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUser(currentUser());
    setReady(true);
    const onStorage = () => setUser(currentUser());
    window.addEventListener("storage", onStorage);
    window.addEventListener("auth-changed", onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("auth-changed", onStorage);
    };
  }, []);

  return { user, ready, refresh: () => setUser(currentUser()) };
}

export function emitAuthChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("auth-changed"));
  }
}
