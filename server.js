// server.js
// server.js
const mysql = require('mysql2');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const { startPrompt } = require('./prompt/promptFunctions');

app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());

// Create a MySQL connection
const dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Caesar2018!',
  database: 'employment_db',
});

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  startPrompt(dbConnection); // Move startPrompt here
});

module.exports = dbConnection;
