"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
/**
 * Web implementation of AvatarCapture using HTML Canvas
 */
function AvatarCapture(_a, ref) {
    var children = _a.children, name = _a.fileName;
    var containerRef = (0, react_1.useRef)(null);
    (0, react_1.useImperativeHandle)(ref, function () { return ({
        capture: function () {
            return new Promise(function (resolve, reject) {
                var container = containerRef.current;
                if (!container) {
                    reject(new Error('Container ref not available'));
                    return;
                }
                // Find the colored avatar container
                var coloredAvatarElement = container.querySelector('[data-id="colored-avatar"]');
                if (!coloredAvatarElement) {
                    reject(new Error('Colored avatar element not found'));
                    return;
                }
                // Get the SVG element and styles
                var svgElement = coloredAvatarElement.querySelector('svg');
                if (!svgElement) {
                    reject(new Error('No SVG element found'));
                    return;
                }
                // Get dimensions and background color
                var bbox = coloredAvatarElement.getBoundingClientRect();
                var width = bbox.width;
                var height = bbox.height;
                var backgroundColor = globalThis.getComputedStyle(coloredAvatarElement).backgroundColor;
                // Create canvas with 2x resolution for better quality
                var canvas = document.createElement('canvas');
                var scale = 2;
                canvas.width = width * scale;
                canvas.height = height * scale;
                var ctx = canvas.getContext('2d');
                if (!ctx) {
                    reject(new Error('Could not get canvas context'));
                    return;
                }
                ctx.scale(scale, scale);
                // Draw circular background
                ctx.fillStyle = backgroundColor;
                ctx.beginPath();
                ctx.arc(width / 2, height / 2, width / 2, 0, 2 * Math.PI);
                ctx.fill();
                // Serialize and draw the SVG
                var svgData = new XMLSerializer().serializeToString(svgElement);
                var svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
                var url = URL.createObjectURL(svgBlob);
                var img = new Image();
                img.onload = function () {
                    ctx.drawImage(img, 0, 0, width, height);
                    URL.revokeObjectURL(url);
                    // Convert canvas to file
                    canvas.toBlob(function (blob) {
                        if (!blob) {
                            reject(new Error('Failed to create blob from canvas'));
                            return;
                        }
                        var file = new File([blob], "".concat(name, ".png"), { type: 'image/png' });
                        Object.defineProperty(file, 'uri', {
                            value: URL.createObjectURL(blob),
                            writable: false,
                        });
                        resolve(file);
                    }, 'image/png');
                };
                img.onerror = function () {
                    URL.revokeObjectURL(url);
                    reject(new Error('Failed to load SVG'));
                };
                img.src = url;
            });
        },
    }); }, [name]);
    return <div ref={containerRef}>{children}</div>;
}
var AvatarCaptureWithRef = (0, react_1.forwardRef)(AvatarCapture);
AvatarCapture.displayName = 'AvatarCapture';
exports.default = AvatarCaptureWithRef;
