# Daily Diet API

REST API for daily diet tracking. Users can register meals, track whether they are on or off diet, and view metrics such as best on-diet streak.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Fastify
- **Language:** TypeScript
- **Database:** SQLite (via Knex query builder)
- **Validation:** Zod
- **Testing:** Vitest + Supertest (e2e)

## Project Structure

```
├── src/
│   ├── server.ts                # Fastify app setup and startup
│   ├── database.ts              # Knex instance and config
│   ├── env/
│   │   └── index.ts             # Zod env validation
│   ├── middlewares/
│   │   └── check-session-id-exists.ts
│   ├── routes/
│   │   ├── users.routes.ts
│   │   └── meals.routes.ts
│   └── @types/
│       ├── knex.d.ts
│       └── fastify.d.ts
├── db/
│   └── migrations/
├── test/
│   ├── users.spec.ts
│   └── meals.spec.ts
├── knexfile.ts
├── vitest.config.ts
├── tsconfig.json
└── package.json
```

## Setup

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Run migrations
npm run knex migrate:latest

# Start dev server
npm run dev
```

### Environment Variables

| Variable          | Description              | Default      |
|-------------------|--------------------------|--------------|
| `NODE_ENV`        | development / test / production | production |
| `DATABASE_CLIENT` | `sqlite3` or `pg`        | sqlite3      |
| `DATABASE_URL`    | Database file path or connection string | — |
| `PORT`            | HTTP server port          | 3333         |

## API Endpoints

### Users

| Method | Route    | Description       |
|--------|----------|-------------------|
| POST   | `/users` | Create a new user |

### Meals

All meal routes require a valid `sessionId` cookie.

| Method | Route             | Description               |
|--------|-------------------|---------------------------|
| POST   | `/meals`          | Create a new meal         |
| GET    | `/meals`          | List all meals            |
| GET    | `/meals/:mealId`  | Get a single meal         |
| PUT    | `/meals/:mealId`  | Update a meal             |
| DELETE | `/meals/:mealId`  | Delete a meal             |
| GET    | `/meals/metrics`  | Get user diet metrics     |

### Request/Response Examples

**POST /users**
```json
{
  "name": "John Doe",
  "email": "johndoe@gmail.com"
}
```

**POST /meals**
```json
{
  "name": "Breakfast",
  "description": "Eggs and toast",
  "isOnDiet": true,
  "date": "2024-01-15T08:00:00"
}
```

**GET /meals/metrics** (response)
```json
{
  "totalMeals": 5,
  "totalMealsOnDiet": 4,
  "totalMealsOffDiet": 1,
  "bestOnDietSequence": 3
}
```

## Business Rules

- Users are identified across requests via a `sessionId` cookie
- Meals are linked to the user who created them
- Users can only view, edit, and delete their own meals
- Metrics include: total meals, on-diet count, off-diet count, and best on-diet streak

## Testing

```bash
# Run e2e tests
npm test

# Run tests once (no watch)
npm test -- --run
```

## Scripts

| Script          | Description                          |
|-----------------|--------------------------------------|
| `npm run dev`   | Start dev server with hot reload     |
| `npm test`      | Run e2e tests with Vitest            |
| `npm run build` | Build for production with tsup       |
| `npm run lint`  | Lint source files with ESLint        |
| `npm run knex`  | Run Knex CLI (e.g. `npm run knex migrate:make migration_name`) |
