import SQS = require('aws-sdk/clients/sqs');
import {Record} from './record';

const _ = require('lodash');
const Q = require('q');

export class SqsPoster {

    private sqs: SQS;
    private readonly queueUrl: string;

    constructor(queueUrl: string, sqs: SQS) {
        this.queueUrl = queueUrl;
        this.sqs = sqs;
    }

    async postRecords(records: Record[]): Promise<{}[]> {
        return Promise.all(_.chunk(records, 10).map((records: Record[], chunkIndex: number) => {
            let params = {
                Entries: records.map((record: Record, index: number) => {
                    return {
                        Id: (++index).toString(),
                        MessageBody: JSON.stringify(record),
                        DelaySeconds: 0,
                        MessageGroupId: (++chunkIndex).toString()
                    };
                }),
                QueueUrl: this.queueUrl
            };

            return Q.ninvoke(this.sqs, 'sendMessageBatch', params);
        }));
    }
}