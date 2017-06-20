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

Export the following variables into your docker container

```
export AWS_ACCESS_KEY_ID=<your-access-id>
export AWS_SECRET_ACCESS_KEY=<your-access-secret>
export CLIENT_ID=<the-app-slack-client-id>
export CLIENT_SECRET=<the-app-slack-client-secret>
```

AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY would be your personal credentials to the account `xpeppers-test`. Please ensure that you have all the necessary permission to create all of the resources.

CLIENT_ID and CLIENT_SECRET are your Slack App credentials, which can be found in the application administration page under "Basic Information".
Pr0tip: you can use staging app credentials by default and for running the tests, but be sure to export the correct ones before deploying to production.

Run unit tests only:

`npm run test:unit`


Run integration tests only:

`npm run test:integration`

Run acceptance tests only:

`npm run test:acceptance`

Run all tests:

`npm test`


Start local serverless at port 3000

`npm start`

##Deploy

`serverless deploy --stage <stage-name>`


##Tail logs

`serverless logs -f <function-name> --stage <stage-name> -t`
