const inquirer = require('inquirer');
const { prompt, updateEmployeeRole, viewAllRoles, addRole, viewAllDepartments, addDepartment } = require('./promptFunctions');



function prompt() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'menuOption',
        message: 'What would you like to do?',
        choices: [
          'Update Employee Role',
          'View All Roles',
          'Add Role',
          'View All Departments',
          'Add Department',
          'Quit',
        ],
      },
    ])
    .then((answers) => {
      switch (answers.menuOption) {
        case 'Update Employee Role':
          updateEmployeeRole();
          break;
        case 'View All Roles':
          viewAllRoles();
          break;
        case 'Add Role':
          addRole();
          break;
        case 'View All Departments':
          viewAllDepartments();
          break;
        case 'Add Department':
          addDepartment();
          break;
        case 'Quit':
          db.end();
          console.log('Disconnected from the database.');
          break;
        default:
          console.log('Invalid option');
          break;
      }
    });
}

// Call the prompt function to start the application
prompt();
