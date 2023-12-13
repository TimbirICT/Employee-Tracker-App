const inquirer = require('inquirer');
const dbConnection = require('../server'); 

function executeQuery(dbConnection, query, values) {
  return dbConnection.promise().query(query, values);
}

function updateEmployeeRole(dbConnection, employeeId, newRoleId) {
  const query = 'UPDATE employees SET role_id = ? WHERE id = ?';
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

async function addRole(dbConnection) {
  try {
    const answers = await inquirer.prompt([
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
    ]);

    const { title, salary, departmentId } = answers;
    const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
    const values = [title, salary, departmentId];

    await executeQuery(dbConnection, query, values);

    startPrompt(dbConnection);
  } catch (error) {
    console.error('Error in addRole:', error);
  }
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

async function addDepartment(dbConnection) {
  try {
    const answer = await inquirer.prompt([
      {
        type: 'input',
        name: 'departmentName',
        message: 'Enter the name of the new department:',
      },
    ]);

    const { departmentName } = answer;
    const query = 'INSERT INTO department (name) VALUES (?)';
    const values = [departmentName];

    await executeQuery(dbConnection, query, values);

    startPrompt(dbConnection);
  } catch (error) {
    console.error('Error in addDepartment:', error);
  }
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