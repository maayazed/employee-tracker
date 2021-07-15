const connection = require('./config/connection.js');
const inquirer = require('inquirer');
const cTable = require('console.table');

const start = () => {
    inquirer.prompt([
        {
            name: 'select',
            type: 'list',
            message: 'Chose something to do.',
            choices: [
                'View all departments',
                'View a department',
                'Exit'
            ]
        }
    ])
    .then((data) => {
        switch (data.select) {
            // switch to view all then view one break on error or console
        case 'View all departments':
            viewAll_CMS();
            break;
        case 'View a department':
            view_CMS();
            break;
        default:
            console.log(data)
            break;
        case 'Exit':
            connection.end();
        }
    })
};

const viewAll_CMS = () => {
    // seedsMain prints out ALL of the departments with an worker summary for each
const seedsMain = `SELECT department.id, department.name, role.title, employee.first_name, employee.last_name, role.salary FROM department
    INNER JOIN role
    ON department.id = role.department_id
    INNER JOIN employee
    ON role.id = employee.role_id`;
    connection.query(seedsMain, (err, res) => {
        if (err) {
            throw new Error(err);
        }
        console.table(res);
        start();
    });
};

const view_CMS = () => {
    // calculate id from select inquirer here
    const department = `SELECT * FROM department`;
    connection.query(department, (err, res) => {
        const choices = res.map((data) => data.name);
        inquirer.prompt([
            {
                name: 'department',
                message: 'Chose a department to review.',
                type: 'list',
                choices,
            }
        ])
        .then((data) => {
            const { department } = data;
            console.log(`Reviewing ${department}. . .`);
            const findId = `SELECT department.id FROM department WHERE department.name = ${JSON.stringify(department)}`;
        connection.query(findId, (err, res) => {
            if (err) {
                throw new Error(err);
            }
            const findId = res.map((data) => data.id);
            console.log(`Department ${findId}:`);
            // seeds prints out ONE of the departments with an worker summary for each
            const seeds = `SELECT department.id, department.name, role.title, employee.first_name, employee.last_name, role.salary FROM department
            INNER JOIN role
            ON department.id = ${findId} AND role.department_id = ${findId}
            INNER JOIN employee
            ON role.id = employee.role_id`;
            connection.query(seeds, (err, res) => {
                    if (err) {
                        throw new Error(err);
                    }
                    console.table(res);
                    start();
                });
            });
        });
    });
};

connection.connect((err) => {
    if (err) {
        throw Error(err);
    } 
    console.log(`connected as id ${connection.threadId}`);
    start();
});