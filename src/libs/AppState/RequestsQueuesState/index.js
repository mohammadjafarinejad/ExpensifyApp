"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PersistedRequests_1 = require("@libs/actions/PersistedRequests");
var ActiveClientManager_1 = require("@libs/ActiveClientManager");
var MainQueue_1 = require("@libs/Network/MainQueue");
var SequentialQueue_1 = require("@libs/Network/SequentialQueue");
/**
 * Captures current MainQueue state.
 */
function captureMainQueueState() {
    var queuedRequests = (0, MainQueue_1.getAll)();
    return {
        pendingRequestsCount: queuedRequests.length,
        queuedCommands: queuedRequests.map(function (request) { return request.command; }).filter(Boolean),
    };
}
/**
 * Captures current PersistedRequests state.
 */
function capturePersistedRequestsState() {
    var persistedRequests = (0, PersistedRequests_1.getAll)();
    var ongoingRequest = (0, PersistedRequests_1.getOngoingRequest)();
    return {
        queuedRequestsCount: persistedRequests.length,
        queuedCommands: persistedRequests.map(function (request) { return request.command; }).filter(Boolean),
        ongoingRequestInfo: ongoingRequest
            ? {
                command: ongoingRequest.command,
                persistWhenOngoing: ongoingRequest.persistWhenOngoing,
                isRollback: ongoingRequest.isRollback,
            }
            : undefined,
    };
}
/**
 * Captures current SequentialQueue state.
 */
function captureSequentialQueueState() {
    return {
        isRunning: (0, SequentialQueue_1.isRunning)(),
        isPaused: (0, SequentialQueue_1.isPaused)(),
    };
}
/**
 * Captures leader state (whether this client is the leader).
 */
function captureLeaderInfo() {
    return {
        isClientLeader: (0, ActiveClientManager_1.isClientTheLeader)(),
    };
}
/**
 * Captures current requests queues state.
 */
function captureRequestsQueueState() {
    return {
        mainQueue: captureMainQueueState(),
        sequentialQueue: captureSequentialQueueState(),
        persistedRequests: capturePersistedRequestsState(),
        leaderInfo: captureLeaderInfo(),
    };
}
exports.default = captureRequestsQueueState;
