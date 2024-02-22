import { Link, createLazyFileRoute } from "@tanstack/react-router";
import { FormCard } from "../components/FormCard";
import { plans, addons } from "../db/data";
import { Plan } from "../interfaces/Plan";
import { Addon } from "../interfaces/Addon";

export const Route = createLazyFileRoute("/summary")({
  component: Summary,
});

function Summary() {
  const type = localStorage.getItem("type") as "monthly";

  const plan = plans.info.find(
    (plan) => plan.id === Number(localStorage.getItem("selectedPlan") || 1)
  ) as Plan & { price?: number };
  plan.price = plans.prices[type][plan.id as 1];

  let totalPrice = plan.price;

  const selectedAddonsIds = JSON.parse(
    localStorage.getItem("addons") || "[]"
  ) as number[];
  const selectedAddons: (Addon & { price: number })[] = [];

  for (const addon of addons.info) {
    if (selectedAddonsIds.includes(addon.id)) {
      const addonPrice = addons.prices[type][addon.id as 1];
      selectedAddons.push({
        ...addon,
        price: addonPrice,
      });

      totalPrice += addonPrice;
    }
  }

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
              ${plan.price}/{type === "monthly" ? "mo" : "yr"}
            </span>
          </div>
          {!!selectedAddons && (
            <ul className="flex flex-col w-full gap-4">
              {selectedAddons.map((addon) => (
                <li className="flex w-full justify-between">
                  <span className="text-light-400 text-sm">{addon.title}</span>
                  <span className="text-light-500t text-sm">
                    +${addon.price}/{type === "monthly" ? "mo" : "yr"}
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
