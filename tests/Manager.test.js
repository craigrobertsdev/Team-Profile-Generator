const Manager = require("../src/Manager");
const Employee = require("../src/Employee");

describe("Manager class", () => {
  it("Should extend the Employee class and have an officeNumber property", () => {
    const manager = new Manager("Fred", 1, "fred@email.com", 1);

    expect(Manager.__proto__.prototype).toBe(Employee.prototype);
    expect(manager.officeNumber).toEqual(1);
  });
});

describe("getRole", () => {
  it("Should return Manager as a hard-coded value", () => {
    const manager = new Manager("Fred", 1, "fred@email.com", 1);
    const role = manager.getRole();

    expect(role).toEqual("Manager");
  });
});
