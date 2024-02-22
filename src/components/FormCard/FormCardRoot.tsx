import { AnimatePresence, motion } from "framer-motion";

interface FormCardRootProps {
  children: React.ReactNode;
}

const FormCardRoot = ({ children }: FormCardRootProps) => {
  return (
    <AnimatePresence>
      <motion.section
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className="flex flex-col mx-auto w-full max-w-[360px] rounded-lg shadow-md -mt-16 sm:mt-0 px-6 py-8 bg-white  sm:bg-transparent sm:shadow-none sm:pb-2 sm:max-w-[460px]"
      >
        {children}
      </motion.section>
    </AnimatePresence>
  );
};

export default FormCardRoot;
