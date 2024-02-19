import SideMenu from "../components/SideMenu";
import "../index.css";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <main className="flex flex-col sm:flex-row sm:p-4 bg-white shadow-md rounded-md w-full h-screen max-h-[480px] max-w-[800px] m-auto">
      <SideMenu path={Route.path} />
      <Outlet />
    </main>
  ),
});
