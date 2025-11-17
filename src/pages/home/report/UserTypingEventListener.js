"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var native_1 = require("@react-navigation/native");
var react_1 = require("react");
var react_native_1 = require("react-native");
var useOnyx_1 = require("@hooks/useOnyx");
var Navigation_1 = require("@libs/Navigation/Navigation");
var Report_1 = require("@userActions/Report");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
function UserTypingEventListener(_a) {
    var report = _a.report;
    var _b = (0, useOnyx_1.default)(ONYXKEYS_1.default.LAST_VISITED_PATH, { canBeMissing: true })[0], lastVisitedPath = _b === void 0 ? '' : _b;
    var didSubscribeToReportTypingEvents = (0, react_1.useRef)(false);
    var reportID = report.reportID;
    var isFocused = (0, native_1.useIsFocused)();
    var route = (0, native_1.useRoute)();
    (0, react_1.useEffect)(function () { return function () {
        if (!didSubscribeToReportTypingEvents.current) {
            return;
        }
        // unsubscribe from report typing events when the component unmounts
        didSubscribeToReportTypingEvents.current = false;
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        react_native_1.InteractionManager.runAfterInteractions(function () {
            (0, Report_1.unsubscribeFromReportChannel)(reportID);
        });
    }; }, 
    // eslint-disable-next-line react-compiler/react-compiler, react-hooks/exhaustive-deps
    []);
    (0, react_1.useEffect)(function () {
        var _a;
        // Ensures any optimistic report that is being created (ex: a thread report) gets created and initialized successfully before subscribing
        if (((_a = route === null || route === void 0 ? void 0 : route.params) === null || _a === void 0 ? void 0 : _a.reportID) !== reportID) {
            return;
        }
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        var interactionTask = null;
        if (isFocused) {
            // Ensures subscription event succeeds when the report/workspace room is created optimistically.
            // Check if the optimistic `OpenReport` or `AddWorkspaceRoom` has succeeded by confirming
            // any `pendingFields.createChat` or `pendingFields.addWorkspaceRoom` fields are set to null.
            // Existing reports created will have empty fields for `pendingFields`.
            var didCreateReportSuccessfully = !report.pendingFields || (!report.pendingFields.addWorkspaceRoom && !report.pendingFields.createChat);
            if (!didSubscribeToReportTypingEvents.current && didCreateReportSuccessfully) {
                // eslint-disable-next-line @typescript-eslint/no-deprecated
                interactionTask = react_native_1.InteractionManager.runAfterInteractions(function () {
                    (0, Report_1.subscribeToReportTypingEvents)(reportID);
                    didSubscribeToReportTypingEvents.current = true;
                });
            }
        }
        else {
            var topmostReportId = Navigation_1.default.getTopmostReportId();
            if (topmostReportId !== reportID && didSubscribeToReportTypingEvents.current) {
                didSubscribeToReportTypingEvents.current = false;
                // eslint-disable-next-line @typescript-eslint/no-deprecated
                react_native_1.InteractionManager.runAfterInteractions(function () {
                    (0, Report_1.unsubscribeFromReportChannel)(reportID);
                });
            }
        }
        return function () {
            if (!interactionTask) {
                return;
            }
            interactionTask.cancel();
        };
    }, [isFocused, report.pendingFields, didSubscribeToReportTypingEvents, lastVisitedPath, reportID, route]);
    return null;
}
UserTypingEventListener.displayName = 'UserTypingEventListener';
exports.default = UserTypingEventListener;
