import {SqsPoster} from "../../src/sqs-poster";

const AWS = require('aws-sdk');
const SQS = new AWS.SQS({apiVersion: '2012-11-05'});

describe('SqsPoster', () => {

    describe('#postRecords', () => {

        test('should chunk records and call sqs sendBatchMessage', async () => {
            let queueUrl = 'sqs://test';
            let records = require('../data/records.json');

            let spy = jest.spyOn(SQS, 'sendMessageBatch').mockImplementation((params, cb) => cb(null, true));

            let poster = new SqsPoster(queueUrl, SQS);

            await poster.postRecords(records);

            expect(spy).toHaveBeenCalled();
            expect(spy.mock.calls.length).toEqual(Math.ceil(records.length / 10));
        });

    });
});