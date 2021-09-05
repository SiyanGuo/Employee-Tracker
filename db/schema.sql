DROP DATABASE IF EXISTS employees;

CREATE DATABASE employees;
USE employees;

DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employees;

CREATE TABLE departments (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  CONSTRAINT uc_departmentName UNIQUE (name)
);

CREATE TABLE roles (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10) NOT NULL,
  department_id INTEGER,
  CONSTRAINT fk_department_id FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL,
  CONSTRAINT uc_title UNIQUE (title)
);

CREATE TABLE employees (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER,
  manager_id INTEGER,
  CONSTRAINT fk_role_id FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL,
  CONSTRAINT fk_manager_id FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL
);