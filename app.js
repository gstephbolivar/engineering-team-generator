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
const newTeamMember = () => {
  const teamMember = [
    {
      type: "list",
      name: "newAddition",
      message: "What employee position do you want to add?",
      choices: ["Engineer", "Intern", "None"],
    },
  ];

  inquirer.prompt(teamMember).then((answers) => {
    if (answers.teamMember === "Engineer") createEngineer();
    else if (answers.teamMember === "Intern") createIntern();
    else {
      console.log(employees);
      console.log("You're done!");
    }
  });
};

const createManager = () => {
  const managerQuestions = [
    {
      type: "input",
      name: "managerName",
      message: "What is the managers name?",
    },
    {
      type: "input",
      name: "managersID",
      message: "What is the managers ID number?",
    },
    {
      type: "input",
      name: "managersEmail",
      message: "What is the managers e-mail?",
    },
    {
      type: "input",
      name: "officeNumber",
      message: "What is the managers office number?",
    },
  ];

  inquirer.prompt(managerQuestions).then((answers) => {
    const { managerName, managersID, managersEmail, officeNumber } = answers;

    const manager = new Manager(
      managerName,
      managersID,
      managersEmail,
      officeNumber
    );
    employees.push(manager);
    newTeamMember();
  });
};

const createEngineer = () => {
  const engineerQuestions = [
    {
      type: "input",
      name: "engineerName",
      message: "What is the engineers name?",
    },
    {
      type: "input",
      name: "engineerID",
      message: "What is the engineers ID number?",
    },
    {
      type: "input",
      name: "engineerEmail",
      message: "What is the engineers e-mail?",
    },
    {
      type: "input",
      name: "github",
      message: "What is the engineer's github username?",
    },
  ];
  inquirer.prompt(engineerQuestions).then((answers) => {
    const { engineerName, engineerID, engineerEmail, github } = answers;

    const engineer = new Engineer(
      engineerName,
      engineerID,
      engineerEmail,
      github
    );
    employees.push(engineer);
    newTeamMember();
  });
};

const createIntern = () => {
    const internQuestions = [
        {
            type: "input",
            name: "internName",
            message: "What is the interns name?",
        },
        {
            type: "input",
            name: "internID",
            message: "What is the interns ID number?",
        },
        {
            type: "input",
            name: "internEmail",
            message: "What is the interns e-mail?",
        },
        {
            type: "input",
            name: "internSchool",
            message: "What school does the intern attend?",
        },
    ];
    inquirer.prompt(internQuestions).then((answers) => {
        const {internName, internID, internEmail, internSchool} = answers;

        const intern = new Intern (internName, internID, internEmail, internSchool);

        employees.push(intern);
        newTeamMember();
    })
}

createManager();
// newTeamMember();
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
