const inquirer = require('inquirer');

const { viewEmployees, viewDepartments, viewRoles, addDepartment, addRole, addEmployee, updateEmployeeRole, selectRole, selectManager, selectDepartment } = require('./db/queries');

const promptUser = () => {

    return inquirer.prompt({
        type: 'list',
        name: 'chooseWhatToDo',
        message: 'What would you like to do?',
        choices: [
            'View all employees',
            'View all departments',
            'view all roles',
            'Add an employee',
            'Add a department',
            'Add a role',
            "Update an employee's role"],
        validate: chooseTeamInput => {
            if (chooseTeamInput) return true;
            else {
                console.log("Select what you like to do!");
                return false;
            }
        }
    })
}

const promptAddEmployee = async () => {

    const [roles] = await selectRole();
    const [employees] = await selectManager();
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'fName',
                message: "What is the employee's first name? (required)",
                validate: fNameInput => {
                    if (fNameInput) return true;
                    else {
                        console.log("Please enter the first name!");
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'lName',
                message: "What is the employee's last name? (required)",
                validate: lNameInput => {
                    if (lNameInput) return true;
                    else {
                        console.log("Please enter the last name!");
                        return false;
                    }
                }
            },
            {
                type: 'rawlist',
                name: 'role',
                message: "What is the employee's role ?",
                choices: roles.map(role => role.title)
            },
            {
                type: 'rawlist',
                name: 'manager',
                message: "Who is the employee's Manager ?",
                choices: employees.map(employee => employee.name)
            }
        ])
        .then(result => addEmployee(result));
};


const promptAddDepartment = () => {
    return inquirer
        .prompt(
            {
                type: 'input',
                name: 'departmentName',
                message: "What is the department's name? (required)",
                validate: departmentName => {
                    if (departmentName) return true;
                    else {
                        console.log("Please enter the department's name!");
                        return false;
                    }
                }
            },
        )
        .then(result =>
            addDepartment(result.departmentName)
        )
};


const promptAddRole = async () => {
    const [departments] = await selectDepartment();
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'roleTitle',
                message: "What is the role's title? (required)",
                validate: roleTitle => {
                    if (roleTitle) return true;
                    else {
                        console.log("Please enter the role's title!");
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'salary',
                message: "What is the role's salary? (required)",
                validate: salary => {
                    if (salary) return true;
                    else {
                        console.log("Please enter the role's salary!");
                        return false;
                    }
                }
            },
            {
                type: 'rawlist',
                name: 'department',
                message: "What is the role's department?",
                choices: departments.map(department => department.name)
            }
        ])
        .then(result =>
            addRoles(result)
        )
};

const followUp = (data) => {
    switch (data.chooseWhatToDo) {

        case 'View all employees':
            viewEmployees();
            break;

        case "View all departments":
            viewDepartments();
            break;

        case "view all roles":
            viewRoles();
            break;

        case "Add an employee":
            promptAddEmployee();
            break;

        case "Add a department":
            promptAddDepartment();
            break;

        case "Add a role":
            promptAddRole();
            break;

        case "Update an employee's role":
            promptUpdate();
            break;

        default:
            console.log(data.chooseWhatToDo);
            break;
    };
};

promptUser()
    .then(followUp)

