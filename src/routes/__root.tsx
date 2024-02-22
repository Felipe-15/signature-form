import { AnimatePresence } from "framer-motion";
import SideMenu from "../components/SideMenu";
import MenuContextProvider from "../contexts/MenuContext";
import "../index.css";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <main className="flex flex-col sm:flex-row mb-16 sm:p-4 bg-light-300 sm:bg-white shadow-md rounded-md w-full h-screen sm:max-h-[480px] max-w-[800px] m-auto overflow-hidden">
      <MenuContextProvider>
        <SideMenu />
        <AnimatePresence mode="wait" initial={false}>
          <Outlet />
        </AnimatePresence>
      </MenuContextProvider>
    </main>
  ),
});
