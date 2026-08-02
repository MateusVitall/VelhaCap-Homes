import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/cadastro")({
  head: () => ({ meta: [{ title: "Criar conta — VelhaCap-homes" }] }),
  component: RegisterRedirect,
});

function RegisterRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate({ to: "/entrar", search: { tab: "cadastro" }, replace: true });
  }, [navigate]);

  return null;
}
