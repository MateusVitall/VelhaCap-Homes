import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { API_URL } from "@/lib/config";
import { loginSchema, registerSchema } from "@/lib/validations";

export const Route = createFileRoute("/entrar")({
  head: () => ({ meta: [{ title: "Entrar — VelhaCap-homes" }] }),
  validateSearch: (search: Record<string, unknown>) => ({
    tab: (search.tab as string) || "login",
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { tab } = Route.useSearch();

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Register state
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerLoading, setRegisterLoading] = useState(false);

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = loginSchema.safeParse({ email: loginEmail, password: loginPassword });
    if (!parsed.success) {
      const firstError = parsed.error.flatten().fieldErrors;
      const msg = Object.values(firstError).flat()[0] || "Dados inválidos";
      toast.error(msg);
      return;
    }

    setLoginLoading(true);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginEmail.trim(),
          password: loginPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("E-mail ou senha inválidos");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("oeiras_session", data.user.id);
      localStorage.setItem("oeiras_user", JSON.stringify(data.user));

      toast.success("Bem-vindo de volta!");
      navigate({ to: "/painel" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao entrar");
    } finally {
      setLoginLoading(false);
    }
  };

  const onRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = registerSchema.safeParse({
      name: registerName,
      email: registerEmail,
      password: registerPassword,
    });
    if (!parsed.success) {
      const firstError = parsed.error.flatten().fieldErrors;
      const msg = Object.values(firstError).flat()[0] || "Dados inválidos";
      toast.error(msg);
      return;
    }

    setRegisterLoading(true);

    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: registerName.trim(),
          email: registerEmail.trim(),
          password: registerPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Não foi possível criar a conta");
      }

      // Auto-login after successful registration
      const loginResponse = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: registerEmail.trim(),
          password: registerPassword,
        }),
      });

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        toast.success("Conta criada com sucesso! Faça login para continuar.");
        navigate({ to: "/entrar" });
        return;
      }

      localStorage.setItem("token", loginData.token);
      localStorage.setItem("oeiras_session", loginData.user.id);
      localStorage.setItem("oeiras_user", JSON.stringify(loginData.user));

      toast.success("Conta criada com sucesso!");
      navigate({ to: "/painel" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao criar conta");
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <SiteLayout>
      <div className="mx-auto max-w-md px-4 py-20">
        <div className="text-center">
          <h1 className="font-display text-4xl">Bem-vindo</h1>
          <p className="mt-2 text-sm text-muted-foreground">Acesse sua conta ou crie uma nova</p>
        </div>

        <Tabs defaultValue={tab === "cadastro" ? "cadastro" : "login"} className="mt-10">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">LOGIN</TabsTrigger>
            <TabsTrigger value="cadastro">CADASTRO</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form
              onSubmit={onLogin}
              className="mt-4 space-y-4 rounded-xl border border-border bg-card p-7"
            >
              <div className="space-y-2">
                <Label htmlFor="login-email">E-mail</Label>
                <Input
                  id="login-email"
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="voce@email.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password">Senha</Label>
                <Input
                  id="login-password"
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={loginLoading}>
                {loginLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="cadastro">
            <form
              onSubmit={onRegister}
              className="mt-4 space-y-4 rounded-xl border border-border bg-card p-7"
            >
              <div className="space-y-2">
                <Label htmlFor="register-name">Nome completo</Label>
                <Input
                  id="register-name"
                  required
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value.trimStart())}
                  placeholder="Nome e sobrenome"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-email">E-mail</Label>
                <Input
                  id="register-email"
                  type="email"
                  required
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  placeholder="voce@email.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-password">Senha</Label>
                <Input
                  id="register-password"
                  type="password"
                  required
                  minLength={8}
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  placeholder="Mínimo 8 caracteres"
                />
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={registerLoading}>
                {registerLoading ? "Criando..." : "Cadastrar"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </SiteLayout>
  );
}
