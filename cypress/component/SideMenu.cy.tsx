import { Link } from "@tanstack/react-router";
import SideMenu from "../../src/components/SideMenu";
import MenuContextProvider from "../../src/contexts/MenuContext";

describe("<SideMenu />", () => {
  it("should render the component", () => {
    cy.stub(Link);
    cy.mount(
      <MenuContextProvider>
        <SideMenu />
      </MenuContextProvider>
    );
    cy.get("aside").should("be.visible");
  });
});
