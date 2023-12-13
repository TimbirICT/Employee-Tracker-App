const inquirer = require('inquirer');
const dbConnection = require('../server'); // Adjust the path as needed

function updateEmployeeRole(dbConnection, employeeId, newRoleId) {
  const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
  dbConnection.query(query, [newRoleId, employeeId], (error, results) => {
    if (error) {
      console.error(`Error executing query: ${query}`, error);
    } else {
      console.log('Roles:', results);
    }
    startPrompt(dbConnection);
  });
}

function viewAllRoles(dbConnection) {
  const query = 'SELECT * FROM role';
  dbConnection.query(query, (error, results) => {
    if (error) {
      console.error(`Error executing query: ${query}`, error);
    } else {
      console.log('Roles:', results);
    }
    startPrompt(dbConnection);
  });
}

function addRole(dbConnection) {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter the title of the new role:',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter the salary for the new role:',
      },
      {
        type: 'input',
        name: 'departmentId',
        message: 'Enter the department ID for the new role:',
      },
    ])
    .then((answers) => {
      const { title, salary, departmentId } = answers;
      const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
      const values = [title, salary, departmentId];
      dbConnection.query(query, values, (error, results) => {
        if (error) {
          console.error(`Error executing query: ${query}`, error);
        } else {
          console.log('Role added:', results);
        }
        startPrompt(dbConnection);
      });
    });
}

function viewAllDepartments(dbConnection) {
  console.log('View All Departments function called');

  const query = 'SELECT * FROM department';

  dbConnection.query(query, (error, results) => {
    if (error) {
      console.error('Error executing SELECT query for departments:', error);
    } else {
      console.log('Departments:', results);
    }

    startPrompt(dbConnection);
  });
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
          updateEmployeeRole(dbConnection);
          break;
        case 'View All Roles':
          viewAllRoles(dbConnection);
          break;
        case 'Add Role':
          addRole(dbConnection);
          break;
        case 'View All Departments':
          viewAllDepartments(dbConnection);
          break;
        case 'Add Department':
          addDepartment(dbConnection);
          break;
        case 'Quit':
          dbConnection.end();
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