"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var retriever_1 = require("../../src/retriever");
var nock = require('nock');
describe('Retriever', function () {
    describe('#getTotal', function () {
        test('should call api with proper recource id and empty limit & offset', function () { return __awaiter(_this, void 0, void 0, function () {
            var resourceId, retriever, total;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resourceId = '342466fdgdf-sasd';
                        nock('https://www.avoindata.fi')
                            .get('/data/fi/api/3/action/datastore_search')
                            .query({ resource_id: resourceId, limit: '0', offset: '0' })
                            .reply(200, require('./../data/datastore-search-0-limit-0-offset.json'));
                        retriever = new retriever_1.Retriever(resourceId);
                        return [4 /*yield*/, retriever.getTotal()];
                    case 1:
                        total = _a.sent();
                        expect(total).toEqual(37051);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('#getRecords', function () {
        test('should call with given limit, offset and recourceId', function () { return __awaiter(_this, void 0, void 0, function () {
            var resourceId, limit, offset, retriever, records;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resourceId = '342466fdgdf-sasd';
                        limit = 13;
                        offset = 123;
                        nock('https://www.avoindata.fi')
                            .get('/data/fi/api/3/action/datastore_search')
                            .query({ resource_id: resourceId, limit: limit, offset: offset })
                            .reply(200, require('./../data/datastore-search-13-lmit-123-offset.json'));
                        retriever = new retriever_1.Retriever(resourceId);
                        return [4 /*yield*/, retriever.getRecords(offset, limit)];
                    case 1:
                        records = _a.sent();
                        expect(records[0]['Virheen tekokuukausi']).toEqual('Tammikuu');
                        expect(records[8]['Virheen tekokuukausi']).toEqual('Maaliskuu');
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
