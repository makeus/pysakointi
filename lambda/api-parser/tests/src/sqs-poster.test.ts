import {SqsPoster} from "../../src/sqs-poster";

import SQS = require('aws-sdk/clients/sqs');

describe('SqsPoster', () => {

    describe('#postRecords', () => {

        test('should chunk records and call sqs sendBatchMessage', async () => {
            let queueUrl = 'sqs://test';
            let records = require('../data/records.json');
            let sqs = new SQS();
            let spy = jest.spyOn(sqs, 'sendMessageBatch').mockImplementation((params, cb) => cb(null, true));

            let poster = new SqsPoster(queueUrl, sqs);

            await poster.postRecords(records);

            expect(spy).toHaveBeenCalled();
            expect(spy.mock.calls.length).toEqual(Math.ceil(records.length / 10));
        });

    });
});