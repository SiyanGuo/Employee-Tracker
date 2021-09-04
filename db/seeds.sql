INSERT INTO departments (name)
VALUES
  ('Sales'),
  ('HR'),
  ('Accounting'),
  ('Marketing'),
  ('Legal'),
  ('Engineer');

INSERT INTO roles (title, salary, department_id)
VALUES
  ('Salesperson', '49000', 1),
  ('Lawyer', '80000', 5),
  ('Accountant', '51000', 3),
  ('Lead Engineer', '90000', 6),
  ('Software Engineer', '67000', 6),
  ('Marketing Speicialist', '43000', 4),
  ('Marketing Manager', '54000', 4),
  ('HR Mananger', '77000', 2),
  ('Sales Lead', '58000', 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('Jason', 'Doe', 1, null),
  ('Mike', 'Alexander', 1, null),
  ('Tim', 'Allan', 5, null),
  ('Mary', 'Brown', 3, null),
  ('Ashlie', 'Lee', 6, null),
  ('Justin', 'Lourd', 7, null),
  ('Sara', 'Joland', 4, null),
  ('Kevin', 'Misef', 9, null),
  ('Cheng', 'Tong', 2, null),
  ('Malia', 'Rodrigues', 8, null);

UPDATE employees 
SET manager_id = 7
WHERE id =1;

UPDATE employees 
SET manager_id = 7
WHERE id =2;

UPDATE employees 
SET manager_id = 6
WHERE id =3;

UPDATE employees 
SET manager_id = 5
WHERE id =5;