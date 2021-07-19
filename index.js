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
    const seedsMain = `SELECT department.name, role.title, employee.first_name, employee.last_name, role.salary FROM department
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
    console.log(`Accessing department review. . .`);
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
            const seeds = `SELECT role.title, employee.first_name, employee.last_name, role.salary FROM department
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
            message: 'Enter the new department name.',
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
    console.log(`Commencing department inspections. . .`);
    // Get all departments, select by id to access workers, select by role/ worker
    const department = `SELECT * FROM department`;
    connection.query(department, (err, res) => {
        if (err) {
            throw new Error(err);
        }
        const choices = res.map((data) => data);
        inquirer.prompt([
            {
                name: 'department',
                message: 'Chose a department to inspect.',
                type: 'list',
                choices,
            }
        ]).then((data) => {
            const { department } = data;
            console.log(`Inspecting ${department}. . .`);
            const findId = `SELECT department.id FROM department WHERE department.name = ${JSON.stringify(department)}`;
        connection.query(findId, (err, res) => {
            if (err) {
                throw new Error(err);
            }
            const Id = res.map((data) => data.id);
            console.log(`Department ${Id}:`);
            const seeds = `SELECT role.title, employee.first_name, employee.last_name, role.salary FROM department
            INNER JOIN role
            ON department.id = ${Id} AND role.department_id = ${Id}
            INNER JOIN employee
            ON role.id = employee.role_id`;
            connection.query(seeds, (err, res) => {
                if (err) {
                    throw new Error(err);
                }
                console.table(res);
                inquirer.prompt([
                    {
                        name: 'select',
                        message: 'Chose something to evaluate.',
                        type: 'list',
                        choices: [
                            'Evaluate employees',
                            'Evaluate roles',
                            'Return'
                        ]
                    }
                ]).then((next) => {
                    switch (next.select) {
                    case 'Evaluate employees':
                        CMS_employee(data);
                        break;
                    case 'Evaluate roles':
                        CMS_title(data);
                        break;
                    default:
                        console.log(next);
                        break;
                    case 'Return':
                        start();
                        break;
                    };
                    });
                });
            });
        });
    });
};

const CMS_employee = (data) => {
    const { department } = data;
    console.log(`Printing employee record from ${department}. . .`);
    const findId = `SELECT department.id FROM department WHERE department.name = ${JSON.stringify(department)}`;
    connection.query(findId, (err, res) => {
        if (err) {
            throw new Error(err);
        }
        const Id = res.map((data) => data.id);
        const seeds = `SELECT employee.first_name FROM department
        INNER JOIN role
        ON department.id = ${Id} AND role.department_id = ${Id}
        INNER JOIN employee
        ON role.id = employee.role_id`;
        connection.query(seeds, (err, res) => {
            if (err) {
                throw new Error(err);
            }
            const choices = res.map((data) => data.first_name);
            inquirer.prompt([
                {
                    name: 'employee',
                    message: 'Chose an employee to evaluate.',
                    type: 'list',
                    choices,
                }
            ]).then((data) => {
                const { employee } = data;
                const findTitle = `SELECT role.title, employee.first_name, employee.last_name FROM employee
                INNER join role
                ON employee.first_name = '${employee}' AND
                role.id = employee.role_id`
                connection.query(findTitle, (err, res) => {
                    if (err) {
                        throw new Error(err);
                    }
                    console.table(res);
                    const title = res.map((data) => data.title);
                    const name = res.map((data) => `${data.first_name} ${data.last_name}`);
                    inquirer.prompt([
                        {
                            name: 'first_name',
                            message: `New ${title}'s first name?`,
                            type: 'input',
                        },
                        {
                            name: 'last_name',
                            message: `New ${title}'s last name?`,
                            type: 'input',
                        },
                    ]).then((data) => {
                        const { first_name, last_name } = data;
                        const capData = [
                            first_name.replace(/^\w/, (c) => c.toUpperCase()),
                            last_name.replace(/^\w/, (c) => c.toUpperCase()),
                        ]
                        console.log('Updating employee record. . .');
                        console.log(`Removed ${title} ${name}. Added ${title} ${capData[0]} ${capData[1]}.`);
                        update_employee(data, res);
                    });
                });
            });
        });
    });
};

