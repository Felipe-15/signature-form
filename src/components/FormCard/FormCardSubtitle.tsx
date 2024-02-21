interface FormCardSubtitleProps {
  children: React.ReactNode;
}

const FormCardSubtitle = ({ children }: FormCardSubtitleProps) => {
  return (
    <p className="text-sm md:text-nowrap text-light-500 font-medium mb-4">
      {children}
    </p>
  );
};

export default FormCardSubtitle;
