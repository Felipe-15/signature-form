import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <main>
      <aside className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          First Step
        </Link>{" "}
      </aside>
      <hr />
      <Outlet />
    </main>
  ),
});
