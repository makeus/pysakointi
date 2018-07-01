import {Retriever} from '../../src/retriever';
import {SqsPoster} from '../../src/sqs-poster';
import SQS = require('aws-sdk/clients/sqs');
import Runner from '../../src/runner';

describe('Runner', () => {

    describe('#run', () => {

        test('should call api retriever and sqs', async () => {
            let retriever = new Retriever('asdasd');
            let sqs = new SqsPoster('test', new SQS());

            let retriverTotalSpy = jest.spyOn(retriever, 'getTotal').mockResolvedValue(2001);
            let retrieverSpy = jest.spyOn(retriever, 'getRecords').mockResolvedValue(require('../data/records.json'));
            let sqsSpy = jest.spyOn(sqs, 'postRecords').mockResolvedValue(true);


            let instance = new Runner(retriever, sqs);


            await instance.run();

            expect(sqsSpy).toHaveBeenCalledTimes(3);
            expect(retriverTotalSpy).toHaveBeenCalled();
            expect(retrieverSpy).toHaveBeenCalledTimes(3);

            expect(retrieverSpy.mock.calls).toEqual([[0, 1000], [1000, 1000], [2000, 1000]]);

        });

    });
});