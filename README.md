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

Run unit tests only:

`npm run test:unit`

Note: to run integration and acceptance tests you should first set your AWS credentials globally (account is `xpeppers-test`)
```
export AWS_ACCESS_KEY_ID=<your-access-id>; export AWS_SECRET_ACCESS_KEY=<your-access-secret>
```

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
