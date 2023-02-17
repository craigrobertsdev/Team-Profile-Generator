const Intern = require("../src/Intern");
const Employee = require("../src/Employee");

describe("Intern class", () => {
  it("Should extend the Employee class and have a school property", () => {
    const intern = new Intern("Fred", 1, "fred@email.com", "University of Adelaide");

    expect(Intern.__proto__.prototype).toBe(Employee.prototype);
    expect(intern.school).toEqual("University of Adelaide");
  });
});

describe("getRole", () => {
  it("Should return Intern as a hard-coded value", () => {
    const intern = new Intern("Fred", 1, "fred@email.com", "University of Adelaide");
    const role = intern.getRole();

    expect(role).toEqual("Intern");
  });
});
