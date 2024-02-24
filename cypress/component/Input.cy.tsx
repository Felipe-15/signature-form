import Input from "../../src/components/Input";

describe("<Input />", () => {
  it("should render the Input component", () => {
    // see: https://on.cypress.io/mounting-react

    cy.mount(<Input register={{}} label="test" placeholder="test" />);
    cy.get("input").should("be.visible");
    cy.get("label").should("contain", "test");
  });
  it("should modify style when has error and shows the message", () => {
    cy.mount(
      <Input label="test" register={{}} placeholder="test" error="error" />
    );
    cy.get("small").should("contain", "error");
    cy.get("input").should("have.css", "border-color", "rgb(237, 53, 72)");
  });
});
