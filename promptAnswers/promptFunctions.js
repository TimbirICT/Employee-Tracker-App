const inquirer = require('inquirer');
const { updateEmployeeRole, viewAllRoles, addRole, viewAllDepartments, addDepartment } = require('./promptFunctions');

function startPrompt(db) {
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
          updateEmployeeRole(db);
          break;
        case 'View All Roles':
          viewAllRoles(db);
          break;
        case 'Add Role':
          addRole(db);
          break;
        case 'View All Departments':
          viewAllDepartments(db);
          break;
        case 'Add Department':
          addDepartment(db);
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

module.exports = { startPrompt };
