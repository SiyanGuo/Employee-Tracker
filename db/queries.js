const cTable = require('console.table');
const db = require('./connections');

"INSERT INTO departments (name) VALUES ('?');"
"INSERT INTO roles (title, salary, department_id ) VALUES ('?', '?', '?');"
"INSERT INTO employees (first_name, last_name, role_id, manager_id ) VALUES ('?', '?', '?', '?');"

const viewEmployees = () => {
    const sql = `SELECT s1.id, s1.first_name, s1.last_name, roles.title AS title, departments.name AS department, roles.salary AS salary, CONCAT(s2.first_name, " ", s2.last_name) AS manager
    FROM employees s1
    LEFT JOIN roles ON s1.role_id = roles.id
    LEFT JOIN departments ON roles.department_id = departments.id
    LEFT JOIN employees s2 ON s1.manager_id= s2.id;`;

    db.query(sql, (err, rows) =>{
        if (err) {
            console.log(err.message);
            return;
        };
        const table = cTable.getTable(rows);
        console.log(table);
    });
};

const viewDepartments = ()=>{
    const viewDepartments = "SELECT * FROM departments;"
    db.query(sql, (err, rows) =>{
        if (err) {
            console.log(err.message);
            return;
        };
        const table = cTable.getTable(rows);
        console.log(table);
    });
};

const viewRoles = ()=>{
    const sql = "SELECT * FROM roles;"
    db.query(sql, (err, rows) =>{
        if (err) {
            console.log(err.message);
            return;
        };
        const table = cTable.getTable(rows);
        console.log(table);
    });
};

module.exports = {viewEmployees, viewDepartments, viewRoles};


