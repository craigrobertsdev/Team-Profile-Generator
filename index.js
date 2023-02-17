const inquirer = require("inquirer");
const filebuilder = require("./lib/html-builder");
const Manager = require("./src/Manager");
const Engineer = require("./src/Engineer");
const Intern = require("./src/Intern");
const fs = require("fs");

const teamMembers = [];

// Added to end of every question series to determine whether or not to continue.
const addNewMember = {
  type: "list",
  message: "Add another member to your team?",
  choices: ["Engineer", "Intern", new inquirer.Separator(), "Finished adding team members"],
  name: "newMember",
};

// Questions specific to the type of employee being added.
const addManager = {
  type: "input",
  message: "What is their office number?",
  name: "office",
};

const addEngineer = {
  type: "input",
  message: "What is their GitHub profile? (https://github.com/{name})",
  name: "github",
};

const addIntern = {
  type: "input",
  message: "What school do they go to?",
  name: "school",
};

// Repeatedly goes through a loop of question asking, stores the user input as the correct type of employee
async function askQuestions(employeeType) {
  let extraQuestion;
  if (employeeType === "Manager") {
    extraQuestion = addManager;
  } else if (employeeType === "Engineer") {
    extraQuestion = addEngineer;
  } else {
    extraQuestion = addIntern;
  }

  await inquirer
    .prompt([
      {
        type: "input",
        message: `Enter the ${employeeType}'s name:`,
        name: "name",
        validate: checkName,
      },
      {
        type: "input",
        message: "What is their ID number?",
        name: "id",
        validate: checkId,
      },
      {
        type: "input",
        message: "What is their email address?",
        name: "email",
        validate: checkEmail,
      },
      extraQuestion,
      addNewMember,
    ])
    .then(async (response) => {
      const { name, id, email, newMember } = response;

      if (employeeType === "Manager") {
        teamMembers.push(new Manager(name, +id, email, response.office));
      } else if (employeeType === "Engineer") {
        teamMembers.push(new Engineer(name, +id, email, `github.com/${response.github}`));
      } else {
        teamMembers.push(new Intern(name, +id, email, response.school));
      }

      employeeType = newMember;

      // break out of loop if user is done adding team members;
      if (newMember.startsWith("Finished")) {
        return;
      }

      // Recursively call function until user is done.
      await askQuestions(newMember);
    });
}

function saveTeamHtml(html) {
  fs.writeFileSync("./dist/roster.html", html);
}

function saveCss(css) {
  fs.writeFileSync("./dist/roster.css", css);
}

async function init() {
  await askQuestions("Manager");
  const teamHtml = filebuilder.buildTeamRoster(teamMembers);
  saveTeamHtml(teamHtml);
  const css = filebuilder.buildCss();
  saveCss(css);
}

// if the proposed id is a unique whole number then accept, othewise return error message.
function checkId(id) {
  // check whether the user entered a value before converting id to number
  if (id.length === 0) return "You must enter at least one number";

  // convert id to number
  id = +id;

  // if id as a number is falsy (NaN), fail validation
  if (!id) return "IDs must only contain numbers";
  if (!Number.isInteger(id)) return "ID numbers must be a whole number";

  // check whether id already exists in team members
  for (let member of teamMembers) {
    if (member.id === id) return "IDs must be unique.";
  }

  return true;
}

function checkName(name) {
  if (name.length < 2) return "A name must have at least 2 characters.";

  return true;
}

function checkEmail(email) {
  if (
    email.match(
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    )
  )
    return true;

  return "Enter a valid email address.";
}

init();
