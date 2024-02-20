import { createLazyFileRoute } from "@tanstack/react-router";
import { FormCard } from "../components/FormCard";

export const Route = createLazyFileRoute("/")({
  component: StepOne,
});

function StepOne() {
  return (
    <FormCard.Root>
      <FormCard.Title>Personal info</FormCard.Title>
      <FormCard.Subtitle>
        Please provide your name, email address, and phone number.
      </FormCard.Subtitle>
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
      <FormCard.Bottom />
    </FormCard.Root>
  );
}
