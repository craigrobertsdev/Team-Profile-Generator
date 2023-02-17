const Engineer = require("../src/Engineer");
const Employee = require("../src/Employee");

describe("Engineer class", () => {
  it("Should extend the Employee class and have a github property", () => {
    const eng = new Engineer("Fred", 1, "fred@email.com", "github.com/fred");

    expect(Engineer.__proto__.prototype).toBe(Employee.prototype);
    expect(eng.github).toEqual("github.com/fred");
  });
});

describe("getRole", () => {
  it("Should return Engineer as a hard-coded value", () => {
    const eng = new Engineer("Fred", 1, "fred@email.com", "github.com/fred");
    const role = eng.getRole();

    expect(role).toEqual("Engineer");
  });
});
