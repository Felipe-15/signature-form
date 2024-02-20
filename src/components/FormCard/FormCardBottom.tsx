// interface FormCardBottomProps {
//     children: React.ReactNode;
//   }

const FormCardBottom = () => {
  return (
    <footer className="mt-auto fixed sm:static bottom-0 left-0 right-0 bg-white px-2 py-4 flex justify-center sm:justify-end sm:p-0">
      <div className="flex sm:max-w-max justify-end max-w-[360px] w-full">
        <button className="bg-primary-500 text-white font-bold py-2 px-6 rounded-md transition hover:bg-primary-400">
          Next Step
        </button>
      </div>
    </footer>
  );
};

export default FormCardBottom;
