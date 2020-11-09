const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const employees = [];

function newTeamMember() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "newAddition",
        message: "Would you like to add a new team member?",
        choices: ["yes", "no"],
      },
    ])
    .then((userInput) => {
      if (userInput.newAddition === "yes") {
        createTeamMember();
      } else {
        console.log(employees);
      }
    });
}

function createTeamMember() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "position",
        message: "What position does this team member hold?",
        choices: ["Engineer", "Intern", "Manager"],

      },
      {
        type: "input",
        name: "teamMemberName",
        message: "What is your team members name?",
      },
      {
        type: "input",
        name: "teamMemberID",
        message: "What is your team members ID number?",
      },
      {
        type: "input",
        name: "teamMemberEmail",
        message: "What is your team members e-mail?",
      },
      {
        type: "input",
        name: "engineerGithub",
        message: "What is the Engineer's Github?",
        when: (userInput) => userInput.position === "Engineer",
      },
      {
        type: "input",
        name: "internSchool",
        message: "What school does your intern attend?",
        when: (userInput) => userInput.position === "Intern",
      },
      {
        type: "input",
        name: "officeNumber",
        message: "What is the office number?",
        when: (userInput) => userInput.position === "Manager",
      },
    ])
    .then((userInput) => {
      if (userInput.position === "Engineer") {
        const engineer = new Engineer(
          userInput.teamMemberName,
          userInput.teamMemberID,
          userInput.teamMemberEmail,
          userInput.engineerGithub
        );
        employees.push(engineer);
      } else if (userInput.position === "Intern") {
        const intern = new Intern(
          userInput.teamMemberName,
          userInput.teamMemberID,
          userInput.teamMemberEmail,
          userInput.internSchool
        );
        employees.push(intern);
      } else {
          const manager = new Manager(
            userInput.teamMemberName,
            userInput.teamMemberID,
            userInput.teamMemberEmail,
            userInput.officeNumber
          );
          employees.push(manager);
      }
      
      newTeamMember();
    });
}

newTeamMember();


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
