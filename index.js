const inquirer = require('inquirer');
const { viewEmployees, viewDepartments, viewRoles, addDepartment, addRole, addEmployee, updateEmployeeRole, selectRole, selectManager, selectDepartment } = require('./db/queries');

function promptUser() {

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
            "Update Employee Role",
            "Exit"],
        validate: chooseTeamInput => {
            if (chooseTeamInput) return true;
            else {
                console.log("Select what you like to do!");
                return false;
            }
        }
    });
}

const promptAddEmployee = async () => {
    //gather fName, lName, title, name of department
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
                message: "What is the employee's role?",
                //return an array of roles
                choices: await selectRole()
            },
            {
                type: 'rawlist',
                name: 'manager',
                message: "Who is the employee's Manager?",
                //return an array of employees
                choices: await selectManager()
            }
        ])
        //gather all information and pass it into sql query
        .then(result => addEmployee(result));
};

const promptAddDepartment = () => {
    //gather the department's name and pass it in to sql query
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
    //gather title, salary and department name of the role
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
                //return an array of departments
                choices: await selectDepartment()
            }
        ])
        //pass all info into a sql query
        .then(result =>
            addRole(result)
        )
};

const promptUpdateRole = async () => {
    //gather the employee name and role title
    return inquirer
        .prompt([
            {
                type: 'list',
                name: 'employeeName',
                message: "Which employee's role do you want to update?",
                //return an array of employees
                choices: await selectManager()
            },
            {
                type: 'list',
                name: 'roleName',
                message: "What role do you want to update to?",
                //return an array of roles
                choices: await selectRole()

            }
        ])
        //pass all info into a sql query
        .then(result => updateEmployeeRole(result))
};

//follow up questions based on selection
const followUp = async (data) => {
    switch (data.chooseWhatToDo) {
        //wait till the function return a result
        case 'View All Employees':
            await viewEmployees();
            break;

        case "View All Departments":
            await viewDepartments();
            break;

        case "view All Roles":
            await viewRoles();
            break;

        case "Add Employee":
            await promptAddEmployee();
            break;

        case "Add Department":
            await promptAddDepartment();
            break;

        case "Add Role":
            await promptAddRole();
            break;

        case "Update Employee Role":
            await promptUpdateRole();
            break;

        case "Exit":
            console.log("Press control + C to exit the application.");
            break;

        default:
            console.log(data.chooseWhatToDo);
            break;
    };
    //repeat the first prompt and follow up again if exit is not selected
    if (data.chooseWhatToDo !== "Exit") {
        promptUser().then(followUp);
    } 
};

//start the app and prompt the first question
promptUser()
    .then(followUp);

