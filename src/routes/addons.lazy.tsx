import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { FormCard } from "../components/FormCard";
import { useContext, useEffect, useState } from "react";
import { addons } from "../db/data";
import { MenuContext } from "../contexts/MenuContext";
import AddonCard from "../components/AddonCard";
import { Addon } from "../interfaces/Addon";

export const Route = createLazyFileRoute("/addons")({
  component: Addons,
});

function Addons() {
  const navigate = useNavigate();
  const { pathPermissions, setPathPermissions } = useContext(MenuContext);

  const type =
    (localStorage.getItem("type") as "monthly" | "yearly" | null) || "monthly";

  const [addonsSelected, setAddonsSelected] = useState<Addon[]>([]);

  const handleSelect = (selectedAddon: Addon) => {
    const filtered = addonsSelected.filter(
      (addon) => addon.id !== selectedAddon.id
    );

    if (filtered.length !== addonsSelected.length) {
      setAddonsSelected(filtered);
      return;
    }
    setAddonsSelected((prev) => [...prev, selectedAddon]);
  };

  const handleNextStep = () => {
    localStorage.setItem("addons", JSON.stringify(addonsSelected));
    setPathPermissions((prev) => ({ ...prev, "/summary": true }));
    navigate({
      from: "/addons",
      to: "/summary",
    });
  };

  useEffect(() => {
    const recoveredAddons = JSON.parse(localStorage.getItem("addons") || "[]");

    if (recoveredAddons.length) {
      setAddonsSelected(recoveredAddons);
    } else if (!pathPermissions["/plans"]) {
      navigate({ to: "/" });
    }
  }, [navigate, pathPermissions]);

  return (
    <FormCard.Root>
      <FormCard.Title>Pick add-ons</FormCard.Title>
      <FormCard.Subtitle>
        Add-ons help enhance your gaming experience.
      </FormCard.Subtitle>
      <ul className="flex flex-col gap-3">
        {addons.map((addon) => {
          return (
            <li key={addon.id.toString()}>
              <AddonCard
                {...addon}
                price={
                  addon[type === "monthly" ? "monthlyPrice" : "yearlyPrice"]
                }
                onSelect={() => handleSelect(addon)}
                type={type || "monthly"}
                selected={
                  !!addonsSelected.find((selected) => addon.id === selected.id)
                }
              />
            </li>
          );
        })}
      </ul>
      <FormCard.Bottom nextFunction={handleNextStep} previousURL="/plans" />
    </FormCard.Root>
  );
}
