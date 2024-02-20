import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: StepOne,
});

function StepOne() {
  return (
    <section className="flex flex-col mx-auto w-full max-w-[360px] rounded-lg shadow-md -mt-16 sm:mt-0 px-6 py-8 bg-white  sm:bg-transparent sm:shadow-none sm:pb-2 sm:max-w-[460px]">
      <h2 className="font-bold text-2xl sm:text-3xl text-primary-500 mb-2">
        Personal info
      </h2>
      <p className="text-sm md:text-nowrap text-light-500 font-bold mb-4">
        Please provide your name, email address, and phone number.
      </p>
      <label htmlFor="name" className="text-sm text-primary-500 sm:mb-1">
        Name
      </label>
      <input
        id="name"
        className="p-3 sm:py-2 px-3 font-medium border border-primary-500 rounded-md mb-3 sm:mb-6"
        placeholder="e.g. Felipe Souza"
      ></input>
      <label htmlFor="email" className="text-sm text-primary-500 sm:mb-1">
        Email Address
      </label>
      <input
        id="email"
        className="p-3 sm:py-2 px-3 font-medium border border-primary-500 rounded-md mb-3 sm:mb-6"
        placeholder="e.g. felipesouza@lorem.com"
      ></input>
      <label htmlFor="phone" className="text-sm text-primary-500 sm:mb-1">
        Phone Number
      </label>
      <input
        id="phone"
        className="p-3 sm:py-2 px-3 font-medium border border-primary-500 rounded-md"
        placeholder="e.g. 88 9 9999-9999"
      ></input>
      <div className="mt-auto fixed sm:static bottom-0 left-0 right-0 bg-white px-2 py-4 flex justify-center sm:justify-end sm:p-0">
        <div className="flex sm:max-w-max justify-end max-w-[360px] w-full">
          <button className="bg-primary-500 text-white font-bold py-2 px-6 rounded-md transition hover:bg-primary-400">
            Next Step
          </button>
        </div>
      </div>
    </section>
  );
}
