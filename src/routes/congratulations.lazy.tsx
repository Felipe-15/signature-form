import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/congratulations")({
  component: Congratulations,
});

function Congratulations() {
  return <></>;
}
