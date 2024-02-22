import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  register: object;
  error?: string;
  label: string;
}

const Input = ({ register, error, label, ...rest }: InputProps) => {
  return (
    <>
      <div className="flex justify-between items-center w-full">
        <label htmlFor={rest.id} className="text-sm text-primary-500 sm:mb-1">
          {label}
        </label>
        <small className="text-attention">{error}</small>
      </div>
      <input
        data-error={!!error}
        className="p-3 sm:py-2 px-3 outline-transparent focus:border-primary-500  border border-light-400 transition rounded-md mb-3 sm:mb-6 data-[error=true]:border-attention"
        {...rest}
        {...register}
      ></input>
    </>
  );
};

export default Input;
