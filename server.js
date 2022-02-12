const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
const fs = require('fs');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL Username
    user: 'root',
    // TODO: Add MySQL Password
    password: '',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);

// Query database using COUNT() and GROUP BY
db.query('SELECT COUNT(id) AS total_count FROM favorite_books GROUP BY in_stock', function (err, results) {
  console.log(results);
});

// Query database using SUM(), MAX(), MIN() AVG() and GROUP BY
db.query('SELECT SUM(quantity) AS total_in_section, MAX(quantity) AS max_quantity, MIN(quantity) AS min_quantity, AVG(quantity) AS avg_quantity FROM favorite_books GROUP BY section', function (err, results) {
  console.log(results);
});

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

function start() {
inquirer
.prompt([
  {
    type: 'list-input',
    message: 'What would you like to do?',
    name: 'action',
    choices: ['View all employees', 'Add employee', 'Update employee role', 'View all roles', 'Add role', 'View all departments', 'Add departments', 'quit']
  },
])
.then((response) =>

  switch (response.action) 
  {
    case 'View all employees':
      console.log('Oranges are $0.59 a pound.');
      break;
    case 'Add employee':
      console.log('Apples are $0.32 a pound.');
      break;
    case 'Update employee role':
      console.log('Bananas are $0.48 a pound.');
      break;
    case 'View all roles':
      console.log('Cherries are $3.00 a pound.');
      break;
    case 'Add role':
      console.log('Cherries are $3.00 a pound.');
      break;
    case 'View all departments':
      console.log('Mangoes and papayas are $2.79 a pound.');
      break;
    case 'Add departments':
      console.log('Cherries are $3.00 a pound.');
      break;
    case 'Quit':
      console.log('Mangoes and papayas are $2.79 a pound.');
      break;
    default:
      console.log('Sorry, we are out of ' + expr + '.');
  }

);
}
start();