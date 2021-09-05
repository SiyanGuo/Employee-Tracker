const inquirer = require('inquirer');

const { viewEmployees, viewDepartments, viewRoles, addDepartment, addRole, addEmployee, updateEmployeeRole, selectRole, selectManager, selectDepartment } = require('./db/queries');

// const [roles] = await selectRole();
// const [employees] = await selectManager();
// const [departments] = await selectDepartment();

const promptUser = () => {

    return inquirer.prompt({
        type: 'list',
        name: 'chooseWhatToDo',
        message: 'What would you like to do?',
        choices: [
            'View All Employees',
            'View All Departments',
            'view All Roles',
            'Add Employee',
            'Add Department',
            'Add Role',
            "Update Employee Role"],
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

const promptUpdateRole = async () =>{
    const [roles] = await selectRole();
    return inquirer
    .prompt([
        {
            type: 'list',
            name: 'employeeName',
            message: "Which employee's role do you want to update?",
            choices: employees.map(employee => employee.name)
        },
        {
            type: 'list',
            name: 'roleName',
            message: "What role do you want to update to?",
            choices: roles.map(role => role.name)

        }
    ])
    .then(result => updateEmployeeRole(result))
};

const followUp = (data) => {
    switch (data.chooseWhatToDo) {
        case 'View All Employees':
            viewEmployees();
            break;

        case "View All Departments":
            viewDepartments();
            break;

        case "view All Roles":
            viewRoles();
            break;

        case "Add Employee":
            promptAddEmployee();
            break;

        case "Add Department":
            promptAddDepartment();
            break;

        case "Add Role":
            promptAddRole();
            break;

        case "Update Employee Role":
            promptUpdateRole();
            break;

        default:
            console.log(data.chooseWhatToDo);
            break;
    };
};

// promptUser()
//     .then(followUp)


addRole({roleTitle: "operation",salary: "1000", department: "Accounting"});
