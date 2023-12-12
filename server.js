
const mysql = require('mysql2');
const { startPrompt } = require('./prompt/promptFunctions'); // Adjust the path as needed
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());


// Create a MySQL connection
const connection = mysql.createConnection({
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
});

startPrompt(connection);

