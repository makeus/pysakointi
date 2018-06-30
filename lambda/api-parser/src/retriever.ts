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
    _initPromise: Promise<Response>;

    totalItems: number;
    resourceId: string;

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
        this._initPromise = this._get(0, 0)
            .then((response: Response): Response => {
                this.totalItems = response.body.result.total;
                return response;
            });
    }


    /**
     * 
     * @param {number} offset
     * @param {number} limit
     * @returns {Promise<Record[]>}
     */
    async getRecords(offset: number, limit: number): Promise<Record[]> {
        await this._initPromise;

        let response = await this._get(limit, offset);

        return response.body.result.records;
    }

}