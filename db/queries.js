const cTable = require('console.table');
const db = require('./connections');
const inquirer = require('inquirer');

const viewEmployees = () => {
    //join title, department name, salary with manager name with employee data
    const sql = `SELECT s1.id, s1.first_name, s1.last_name, roles.title AS title, departments.name AS department, roles.salary AS salary, CONCAT(s2.first_name, " ", s2.last_name) AS manager
    FROM employees s1
    LEFT JOIN roles ON s1.role_id = roles.id
    LEFT JOIN departments ON roles.department_id = departments.id
    LEFT JOIN employees s2 ON s1.manager_id= s2.id;`;
    //return the table of data 
    return db.promise().query(sql)
        .then(([rows, fields]) => {
            const table = cTable.getTable(rows);
            console.log(table);
        })
        .catch(err => console.log(err));
};

const viewDepartments = () => {
    const sql = `SELECT * FROM departments ORDER BY id;`;
    //return department id and name as a table
    return db.promise().query(sql)
        .then(([rows, fields]) => {
            const table = cTable.getTable(rows);
            console.log(table);
        })
        .catch(err => console.log(err))
};

const viewRoles = () => {
    //join department name with roles data
    const sql = `SELECT roles.id, roles.title, roles.salary, departments.name AS department 
    FROM roles 
    LEFT JOIN departments ON roles.department_id = departments.id;`;
    return db.promise().query(sql)
        .then(([rows, fields]) => {
            const table = cTable.getTable(rows);
            console.log(table);
        })
        .catch(err => console.log(err))
};

const addDepartment = (departmentName) => {
    //add a department 
    const sql = `INSERT INTO departments (name) VALUES (?);`;
    return db.promise().query(sql, departmentName)
        .then(() => {
            console.log(`${departmentName} department is added to the database!`);
        })
        .catch(err => console.log(err));
};

const addRole = ({ roleTitle, salary, department }) => {
    //get department's id based on the name of department
    const sql = `SELECT id FROM departments WHERE name = ?;`;
    //add a role with title, salary and department id
    const sql2 = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?);`;

    let departmentId;

    return db.promise().query(sql, department)
        .then(([rows, fields]) => {
            departmentId = rows[0].id;
        })
        .then(() => {
            db.promise().query(sql2, [roleTitle, salary, departmentId])
                .then(() => {
                    console.log(`${roleTitle} is added to the database!`);
                })
                .catch(err => console.log(err)
                )
        })
};

const addEmployee = ({ fName, lName, role, manager }) => {
    //add an employee by passing in fname, lname, roleId and managerID
    const sql = `SELECT id FROM roles WHERE title = ?;`;
    const sql2 = `SELECT id FROM employees WHERE CONCAT(first_name, ' ', last_name) = ?;`;
    const sql3 = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`;

    let roleId;
    let managerId;

    //async function
    return db.promise().query(sql, role)
        .then(([rows, fields]) => {
            //get role id based on the role title
            roleId = rows[0].id;
        })
        .then(() => {
            return db.promise().query(sql2, manager)
                .then(([rows, fields]) => {
                    //get manager id based on manager's name
                    managerId = rows[0].id;
                })
        })
        .then(() => {
            return db.promise().query(sql3, [fName, lName, roleId, managerId])
                .then(() => {
                    console.log(`${fName} ${lName} is added to the database!`);
                })
                .catch(err => console.log(err));
        });
};

const updateEmployeeRole = ({ roleName, employeeName }) => {
    //get role id from role title
    const sql = `SELECT id FROM roles WHERE title = ?;`;
    //update employee's role id based on employee's name
    const sql2 = `UPDATE employees SET role_id = ? WHERE CONCAT(first_name, ' ', last_name) =?; `;
    let roleId;
    return db.promise().query(sql, roleName)
        .then(([rows, fields]) => {
            roleId = rows[0].id;
        })
        .then(() => {
            db.promise().query(sql2, [roleId, employeeName])
                .then(() => {
                    console.log(`${employeeName}'s role is updated in the database!`);
                })
                .catch(err => console.log(err));
        })
};

const selectRole = () => {
    const sql = "SELECT title FROM roles;"
    //return an array of roles
    return db.promise().query(sql)
        .then((rows, fields) => { return rows[0].map(row => row.title) })
};

const selectManager = () => {
    const sql = "SELECT CONCAT(first_name, ' ', last_name) as name FROM employees;";
    //return an array of employees
    return db.promise().query(sql)
        .then((rows, fields) => { return rows[0].map(row => row.name) })
};

const selectDepartment = () => {
    const sql = "SELECT name FROM departments;";
    //return an array of departments
    return db.promise().query(sql)
        .then((rows, fields) => { return rows[0].map(row => row.name) })
};

module.exports = { viewEmployees, viewDepartments, viewRoles, addDepartment, addRole, addEmployee, updateEmployeeRole, selectRole, selectManager, selectDepartment };


