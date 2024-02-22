import { Plan } from "../interfaces/Plan";

interface PlanCardProps extends Plan {
  price: number;
  type: "monthly" | "yearly";
  imageURL: string;
  timeFree?: number;
  isSelected: boolean;
  onSelect: () => void;
}

const PlanCard = ({
  title,
  price,
  type,
  imageURL,
  timeFree,
  isSelected,
  onSelect,
}: PlanCardProps) => {
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

export default PlanCard;
