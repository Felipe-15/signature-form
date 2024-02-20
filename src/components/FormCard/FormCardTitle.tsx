interface FormCardTitleProps {
  children: React.ReactNode;
}

const FormCardTitle = ({ children }: FormCardTitleProps) => {
  return (
    <h2 className="font-bold text-2xl sm:text-3xl text-primary-500 mb-2">
      {children}
    </h2>
  );
};

export default FormCardTitle;
