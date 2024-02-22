import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { FormCard } from "../components/FormCard";
import { useContext, useEffect, useState } from "react";
import { addons } from "../db/data";
import { MenuContext } from "../contexts/MenuContext";

export const Route = createLazyFileRoute("/addons")({
  component: Addons,
});

interface AddonCardProps {
  title: string;
  description: string;
  price: number;
  type: "monthly" | "yearly";
  selected: boolean;
  onSelect: () => void;
}

const AddonCard = ({
  title,
  description,
  price,
  type,
  selected,
  onSelect,
}: AddonCardProps) => {
  const [isSelected, setIsSelected] = useState(selected);
  const handleSelect = () => {
    setIsSelected((prev) => !prev);
    onSelect();
  };

  if (selected && !isSelected) {
    setIsSelected(selected);
  }

  return (
    <label
      data-selected={isSelected}
      className={`relative flex cursor-pointer items-center w-full rounded-md border  p-3 transition hover:border-primary-400 data-[selected=true]:border-primary-400 data-[selected=true]:bg-light-300 border-light-400 group`}
    >
      <input
        onChange={handleSelect}
        checked={isSelected}
        type="checkbox"
        className="hidden absolute peer"
      />
      <div className="w-5 h-5 flex items-center justify-center peer-checked:bg-primary-400 transition border border-light-400 rounded-md mr-3 shrink-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="12"
          height="12"
          viewBox="0,0,256,256"
        >
          <g
            fill="#ffffff"
            fillRule="nonzero"
            stroke="none"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeMiterlimit="10"
            strokeDasharray=""
            strokeDashoffset="0"
            fontFamily="none"
            fontWeight="none"
            fontSize="none"
            textAnchor="none"
          >
            <g transform="scale(9.84615,9.84615)">
              <path d="M22.56641,4.73047l-1.79297,-1.21875c-0.49609,-0.33594 -1.17578,-0.20703 -1.50781,0.28516l-8.78906,12.96094l-4.03906,-4.03906c-0.42187,-0.42187 -1.10937,-0.42187 -1.53125,0l-1.53516,1.53516c-0.42187,0.42188 -0.42187,1.10938 0,1.53516l6.21094,6.21094c0.34766,0.34766 0.89453,0.61328 1.38672,0.61328c0.49219,0 0.98828,-0.30859 1.30859,-0.77344l10.57813,-15.60547c0.33594,-0.49219 0.20703,-1.16797 -0.28906,-1.50391z"></path>
            </g>
          </g>
        </svg>
      </div>
      <p className="flex flex-col">
        <span className="font-bold text-primary-500">{title}</span>
        <span className="text-light-400 text-sm">{description}</span>
      </p>
      <span className="text-primary-400 ml-auto">
        +${price.toString()}/{type === "monthly" ? "mo" : "yr"}
      </span>
    </label>
  );
};

function Addons() {
  const navigate = useNavigate();
  const { pathPermissions, setPathPermissions } = useContext(MenuContext);

  const type =
    (localStorage.getItem("type") as "monthly" | "yearly" | null) || "monthly";

  const [addonsSelected, setAddonsSelected] = useState<number[]>([]);

  const handleSelect = (id: number) => {
    const filtered = addonsSelected.filter((addonId) => addonId !== id);

    if (filtered.length !== addonsSelected.length) {
      setAddonsSelected(filtered);
      return;
    }
    setAddonsSelected((prev) => [...prev, id]);
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
    } else if (!pathPermissions["/addons"]) {
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
        {addons.info.map((addon) => {
          return (
            <li key={addon.id.toString()}>
              <AddonCard
                {...addon}
                price={addons.prices[type][addon.id as 1]}
                onSelect={() => handleSelect(addon.id)}
                type={type || "monthly"}
                selected={
                  !!addonsSelected.find((addonId) => addon.id === addonId)
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
