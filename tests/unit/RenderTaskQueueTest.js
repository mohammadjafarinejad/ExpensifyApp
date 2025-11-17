"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RenderTaskQueue_1 = require("../../src/components/InvertedFlatList/BaseInvertedFlatList/RenderTaskQueue");
jest.unmock('../../src/components/InvertedFlatList/BaseInvertedFlatList/RenderTaskQueue');
describe('RenderTaskQueue', function () {
    beforeEach(function () {
        jest.useFakeTimers();
    });
    afterEach(function () {
        jest.clearAllTimers();
        jest.useRealTimers();
    });
    describe('notifyRenderingStateChange callback', function () {
        it('should notify rendering state changes when a task completes naturally to track the rendering lifecycle', function () {
            // Given a RenderTaskQueue with an isRendering change callback
            var mockOnIsRenderingChange = jest.fn();
            var queue = new RenderTaskQueue_1.default(mockOnIsRenderingChange);
            // When a task is added and allowed to complete
            queue.add({ distanceFromStart: 100 });
            // Then the callback is invoked with true when rendering starts
            expect(mockOnIsRenderingChange).toHaveBeenCalledWith(true);
            jest.advanceTimersByTime(500);
            // Then the callback is invoked with false when rendering completes
            expect(mockOnIsRenderingChange).toHaveBeenCalledTimes(2);
            expect(mockOnIsRenderingChange).toHaveBeenCalledWith(false);
        });
        it('should notify rendering state changes when a task is canceled to ensure proper cleanup', function () {
            // Given a RenderTaskQueue with an isRendering change callback
            var mockOnIsRenderingChange = jest.fn();
            var queue = new RenderTaskQueue_1.default(mockOnIsRenderingChange);
            // When a task is added but canceled before completion
            queue.add({ distanceFromStart: 100 });
            queue.cancel();
            // Then the callback is invoked with true when rendering starts
            expect(mockOnIsRenderingChange).toHaveBeenCalledWith(true);
            jest.advanceTimersByTime(500);
            // Then the callback is invoked with false even after canceling to ensure proper cleanup
            expect(mockOnIsRenderingChange).toHaveBeenCalledTimes(2);
            expect(mockOnIsRenderingChange).toHaveBeenCalledWith(false);
        });
    });
});
