"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RENDER_DELAY = 500;
var RenderTaskQueue = /** @class */ (function () {
    function RenderTaskQueue(onIsRenderingChange) {
        this.renderInfos = [];
        this.isRendering = false;
        this.handler = function () { };
        this.timeout = null;
        this.onIsRenderingChange = onIsRenderingChange;
    }
    RenderTaskQueue.prototype.add = function (info) {
        this.renderInfos.push(info);
        if (!this.isRendering) {
            this.render();
        }
    };
    RenderTaskQueue.prototype.setHandler = function (handler) {
        this.handler = handler;
    };
    RenderTaskQueue.prototype.cancel = function () {
        var _a;
        if (this.timeout == null) {
            return;
        }
        clearTimeout(this.timeout);
        (_a = this.onIsRenderingChange) === null || _a === void 0 ? void 0 : _a.call(this, false);
    };
    RenderTaskQueue.prototype.render = function () {
        var _this = this;
        var _a, _b;
        var info = this.renderInfos.shift();
        if (!info) {
            this.isRendering = false;
            (_a = this.onIsRenderingChange) === null || _a === void 0 ? void 0 : _a.call(this, false);
            return;
        }
        this.isRendering = true;
        (_b = this.onIsRenderingChange) === null || _b === void 0 ? void 0 : _b.call(this, true);
        this.handler(info);
        this.timeout = setTimeout(function () {
            _this.render();
        }, RENDER_DELAY);
    };
    return RenderTaskQueue;
}());
exports.default = RenderTaskQueue;
