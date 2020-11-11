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

function createTeam() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "managerName",
        message: "What is your name?",
        validate: (userInput) => {
          if (userInput != "") {
            return true;
          }
          return "Please enter your name.";
        },
      },
      {
        type: "input",
        name: "managerID",
        message: "What is your ID number?",
        validate: (userInput) => {
          const number = userInput.match(/^[1-9]|\d*s/);
          //   console.log(number[0]);
          //   console.log(number);
          if (number !== null) {
            return true;
          }
          return "Please enter your ID number.";
        },
      },
      {
        type: "input",
        name: "managerEmail",
        message: "What is your e-mail address?",
        validate: (userInput) => {
          if (userInput != "") {
            return true;
          }
          return "Please enter your e-mail.";
        },
      },
      {
        type: "input",
        name: "officeNumber",
        message: "What is your office number?",
        validate: (userInput) => {
          const number = userInput.match(/^[1-9]|\d*s/);
          //   console.log(number[0]);
          //   console.log(number);
          if (number !== null) {
            return true;
          }
          return "Please enter your office number.";
        },
      },
    ])
    .then((userInput) => {
      employees.push(
        new Manager(
          userInput.managerName,
          userInput.managerID,
          userInput.managerEmail,
          userInput.officeNumber
        )
      );
      createTeamMember();
    });
}

function createTeamMember() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "position",
        message: "What position does this team member hold?",
        choices: ["Engineer", "Intern", "No team member to add."],
      },
      {
        type: "input",
        name: "teamMemberName",
        message: "What is your team members name?",
        when: (userInput) => userInput.position !== "No team member to add.",
        validate: (userInput) => {
          if (userInput != "") {
            return true;
          }
          return "Please enter your  team members name.";
        },
      },
      {
        type: "input",
        name: "teamMemberID",
        message: "What is your team members ID number?",
        when: (userInput) => userInput.position !== "No team member to add.",
        validate: (userInput) => {
          const number = userInput.match(/^[1-9]|\d*s/);
          //   console.log(number[0]);
          //   console.log(number);
          if (number !== null) {
            return true;
          }
          return "Please enter your ID number.";
        },
      },
      {
        type: "input",
        name: "teamMemberEmail",
        message: "What is your team members e-mail?",
        when: (userInput) => userInput.position !== "No team member to add.",
        validate: (userInput) => {
          if (userInput != "") {
            return true;
          }
          return "Please enter your team members e-mail.";
        },
      },
      {
        type: "input",
        name: "engineerGithub",
        message: "What is the Engineer's Github username? No @ needed.",
        when: (userInput) => userInput.position === "Engineer",
        validate: (userInput) => {
          if (userInput != "") {
            return true;
          }
          return "Please enter your engineers github username.";
        },
      },
      {
        type: "input",
        name: "internSchool",
        message: "What school does your intern attend?",
        when: (userInput) => userInput.position === "Intern",
        validate: (userInput) => {
          if (userInput != "") {
            return true;
          }
          return "Please enter your interns school.";
        },
      },
    ])
    .then((userInput) => {
      if (userInput.position === "Engineer") {
        employees.push(
          new Engineer(
            userInput.teamMemberName,
            userInput.teamMemberID,
            userInput.teamMemberEmail,
            userInput.engineerGithub
          )
        );
        createTeamMember();
      } else if (userInput.position === "Intern") {
        employees.push(
          new Intern(
            userInput.teamMemberName,
            userInput.teamMemberID,
            userInput.teamMemberEmail,
            userInput.internSchool
          )
        );
        createTeamMember();
      } else {
        createHTML(employees);
        console.log("You're done!");
      }
    });
}

const createHTML = (userInput) => {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, (err) => {
      if (err) throw err;
    });
  }
  fs.writeFileSync(outputPath, render(userInput), (err) => {
    if (err) throw err;
  });
  console.log("You're team has been created!");
};

createTeam();

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
