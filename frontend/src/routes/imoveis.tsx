import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/imoveis")({
  component: ImoveisLayout,
});

function ImoveisLayout() {
  return <Outlet />;
}