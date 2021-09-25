## Local development setup

- Create an .env file from the template `env.example`
- Populate `env.example` with the appropriate key value pairs(NOTE: You'll have to have your database setup before this step)
- Run the following commands to get started with local development
```
npm i
npx prisma db push
npx prisma generate
```
- Finally to start your local API serverless instance, run
```
serverless offline
```