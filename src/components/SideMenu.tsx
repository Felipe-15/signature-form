import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { paths } from "../paths";
import { useContext, useEffect } from "react";
import { MenuContext } from "../contexts/MenuContext";

const SideMenu = () => {
  const { pathPermissions, setPathPermissions } = useContext(MenuContext);

  useEffect(() => {
    const type = localStorage.getItem("type");
    const plan = localStorage.getItem("selectedPlan");

    setPathPermissions((prev) => ({
      ...prev,
      "/plans": !!plan,
      "/addons": !!plan,
      "/summary": !!plan && !!type,
    }));
  }, []);

  return (
    <aside
      className={`flex gap-2 justify-center pt-8 h-[160px] sm:h-full bg-[url('../images/bg-sidebar-mobile.svg')] sm:bg-[url('../images/bg-sidebar-desktop.svg')] bg-cover min-h-20 sm:w-[200px]  sm:rounded-md`}
    >
      <ul className="flex sm:flex-col gap-3 sm:gap-6">
        {paths.map(([text, linkPath], index) => {
          const isAllowed = pathPermissions[linkPath];
          return (
            <motion.li
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", delay: 0.2 * (index + 1) }}
              key={index.toString()}
              data-disabled={!isAllowed}
              className="data-[disabled=true]:cursor-not-allowed"
            >
              <Link
                to={linkPath}
                className="w-fit h-fit flex gap-1 items-center justify-center group"
                disabled={!isAllowed}
              >
                <span
                  data-disabled={!isAllowed}
                  className={`inline-flex items-center font-bold justify-center h-4 w-4 p-4 mr-2  text-white rounded-[50%] border-white border data-[disabled=false]:group-hover:bg-primary-300 data-[disabled=false]:group-hover:text-primary-500 transition group-[.active]:text-primary-500 group-[.active]:bg-white`}
                >
                  {index + 1}
                </span>
                <p className="hidden sm:flex flex-col font-bold">
                  <span className="text-xs text-light-500 font-normal">
                    STEP {index + 1}
                  </span>
                  <span className="text-white text-sm">{text}</span>
                </p>
              </Link>{" "}
            </motion.li>
          );
        })}
      </ul>
    </aside>
  );
};

export default SideMenu;
