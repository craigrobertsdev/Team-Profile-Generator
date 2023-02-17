const inquirer = require("inquirer");
const filebuilder = require("./lib/html-builder");
const Manager = require("./src/Manager");
const Engineer = require("./src/Engineer");
const Intern = require("./src/Intern");
const { default: separator } = require("inquirer/lib/objects/separator");
const fs = require("fs");

const teamMembers = [];

const addNewMember = {
  type: "list",
  message: "Add another member to your team?",
  choices: ["Engineer", "Intern", new inquirer.Separator(), "Finished adding team members"],
  name: "newMember",
};

// const addEmployee = [
//   {
//     type: "input",
//     message: `Enter the ${employeeType}'s name:`,
//     name: "name",
//   },
//   {
//     type: "input",
//     message: "What is their ID number?",
//     name: "id",
//   },
//   {
//     type: "input",
//     message: "What is their email address?",
//     name: "email",
//   },
// ];

const addManager = {
  type: "input",
  message: "What is their office number?",
  name: "office",
};

const addEngineer = {
  type: "input",
  message: "What is their GitHub profile?",
  name: "github",
};

const addIntern = {
  type: "input",
  message: "What school do they go to?",
  name: "school",
};

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
      extraQuestion,
      addNewMember,
    ])
    .then(async (response) => {
      if (employeeType === "Manager") {
        const { name, id, email, office } = response;
        teamMembers.push(new Manager(name, id, email, office));
      } else if (employeeType === "Engineer") {
        const { name, id, email, github } = response;
        teamMembers.push(new Engineer(name, id, email, github));
      } else {
        const { name, id, email, school } = response;
        teamMembers.push(new Intern(name, id, email, school));
      }

      employeeType = response.newMember;
      console.log("Passing newMember as [");
      for (let member of teamMembers) {
        console.log(member);
      }
      console.log("]");

      // break out of loop if user is done adding team members;
      if (response.newMember.startsWith("Finished")) {
        return;
      }
      await askQuestions(response.newMember);
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
  console.log("passing team members" + teamMembers);
  const teamHtml = filebuilder.buildTeamRoster(teamMembers);
  saveTeamHtml(teamHtml);
  const css = filebuilder.buildCss();
  saveCss(css);
}

init();
