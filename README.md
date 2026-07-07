# Contact Manager Backend

REST API for the Contact Manager application built with Node.js, Express, and MongoDB. It provides secure authentication, avatar uploads, and private contact management.

## Related Project

The frontend application consumes this API for authentication and contact management.

- **Frontend Repository:** https://github.com/summermoved0n/Contact-Manager-Frontend
- **Frontend Live Demo:** https://summermoved0n.github.io/Contact-Manager-Frontend/

## Tech Stack

- Node.js
- Express
- MongoDB with Mongoose
- JWT authentication
- Joi validation
- Multer and Jimp for avatar uploads

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root. You can use `.env.example` as a template:

```env
DB_HOST=
PORT=
JWT_SECRET=
BASE_URL=
```

Environment variables:

- `DB_HOST` - MongoDB connection string.
- `PORT` - server port. Defaults to `3210` if not provided.
- `JWT_SECRET` - secret key for signing JWT tokens.
- `BASE_URL` - deployed backend URL used by Swagger, for example `https://your-service-name.onrender.com`.

### 3. Run the server

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

By default, the API runs on:

```text
http://localhost:3210
```

## API Documentation

- **Swagger UI:** https://contact-manager-backend-fb7b.onrender.com/api-docs
- **OpenAPI JSON:** https://contact-manager-backend-fb7b.onrender.com/api-docs.json

## API Overview

Base API paths:

- `/api/users`
- `/api/contacts`

Protected routes require an authorization header:

```text
Authorization: Bearer <token>
```

## User Routes

### Register

```http
POST /api/users/register
```

Request body:

```json
{
  "name": "Jane",
  "email": "user@example.com",
  "password": "password123"
}
```

Email verification and subscription features are currently disabled and are not part of the available frontend flow.

### Login

```http
POST /api/users/login
```

Request body:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Get Current User

```http
GET /api/users/current
```

Requires authentication.

### Logout

```http
POST /api/users/logout
```

Requires authentication.

### Update Avatar

```http
PATCH /api/users/avatars
```

Requires authentication.

Send `multipart/form-data` with the file field named `avatarURL`.

## Contact Routes

All contact routes require authentication.

### Get Contacts

```http
GET /api/contacts
```

Query parameters:

- `page` - page number. Defaults to `1`.
- `limit` - contacts per page. Defaults to `20`.
- `favorite` - filter favorite contacts.

Example:

```http
GET /api/contacts?page=1&limit=10&favorite=true
```

### Get One Contact

```http
GET /api/contacts/:id
```

### Create Contact

```http
POST /api/contacts
```

Request body:

```json
{
  "name": "Jane Doe",
  "phone": "1234567890"
}
```

### Update Contact

```http
PUT /api/contacts/:id
```

Request body can include one or more fields:

```json
{
  "name": "Jane Smith",
  "phone": "1234567890"
}
```

### Update Favorite Status

```http
PATCH /api/contacts/:id/favorite
```

Request body:

```json
{
  "favorite": true
}
```

### Delete Contact

```http
DELETE /api/contacts/:id
```

## Project Structure

```text
controllers/   Route controllers
helpers/       Shared helpers and error handling
middlewares/   Auth, validation, upload, and ID middleware
models/        Mongoose models
routes/        Express routers
schemas/       Joi validation schemas
services/      Database service functions
public/        Static files and uploaded avatars
tmp/           Temporary upload directory
```
