import {Retriever} from './retriever';
import {SqsPoster} from './sqs-poster';
import {Record} from './record';


const BATCH_SIZE = 1000;

export default class Runner {

    private readonly retriever: Retriever;
    private readonly sqs: SqsPoster;

    constructor(retriever: Retriever, sqs: SqsPoster) {
        this.retriever = retriever;
        this.sqs = sqs;
    }

    async run(): Promise<{}[][]> {

        let offset = 0;
        let promises = [];

        let totalItems = await this.retriever.getTotal();

        while (offset <= totalItems) {
            promises.push(this.retriever.getRecords(offset, BATCH_SIZE).then((records: Record[]) => {
                return this.sqs.postRecords(records);
            }));
            offset += BATCH_SIZE;
        }

        return await Promise.all(promises);
    }
}