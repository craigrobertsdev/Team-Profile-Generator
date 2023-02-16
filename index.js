const inquirer = require("inquirer");
const buildTeamRoster = require("./lib/html-builder");
const Manager = require("./src/Manager");
const Engineer = require("./src/Engineer");
const Intern = require("./src/Intern");
const { default: separator } = require("inquirer/lib/objects/separator");
const fs = require("fs");

const teamMembers = [];

const addNewMember = {
  type: "list",
  message: "Add another member to your team?",
  options: ["Engineer", "Intern", new separator(), "Finished adding team members"],
  name: "newMember",
};

const addEmployee = [
  {
    type: "input",
    message: `Enter the ${employeeType}'s name:`,
    name: "name",
  },
  {
    type: "input",
    message: "What is their ID number?",
    name: "id",
  },
  {
    type: "input",
    message: "What is their email address?",
    name: "email",
  },
];

const addManager = {
  type: "input",
  message: "What is their office number?",
  name: "extra",
};

const addEngineer = {
  type: "input",
  message: "What is their GitHub profile?",
  name: "extra",
};

const addIntern = {
  type: "input",
  message: "What school do they go to?",
  name: "extra",
};

function askQuestions(employeeType) {
  let extraQuestion;
  if (employeeType === "Manager") {
    extraQuestion = addManager;
  } else if (employeeType === "Engineer") {
    extraQuestion = addEngineer;
  } else {
    extraQuestion = addIntern;
  }

  inquirer.prompt([...addEmployee, extraQuestion, addNewMember]).then((response) => {
    const { name, id, email, extra, newMember } = response;

    if (employeeType === "Manager") {
      teamMembers.push(new Manager(name, id, email, extra));
    } else if (employeeType === "Engineer") {
      teamMembers.push(new Engineer(name, id, email, extra));
    } else {
      teamMembers.push(new Intern(name, id, email, extra));
    }

    if (newMember.startsWith("Finished")) {
      return;
    }

    askQuestions(newMember);
  });
}

function saveTeamHtml(html) {
  fs.writeFileSync("./dist/roster.html", html);
}

function init() {
  askQuestions("Manager");
  const teamHtml = buildTeamRoster(teamMembers);
  saveTeamHtml(teamHtml);
}

init();
