import { Link } from "@tanstack/react-router";

const routes = [
  ["YOUR INFO", "/"],
  ["SELECT PLAN", "/plans"],
  ["ADD-ONS", "/addons"],
  ["SUMMARY", "/summary"],
];

const SideMenu = () => {
  return (
    <aside className="flex gap-2 justify-center pt-8 bg-mobile-aside h-[160px] sm:h-full bg-cover min-h-20 sm:w-[200px] sm:bg-desktop-aside sm:rounded-md">
      <ul className="flex sm:flex-col gap-3 sm:gap-6">
        {routes.map(([text, linkPath], index) => {
          return (
            <li>
              <Link
                to={linkPath}
                className="w-fit h-fit flex gap-1 items-center justify-center group"
              >
                <span
                  className={`inline-flex items-center font-bold justify-center h-4 w-4 p-4 mr-2  text-white rounded-[50%] border-white border group-hover:bg-primary-300 group-hover:text-primary-500 transition group-[.active]:text-primary-500 group-[.active]:bg-white`}
                >
                  {index + 1}
                </span>
                <p className="hidden sm:flex flex-col font-bold">
                  <span className="text-xs text-light-500">
                    STEP {index + 1}
                  </span>
                  <span className="text-white text-sm">{text}</span>
                </p>
              </Link>{" "}
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default SideMenu;
