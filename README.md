# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Donwload & Install Docker](https://docs.docker.com/get-docker)

## Installation

```bash
git clone https://github.com/a-sahonchik/nodejs2022Q4-service.git

cd nodejs2022Q4-service

git checkout feature/logging-error-handling-authentication-authorization
```

**!!! Copy `.env.example` to `.env` !!!**

```bash
cp .env.example .env
```

## Running application

```bash
docker compose build

docker compose up
```

After starting the app on port (`4000` as default, and you can change it value with `PORT` variable in `.env`) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/docs/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

All needed database migrations will be executed automatically.

## Auth
1. Run containers, go to Swagger UI - http://localhost:4000/docs/
2. Send POST request to `/auth/signup` to create new user.
3. Send POST request to `/auth/login` with login and password of created user. In response you'll receive `access` and `refresh` tokens.
4. Copy `accessToken` from response, click `Authorize` button, insert access token (WITHOUT `Bearer ` perfix, cause it will be added automatically) and press `Authorize`. Now you are authorized and it's possible to send requests to all endpoints.
5. If you want to refresh tokens, you should take `refreshToken` you received on login and send it in /auth/refresh request body. In response you'll get new pair of tokens.

Or, if you want to use external apps like Postman, you should pass `Authorization` header in format `Authorization: Bearer <TOKEN>`

## Logging

By default logs are written to `process.stdout` and `./logs` folder. `app.log` is for all logs (including errors) and `error.log` is for errors only.

Logs are rotated with size, and you can change size with `LOG_FILE_MAX_SIZE` env variable. By default it is 5 KB.

There is logging level implemented, you can change it with `LOG_LEVEL` variable. By default it is 2 (error, warn, log).

Available log levels:
- `0` - error
- `1` - warn
- `2` - log
- `3` - verbose
- `4` - debug

## Scanning images for vulnerabilities

**!!! You need to be logged in your Docker Hub account to perform scanning !!!**

```bash
npm run scan
```

## Testing

After application running open new terminal and enter:

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