const CMS_title = (data) => {
    const { department } = data;
    console.log(`Printing job record from ${department}. . .`);
    const findId = `SELECT department.id FROM department WHERE department.name = ${JSON.stringify(department)}`;
    connection.query(findId, (err, res) => {
        if (err) {
            throw new Error(err);
        }
        const Id = res.map((data) => data.id);
        const seeds = `SELECT role.title FROM department
        INNER JOIN role
        ON department.id = ${Id} AND role.department_id = ${Id}
        INNER JOIN employee
        ON role.id = employee.role_id`;
        connection.query(seeds, (err, res) => {
            if (err) {
                throw new Error(err);
            }
            const choices = res.map((data) => data.title);
            inquirer.prompt([
                {
                    name: 'role',
                    message: 'Chose a job to evaluate',
                    type: 'list',
                    choices,
                }
            ]).then((data) => {
                const { role } = data;
                const findTitle = `SELECT role.id , role.title, role.salary FROM employee
                INNER join role
                ON role.title = '${role}' AND
                role.id = employee.role_id`
                connection.query(findTitle, (err, res) => {
                    if (err) {
                        throw new Error(err);
                    }
                    console.table(res);
                    const title = res.map((data) => data.title);
                    inquirer.prompt([
                        {   
                            name: 'new_title',
                            message: `What is ${title} being promoted to?`,
                            type: 'input',
                        },
                        {
                            name: 'salary',
                            message: 'Promotion salary?',
                            type: 'input',
                        },
                    ]).then((data) => {
                        const { new_title, salary } = data;
                        const capData = new_title.replace(/^\w/, (c) => c.toUpperCase());
                        console.log('Updating job record. . .');
                        console.log(`${title} was promoted to ${capData}. Paying ${salary}.`);
                        update_title(data, res);
                    });
                });
            });
        });
    });
};

const update_employee = (data, res) => {
    const title = res.map((data) => data.title);
    const { first_name, last_name } = data;
    const capData = [
        first_name.replace(/^\w/, (c) => c.toUpperCase()),
        last_name.replace(/^\w/, (c) => c.toUpperCase()),
    ]
    const findRole_id = `SELECT role.id FROM role WHERE role.title = '${title}'`;
    connection.query(findRole_id, (err, res) => {
        if (err) {
            throw new Error(err);
        }
        const role_id = res.map((data) => data.id);
        connection.query(
            'UPDATE employee SET ? WHERE ?',
            [
                {
                    first_name: capData[0],
                    last_name: capData[1],
                },
                {
                    role_id: role_id,
                },
            ],
            (err) => {
                if (err) throw err;
                console.log('Updated employee record.');
                start();
            }
        );
    });
};

const update_title = (data, res) => {
    const title = res.map((data) => data.title);
    const { new_title, salary } = data;
    const capData = new_title.replace(/^\w/, (c) => c.toUpperCase());
    const findRole_id = `SELECT role.id FROM role WHERE role.title = '${title}'`;
    connection.query(findRole_id, (err, res) => {
        if (err) {
            throw new Error(err);
        }
        const role_id = res.map((data) => data.id);
        connection.query(
            'UPDATE role SET? WHERE ?',
            [
                {
                    title: capData,
                    salary: salary,
                },
                {
                    id: role_id,
                },
            ],
            (err) => {
                if (err) throw err;
                console.log('Updated job record.');
                start();
            }
        );
    });
};

connection.connect((err) => {
    if (err) {
        throw Error(err);
    } 
    console.log(`connected as id ${connection.threadId}`);
    start();
});