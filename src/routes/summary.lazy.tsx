import { Link, createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { FormCard } from "../components/FormCard";
import { Plan } from "../interfaces/Plan";
import { Addon } from "../interfaces/Addon";

export const Route = createLazyFileRoute("/summary")({
  component: Summary,
});

function Summary() {
  const navigate = useNavigate();

  const type = localStorage.getItem("type") as "monthly";
  const plan: Plan = JSON.parse(localStorage.getItem("selectedPlan") || "{}");

  if (!type || !Object.keys(plan).length) {
    navigate({ from: "/summary", to: "/" });
    return <></>;
  }

  const priceType = type === "monthly" ? "monthlyPrice" : "yearlyPrice";

  const selectedAddons = JSON.parse(
    localStorage.getItem("addons") || "[]"
  ) as Addon[];

  const totalPrice =
    plan[priceType] +
    selectedAddons.reduce((sum, addon) => sum + addon[priceType], 0);

  return (
    <FormCard.Root>
      <FormCard.Title>Finishing up</FormCard.Title>
      <FormCard.Subtitle>
        Double-check everything looks OK before confirming
      </FormCard.Subtitle>
      <section>
        <div className="w-full rounded-md bg-light-300 p-4">
          <div className="flex justify-between pb-4 mb-4 border-b border-b-light-400">
            <p className="flex flex-col">
              <span className="text-primary-500 font-medium">
                {`${plan.title} (${type === "monthly" ? "Monthly" : "Yearly"})`}
              </span>
              <Link
                to="/plans"
                className="text-sm text-light-500 underline transition hover:text-primary-400"
              >
                Change
              </Link>
            </p>
            <span className="font-bold text-primary-500">
              ${plan[priceType]}/{type === "monthly" ? "mo" : "yr"}
            </span>
          </div>
          {!!selectedAddons && (
            <ul className="flex flex-col w-full gap-4">
              {selectedAddons.map((addon) => (
                <li
                  key={addon.id.toString()}
                  className="flex w-full justify-between"
                >
                  <span className="text-light-400 text-sm">{addon.title}</span>
                  <span className="text-light-500t text-sm">
                    +${addon[priceType]}/{type === "monthly" ? "mo" : "yr"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex w-full justify-between items-center px-4 mt-4">
          <span className="text-sm text-light-400">
            Total (per {type === "monthly" ? "month" : "year"})
          </span>
          <span className="font-bold text-lg text-primary-400">
            ${totalPrice}/{type === "monthly" ? "mo" : "yr"}
          </span>
        </div>
      </section>

      <FormCard.Bottom previousURL="/addons" nextFunction={() => {}} />
    </FormCard.Root>
  );
}
