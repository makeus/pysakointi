import SQS = require("aws-sdk/clients/sqs");
import {Record} from "./record";

const _ = require('lodash');
const promisify = require('util').promisify;

export class SqsPoster {

    sqs: SQS;
    queueUrl: string;

    constructor(queueUrl: string, sqs: SQS) {
        this.queueUrl = queueUrl;
        this.sqs = sqs;
    }

    async postRecords(records: Record[]): Promise<{}[]> {
        return Promise.all(_.chunk(records, 10).map((records: Record[], chunkIndex: number) => {
            let params = {
                Entries: records.map((record: Record, index: number) => {
                    return {
                        Id: index,
                        MessageBody: JSON.stringify(record),
                        DelaySeconds: 0,
                        MessageGroupId: chunkIndex
                    };
                }),
                QueueUrl: this.queueUrl
            };

            return promisify(this.sqs.sendMessageBatch)(params);
        }));
    }
}