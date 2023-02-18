const Manager = require("../src/Manager");
const Engineer = require("../src/Engineer");
const Intern = require("../src/Intern");

function buildTeamRoster(team) {
  let baseHtml = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" />
      <link rel="stylesheet" href="./css/roster.css" class="stylesheet" />
      <title>Team Roster</title>
    </head>
    <body>
      <header class="mb-3">
        <div class="container-fluid h-100 text-center bg-info text-white">
          <div class="row h-100 align-items-center justify-content-center">
            <div class="col"><h3>My Team</h3></div>
          </div>
        </div>
      </header>
      <div class="container">
        <div class="row justify-content-center h-100">
  `;

  for (let member of team) {
    let employeeType, extra, background;

    if (member instanceof Manager) {
      employeeType = "Manager";
      extra = `Office number: ${member.officeNumber}`;
      background = "greenyellow";
    } else if (member instanceof Engineer) {
      employeeType = "Engineer";
      extra = `Github: <a href="https://${member.github}" target="_blank">${member.github}</a>`;
      background = "lightblue";
    } else {
      employeeType = "Intern";
      extra = `School: ${member.school}`;
      background = "yellow";
    }

    let html = `<div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
          <div class="card">
            <div class="card-header" style="background-color: ${background}">
              <h5 class="card-title">${member.name}</h5>
              <h5 class="card-subtitle mb-2 text-muted">${employeeType}</h5>
            </div>
            <div class="card-body" style="background-color: rgb(243, 242, 242)">
              <p class="card-text">
                <ul class="list-group">
                  <li class="list-group-item">ID: ${member.id} </li>
                  <li class="list-group-item">Email: <a href="mailto:${member.email}">${member.email}</a></li>
                  <li class="list-group-item">${extra}</li>
                </ul>
              </p>
            </div>
          </div>
        </div>
        `;

    baseHtml += html;
  }

  baseHtml += `
      </div>
     </div>
    </body>
  </html>`;

  return baseHtml;
}

function buildCss() {
  return `html {
    height: 100%;
  }
  
  body {
    height: 100%;
    font-size: 12px;
  }
  
  header {
    height: 15%;
  }
  `;
}

module.exports.buildTeamRoster = buildTeamRoster;
module.exports.buildCss = buildCss;
