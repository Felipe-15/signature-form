import "../index.css";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <main className="flex bg-red-500">
      <aside className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          First Step
        </Link>{" "}
      </aside>
      <Outlet />
    </main>
  ),
});
