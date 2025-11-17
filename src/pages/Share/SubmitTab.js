"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var ShareTabParticipantsSelector_1 = require("@components/Share/ShareTabParticipantsSelector");
var ROUTES_1 = require("@src/ROUTES");
function SubmitTabComponent(_a) {
    var ref = _a.ref;
    return (<ShareTabParticipantsSelector_1.default ref={ref} detailsPageRouteObject={ROUTES_1.default.SHARE_SUBMIT_DETAILS}/>);
}
var SubmitTab = SubmitTabComponent;
exports.default = SubmitTab;
