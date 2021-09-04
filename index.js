const inquirer = require('inquirer');

const { viewEmployees, viewDepartments, viewRoles, addDepartment, addRole, addEmployee, updateEmployeeRole, selectRoles } = require('./db/queries');

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


const promptAddEmployee = () => {
    return inquirer.prompt([
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
            type: 'list',
            name: 'role',
            message: "What is the employee's role ? (required)",
            choices: selectRoles(),
        },

    ])

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

// selectRoles();

    // result => console.log(result));
    // module.exports = promptUser;