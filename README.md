# Fastify TypeScript CRUD Application with WebSocket Integration

## Description

The project is designed to create a Fastify application that supports CRUD operations on a User entity, documented with Swagger, and integrates a WebSocket server to facilitate bidirectional communication between the client and server.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# compile typescript
$ npm run build

# run on development mode (Compiling and running)
$ npm run start:dev

# run on production mode (Compiling and running)
$ npm run start:prod
```

## HTTP server

- Set the port in the .env file, port is 3000 by default (http://localhost:3000)
- The (JATDEV-http.postman_collection.json) file is provided in the folder named (postman), import the file into postman and use the

### CRUD Operations

- `GET /users`: Fetch all users.
- `GET /users/:id`: Fetch a user by ID.
- `POST /users/signup`: Create a new user.
- `POST /users/login`: Login with email and password, returns access token.
- `PUT /users/:id`: Update a user by ID, requires a body with the updated data and a bearer access token in the 'Authorization' header.
- `DELETE /users/:id`: Delete a user by ID, requires a bearer access token in the 'Authorization' header.

## WebSocket Server

- The websocket server is on the same port as the HTTP server (port 3000 by default) (ws://localhost:3000)
- Use this invitation link to join the JATDEV-Task team to get access to the collection: (https://app.getpostman.com/join-team?invite_code=99d1f04257edc76286acc0b74e2b15b7)

## Swagger Server

- Once the app is running, you can visit the link (http://localhost:3000/docs) to access the swagger documentations for the API.

## Dependencies

- [@fastify/jwt](https://www.npmjs.com/package/@fastify/jwt)
- [@fastify/mongodb](https://www.npmjs.com/package/@fastify/mongodb)
- [@fastify/swagger](https://www.npmjs.com/package/@fastify/swagger)
- [@fastify/swagger-ui](https://www.npmjs.com/package/@fastify/swagger-ui)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [fastify](https://www.npmjs.com/package/fastify)
- [fastify-plugin](https://www.npmjs.com/package/fastify-plugin)
- [fastify-zod](https://www.npmjs.com/package/fastify-zod)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [ws](https://www.npmjs.com/package/ws)
