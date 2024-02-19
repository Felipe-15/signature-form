import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: StepOne,
});

function StepOne() {
  return <h1>Step One</h1>;
}
