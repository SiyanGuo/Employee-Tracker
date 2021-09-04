const cTable = require('console.table');
const db = require('./connections');
// const inquirer = require('inquirer');
// const promptUser = require('../index.js');

const viewEmployees = () => {
    const sql = `SELECT s1.id, s1.first_name, s1.last_name, roles.title AS title, departments.name AS department, roles.salary AS salary, CONCAT(s2.first_name, " ", s2.last_name) AS manager
    FROM employees s1
    LEFT JOIN roles ON s1.role_id = roles.id
    LEFT JOIN departments ON roles.department_id = departments.id
    LEFT JOIN employees s2 ON s1.manager_id= s2.id;`;
    // asynchronous queries
    db.promise().query(sql)
        .then(([rows, fields]) => {
            const table = cTable.getTable(rows);
            console.log(table);
            // promptUser();
        })
        .catch(err => console.log(err));

    // old call back function
    // db.query(sql, (err, rows) =>{
    //     if (err) {
    //         console.log(err.message);
    //         return;
    //     };
    //     const table = cTable.getTable(rows);
    //     console.log(table);
    // })
};

const viewDepartments = () => {
    const sql = "SELECT * FROM departments;"
    db.promise().query(sql)
        .then(([rows, fields]) => {
            const table = cTable.getTable(rows);
            console.log(table);
        })
        .catch(err => console.log(err))
};

const viewRoles = () => {
    const sql = "SELECT * FROM roles;"
    db.promise().query(sql)
        .then(([rows, fields]) => {
            const table = cTable.getTable(rows);
            console.log(table);
        })
        .catch(err => console.log(err))
};

const addDepartment = (departmentName) => {
    const sql = "INSERT INTO departments (name) VALUES (?);";
    db.promise().query(sql, departmentName)
        .then(() => {
            console.log(`${departmentName} department is added to the database!`);
        })
        .catch(err => console.log(err));
};

const addRole = (title, salary, departmentId) => {
    const sql = "INSERT INTO roles (title, salary, department_id ) VALUES (?, ?, ?);";

    db.promise().query(sql, [title, salary, departmentId])
        .then(() => {
            console.log(`${title} is added to the database!`);
        })
        .catch(err => console.log(err));
};

const addEmployee = (fName, lName, roleId, managerId) => {
    const sql = "INSERT INTO employees (first_name, last_name, role_id, manager_id ) VALUES (?, ?, ?, ?);";
    db.promise().query(sql, [fName, lName, roleId, managerId])
        .then(() => {
            console.log(`${fName} ${lName} is added to the database!`);
        })
        .catch(err => console.log(err));
};

const updateEmployeeRole = (roleId, id) => {
    const sql = "UPDATE employees SET role_id = ? WHERE id =?; ";
    db.promise().query(sql, [roleId, id])
        .then(() => {
            console.log(`The role is updated in the database!`);
        })
        .catch(err => console.log(err));
};

const selectRoles = () => {
    const sql = "SELECT id, title FROM roles;"

    return db.promise().query(sql)
    //     .then((rows) => {
    //         console.log(rows);
    //         const roles = [];
    //         rows.forEach(element => roles.push(element.title));
    //         return roles;
    //     })

};

module.exports = { viewEmployees, viewDepartments, viewRoles, addDepartment, addRole, addEmployee, updateEmployeeRole, selectRoles };


