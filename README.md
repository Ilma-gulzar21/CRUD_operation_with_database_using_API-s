# User Management CRUD Application

This is a full-stack User Management System that allows you to perform *CRUD operations* (Create, Read, Update, Delete) on users in a MySQL database using Node.js, Express,EJS, and RESTful APIs. The application provides a user-friendly interface where you can add, edit, delete, and view users, with password verification for secure updates.

## Features
<b>View Users:</b>
  See all users with their name, email, and username on a dynamic page.

<b>Add Users</b>:
  Add a new user to the database with a username, email, and password.

<b> Edit Users</b>:
  Update a user's **username** based on their **email**. Updates are allowed only if the correct password is provided. Incorrect passwords trigger a **notification**.

<b>Delete Users</b>:
  Delete any user from the database with a single click.

<b>User Count API</b>
  API endpoint to fetch the total number of users in the database.

Dynamic Pages with EJS:
  All pages are rendered using EJS templates, making the interface interactive and professional.

<b>Notifications:</b>
  Password validation ensures secure updates, and users are notified if an action fails.
