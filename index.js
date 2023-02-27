const fs = require('fs');
const inquirer = require('inquirer');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
function generateTeamMembersHTML() {
  // Loop through the teamMembers array and generate HTML for each member
  const memberHTML = teamMembers.map(member => {
    let additionalInfo = "";
    if (member.getRole() === "Manager") {
      additionalInfo = `Office Number: ${member.getOfficeNumber()}`;
    } else if (member.getRole() === "Engineer") {
      additionalInfo = `GitHub Username: <a href="https://github.com/${member.getGithub()}" target="_blank">${member.getGithub()}</a>`;
    } else if (member.getRole() === "Intern") {
      additionalInfo = `School: ${member.getSchool()}`;
    }
    return `
      <div class="col">
        <div class="card h-100">
          <div class="card-header">
            <h3>${member.getName()}</h3>
            <h4>${member.getRole()}</h4>
          </div>
          <div class="card-body">
            <ul>
              <li>ID: ${member.getId()}</li>
              <li>Email: <a href="mailto:${member.getEmail()}">${member.getEmail()}</a></li>
              <li>${additionalInfo}</li>
            </ul>
          </div>
        </div>
      </div>
    `;
  }).join("");

  // Generate the entire HTML document
  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Team Profile</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
      </head>
      <body>
        <header>
          <nav class="navbar navbar-dark bg-dark">
            <span class="navbar-brand mb-0 h1">Team Profile</span>
          </nav>
        </header>
        <main>
          <div class="container">
            <div class="row row-cols-1 row-cols-md-3 g-4">
              ${memberHTML}
            </div>
          </div>
        </main>
      </body>
    </html>
  `;

// prompts
function promptUser() {
const teamMembers = [];

// Prompt the user for manager information
inquirer.prompt([
  {
    type: 'input',
    name: 'name',
    message: 'What is the manager\'s name?'
  },
  {
    type: 'input',
    name: 'id',
    message: 'What is the manager\'s employee ID?'
  },
  {
    type: 'input',
    name: 'email',
    message: 'What is the manager\'s email address?'
  },
  {
    type: 'input',
    name: 'officeNumber',
    message: 'What is the manager\'s office number?'
  }
]).then((answers) => {
  const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
  teamMembers.push(manager);
  // Return to the menu to add another employee or finish building the team
   // Prompt the user to add another employee
   promptToAddEmployee();
  });
  
  function promptToAddEmployee() {
    inquirer.prompt([
      {
        type: 'list',
        name: 'employeeType',
        message: 'Which type of employee would you like to add?',
        choices: [
          'Engineer',
          'Intern',
          'I am done adding employees'
        ]
      }
    ]).then((answers) => {
      switch (answers.employeeType) {
        case 'Engineer':
          addEngineer();
          break;
        case 'Intern':
          addIntern();
          break;
        case 'I am done adding employees':
          // Generate HTML and exit
          break;
        default:
          // Handle invalid input
      }
    });
  }  
  function addEngineer() {
  inquirer.prompt([  
  {
    type: 'input',
    name: 'name',
    message: 'What is the Engineer\'s name?'
  },
  {
    type: 'input',
    name: 'id',
    message: 'What is the Engineer\'s employee ID?'
  },
  {
    type: 'input',
    name: 'email',
    message: 'What is the Engineer\'s email address?'
  },
  {
    type: 'input',
    name: 'github',
    message: 'What is the Engineer\'s github username?'
  }
]).then((answers) => {
  const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
  teamMembers.push(engineer);
   // Prompt the user to add another employee
   promptToAddEmployee();
  });
}
function addIntern() {
inquirer.prompt([  
  {
    type: 'input',
    name: 'name',
    message: 'What is the intern\'s name?'
  },
  {
    type: 'input',
    name: 'id',
    message: 'What is the intern\'s employee ID?'
  },
  {
    type: 'input',
    name: 'email',
    message: 'What is the intern\'s email address?'
  },
  {
    type: 'input',
    name: 'school',
    message: 'What school did the intern attend?'
  }
]).then((answers) => {
  const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
  teamMembers.push(intern);
   // Prompt the user to add another employee
   promptToAddEmployee();
  });
}}

  // Write the HTML to a file named "team.html"
  fs.writeFile("team.html", html, (err) => {
    if (err) throw err;
    console.log("The team.html file has been created successfully!");
  });
}
  
  // Function to initialize the app
  async function init() {
    try {
      // Prompt the user for information
      const answers = await promptUser();
  
      // Generate the HTML based on the user's answers
      const htmlContent = generateTeamMembersHTML(answers);
  
     // Write the HTML file
    writeToFile('team.html', htmlContent);
    } catch (error) {
      console.log(error);
    }
  }
  
  // Call the init function to initialize the app
  init();