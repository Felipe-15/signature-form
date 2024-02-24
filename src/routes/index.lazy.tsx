import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { FormCard } from "../components/FormCard";
import InputMask from "react-input-mask";
import { useForm, Controller } from "react-hook-form";
import { useContext } from "react";
import { MenuContext } from "../contexts/MenuContext";
import Input from "../components/Input";
import Button from "../components/Button";

export const Route = createLazyFileRoute("/")({
  component: StepOne,
});

type Fields = {
  name: string;
  email: string;
  phone: string;
};

function StepOne() {
  const navigate = useNavigate();

  const { setPathPermissions } = useContext(MenuContext);
  const userData = JSON.parse(localStorage.getItem("user") || "{}");

  const {
    handleSubmit,
    formState: { errors, isValid },
    clearErrors,
    control,
    register,
  } = useForm<Fields>({
    values: {
      email: userData.email || "",
      phone: userData.phone || "",
      name: userData.name || "",
    },
  });
  const handleNextStep = (data: Fields) => {
    localStorage.setItem("user", JSON.stringify({ ...data }));
    setPathPermissions((prev) => ({ ...prev, "/plans": true }));
    navigate({
      from: "/",
      to: "/plans",
      startTransition: true,
    });
  };
  return (
    <FormCard.Root>
      <FormCard.Title>Personal info</FormCard.Title>
      <FormCard.Subtitle>
        Please provide your name, email address, and phone number.
      </FormCard.Subtitle>
      <Input
        placeholder="e.g. Felipe Souza"
        register={{
          ...register("name", {
            required: { value: true, message: "This field is required!" },
          }),
        }}
        label="Name"
        id="name"
        error={errors.name?.message}
      />
      <Input
        placeholder="e.g. felipesouza@lorem.com"
        register={{
          ...register("email", {
            required: { value: true, message: "This field is required!" },
          }),
        }}
        label="Email Address"
        id="email"
        error={errors.name?.message}
      />
      <div className="flex justify-between items-center w-full">
        <label htmlFor="phone" className="text-sm text-primary-500 sm:mb-1">
          Phone Number
        </label>
        <small className="text-attention">{errors.phone?.message}</small>
      </div>

      <Controller
        name="phone"
        control={control}
        rules={{
          minLength: { value: 11, message: "Invalid phone format!" },
          required: { value: true, message: "This field is required!" },
        }}
        render={({ field: { value, ref, onChange } }) => {
          return (
            <InputMask
              id="phone"
              data-error={!!errors.phone?.message}
              mask={"(99) 9 9999-9999"}
              onChange={onChange}
              value={value}
              className="p-3 sm:py-2 px-3 outline-transparent focus:border-primary-500  border border-light-400 rounded-md transition data-[error=true]:border-attention"
              placeholder="e.g. (88) 9 9999-9999"
              ref={ref}
            />
          );
        }}
      />
      <FormCard.Bottom>
        <Button
          onClick={handleSubmit(handleNextStep, () =>
            setTimeout(clearErrors, 3000)
          )}
          disabled={!isValid}
        >
          Next Step
        </Button>
      </FormCard.Bottom>
    </FormCard.Root>
  );
}
