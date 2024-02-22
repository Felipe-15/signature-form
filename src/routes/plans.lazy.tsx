import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { FormCard } from "../components/FormCard";
import { plans } from "../db/data";
import { useContext, useEffect, useState } from "react";
import { MenuContext } from "../contexts/MenuContext";

export const Route = createLazyFileRoute("/plans")({
  component: SecondStep,
});

interface CardPlanProps {
  title: string;
  price: number;
  type: "monthly" | "yearly";
  imageURL: string;
  timeFree?: number;
  isSelected: boolean;
  onSelect: () => void;
}

const CardPlan = ({
  title,
  price,
  type,
  imageURL,
  timeFree,
  isSelected,
  onSelect,
}: CardPlanProps) => {
  return (
    <button
      onClick={onSelect}
      data-selected={isSelected}
      className="flex sm:flex-col sm:flex-1 sm:gap-6 sm:p-4 p-3 gap-3 w-full border border-light-400 rounded-md text-left transition hover:shadow-sm data-[selected=true]:bg-light-300 data-[selected=true]:border-primary-400 hover:border-primary-400"
    >
      <img src={imageURL} alt="Arcade plan image" />
      <p className="flex flex-col">
        <span className="text-primary-500 font-bold">{title}</span>
        <span className="text-light-400">
          ${price}/{type === "monthly" ? "mo" : "yr"}
        </span>
        {!!timeFree && (
          <span className="text-sm text-light-500">{timeFree} months free</span>
        )}
      </p>
    </button>
  );
};

function SecondStep() {
  const navigate = useNavigate();
  const { pathPermissions, setPathPermissions } = useContext(MenuContext);

  const [planType, setPlanType] = useState<"monthly" | "yearly">("monthly");
  const [selectedPlan, setSelectedPlan] = useState<number | undefined>();

  useEffect(() => {
    const recoveredPlanType = localStorage.getItem("type");
    const recoveredSelectedPlan = localStorage.getItem("selectedPlan");

    if (recoveredPlanType && recoveredSelectedPlan) {
      console.log("Entrou");
      setPlanType(recoveredPlanType as "monthly" | "yearly");
      setSelectedPlan(Number(recoveredSelectedPlan));
    } else if (!pathPermissions["/plans"]) {
      navigate({ to: "/" });
    }
  }, []);

  const handleNextStep = () => {
    if (!selectedPlan) {
      alert("Please select a plan");
      return;
    }

    localStorage.setItem("type", planType);
    localStorage.setItem("selectedPlan", selectedPlan.toString());

    setPathPermissions((prev) => ({ ...prev, "/addons": true }));

    navigate({
      from: "/plans",
      to: "/addons",
    });
  };

  return (
    <FormCard.Root>
      <FormCard.Title>Select your plan</FormCard.Title>
      <FormCard.Subtitle>
        You have the option of monthly or yearly billing.
      </FormCard.Subtitle>
      <section>
        <ul className="grid grid-cols-1 gap-2 w-full mb-6 sm:grid-cols-3">
          {plans["info"].map((plan) => (
            <li key={plan.id.toString()}>
              <CardPlan
                {...plan}
                price={plans.prices[planType][plan.id as 1]}
                isSelected={selectedPlan === plan.id}
                type={planType}
                timeFree={planType === "yearly" ? 2 : undefined}
                onSelect={() => setSelectedPlan(plan.id)}
              />
            </li>
          ))}
        </ul>
        <div className="flex w-full rounded-md bg-light-300 p-3 justify-center gap-4">
          <span
            data-checked={planType === "monthly"}
            className="data-[checked=true]:font-bold data-[checked=true]:text-primary-500 text-light-500 transition"
          >
            Monthly
          </span>
          <label className="inline-block relative h-6 w-12 cursor-pointer">
            <input
              defaultChecked={planType === "yearly"}
              onChange={() => {
                setSelectedPlan(undefined);
                setPlanType((prev) =>
                  prev === "monthly" ? "yearly" : "monthly"
                );
              }}
              type="checkbox"
              className="peer hidden"
            />
            <span className="absolute left-0 right-0 top-0 bottom-0 rounded-full  peer-checked:bg-primary-500 bg-light-400 before:absolute before:left-1 before:rounded-full transition-all before:transition-all peer-checked:before:translate-x-[22px] before:h-4 before:w-4 before:translate-y-[4px] before:border-light-400 peer-checked:before:border-primary-500 before:bg-primary-500 peer-checked:before:bg-light-300 border hover:border-primary-300"></span>
          </label>
          <span
            data-checked={planType === "yearly"}
            className="data-[checked=true]:font-bold data-[checked=true]:text-primary-500 text-light-500 transition"
          >
            Yearly
          </span>
        </div>
      </section>
      <FormCard.Bottom
        previousURL="/"
        nextFunction={handleNextStep}
        disabled={!selectedPlan}
      />
    </FormCard.Root>
  );
}
