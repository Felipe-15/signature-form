import AddonCard from "../../src/components/AddonCard";
import { Addon } from "../../src/interfaces/Addon";

const mockAddon: Addon = {
  id: 1,
  title: "test",
  description: "description test",
  monthlyPrice: 2,
  yearlyPrice: 20,
};

describe("<AddonCard />", () => {
  it("should render the AddonCard component", () => {
    cy.mount(
      <AddonCard
        {...mockAddon}
        type="monthly"
        selected={false}
        price={mockAddon.monthlyPrice}
        onSelect={() => null}
      />
    );
    cy.get("label").should("contain", "test");
  });
  it("should call the onSelect function when clicked", () => {
    const spy = cy.spy().as("onSelect");
    cy.mount(
      <AddonCard
        {...mockAddon}
        type="monthly"
        selected={false}
        price={mockAddon.monthlyPrice}
        onSelect={spy}
      />
    );
    cy.get("label").should("contain", "test").click();
    cy.get("@onSelect").should("have.been.called");
  });
});
