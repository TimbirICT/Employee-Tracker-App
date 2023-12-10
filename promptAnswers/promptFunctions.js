const inquirer = require('inquirer');
const server = require('../server');

function updateEmployeeManagers() {
  // Implement function to update employee managers
}

function viewAllRoles(db) {
  const query = 'SELECT * FROM role';
  db.query(query, (err, results) => {
    if (err) throw err;

    console.log('All Roles:');
    console.table(results);

    // After displaying, call the prompt function again to show the menu
    server.prompt();
  });
}

function addRole(db) {
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
      const insertQuery = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
      db.query(insertQuery, [answers.title, answers.salary, answers.departmentId], (err, result) => {
        if (err) throw err;

        console.log(`Role "${answers.title}" has been added.`);

        // After adding, call the prompt function again to show the menu
        server.prompt();
      });
    });
}

function viewAllDepartments(db) {
  const query = 'SELECT * FROM department';
  db.query(query, (err, results) => {
    if (err) throw err;

    console.log('All Departments:');
    console.table(results);

    // After displaying, call the prompt function again to show the menu
    server.prompt();
  });
}

function addDepartment(db) {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the new department:',
      },
    ])
    .then((answers) => {
      const insertQuery = 'INSERT INTO department (name) VALUES (?)';
      db.query(insertQuery, [answers.name], (err, result) => {
        if (err) throw err;

        console.log(`Department "${answers.name}" has been added.`);

        // After adding, call the prompt function again to show the menu
        server.prompt();
      });
    });
}

module.exports = { updateEmployeeManagers, viewAllRoles, addRole, viewAllDepartments, addDepartment };
