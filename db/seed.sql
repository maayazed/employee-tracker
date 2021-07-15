CREATE TABLE department(
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role(
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NULL,
    salary DECIMAL(10,2) NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id)
        REFERENCES department(id)
);

CREATE TABLE employee(
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NULL,
    last_name VARCHAR(30) NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id)
        REFERENCES role(id)
);

-- Metalwork
INSERT INTO department (name) VALUES ('Metalwork');
INSERT INTO role (title, salary, department_id) VALUES ('Manager', 30000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Lead Engineer', 20000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Intern', 10000, 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Lyn', 'Anne', 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Prune', 'Rock', 2);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Jinn', 'Hert', 3);

-- Security
INSERT INTO department (name) VALUES ('Security');
INSERT INTO role (title, salary, department_id) VALUES ('Detective', 30000, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Lead Officer', 20000, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Patrolman', 10000, 2);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Shady', 'Pick', 4);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('June', 'Mon', 5);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Pinky', 'Hit', 6);

