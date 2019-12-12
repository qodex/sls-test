# sls-test
Basic serverless app

This is a basic serverless app to create, get and find articles. 
Requires npm and serverless.

to install run 'npm i'
to test run 'npm test'
to deploy run 'sls deploy -v'

There is a collection of postman integration tests in the root folder.

The app is currently deployed on aws with endpoints:

https://1eyuj3dqva.execute-api.ap-southeast-2.amazonaws.com/dev/articles/{id}

https://1eyuj3dqva.execute-api.ap-southeast-2.amazonaws.com/dev/tags/{tag}/{date}

Sample "find by tag and date" url:

https://1eyuj3dqva.execute-api.ap-southeast-2.amazonaws.com/dev/tags/birds/20190922
