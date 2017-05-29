# Happiness Index Reloaded

##Requirements

* Docker

##Set up

Build Docker image

`docker build -t xpeppers/happy .`

Run container

`docker run -it -p 8000:3000 -v $(pwd):/home/ec2user xpeppers/happy`

Install dependencies

`npm install`

##Development

Run all tests

`npm test`

Only unit

`npm run test:unit`

Only integration

`npm run test:integration`

Only acceptance

`npm run test:acceptance`


Start local serverless

`npm start`

##Deploy

`serverless deploy --stage <stage-name>`
