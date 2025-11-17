"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Request = require("@src/libs/Request");
var TestHelper = require("../utils/TestHelper");
var waitForBatchedUpdates_1 = require("../utils/waitForBatchedUpdates");
beforeAll(function () {
    global.fetch = TestHelper.getGlobalFetchMock();
});
beforeEach(function () {
    Request.clearMiddlewares();
});
var request = {
    command: 'MockCommand',
    data: { authToken: 'testToken' },
};
test('Request.addMiddleware() can register a middleware and it will run', function () {
    var testMiddleware = jest.fn();
    Request.addMiddleware(testMiddleware);
    Request.processWithMiddleware(request, true);
    return (0, waitForBatchedUpdates_1.default)().then(function () {
        var call = testMiddleware.mock.calls.at(0);
        if (!call) {
            return;
        }
        var promise = call[0], returnedRequest = call[1], isFromSequentialQueue = call[2];
        expect(testMiddleware).toHaveBeenCalled();
        expect(returnedRequest).toEqual(request);
        expect(isFromSequentialQueue).toBe(true);
        expect(promise).toBeInstanceOf(Promise);
    });
});
test('Request.addMiddleware() can register two middlewares. They can pass a response to the next and throw errors', function () {
    // Given an initial middleware that returns a promise with a resolved value
    var testMiddleware = jest.fn().mockResolvedValue({
        jsonCode: 404,
    });
    // And another middleware that will throw when it sees this jsonCode
    var errorThrowingMiddleware = function (promise) {
        return promise.then(function (response) {
            if (typeof response === 'object' && response.jsonCode !== 404) {
                // Pass the response through to the next middleware
                return response;
            }
            // Reject so the chain receives an error
            throw new Error('Oops');
        });
    };
    Request.addMiddleware(testMiddleware);
    Request.addMiddleware(errorThrowingMiddleware);
    var catchHandler = jest.fn();
    Request.processWithMiddleware(request).catch(catchHandler);
    return (0, waitForBatchedUpdates_1.default)().then(function () {
        expect(catchHandler).toHaveBeenCalled();
        expect(catchHandler).toHaveBeenCalledWith(new Error('Oops'));
    });
});
