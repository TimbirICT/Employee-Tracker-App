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

// Ensure that the database connection is established before calling startPrompt
dbConnection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      startPrompt(dbConnection);
    });
  }
});

module.exports = dbConnection;
