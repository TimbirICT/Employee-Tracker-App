const inquirer = require('inquirer');
const db = require('./config/connection');
const { startPrompt } = require('./promptAnswers/promptFunctions');
const path = require('path'); // Add this line
const fs = require('fs');

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL server: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL server as id ' + db.threadId);

  // Read the contents of schema.sql
  const schemaSqlPath = path.join(__dirname, 'sql', 'schema.sql');
  const schemaSql = fs.readFileSync(schemaSqlPath, 'utf8');

  // Split the SQL content into individual statements
  const sqlStatements = schemaSql.split(';').filter(statement => statement.trim() !== '');

  // Execute each statement one by one
  sqlStatements.forEach((statement, index) => {
    db.query(statement, (err, result) => {
      if (err) throw err;

      console.log(`Statement ${index + 1} executed successfully.`);

      if (index === sqlStatements.length - 1) {
        // If the last statement is executed, call the prompt function to start the application
        startPrompt(db);
      }
    });
  });
});
