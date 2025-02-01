# TaskMaster:A Collaborative Task Tracking System

A collaborative task tracking system that allows users to create, assign, and track tasks,create Projects. Certain users can be given access to the project by the Manager.In addition to that, the team leader can assign tasks with due date to the team members and track their progress.

## Table of Contents

1. Features
2. getting started
   a. technologies/tools used

b. Prerequisites to be installed in the machine.

3.  Setup instructions and installation of packages.

4.  API Usage and Endpoints

5.  Relationship between Models

6.  Dependencies Usage

## 1.Features

- User authentication and authorization using JWT.
- Project Creation and Team Management done by Manager along with giving `Owner` access to the team leader and `Member` access to the team members by adding the team members to the project.

- Task creation, assignment, and tracking by team leader when the access is given by the project Manager.
- Task status tracking and updates by team leader and Manager.
- Collaborative task management and communication among team members along with their respective tasks and projects mapped to them.
- User management and role-based access control for team leaders and team members.
- Task prioritization and filtering based on status,title, and description.
- Implemented an `AI prompt` for title to generate the description of the task.
- Task assignment and assignment history tracking.
- Middleware for authentication and authorization as well as error handling.

- Having Member Access Middleware for team member for `member` role,Team Access middleware for collaboration with team leader for team member role,Check Role middleware for project manager and teamleader (usually for task CRUD operations).

- Implemented Web sockets for real-time task updates and notifications.

- Used JOI and Joi-objectid for validation of request body using express-validator.
- Used Mysql for database as It is a RDBMS relationship and Prisma ORM for database operations.

## Project Structure

The project is structured as follows:

```
src
├── Controllers
│   ├── CollaborateControllers
│   │   ├── attachmentController.js
│   │   └── commentController.js
│   ├── LeadControllers
│   │   └── taskController.js
│   ├── OwnerControllers
│   │   ├── projectController.js
│   │   └── teamControllers.js
│   ├── authController.js
│   └── teamMemberController.js
├── Middlewares
│   ├── CheckRole.js
│   ├── memberAccess.js
│   ├── teamAccess.js
│   ├── TokenExpiration.js
│   ├── Validate.js
│   └── validateJWT.js
├── Routes
│   ├── authRoutes.js
│   ├── collaborate.js
│   ├── indexRoutes.js
│   ├── members.js
│   ├── project.js
│   ├── tasks.js
│   └── teams.js
├── Services
│   ├── notifications.js
│   └── testSocket.js
└── Utils
    ├── rateLimiter.js
    └── ServerError.js
```
- CollaborationControllers: Contains controllers for collaboration-related functionalities.
- LeadControllers: Contains controllers for task-related functionalities.
- OwnerControllers: Contains controllers for project and team related functionalities.
- authController: Contains controllers for authentication-related functionalities.
- teamMemberController: Contains controllers for member-related functionalities.
- notification.js: Contains Socket Service functions for task notifications.
- testSocket.js: Contains Testing Socket Service functions.
- ServerError.js: Utility for common server errors.
- rateLimiter.js: Rate limiter utility for AI Prompts.
- CheckRole.js: Middleware for role-based access control.
- TokenExpiration.js: Middleware to handle token expiration.
- ValidateJWT.js: Middleware to validate JWT tokens.
- Validate.js: Middleware for request validation.
- memberAccess.js: Middleware for team member access.
- teamAccess.js: Middleware for team access.
- indexRoutes.js: A common route for all routes.
- tasks.js: Task-related routes.
- authRoutes.js: Authentication-based routes.
- projects.js: Project-related routes.
- teams.js: Team-creation and management routes.
- members.js: Member-related routes.
- .env: Environment variables configuration.
- app.js: Application entry point.
- package.json: Project dependencies and scripts.
- package-lock.json: Exact dependency versions.
- README.md: Project documentation.

## 2.Getting Started

### a.Technologies/tools Used

1. **Node.js**: A JavaScript runtime environment that allows you to run JavaScript code on the server-side.
2. **Express.js**: A web application framework for Node.js that simplifies building web applications and APIs.
3. **Prisma ORM**: A modern database toolkit for Node.js that simplifies database operations.
4. **MySQL**: A popular open-source relational database management system.
5. **Socket.io**: A library for real-time, bidirectional communication between the client and the server.
6. **JOI**: A JavaScript library for validating and sanitizing data.
7. **Joi-objectid**: A library for validating and sanitizing MySQL ObjectId values.
8. **Bcrypt**: A library for hashing and comparing passwords securely.
9. **Jsonwebtoken**: A library for generating and verifying JSON Web Tokens (JWTs).
10. **openai**: A library for interacting with the OpenAI API.
11. **express-rate-limit**: A middleware for rate limiting requests.
12. **dotenv**: A library for loading environment variables from a .env file.
13. **nodemon**: A utility that automatically restarts the server when changes are made to the code.
14. **express-validation**: A middleware for validating request data using JOI schemas.
15. **socket.io-client**: A library for connecting to a Socket.IO server from the client-side.
16. **crypto**: A library for cryptographic operations.

