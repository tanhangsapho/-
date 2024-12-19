# GraphQL Todo API

A robust Todo API built with GraphQL, TypeScript, and MongoDB, containerized with Docker.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Docker](#docker)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Installation

To get started with this project, follow these steps:

```bash
# Clone the repository
git clone https://github.com/tanhangsapho/todo-graphql.git

# Navigate to the project directory
cd graphql-todo-api

# Install dependencies
npm install
```
Usage
To start the server locally:

```
npm run start:dev
```
The GraphQL playground will be available at http://localhost:4000/graphql

API
Here are some example queries and mutations you can use in the GraphQL playground:

Create a Todo
```
mutation CreateTodo {
  createTodo(input: {
    title: "Buy groceries"
    description: "Milk, eggs, bread"
    dueDate: "2023-06-01"
  }) {
    id
    title
    description
    completed
    dueDate
  }
}
```
Get All Todos
```
query GetAllTodos {
  getAllTodos {
    id
    title
    description
    completed
    dueDate
  }
}
```
Get Todo by ID
```
query GetTodoById {
  getTodoById(id: "your-todo-id-here") {
    id
    title
    description
    completed
    dueDate
  }
}
```
Update a Todo
```
mutation UpdateTodo {
  updateTodo(
    id: "your-todo-id-here"
    input: {
      title: "Updated: Buy groceries and household items"
      completed: true
    }
  ) {
    id
    title
    description
    completed
    dueDate
  }
}
```
Delete a Todo
```
mutation DeleteTodo {
  deleteTodo(id: "your-todo-id-here")
}
```
Docker
This project uses Docker for easy deployment and development. The docker-compose.yml file is located in the ./config directory.

  ```
# Start the Docker containers
npm run docker:up

# Stop the Docker containers
npm run docker:down

# Rebuild the Docker containers
npm run docker:rebuild

# View Docker logs
npm run docker:logs

# View running Docker containers
npm run docker:ps
```

Contact
Tan hangsapho - hangsaphotan@gmail.com

Project Link: https://github.com/tanhangsapho/todo-graphql.git

Acknowledgements
TypeGraphQL
MongoDB
Docker
TypeScript
