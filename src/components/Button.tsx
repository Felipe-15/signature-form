import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  alternative?: boolean;
}

const Button = ({ children, alternative, ...rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      data-alternative={alternative}
      className="bg-primary-500 text-white font-bold py-2 px-6 rounded-md transition-all hover:bg-primary-400 disabled:bg-light-500 disabled:cursor-not-allowed data-[alternative=true]:bg-primary-400 data-[alternative=true]:hover:brightness-125"
    >
      {children}
    </button>
  );
};

export default Button;
