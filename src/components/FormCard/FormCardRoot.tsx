interface FormCardRootProps {
  children: React.ReactNode;
}

const FormCardRoot = ({ children }: FormCardRootProps) => {
  return (
    <section className="flex flex-col mx-auto w-full max-w-[360px] rounded-lg shadow-md -mt-16 sm:mt-0 px-6 py-8 bg-white  sm:bg-transparent sm:shadow-none sm:pb-2 sm:max-w-[460px]">
      {children}
    </section>
  );
};

export default FormCardRoot;
