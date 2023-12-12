// promptFunctions.js
const inquirer = require('inquirer');
const connection = require('../server'); // Adjust the path as needed

function updateEmployeeRole() {
  // Placeholder implementation for updating employee role
  console.log('Update Employee Role function called');
}


function viewAllRoles() {
  connection.query('SELECT * FROM role', (error, results) => {
    if (error) {
      console.error('Error executing SELECT query for roles:', error);
    } else {
      console.log('Roles:', results);
    }
    startPrompt(connection);
  });
}

function addRole() {
  // Placeholder implementation for adding a role
  console.log('Add Role function called');
}

function viewAllDepartments() {
  // Placeholder implementation for viewing all departments
  console.log('View All Departments function called');
}

function addDepartment() {
  // Placeholder implementation for adding a department
  console.log('Add Department function called');
}

function startPrompt() {
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

module.exports = {
  startPrompt,
  updateEmployeeRole,
  viewAllRoles,
  addRole,
  viewAllDepartments,
  addDepartment,
};