'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.find = (event, context, callback) => {

    let tagParam = event.pathParameters.tag;
    let dateParam = event.pathParameters.date;

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        ScanFilter: {
            "id": {
                ComparisonOperator: "BEGINS_WITH",
                AttributeValueList: [dateParam]
            }
        }
    };

    dynamoDb.scan(params, (error, result) => {
        if (error) {
            console.error(error);
            callback(null, {
                statusCode: error.statusCode || 501,
                headers: { 'Content-Type': 'text/plain' },
                body: 'Couldn\'t fetch the todos.',
            });
            return;
        }

        let related_tags = []
        let subset = result.Items.filter(article => {
            related_tags = [...related_tags, ...article.tags];
            return article.tags.includes(tagParam);
        });

        const response_body = {
            tag: tagParam,
            count: subset.length,
            articles: [...subset.map( article => article.id )],
            related_tags: [...new Set( related_tags.filter( tag => tag!==tagParam) )]
        }

        const response = {
            statusCode: 200,
            body: JSON.stringify(response_body),
        };
        callback(null, response);
    });
};