---

## b.Prerequisites to be Installed on your Machine

- Make sure your Node.js version to be installed more than 18, not below versions.
- npm Command Line Interface (CLI) which comes under node to install the required packages.

---

## 3.Setup Instructions and installation of packages.

_Step1_: Create the repository in the github and link to your machine with your specific drive.

- Git init https://github.com/pavankumar-ui/taskTrackingCollaborativeSystem.git

the above command will create the repository in the github and link to your machine with your specific drive.

_Step 2_ : Navigate to the Project Directory.

- Type `cd TaskMaster` in the terminal.

_Step 3_ : Install the required packages in your terminal.

- Type `npm i express nodemon bcryptjs crypto dotenv express-rate-limit @prisma/client express-validation joi jsonwebtoken openai socket.io socket.io-client` in the terminal.

- Type dev dependency for prisma client `npm i -D @prisma/client` in the terminal.

_Step 4_ : Now in the package.json file, add the following script:

- `"start": "nodemon app.js"` in the scripts object present in package.json file.

_Step 5_ : Run the app.js file and check whether the server is running or not.

- `npm start` in the terminal.

_Step 6_ : If you want to place the PORT in the env file then you can install the dotenv package.

- Now include the dependencies in the app.js file.
  `require("dotenv").config();`

  - to retrive the port,give the following code in the app.js file.

  `const port = process.env.PORT || 3000;`

  server.listen(PORT, (err) => {
  if (err) {
  return console.log("Something bad happened", err);
  }
  console.log('Server is listening on ${PORT}`);
  });

- now, restart the server and check the port is running or not.

_Step 7_ : The API will be available at `http://localhost:3000`.

- you can test the API using the postman.

## Routes Defined.

The following routes are available in the `Routes/authRoutes.js/collaborate.js/indexRoutes.js/members.js/project.js/tasks.js/teams.js` file:

| Method     | Path                                     | Description                         | Authentication    |
| ---------- | ---------------------------------------- | ----------------------------------- | ----------------- |
| POST       | `/api/auth/register`                     | To Register the user (signup)       | Not Required      |
| POST       | `/api/auth/login`                        | To login the user (signin)          | Required          |
| GET        | `/api/auth/userprofile`                  | To Get user profile                 | Required          |
| PUT        | `/api/auth/userprofile`                  | To update user profile              | Required          |
| POST       | `/api/auth/logout`                       | To logout from the system           | Required          |
| POST       | `/api/projects/upload`                   | To create a project                 | Required          |
| GET        | `/api/projects/List`                     | To fetch the projects               | Required          |
| DELETE     | `/api/projects/:Pid`                     | To delete the project               | Required          |
| POST       | `/api/teams/generate`                    | To create the teams                 | Required          |
| POST       | `/api/teams/deployMembers`               | To add the members to team          | Required          |
| GET        | `/api/teams/List`                        | To fetch the teams list             | Required          |
| GET        | `/api/teams/members`                     | To fetch the members in team        | Required          |
| POST       | `/api/tasks/add`                         | To create the tasks and assign      | Required          |
| PUT        | `/api/tasks/:Tid`                        | To update the tasks                 | Required          |
| DELETE     | `/api/tasks/:Tid`                        | To delete the tasks                 | Required          |
| GET        | `/api/tasks/:projectId`                  | To get the tasks based on project   | Required          |
| GET        | `/api/tasks/filter/:status`              | To filter the tasks on status       | Required          |
| GET        | `/api/tasks/:projectId/searchTitle`      | To search the tasks on title        | Required          |
| GET        | `/api/memberTask`                        | To get the assigned tasks to member | Required          |
| PUT        | `/api/memberTask/:Tid`                   | To update the status of tasks       | Required          |
| POST       | `/api/collaborate/:taskId/comment`       | To post a comment                   | Required          |
| GET        | `/api/collaborate/:taskId/comment`       | To get comments thread              | Required          |
| PUT        | `/api/collaborate/:commentId`            | To update a comment                 | Required          |
| GET        | `/api/collaborate/user/:taskId/comments` | To get user comments                | Required          |
| DELETE     | `/api/collaborate/:commentId`            | To delete a comment                 | Required          |
| POST       | `/api/collaborate/:taskId/attachment`    | To post an attachment               | Required          |
| PUT        | `/api/collaborate/:taskId/attachment`    | To update an attachment             | Required          |
| GET        | `/api/collaborate/:taskId/attachment`    | To get attachments                  | Required          |
| DELETE     | `/api/collaborate/:taskId/attachment`    | To delete attachment                | Required          |
| ---------- | ------------------------                 | --------------------------------    | ----------------- |

## Middlewares Used:

The following middlewares are used in the project:

- `CheckRole` : This middleware is used to check the role of the user.
- `validateJWT` : This middleware is used to check the authentication of the user.
- `memberAccess` : This middleware is used to check the member access of the user.
- `teamAccess` : This middleware is used to check the team access of the user.
- `TokenExpiration` : This middleware is used to check the token expiration of the user.
- `Validate` : This middleware is used to validate the request body.

## 4.API Usage and Endpoints

To make usage of the API, please pass the headers information like `Content-type` and `Authorization` very effectively.

`Content-type: application/json`
`Authorization: Bearer <token>`

you can use the following endpoints:

- `POST /api/auth/register` - Register a new user. - No need of Authorization Header for this endpoint.
- `POST /api/auth/login` - Login and get a JWT token.
- `GET /api/auth/userprofile` - To get the user profile.
- `PUT /api/auth/userprofile` - To update the user profile.
- `POST /api/auth/logout` - To logout the user.
- `POST /api/projects/upload` - To create a project.
- `GET /api/projects/List` - To fetch the projects.
- `DELETE /api/projects/:Pid` - To delete the project.
- `POST /api/teams/generate` - To create the teams.
- `POST /api/teams/deployMembers` - To add the members to team.
- `GET /api/teams/List` - To fetch the teams list.
- `GET /api/teams/members` - To fetch the members in team.
- `POST /api/tasks/add` - To create the tasks and assign.
- `PUT /api/tasks/:Tid` - To update the tasks.
- `DELETE /api/tasks/:Tid` - To delete the tasks.
- `GET /api/tasks/:projectId` - To get the tasks based on project.
- `GET /api/tasks/filter/:status` - To filter the tasks on status.
- `GET /api/tasks/:projectId/searchTitle` - To search the tasks on title.
- `GET /api/tasks/:projectId/searchDescription` - To search the tasks on description.
- `GET /api/memberTask` - To get the assigned tasks to member.
- `PUT /api/memberTask/:Tid` - To update the status of tasks.
- `POST /api/collaborate/:taskId/comment` - To post a comment.
- `GET /api/collaborate/:taskId/comment` - To get comments thread.
- `PUT /api/collaborate/:commentId` - To update a comment.
- `GET /api/collaborate/user/:taskId/comments` - To get user comments.
- `DELETE /api/collaborate/:commentId` - To delete a comment.
- `POST /api/collaborate/:taskId/attachment` - To post an attachment.
- `PUT /api/collaborate/:taskId/attachment` - To update an attachment.
- `GET /api/collaborate/:taskId/attachment` - To get attachments.
- `DELETE /api/collaborate/:taskId/attachment` - To delete attachment.

## 5.Relationship between the tables

- `User` table has a one-to-many relationship with `Project` table.
- `Project` table has a one-to-many relationship with `Task` table.
- `Task` table has a one-to-many relationship with `Comment` table.
- `Task` table has a one-to-many relationship with `Attachment` table.
- `Task` table has a one-to-many relationship with `teamMember` table.
- `User` table has a one-to-many relationship with `teamMember` table.
- `Team` table has a one-to-many relationship with `teamMember` table.
- `User` table has a one-to-many relationship with `Team` table.
- `User` table has a one-to-many relationship with `Comment` table.
- `User` table has a one-to-many relationship with `Attachment` table.

## 6.Dependencies Used

- [`bcryptjs`](https://www.npmjs.com/package/bcryptjs) - To hash the password.
- [`crypto`](https://www.npmjs.com/package/crypto-js) - To generate the random string.
- [`dotenv`](https://www.npmjs.com/package/dotenv)- To load the environment variables.
- [`express`](https://www.npmjs.com/package/express) - To create the server.
- [`express-rate-limit`](https://www.npmjs.com/package/express-rate-limit) - To limit the number of requests.
- [`express-validation`](https://www.npmjs.com/package/express-validation) - To validate the request body.
- [`jsonwebtoken`](https://www.npmjs.com/package/jsonwebtoken) - To generate the JWT token.
- [`prisma`](https://www.prisma.io/docs) - To connect to the database.
- [`prisma-client-lib`](https://www.npmjs.com/package/prisma-client-lib) - To connect to the database client setup.
- [`joi`](https://joi.dev/) - To validate the request body.
- [`openai`](https://www.npmjs.com/package/openai) - To generate the AI response.
- [`socket.io`](https://www.npmjs.com/package/socket.io) - To create the socket connection.
- [`socket.io-client`](https://www.npmjs.com/package/socket.io-client) - To create the socket connection for client.
- [`nodemon`](https://www.npmjs.com/package/nodemon) - To restart the server automatically.
