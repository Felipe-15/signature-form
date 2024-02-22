import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { FormCard } from "../components/FormCard";
import { plans } from "../db/data";
import { useContext, useEffect, useState } from "react";
import { MenuContext } from "../contexts/MenuContext";
import PlanCard from "../components/PlanCard";

export const Route = createLazyFileRoute("/plans")({
  component: SecondStep,
});

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
    } else if (!pathPermissions["/plans"] && !localStorage.getItem("user")) {
      navigate({ to: "/" });
    }
  }, [navigate, pathPermissions]);

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
              <PlanCard
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
              defaultChecked={localStorage.getItem("type") === "yearly"}
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
