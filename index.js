const inquirer = require('inquirer');

const {viewEmployees, viewDepartments, viewRoles} = require( './db/queries');

viewEmployees();