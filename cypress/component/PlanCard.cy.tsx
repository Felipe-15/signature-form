import PlanCard from "../../src/components/PlanCard";
import { Plan } from "../../src/interfaces/Plan";

const mockPlan: Plan = {
  id: 1,
  title: "test",
  monthlyPrice: 60,
  yearlyPrice: 160,
};

describe("<PlanCard />", () => {
  it("should render the component", () => {
    cy.mount(
      <PlanCard
        imageURL="images/icon-arcade.svg"
        {...mockPlan}
        type="monthly"
        isSelected={false}
        onSelect={() => null}
        price={mockPlan.monthlyPrice}
      />
    );
    cy.get("p").should("contain", "test");
  });
  it("should call the onSelect function when clicked", () => {
    const spy = cy.spy().as("onSelect");
    cy.mount(
      <PlanCard
        imageURL="images/icon-arcade.svg"
        {...mockPlan}
        type="monthly"
        isSelected={false}
        onSelect={spy}
        price={mockPlan.monthlyPrice}
      />
    );
    cy.get("button").click();
    cy.get("@onSelect").should("have.been.called");
  });
});
