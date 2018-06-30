import {Retriever} from "../../src/retriever";

const nock = require('nock');

describe('Retriever', () => {

    describe('#getRecords', () => {

        test('should call without limit or offset first, then call proper.', async () => {
            let resourceId = '342466fdgdf-sasd';
            let limit = 13;
            let offset = 123;

            nock('https://www.avoindata.fi')
                .get('/data/fi/api/3/action/datastore_search')
                .query({resource_id: resourceId, limit: '0', offset: '0'})
                .reply(200, require('./../data/datastore-search-0-limit-0-offset.json'));

            nock('https://www.avoindata.fi')
                .get('/data/fi/api/3/action/datastore_search')
                .query({resource_id: resourceId, limit: limit, offset: offset})
                .reply(200, require('./../data/datastore-search-13-lmit-123-offset.json'));

            let retriever = new Retriever(resourceId);

            let records = await retriever.getRecords(offset, limit);

            expect(records[0]['Virheen tekokuukausi']).toEqual('Tammikuu');
            expect(records[8]['Virheen tekokuukausi']).toEqual('Maaliskuu');
            expect(retriever.totalItems).toEqual(37051);
        });
    });
});