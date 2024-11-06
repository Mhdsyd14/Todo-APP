# minime - Personal Task Manager

## Description

This application is designed for managing our daily tasks, functioning as a basic todo list app.

## Technology Stack

1. React + Vite (TypeScript)
2. Express + Prisma ORM
3. PostgreSQL
4. REST API

## Directory Tree

```
app
├── client/
├── server/
├── README.md
├── DOCS.md
```

The backend should be stored in the server folder, and the front-end should be stored in the client folder.
Please add the documentation of your code in `DOCS.md`

## 8-Day Project Plan

### Day 1: Project Setup and Frontend Basics
- Set up the development environment (VS Code, Node.js)
- Initialize the frontend project using Vite with React and TypeScript
  ```
  npm create vite@latest client -- --template react-ts
  ```
- Set up ESLint and Prettier with Airbnb configuration
- Initialize Git repository and make initial commit
- Create a new GitHub repository and push the initial commit

References:
- Vite Guide: https://vitejs.dev/guide/
- React TypeScript Cheatsheet: https://react-typescript-cheatsheet.netlify.app/
- ESLint Configuration: https://eslint.org/docs/user-guide/configuring/
- Prettier Configuration: https://prettier.io/docs/en/configuration.html

### Day 2: Frontend Development
- Create basic components for the task manager (Header, TaskForm, TaskList, TaskItem)
- Implement state management using React hooks (useState, useContext)
- Create Login and Register components
- Style components using CSS modules or a styling library of choice

References:
- React Hooks: https://reactjs.org/docs/hooks-intro.html
- CSS Modules: https://github.com/css-modules/css-modules

### Day 3: Backend Setup and Authentication
- Initialize the backend project with Express and TypeScript
- Set up PostgreSQL database
- Install and configure Prisma ORM
- Define the User and Task models in Prisma schema
- Implement user registration and login endpoints
- Set up JWT for authentication
  ```
  npm install jsonwebtoken @types/jsonwebtoken bcrypt @types/bcrypt
  ```
- Create middleware for JWT verification (Bearer Token)

References:
- Express.js Documentation: https://expressjs.com/
- Prisma Documentation: https://www.prisma.io/docs/
- JWT Introduction: https://jwt.io/introduction
- bcrypt npm package: https://www.npmjs.com/package/bcrypt

### Day 4: Backend Development and API
- Implement CRUD operations for tasks using Prisma and Express
- Create authenticated API routes for tasks:
  - GET /api/tasks (protected)
  - POST /api/tasks (protected)
  - PUT /api/tasks/:id (protected)
  - DELETE /api/tasks/:id (protected)
- Implement error handling and input validation
- Test API endpoints using a tool like Insomnia or Postman

References:
- RESTful API Design: https://restfulapi.net/
- Express.js Routing: https://expressjs.com/en/guide/routing.html
- Prisma CRUD Operations: https://www.prisma.io/docs/concepts/components/prisma-client/crud

### Day 5: Frontend-Backend Integration (Part 1)
- Set up using fetch API in the frontend for API requests
- Implement user registration and login functionality
- Create an AuthContext to manage user authentication state
- Implement protected routes in React

References:
- Fetch API: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- React Context API: https://reactjs.org/docs/context.html
- Protected Routes in React: https://ui.dev/react-router-protected-routes-authentication

### Day 6: Frontend-Backend Integration (Part 2)
- Implement fetching tasks from the backend and displaying them (for authenticated users)
- Create functionality to add new tasks
- Implement updating task status (complete/incomplete)
- Add delete task functionality
- Handle API errors and display appropriate messages to the user

References:
- React State Management: https://reactjs.org/docs/state-and-lifecycle.html
- Handling API Errors: https://www.intricatecloud.io/2020/03/how-to-handle-api-errors-in-your-web-app-using-axios/

### Day 7: Advanced Features and Git Workflow
- Implement task filtering and sorting
- Add due date feature to tasks
- Implement logout functionality
- Create a new Git branch for each feature
- Make pull requests and review code
- Merge feature branches into the main branch

References:
- Git Branching: https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell
- GitHub Pull Requests: https://docs.github.com/en/github/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests

### Day 8: Finalization, Testing, and Deployment
- Write unit tests for frontend components using Jest and React Testing Library
- Write integration tests for the backend API, including authentication tests
- Set up a CI/CD pipeline using GitHub Actions
- Deploy the frontend to Netlify or Vercel
- Deploy the backend to Heroku or Railway
- Set up PostgreSQL database on a cloud provider (e.g., Heroku Postgres)

References:
- Jest Documentation: https://jestjs.io/docs/getting-started
- React Testing Library: https://testing-library.com/docs/react-testing-library/intro/
- GitHub Actions: https://docs.github.com/en/actions
- Deploying to Netlify: https://docs.netlify.com/site-deploys/create-deploys/
- Deploying to Heroku: https://devcenter.heroku.com/articles/getting-started-with-nodejs

## Important notes:

Throughout the project:
- Commit changes frequently with meaningful commit messages (please use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/))
- Use GitHub issues to track tasks and bugs
- Encourage the use of TypeScript features for type safety
- Ensure consistent code style using ESLint and Prettier
- Always use authentication for protected routes
- Please refer to the documentation first before going through tutorials on YouTube, Medium, etc.

## General References:

- TypeScript Documentation: https://www.typescriptlang.org/docs/
- React Documentation: https://reactjs.org/docs/getting-started.html
- Node.js Documentation: https://nodejs.org/en/docs/
- PostgreSQL Documentation: https://www.postgresql.org/docs/

## Best Practices:

- Clean Code in TypeScript: https://github.com/labs42io/clean-code-typescript
- React Best Practices: https://reactjs.org/docs/thinking-in-react.html
- Node.js Best Practices: https://github.com/goldbergyoni/nodebestpractices

## Security:

- OWASP Top Ten: https://owasp.org/www-project-top-ten/
- Web Security Basics: https://developer.mozilla.org/en-US/docs/Web/Security
