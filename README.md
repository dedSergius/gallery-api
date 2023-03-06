## Description

Required: Node.js, PostgreSQL

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Migration
```
npx typeorm-ts-node-esm migration:run -d .\datasource.ts
```

## Methods

```
POST /api/auth/login
```
Body (application/json):
{
  "username": "admin",
  "password": "password"
}
Response:
{
  "access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."} //Bearer token
```
GET /profile
```
```
POST /clean
```
```
GET /img/:id
```
```
GET /api/images
```
```
GET /api/images/:id
```
```
POST /api/images/:id
```
```
UPDATE /api/images/:id
```
```
DELETE /api/images/:id
```
```
GET /api/users
```
```
GET /api/users/:id
```
```
POST /api/users/:id
```
```
UPDATE /api/users/:id
```