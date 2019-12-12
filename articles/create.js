'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  if (typeof data.body !== 'string') {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Invalid request body',
    });
    return;
  }

  let date = data.date.split('-').join('');

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: date+'-'+uuid.v1(),
      title: data.title,
      date: data.date,
      body: data.body,
      tags: data.tags,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  dynamoDb.put(params, (error) => {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Error saving the article.',
      });
      return;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};
