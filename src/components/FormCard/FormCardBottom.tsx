import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import "./animation.css";

interface FormCardBottomProps {
  previousURL?: string;
  nextFunction: () => void;
  disabled?: boolean;
}

const FormCardBottom = ({
  previousURL,
  disabled,
  nextFunction,
}: FormCardBottomProps) => {
  const isMobile = window.innerWidth <= 640;
  const variants = isMobile ? { y: 300 } : {};
  return (
    <motion.footer
      initial={variants}
      animate={{ y: 0 }}
      transition={{ type: "spring", duration: 0.5, delay: 0.8 }}
      exit={variants}
      className="mt-auto fixed sm:static bottom-0 left-0 right-0 bg-white px-2 py-4 flex justify-center sm:justify-end sm:p-0"
    >
      <div
        className={`flex items-center sm:max-w-none max-w-[360px] w-full ${previousURL ? "justify-between" : "justify-end"}`}
      >
        {!!previousURL && (
          <Link
            to={previousURL}
            className="font-medium text-light-500 transition hover:text-primary-500 text-center h-fit"
          >
            Go back
          </Link>
        )}
        <button
          onClick={nextFunction}
          disabled={disabled}
          className="bg-primary-500 text-white font-bold py-2 px-6 rounded-md transition hover:bg-primary-400 disabled:bg-light-500 disabled:cursor-not-allowed"
        >
          Next Step
        </button>
      </div>
    </motion.footer>
  );
};

export default FormCardBottom;
