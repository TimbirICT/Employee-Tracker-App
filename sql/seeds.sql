-- Clear existing data from the tables (if needed)
DELETE FROM employee;
DELETE FROM role;
DELETE FROM department;

-- Inserting sample data into the department table
INSERT INTO department (id, name) VALUES
(1, 'Engineering'),
(2, 'Sales'),
(3, 'Marketing'),
(4, 'Finance'),
(5, 'Human Resources');

-- Inserting sample data into the role table
INSERT INTO role (id, title, salary, department_id) VALUES
(1, 'Manager', 60000, 1),
(2, 'Employee', 50000, 2);

-- Inserting sample data into the employee table
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES
(1, 'John', 'Doe', 1, NULL);
