import { r as reactExports } from "../_libs/react.mjs";
function currentUser() {
  const user = localStorage.getItem("oeiras_user");
  if (!user) return null;
  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
}
function useAuth() {
  const [user, setUser] = reactExports.useState(null);
  const [ready, setReady] = reactExports.useState(false);
  reactExports.useEffect(() => {
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
    refresh: () => setUser(currentUser())
  };
}
function emitAuthChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("auth-changed"));
  }
}
export {
  emitAuthChange as e,
  useAuth as u
};
