import { Link } from "@tanstack/react-router";

interface FormCardBottomProps {
  previousURL?: string;
}

const FormCardBottom = ({ previousURL }: FormCardBottomProps) => {
  return (
    <footer className="mt-auto fixed sm:static bottom-0 left-0 right-0 bg-white px-2 py-4 flex justify-center sm:justify-end sm:p-0">
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
        <button className="bg-primary-500 text-white font-bold py-2 px-6 rounded-md transition hover:bg-primary-400">
          Next Step
        </button>
      </div>
    </footer>
  );
};

export default FormCardBottom;
