import { Link } from "@tanstack/react-router";
import { Home, Instagram, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground">
              <Home className="h-4 w-4" />
            </span>
            <div className="font-display text-xl">Casa<span className="text-primary">Oeiras</span></div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            A plataforma de locação de imóveis da primeira capital do Piauí. Conectando moradores e
            proprietários com simplicidade.
          </p>
        </div>

        <div>
          <h4 className="font-display text-lg mb-3">Navegação</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground">Início</Link></li>
            <li><Link to="/imoveis" className="hover:text-foreground">Ver imóveis</Link></li>
            <li><Link to="/cadastro" className="hover:text-foreground">Anunciar imóvel</Link></li>
            <li><Link to="/entrar" className="hover:text-foreground">Entrar</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg mb-3">Contato</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5" /> Oeiras, Piauí — Brasil</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5" /> (89) 3462-0000</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5" /> contato@casaoeiras.com.br</li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg mb-3">Sobre</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Anuncie gratuitamente e alcance milhares de famílias buscando uma nova casa em Oeiras.
          </p>
          <div className="mt-4 flex gap-3">
            <a href="#" className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border hover:bg-background transition-colors">
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-5 text-xs text-muted-foreground flex flex-wrap items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} CasaOeiras. Todos os direitos reservados.</span>
          <span>Feito com cuidado em Oeiras-PI.</span>
        </div>
      </div>
    </footer>
  );
}
