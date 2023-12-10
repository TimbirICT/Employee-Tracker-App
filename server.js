// ./server.js
const inquirer = require('inquirer');
const db = require('./config/connection');
const { updateEmployeeRole, viewAllRoles, addRole, viewAllDepartments, addDepartment } = require('./promptAnswers/promptFunctions');
const fs = require('fs');

db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL server: ' + err.stack);
      return;
    }
    console.log('Connected to MySQL server as id ' + db.threadId);
  
    // Read the contents of schema.sql
    const schemaSql = fs.readFileSync('./sql/schema.sql', 'utf8');
  
    // Execute the contents of schema.sql to create the database and tables
    db.query(schemaSql, (err) => {
      if (err) throw err;
      console.log('Database schema created successfully.');
  
      // Call the prompt function to start the application
      prompt();
    });
  });
  
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
