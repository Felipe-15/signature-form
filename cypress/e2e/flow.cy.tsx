const mockUser = {
  name: "John Doe",
  email: "john@doe.com",
  phone: "99999999999",
};

const setUser = () => localStorage.setItem("user", JSON.stringify(mockUser));
const setPlan = () =>
  localStorage.setItem(
    "selectedPlan",
    JSON.stringify({
      id: 1,
      title: "Arcade",
      imageURL: "images/icon-arcade.svg",
      monthlyPrice: 9,
      yearlyPrice: 90,
    })
  );
const setAddons = () =>
  localStorage.setItem(
    "addons",
    JSON.stringify([
      {
        id: 1,
        title: "Online service",
        description: "Access to multiplayer games",
        monthlyPrice: 1,
        yearlyPrice: 10,
      },
      {
        id: 2,
        title: "Larger storage",
        description: "Extra 1TB cloud save",
        monthlyPrice: 2,
        yearlyPrice: 20,
      },
    ])
  );

describe("Initial step flow without localStorage", () => {
  it("should not be possibly to go to other pages without fill the form", () => {
    cy.visit("/");
    cy.get("aside a").last().click();
    cy.url().should("not.contain", "summary");
    cy.get("button").should("be.disabled");
  });
  it("should only go to next step when the form is filled", () => {
    cy.visit("/");
    cy.get("#name").type(mockUser.name);
    cy.get("#email").type(mockUser.email);
    cy.get("#phone").type(mockUser.phone);

    cy.get("button").should("not.be.disabled").click();
    cy.url().should("contain", "plans");
  });
  it("should go to previous step when 'back' is clicked and keep data", () => {
    setUser();
    cy.visit("/plans");
    cy.get("footer a").click();
    cy.get("#name").should("have.value", "John Doe");
  });
  it("should be possible to select a plan and switch between types", () => {
    setUser();

    cy.visit("/plans");
    const switcher = cy.get("label");

    switcher.click();
    cy.get("li button").first().should("contain", "free");

    switcher.click();

    const firstPlan = cy.get("li button").first().should("not.contain", "free");

    firstPlan.click();
    cy.get("footer button").should("not.be.disabled").click();
  });
});

describe("Main flow", () => {
  beforeEach(() => {
    localStorage.setItem("type", "monthly");
    setPlan();
    setUser();
    setAddons();
  });
  it("should be possible to go through addons without select anything", () => {
    cy.visit("/plans");

    cy.get("footer button").click();
    cy.get("footer button").should("not.be.disabled").as("btn");
    cy.get("@btn").click();
    cy.url().should("contain", "/summary");
  });
  it("should be possible to select addons", () => {
    localStorage.removeItem("addons");
    cy.visit("/plans");
    cy.get("footer button").click();
    cy.get("li label").each((label) => {
      label.trigger("click");
    });

    cy.get("input[type=checkbox]").each((input) => expect(input).to.be.checked);
  });
  it("should show all selected infos in summary", () => {
    cy.visit("/summary");
    cy.get("div p span")
      .should("contain", "Arcade")
      .should("contain", "Monthly");

    cy.get("div div span").should("contain", "$9/mo");
    cy.get("section div ul li").should("have.length", "2");
  });
  it("should shows congratulations when confirm subscription and disable links", () => {
    cy.visit("/summary");

    cy.get("button").click();

    cy.get("h2").should("contain", "Thank you!");

    cy.get("ul li a").first().click();

    cy.url().should("contain", "/summary");
  });
});
