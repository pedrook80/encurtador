# Nest.js Short Links

> Node.js Nest.js API., Mysql

## Description
This API is a short of links with auth users

## Features
##### Authentication:
- jwt authentication
##### Session Storage:
- MySQL

## Requirements

- node >= 12
- npm >= 6
- typescript >= 3.0

## Installation

npm i

## Running the API
### Development
To start the application in development mode, run:

```bash
npm run start:dev
```

Start the application in production env:

Install ts pm2 and typescript compiler:
```
npm install -g pm2
pm2 install typescript
```

example start with scale on 2 core:
```
pm2 start ./dist/main.js -i 2 --no-daemon
```

Express server listening on http://localhost:3000/, in development mode
The developer mode will watch your changes then will transpile the TypeScript code and re-run the node application automatically.

### Docker

* [Install Docker](https://docs.docker.com/get-docker/)
* [Install docker-compose](https://docs.docker.com/compose/install/)

To run your app in docker containers choose "Yes" when the generator asks you about docker.
 
#### Now, lift up your app in docker 
``` 
  docker-compose up 
```
  
## Set up environment
In root folder you can find `.env`. You can use this config or change it for your purposes.
    
If the migrations have some error please run but its active to be auto
`npm run db:migration`

## Documentation
There is a file for Postman, there was a problem with Swagger that I didn't solve