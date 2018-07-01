const got = require('got');

import {Record} from './record';

const ADDRESS = 'https://www.avoindata.fi/data/fi/api/3/action/datastore_search';

interface Response {
    body: {
        result: {
            records: Record[],
            total: number
        }
    };
}

interface ErrorResponse {
    response: {
        body: {
            error: string
        }
    }
}

export class Retriever {
    private readonly resourceId: string;
    totalItems: number;

    /**
     * @param {number} limit
     * @param {number} offset
     * @returns {Promise<Response>}
     * @private
     */
    async _get(limit: number, offset: number): Promise<Response> {
        return got(`${ADDRESS}?resource_id=${this.resourceId}&limit=${limit}&offset=${offset}`, {json: true});
    }

    /**
     * @param {string} resourceId
     */
    constructor(resourceId: string) {
        this.resourceId = resourceId;
    }


    /**
     * @returns {Promise<number>}
     */
    async getTotal(): Promise<number> {
        return (await this._get(0, 0)).body.result.total;
    }

    /**
     *
     * @param {number} offset
     * @param {number} limit
     * @returns {Promise<Record[]>}
     */
    async getRecords(offset: number, limit: number): Promise<Record[]> {
        let response = await this._get(limit, offset);

        return response.body.result.records;
    }

}