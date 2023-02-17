const Employee = require("../src/Employee");

describe("EmployeeClass", () => {
  it("Employees should have name, id and email properties on creation", () => {
    const emp = new Employee("Fred", 1, "fred@email.com");

    expect(emp.name).toEqual("Fred");
    expect(emp.id).toEqual(1);
    expect(emp.email).toEqual("fred@email.com");
  });
});

describe("getId", () => {
  it("Should return the employee's id property", () => {
    const emp = new Employee("Fred", 1, "fred@email.com");
    const id = emp.getId();

    expect(id).toEqual(1);
  });
});

describe("getName", () => {
  it("Should return the employee's name property", () => {
    const emp = new Employee("Fred", 1, "fred@email.com");
    const name = emp.getName();

    expect(name).toEqual("Fred");
  });
});

describe("getEmail", () => {
  it("Should return the employee's email property", () => {
    const emp = new Employee("Fred", 1, "fred@email.com");
    const email = emp.getEmail();

    expect(email).toEqual("fred@email.com");
  });
});

describe("getRole", () => {
  it("Should return the employee's role as a hard-coded value", () => {
    const emp = new Employee("Fred", 1, "fred@email.com");
    const role = emp.getRole();

    expect(role).toEqual("Employee");
  });
});
