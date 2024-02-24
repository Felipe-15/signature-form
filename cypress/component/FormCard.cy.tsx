import { FormCard } from "../../src/components/FormCard";

describe("<FormCard />", () => {
  it("should render all component parts", () => {
    cy.mount(
      <FormCard.Root>
        <FormCard.Title>Title test</FormCard.Title>
        <FormCard.Subtitle>Subtitle test</FormCard.Subtitle>
        <FormCard.Bottom>
          <></>
        </FormCard.Bottom>
      </FormCard.Root>
    );
    cy.get("section").should("be.visible");
    cy.get("h2").should("contain", "Title test");
    cy.get("p").should("contain", "Subtitle test");
    cy.get("footer").should("be.visible");
    cy.get("button").should("be.visible");
  });
  it("should render the link when previousURL is given", () => {
    cy.mount(
      <FormCard.Root>
        <FormCard.Bottom previousURL="/">
          <></>
        </FormCard.Bottom>
      </FormCard.Root>
    );
    cy.get("a").should("contain", "Back");
    cy.get("@onNext").should("have.been.called");
  });
});
