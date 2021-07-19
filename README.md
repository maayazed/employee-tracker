<div align='center'>
<h1><strong>Employee Content Management System</strong></h1>
</div>

### Badges: [![badge src!](https://img.shields.io/badge/license-MIT-blue)](https://opensource.org/licenses) ![badge src!](https://img.shields.io/badge/Language-JavaScript-yellow)

![2021-07-19-16-13-59](https://user-images.githubusercontent.com/79816212/126228889-8c0dc692-5209-4c20-be2a-422b3b8e18c4.gif)

<div align='center'>
<strong>Table of Contents</strong>  
<hr>
    <p><a href='#desc'>About</a></p>
    <p><a href='#install'>Installation</a></p>
    <p><a href='#user'>User Guidelines</a></p>
    <p><a href='#test'>Seeding and Execution</a></p>
    <p><a href='#license'>Licensing</a></p>
    <p><a href='#contribute'>Contributors</a></p>
    <p><a href='#contact'>Contact</a></p>

<hr>
</div>

<div align='center'>
    <h3><a id='desc'>About</a></h3>
</div>

<div>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Employee Content Management System is a javascript application that enables users access and changes to a company employee database. The database ran through MySQL houses three table objects: department, role, and employee.
            
</div>

<br>

<div align='center'>
    <img src='https://user-images.githubusercontent.com/79816212/126230008-4ddf44e1-1506-4449-abaf-232607406a72.png'>
</div>

<hr>

<div align='center'>
    <h3><a id='install'>Installation</a></h3>
</div>

<div>
<h4>Instructions: </h4>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Download from repository. Node is required to initialize the index.js file. MySQL is required to seed the database. 
    
<br>
    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;⚠️ Users are required to provide their MySQL password and a user for the database following the .env.EXAMPLE file provided within this &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;repository.
</div>

<hr>

<div align='center'>
    <h3><a id='user'>User Guidelines</a></h3>
</div>

<div>
<h4>Guide: </h4> 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;From the command line install the package.json dependencies. In MySQL Workbench first run seed.sql then run schema.sql. Both .sql files are found in the db folder provided within this repository. 
    
<br>
    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Run index.js with node to start the application after the dependencies have been installed and the database has been seeded. The command-line prompts the user for selections and inputs from <a href='https://www.npmjs.com/package/inquirer'><code>inquirer</code></a> to enable user access and change to the database.
</div>

<hr>

<div align='center'>
    <h3><a id='test'>Seeding and Execution</a></h3>
</div>

<div>
<h4> Seeding: MySQL Workbench</h4>
<pre><code>Select File then Open SQL Script</code></pre>
<pre><code>Navigate to this repository folder labeled db then open both schema and seed .sql files. Run schema.sql first</code></pre>
</div>

<div>
<h4> Execution: Command Line</h4>
<pre><code>npm i</code></pre>
<pre><code>npm start</code></pre>
</div>

<hr>

<div align='center'>
    <h3><a id='license'>Licensing</a></h3>
</div>

<div>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>MIT</strong> © <strong>maayazed</strong>
</div>

<hr>

<div align='center'>
    <h3><a id='contribute'>Contributors</a></h3>
</div>

<div>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='https://github.com/maayazed/'><img src='https://img.shields.io/badge/User-maayazed-blue'></a>
</div>

<hr>

<div align='center'>
    <h3><a id='contact'>Contact</a></h3>
</div>

<div>
<h4>Github:<a href='https://github.com/maayazed/'>&nbsp;&nbsp;&nbsp;maayazed</a></h4>
<h4>Email:&nbsp;&nbsp;&nbsp;zerreod@outlook.com</h4>
</div>

<hr>

<div align="center">Made With ❤️</div>
