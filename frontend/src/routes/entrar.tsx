import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser } from "@/lib/store";
import { emitAuthChange } from "@/hooks/use-auth";
import { toast } from "sonner";

export const Route = createFileRoute("/entrar")({
  head: () => ({ meta: [{ title: "Entrar — CasaOeiras" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      loginUser(email, password);
      emitAuthChange();
      toast.success("Bem-vindo de volta!");
      navigate({ to: "/painel" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao entrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteLayout>
      <div className="mx-auto max-w-md px-4 py-20">
        <div className="text-center">
          <h1 className="font-display text-4xl">Entrar</h1>
          <p className="mt-2 text-sm text-muted-foreground">Acesse sua conta para gerenciar seus imóveis</p>
        </div>

        <form onSubmit={onSubmit} className="mt-10 space-y-4 rounded-xl border border-border bg-card p-7">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@email.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          </div>
          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? "Entrando…" : "Entrar"}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Ainda não tem conta?{" "}
            <Link to="/cadastro" className="text-primary font-medium hover:underline">Cadastre-se</Link>
          </p>
        </form>
      </div>
    </SiteLayout>
  );
}
