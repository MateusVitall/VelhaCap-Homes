import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { API_URL } from "@/lib/config";
import { registerSchema } from "@/lib/validations";

export const Route = createFileRoute("/cadastro")({
  head: () => ({ meta: [{ title: "Criar conta — VelhaCap-homes" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = registerSchema.safeParse({ name, email, password });
    if (!parsed.success) {
      const firstError = parsed.error.flatten().fieldErrors;
      const msg = Object.values(firstError).flat()[0] || "Dados inválidos";
      toast.error(msg);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Não foi possível criar a conta");
      }

      toast.success("Conta criada com sucesso!");

      navigate({ to: "/entrar" });
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Erro ao criar conta"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteLayout>
      <div className="mx-auto max-w-md px-4 py-20">
        <div className="text-center">
          <h1 className="font-display text-4xl">Criar conta</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            É grátis e leva menos de um minuto
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="mt-10 space-y-4 rounded-xl border border-border bg-card p-7"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Nome completo</Label>
            <Input
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="voce@email.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={loading}
          >
            {loading ? "Criando..." : "Criar conta"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Já tem uma conta?{" "}
            <Link
              to="/entrar"
              className="text-primary font-medium hover:underline"
            >
              Entrar
            </Link>
          </p>
        </form>
      </div>
    </SiteLayout>
  );
}