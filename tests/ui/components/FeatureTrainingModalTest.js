"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("@testing-library/react-native");
var react_native_onyx_1 = require("react-native-onyx");
var receipt_doc_png_1 = require("@assets/images/receipt-doc.png");
var ComposeProviders_1 = require("@components/ComposeProviders");
var FeatureTrainingModal_1 = require("@components/FeatureTrainingModal");
var Illustrations = require("@components/Icon/Illustrations");
var FullScreenContext_1 = require("@components/VideoPlayerContexts/FullScreenContext");
var PlaybackContext_1 = require("@components/VideoPlayerContexts/PlaybackContext");
var VideoPopoverMenuContext_1 = require("@components/VideoPlayerContexts/VideoPopoverMenuContext");
var VolumeContext_1 = require("@components/VideoPlayerContexts/VolumeContext");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var CONFIRM_TEXT = 'Start';
jest.mock('@libs/Navigation/Navigation', function () { return ({
    isTopmostRouteModalScreen: jest.fn(),
    isNavigationReady: jest.fn(function () { return Promise.resolve(); }),
    getActiveRouteWithoutParams: jest.fn(function () { return '/'; }),
    getActiveRoute: jest.fn(function () { return '/'; }),
}); });
jest.mock('@components/ImageSVG', function () {
    var View = require('react-native').View;
    // eslint-disable-next-line react/jsx-props-no-spreading
    return function (props) { return <View {...props}/>; };
});
jest.unmock('react-native-reanimated');
describe('FeatureTrainingModal', function () {
    beforeAll(function () {
        var _a;
        react_native_onyx_1.default.init({
            keys: ONYXKEYS_1.default,
            initialKeyStates: (_a = {},
                _a[ONYXKEYS_1.default.NETWORK] = {
                    isOffline: false,
                },
                _a),
        });
    });
    describe('renderIllustration', function () {
        it('renders video', function () {
            (0, react_native_1.render)(<ComposeProviders_1.default components={[PlaybackContext_1.PlaybackContextProvider, FullScreenContext_1.FullScreenContextProvider, VolumeContext_1.VolumeContextProvider, VideoPopoverMenuContext_1.VideoPopoverMenuContextProvider]}>
                    <FeatureTrainingModal_1.default confirmText={CONFIRM_TEXT} videoURL={CONST_1.default.WELCOME_VIDEO_URL}/>
                </ComposeProviders_1.default>);
            expect(react_native_1.screen.getByTestId(CONST_1.default.VIDEO_PLAYER_TEST_ID)).toBeOnTheScreen();
        });
        it('renders svg image', function () {
            (0, react_native_1.render)(<FeatureTrainingModal_1.default confirmText={CONFIRM_TEXT} image={Illustrations.HoldExpense}/>);
            expect(react_native_1.screen.getByTestId(CONST_1.default.IMAGE_SVG_TEST_ID)).toBeOnTheScreen();
        });
        it('renders non-svg image', function () {
            (0, react_native_1.render)(<FeatureTrainingModal_1.default confirmText={CONFIRM_TEXT} image={receipt_doc_png_1.default} shouldRenderSVG={false}/>);
            expect(react_native_1.screen.getByTestId(CONST_1.default.IMAGE_TEST_ID)).toBeOnTheScreen();
        });
        it('renders animation', function () {
            (0, react_native_1.render)(<FeatureTrainingModal_1.default confirmText={CONFIRM_TEXT}/>);
            expect(react_native_1.screen.getByTestId(CONST_1.default.LOTTIE_VIEW_TEST_ID)).toBeOnTheScreen();
        });
    });
});
