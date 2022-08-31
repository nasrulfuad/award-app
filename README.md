# Award App

Simple award app

### Requirements

- NodeJS >= v16.15.1
- Node Package Manager, eg: npm, yarn
- Docker and Docker Compose (To run our third app, eg: postgres)

### How To Run Server

1. Install all dependencies on `/server` with your package manager
2. Clone `.env.example` and name it `.env`

   ```bash
   cd server && cp .env.example .env
   ```

3. Run our third library using docker compose :

   ```bash
   docker-compose up -d
   ```

4. Because we just have a fresh database, so we need to migrate our migrations and create some default data in `/server`

   ```bash
   # generate prisma type
   yarn generate

   # migrate our migrations
   yarn migrate

   # create our default data
   yarn initial
   ```

5. Run unit test to make sure the server works

   ```bash
   yarn test
   ```

6. Run the server

   ```bash
   yarn dev
   ```

### How To Run Client

1. Install all dependencies on `/client` with your package manager
2. Run the client

   ```bash
   yarn start
   ```

### Information

- Our server run on port 3001
- Our client run on port 3000
- Default email to login `john@email.com`
- You can see the preview on `preview.mp4`

### Tech Stacks

- Backend: NodeJS, Typescript, Express, PrismaORM, Jest, Json Web Token, Postgres
- Frontend : ReactJS, Redux, React-Query and Ant Design
