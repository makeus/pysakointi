

import {Retriever} from './retriever';
import {SqsPoster} from './sqs-poster';
import SQS = require('aws-sdk/clients/sqs');
import Runner from './runner';

declare type lambdaCallback = (error?: Error, message?: {}) => void

exports.handler = async (event: {}, context: {}, callback: lambdaCallback) => {
    
    let resourceId = process.env.RESOURCE_ID;
    let sqsQueueUrl = process.env.QUEUE_URL;

    if(!resourceId || !sqsQueueUrl) {
        callback(new Error('Missing required environment variables RESOURCE_ID or QUEUE_URL'));
    }

    let runner = new Runner(new Retriever(resourceId), new SqsPoster(sqsQueueUrl, new SQS({apiVersion: '2012-11-05'})));

    try {
        await runner.run();
        callback(null);
    } catch (e) {
        callback(e);
    }

};