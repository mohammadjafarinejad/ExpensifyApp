"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable react/jsx-props-no-spreading */
var react_native_1 = require("@testing-library/react-native");
var react_1 = require("react");
var react_native_2 = require("react-native");
var AvatarButtonWithIcon_1 = require("@components/AvatarButtonWithIcon");
var Expensicons = require("@components/Icon/Expensicons");
var OnyxListItemProvider_1 = require("@components/OnyxListItemProvider");
var CONST_1 = require("@src/CONST");
var DEFAULT_AVATAR_ID = 'default-avatar';
var ICON_TEST_ID = 'avatar-button-edit-icon';
var MOCK_TEST_ID = 'mock-edit-icon';
var AVATAR_ID = 'Avatar';
function DefaultAvatar() {
    return <react_native_2.View testID={DEFAULT_AVATAR_ID}/>;
}
function MockIcon() {
    return <react_native_2.View testID={MOCK_TEST_ID}/>;
}
var defaultProps = {
    text: 'Edit Avatar',
    anchorRef: (0, react_1.createRef)(),
    avatarStyle: { width: 80, height: 80 },
    onPress: jest.fn(),
};
describe('AvatarButtonWithIcon', function () {
    var renderWithProvider = function (component) {
        return (0, react_native_1.render)(<OnyxListItemProvider_1.default>{component}</OnyxListItemProvider_1.default>);
    };
    beforeEach(function () {
        jest.clearAllMocks();
    });
    describe('rendering', function () {
        it('should render DefaultAvatar when source is not provided', function () {
            renderWithProvider(<AvatarButtonWithIcon_1.default {...defaultProps} DefaultAvatar={DefaultAvatar}/>);
            expect(react_native_1.screen.getByLabelText(defaultProps.text)).toBeTruthy();
            expect(react_native_1.screen.getByTestId(DEFAULT_AVATAR_ID)).toBeTruthy();
        });
        it('should render DefaultAvatar when source is empty string', function () {
            renderWithProvider(<AvatarButtonWithIcon_1.default {...defaultProps} source="" DefaultAvatar={DefaultAvatar}/>);
            expect(react_native_1.screen.queryByTestId(AVATAR_ID)).toBeNull();
            expect(react_native_1.screen.getByTestId(DEFAULT_AVATAR_ID)).toBeTruthy();
        });
        it('should render Avatar when source is provided', function () {
            renderWithProvider(<AvatarButtonWithIcon_1.default {...defaultProps} source="https://example.com/avatar.jpg" DefaultAvatar={DefaultAvatar}/>);
            expect(react_native_1.screen.getByTestId(AVATAR_ID)).toBeTruthy();
            expect(react_native_1.screen.queryByTestId(DEFAULT_AVATAR_ID)).toBeNull();
        });
        it('should render edit icon when not disabled', function () {
            renderWithProvider(<AvatarButtonWithIcon_1.default {...defaultProps}/>);
            expect(react_native_1.screen.getByTestId(ICON_TEST_ID)).toBeTruthy();
        });
        it('should not render edit icon when disabled', function () {
            renderWithProvider(<AvatarButtonWithIcon_1.default {...defaultProps} disabled/>);
            // The component should still render but without the edit icon
            expect(react_native_1.screen.getByLabelText(defaultProps.text)).toBeTruthy();
            expect(react_native_1.screen.queryByTestId(ICON_TEST_ID)).toBeNull();
        });
        it('should render with custom edit icon', function () {
            renderWithProvider(<AvatarButtonWithIcon_1.default {...defaultProps} editIcon={MockIcon}/>);
            expect(react_native_1.screen.getByLabelText(defaultProps.text)).toBeTruthy();
            expect(react_native_1.screen.getByTestId(MOCK_TEST_ID)).toBeTruthy();
        });
        it.each([CONST_1.default.AVATAR_SIZE.DEFAULT, CONST_1.default.AVATAR_SIZE.LARGE, CONST_1.default.AVATAR_SIZE.X_LARGE])('should render with size: %s', function (size) {
            renderWithProvider(<AvatarButtonWithIcon_1.default {...defaultProps} size={size}/>);
            expect(react_native_1.screen.getByLabelText(defaultProps.text)).toBeTruthy();
        });
        it.each(['add', 'pending', 'delete'])('should render with pendingAction: %s', function (action) {
            renderWithProvider(<AvatarButtonWithIcon_1.default {...defaultProps} pendingAction={action}/>);
            expect(react_native_1.screen.getByLabelText(defaultProps.text)).toBeTruthy();
        });
        it.each([CONST_1.default.ICON_TYPE_AVATAR, CONST_1.default.ICON_TYPE_WORKSPACE])('should render with type: %s', function (type) {
            renderWithProvider(<AvatarButtonWithIcon_1.default {...defaultProps} type={type}/>);
            expect(react_native_1.screen.getByLabelText(defaultProps.text)).toBeTruthy();
        });
        it('should render with all props provided', function () {
            var onPressMock = jest.fn();
            var anchorRef = (0, react_1.createRef)();
            renderWithProvider(<AvatarButtonWithIcon_1.default text="Change Workspace Avatar" anchorRef={anchorRef} avatarStyle={{ width: 120, height: 120 }} onPress={onPressMock} avatarID={99999} source="https://example.com/workspace.jpg" disabledStyle={{ opacity: 0.3 }} editIconStyle={{ backgroundColor: 'blue' }} DefaultAvatar={DefaultAvatar} size={CONST_1.default.AVATAR_SIZE.X_LARGE} fallbackIcon={Expensicons.Building} type={CONST_1.default.ICON_TYPE_WORKSPACE} pendingAction="update" disabled={false} editIcon={Expensicons.Camera}/>);
            expect(react_native_1.screen.getByTestId(AVATAR_ID)).toBeTruthy();
            expect(react_native_1.screen.getByLabelText('Change Workspace Avatar')).toBeTruthy();
            react_native_1.fireEvent.press(react_native_1.screen.getByLabelText('Change Workspace Avatar'));
            expect(onPressMock).toHaveBeenCalledTimes(1);
        });
        it('should have correct accessibility role and label', function () {
            renderWithProvider(<AvatarButtonWithIcon_1.default {...defaultProps}/>);
            expect(react_native_1.screen.getByRole('button')).toBeTruthy();
            expect(react_native_1.screen.getByLabelText(defaultProps.text)).toBeTruthy();
        });
    });
});
