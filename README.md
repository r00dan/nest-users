# nest-users

## Environment Variables

### Database Configuration
- `POSTGRES_PORT`: Port number for PostgreSQL access.
- `POSTGRES_USER`: Username for the database.
- `POSTGRES_PASSWORD`: Password for the specified user.
- `POSTGRES_NAME`: Name of the database to use.

### Application Configuration
- `NODE_ENV`: Environment the app is running in (`development`, `production`, etc.)
- `ACCESS_TOKEN_SECRET`: Secret key for signing access tokens
- `REFRESH_TOKEN_SECRET`: Secret key for signing refresh tokens
- `ACCESS_TOKEN_LIFETIME`: Access token lifetime in minutes (e.g., `480` for 8 hours)
- `REFRESH_TOKEN_LIFETIME`: Refresh token lifetime in days (e.g., `7` for one week)

You can set these variables in a `.env` file located in the project root directory.

## Getting Started

Follow these steps to build and run the project:

1. **Create a Docker network**:
```bash
$ docker network create -d bridge users-network
```

2. **Build the container**:
```bash
$ docker compose build --no-cache
```

3. **Start the container**:
```bash
$ docker compose up -d
```
