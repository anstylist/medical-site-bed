# Make It Real - Medical Site Back End 💻

The backend of the Make It Real Medical Site is built using Node.js and Express.js, with Prisma as the database ORM (Object-Relational Mapping). It handles user authentication, appointment management, product management, and communication with the frontend through RESTful APIs.

**Technologies Used**
**Node.js:** Node.js is a runtime environment that allows us to run JavaScript on the server-side. It's the foundation of our backend.

**Express.js:** Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It's used to create the RESTful API endpoints.

**Bcrypt:** Bcrypt is used for hashing user passwords before storing them in the database. It ensures that user passwords are securely stored.

**JSON Web Tokens (JWT):** JWTs are used for user authentication. When a user logs in, a JWT is generated and sent to the client, which is then included in subsequent requests to authenticate the user.

**Prisma:** Prisma is an ORM that simplifies database access. It's used to define the data models and interact with the PostgreSQL database.

## User Authentication
When a user registers or logs in, their password is hashed using Bcrypt before being stored in the database to ensure security.

Upon successful login, a JWT (JSON Web Token) is generated and sent to the client, which is included in the headers of subsequent requests to authenticate the user.

## RESTful API Endpoints
The backend provides the following RESTful API endpoints:

**Authentication:**

POST /api/auth/register: Register a new user.

POST /api/auth/login: Log in an existing user and receive a JWT.

GET /api/auth/logout: Log out the user.


**Appointments:**

GET /api/appointments: Retrieve a list of appointments.

POST /api/appointments: Create a new appointment.

PUT /api/appointments/:id: Update an existing appointment.

DELETE /api/appointments/:id: Delete an appointment.


**Products:**

GET /api/products: Retrieve a list of medical products.

POST /api/products: Add a new medical product.

PUT /api/products/:id: Update an existing medical product.

DELETE /api/products/:id: Delete a medical product.


## Database
The backend uses PostgreSQL as the database to store user information, appointments, and medical product data.

Prisma is used to define the data models, perform database migrations, and interact with the database.

## Deployment
The backend is deployed on Render, a cloud hosting service, to make it accessible to the frontend and users.

## Prerequisites

- [Git](https://git-scm.com/downloads)
- [Node.js and npm](https://nodejs.org) Node >= 18.15 LTS, npm >= 9.5.x - Install with Volta.sh

## Express Router and Routes

| Route            | HTTP Verb | Route Middleware | Description           |
| ---------------- | --------- | ---------------- | --------------------- |
| /api/healthcheck | GET       |                  | Show a simple message |
| /api/users       | GET       |                  | Get list of users     |
| /api/users       | POST      |                  | Creates a new users   |
| /api/users/:id   | GET       |                  | Get a single users    |
| /api/users/:id   | DELETE    |                  | Deletes a user        |

## Usage

The use of endpoints is very simple, previously you could see a table of endpoints that you can call, if you need to create a note or log in, here we have some examples.

### Authentication **user** `/auth/local/login`

Request Body:

```json
{
  "email": "jd@test.com",
  "password": "1234"
}
```

Response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNyaXN0aWFuLm1vcmVub0BtYWtlaXRyZWFsLmNhbXAiLCJpYXQiOjE2NjEyMDgwODJ9.kPdMoVUEnyX36vi606Mc1C66yWLKKAB37GLbF0gzhBo",
  "profile": {
    "id": "62fd77a4d25acc4a4e5df3d1",
    "firstName": "JHON",
    "lastName": "Doe",
    "email": "jd@test.com"
  }
}
```

### Basic example **Create User** `/api/users`

Request Body:

```json
{
  "name": "jhon doe",
  "email": "jd@test.com",
  "password": "123456"
}
```

Response:

```json
{
  "name": "jhon doe",
  "email": "jd@test.com",
  "role": "USER"
}
```

### Developing

1. Clone the repository

2. Run `npm install` to install server dependencies.

3. Configure the env running `cp .env.example .env`

4. Update `.env` with the required info

5. Run the migrations and create new migrations if new changes were made into the schema file:
```sh
npx prisma migrate dev
```
6. Generate the Prisma Clients after changing the Schema file:
```sh
npx prisma generate
```

7. Run `npm run dev` to start the development server.

## License

[MIT](LICENSE)
