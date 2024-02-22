import { createContext, useState } from "react";
import { paths } from "../paths";

const routePaths: { [key: string]: boolean } = {};

paths.forEach((path) => (routePaths[path[1]] = false));
routePaths["/"] = true;

export const MenuContext = createContext({
  pathPermissions: routePaths,
} as {
  pathPermissions: { [key: string]: boolean };
  setPathPermissions:
    | ((data: { [key: string]: boolean }) => void)
    | ((set: (prev: { [key: string]: boolean }) => object) => object);
});

const MenuContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [pathPermissions, setPathPermissions] = useState(routePaths);

  return (
    <MenuContext.Provider value={{ pathPermissions, setPathPermissions }}>
      {children}
    </MenuContext.Provider>
  );
};

export default MenuContextProvider;
