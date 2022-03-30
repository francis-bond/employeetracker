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
        type: 'list',
        message: 'What would you like to do?',
        name: 'action',
        choices: ['View all employees', 'Add employee', 'Update employee role', 'View all roles', 'Add role', 'View all departments', 'Add departments', 'quit']
      },
    ])
    .then((response) => {
      switch (response.action) {
        case 'View all employees':
          console.log('View all employees');
          viewAllEmployees();
          break;
        case 'Add employee':
          console.log('Add employee');
          addEmployee();
          break;
        case 'Update employee role':
          console.log('Update employee role');
          updateEmployeerole();
          break;
        case 'View all roles':
          console.log('View all roles');
          viewAllRoles();
          break;
        case 'Add role':
          console.log('Add role');
          addRole();
          break;
        case 'View all departments':
          console.log('View all departments');
          viewAllDepartments();
          break;
        case 'Add departments':
          console.log('Add departments');
          addDepartment();
          break;
        case 'Quit':
          process.exit();
          break;
      }
    }
    );
}

function viewAllEmployees() {
  db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, manager.first_name AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN employee manager on manager.id = employee.manager_id', function (err, results) {
    console.table(results);
    start();
  });
}

function viewAllRoles() {
  db.query('SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT JOIN department on role.department_id = department.id', function (err, results) {
    console.table(results);
    start();
  });
}

function viewAllDepartments() {
  db.query('SELECT id, name AS departments FROM department', function (err, results) {
    console.table(results);
    start();
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'Name your new department',
        name: 'department'
      },
    ])
    .then((response) => {
      var name = response.department
      db.query(`INSERT INTO department (name) VALUES (?)`, name, function (err, results) {
        console.log('New department added');
        start();
      }
      );
    }
    )
}


function addRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'Name new role',
        name: 'role'
      },
      {
        type: 'input',
        message: 'What is the salary?',
        name: 'salary'
      },
      {
        type: 'input',
        message: 'What is the department id?',
        name: 'id'
      },
    ])
    .then((response) => {
      var name = response.role
      var salary = response.salary
      var id = response.id
      db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [name, salary, id], function (err, results) {
        console.log('New role added');
        start();
      }
      );
    }
    )
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'First name',
        name: 'first'
      },
      {
        type: 'input',
        message: 'Last name',
        name: 'last'
      },
      {
        type: 'input',
        message: 'Role ID?',
        name: 'roleId'
      },
      {
        type: 'input',
        message: 'Manager Id',
        name: 'manId'
      },
    ])
    .then((response) => {
      var first = response.first
      var last = response.last
      var role = response.roleId
      var manager = response.manId
      db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [first, last, role, manager], function (err, results) {
        console.log('New employee added');
        start();
      }
      );
    }
    )
}

function updateEmployeerole() {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'Employees Id which you would like to update',
        name: 'employee'
      },
      {
        type: 'input',
        message: 'New role Id?',
        name: 'role'
      },
    ])
    .then((response) => {
      var id = response.employee
      var role = response.roleId
      db.query(`UPDATE employee SET role_id = ? Where id = ?`, [role, id], function (err, results) {
        console.log('Employee updated');
        start();
      }
      );
    }
    )
}

start();