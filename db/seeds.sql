INSERT INTO department (name)
VALUES ("Engineering"),
       ("Legal"),
       ("Finance"),
       ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales_Lead", 100000, 4),
       ("Salesperson", 80000, 4),
       ("Lead_Engineer", 150000, 1),
       ("Software_Engineer", 120000, 1),
       ("Account_Manager", 160000, 3),
       ("Accountant", 125000, 3),
       ("Legal_Team_Lead", 250000, 2),
       ("Lawyer", 190000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Leah", "Nelson", 3, NULL),
       ("Morgan", "TA", 1, NULL),
       ("Honore", "Nelson", 5, NULL),
       ("Clayton", "Abel", 7, NULL),
       ("Zackery", "Arsement", 4, 3),
       ("Leland", "Byrd", 2, 1),
       ("Randy", "King", 6, 2),
       ("Nadia", "Pagaduan", 8, 4);