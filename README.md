# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Donwload & Install Docker](https://docs.docker.com/get-docker)

## Installation

```bash
git clone https://github.com/a-sahonchik/nodejs2022Q4-service.git

cd nodejs2022Q4-service

git checkout feature/docker-containerization-and-postgres
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

## Scanning images for vulnerabilities

**!!! You need to be logged in your Docker Hub account to perform scanning !!!**

```bash
npm run scan
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

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
