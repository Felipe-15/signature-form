import { Link, createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { FormCard } from "../components/FormCard";
import { Plan } from "../interfaces/Plan";
import { Addon } from "../interfaces/Addon";
import Button from "../components/Button";
import { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuContext } from "../contexts/MenuContext";

export const Route = createLazyFileRoute("/summary")({
  component: Summary,
});

function Summary() {
  const navigate = useNavigate();
  const { setPathPermissions } = useContext(MenuContext);
  const [isFinished, setIsFinished] = useState(false);

  const type = localStorage.getItem("type") as "monthly";
  const plan: Plan = JSON.parse(localStorage.getItem("selectedPlan") || "{}");

  const handleConfirm = () => {
    localStorage.clear();
    localStorage.setItem("isFinished", "true");
    setPathPermissions({
      "/": false,
      "/plans": false,
      "/addons": false,
    });
    setIsFinished(true);
  };

  if (
    (!type || !Object.keys(plan).length) &&
    !localStorage.getItem("isFinished")
  ) {
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
  if (isFinished) {
    return (
      <AnimatePresence>
        <FormCard.Root>
          <article className="self-center my-auto flex items-center flex-col">
            <motion.img
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.1 }}
              src="images/icon-thank-you.svg"
              className="w-18 h-18 mb-6"
            />
            <FormCard.Title>Thank you!</FormCard.Title>
            <p className="text-sm text-center text-light-500 font-medium mb-4">
              Thanks for confirming your subscription! We hope you have fun
              using our platform. If you ever need support, please feel free to
              email us at support@loremgaming.com
            </p>
          </article>
        </FormCard.Root>
      </AnimatePresence>
    );
  } else {
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
                    <span className="text-light-400 text-sm">
                      {addon.title}
                    </span>
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

        <FormCard.Bottom previousURL="/addons">
          <Button alternative onClick={handleConfirm}>
            Confirm
          </Button>
        </FormCard.Bottom>
      </FormCard.Root>
    );
  }
}
