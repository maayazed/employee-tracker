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
                'Add a department',
                'Populate a department',
                'Inspect a department',
                'Exit'
            ]
        }
    ])
    .then((data) => {
        switch (data.select) {
        case 'View all departments':
            viewAll_CMS();
            break;
        case 'View a department':
            view_CMS();
            break;
        case 'Add a department':
            create_CMS();
            break;
        case 'Populate a department':
            populate_CMS();
            break;
        case 'Inspect a department':
            update_CMS();
            break;
        default:
            console.log(data)
            break;
        case 'Exit':
            connection.end();
        };
    });
};

const viewAll_CMS = () => {
    console.log(`Printing departments record. . .`)
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
    (`Accessing department review. . .`);
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
            const Id = res.map((data) => data.id);
            console.log(`Department ${Id}:`);
            // seeds prints out ONE of the departments with an worker summary for each
            const seeds = `SELECT department.id, department.name, role.title, employee.first_name, employee.last_name, role.salary FROM department
            INNER JOIN role
            ON department.id = ${Id} AND role.department_id = ${Id}
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

const create_CMS = () => {
    console.log(`Updating departments record. . .`);
    inquirer.prompt([
        {
            name: 'add_CMS',
            message: 'Enter the new department name:',
            type: 'input'
        }
    ])
    .then((data) => {
        const { add_CMS } = data;
        const cap_department = add_CMS.replace(/^\w/, (c) => c.toUpperCase());
    connection.query(
        'INSERT INTO department set ?',
            [
                {
                    name: cap_department
                },
            ],
            (err) => {
                if (err) {
                    throw new Error(err);
                }
                console.log(`Added department ${cap_department}`);
                start();
            }
        );
    });
};

const populate_CMS = () => {
    (`Interviews in progress. . .`);
    const department = `SELECT * FROM department`;
    connection.query(department, (err, res) => {
        const choices = res.map((data) => data.name);
        inquirer.prompt([
            {
                name: 'department',
                message: 'Which department does the new hire belong to?',
                type: 'list',
                choices,
            },
            {
                name: 'first_name',
                message: `Worker's first name?`,
                type: 'input',
            },
            {
                name: 'last_name',
                message: `Worker's last name?`,
                type: 'input',
            },
            {
                name: 'title',
                message: `Worker's job title?`,
                type: 'input',
            },
            {
                name: 'salary',
                message: `Workers salary?`,
                type: 'number',
            }
        ])
        .then((data) => {
            CMS_Id(data);
        });
    });
};

const CMS_Id = (data) => {
    const {  department, first_name, last_name, title, salary } = data;
    const capData = [
        first_name.replace(/^\w/, (c) => c.toUpperCase()),
        last_name.replace(/^\w/, (c) => c.toUpperCase()),
        title.replace(/^\w/, (c) => c.toUpperCase()),
    ];
    const findId = `SELECT department.id FROM department WHERE department.name = ${JSON.stringify(department)}`;
    connection.query(findId, (err, res) => {
        if (err) {
            throw new Error(err);
        }
        const Id = res.map((data) => data.id);
        console.log(`Assigned department Id: ${Id}. . .`);
        connection.query(
            'INSERT INTO role SET ?',
            [
                {
                    title: capData[2],
                    salary: salary,
                    department_id: Id,
                }
            ]
        )
        CMS_role(data);
    });
};

const CMS_role = (data) => {
    const {  department, first_name, last_name, title } = data;
    const capData = [
        first_name.replace(/^\w/, (c) => c.toUpperCase()),
        last_name.replace(/^\w/, (c) => c.toUpperCase()),
        title.replace(/^\w/, (c) => c.toUpperCase()),
    ];
    const role_title = JSON.stringify(capData[2]).replace(/['"]+/g, '');
    const findRole_id = `SELECT role.id FROM role WHERE role.title = '${role_title}'`;
    connection.query(findRole_id, (err, res) => {
        if (err) {
            throw new Error(err);
        }
        const role_id = res.map((data) => data.id);
        connection.query(
            'INSERT INTO employee SET ?',
            [
                {
                    first_name: capData[0],
                    last_name: capData[1],
                    role_id: role_id,
                }
            ]
        )
        console.log(`Populating ${department}, New Hire: ${capData[2]} ${capData[0]} ${capData[1]}`);
        start();
    });
};

const update_CMS = () => {

};

connection.connect((err) => {
    if (err) {
        throw Error(err);
    } 
    console.log(`connected as id ${connection.threadId}`);
    start();
});