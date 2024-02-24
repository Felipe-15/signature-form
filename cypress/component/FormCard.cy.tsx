import { FormCard } from "../../src/components/FormCard";

describe("<FormCard />", () => {
  it("should render all component parts", () => {
    cy.mount(
      <FormCard.Root>
        <FormCard.Title>Title test</FormCard.Title>
        <FormCard.Subtitle>Subtitle test</FormCard.Subtitle>
        <FormCard.Bottom nextFunction={() => null} />
      </FormCard.Root>
    );
    cy.get("section").should("be.visible");
    cy.get("h2").should("contain", "Title test");
    cy.get("p").should("contain", "Subtitle test");
    cy.get("footer").should("be.visible");
    cy.get("button").should("be.visible");
  });
  it("should call the nextFunction when click on button", () => {
    cy.mount(
      <FormCard.Root>
        <FormCard.Bottom nextFunction={cy.spy().as("onNext")} />
      </FormCard.Root>
    );
    cy.get("button").click();
    cy.get("@onNext").should("have.been.called");
  });
});
