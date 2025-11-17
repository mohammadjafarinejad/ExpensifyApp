"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AVAILABLE_EXPENSIFY_ICONS = void 0;
exports.getExpensifyIcon = getExpensifyIcon;
var add_reaction_svg_1 = require("@assets/images/add-reaction.svg");
var all_svg_1 = require("@assets/images/all.svg");
var android_svg_1 = require("@assets/images/android.svg");
var apple_svg_1 = require("@assets/images/apple.svg");
var arrow_circle_clockwise_svg_1 = require("@assets/images/arrow-circle-clockwise.svg");
var arrow_collapse_svg_1 = require("@assets/images/arrow-collapse.svg");
var arrow_down_long_svg_1 = require("@assets/images/arrow-down-long.svg");
var arrow_right_long_svg_1 = require("@assets/images/arrow-right-long.svg");
var arrow_right_svg_1 = require("@assets/images/arrow-right.svg");
var arrow_split_svg_1 = require("@assets/images/arrow-split.svg");
var arrow_up_long_svg_1 = require("@assets/images/arrow-up-long.svg");
var arrow_up_svg_1 = require("@assets/images/arrow-up.svg");
var arrows_leftright_svg_1 = require("@assets/images/arrows-leftright.svg");
var attachment_not_found_svg_1 = require("@assets/images/attachment-not-found.svg");
var concierge_avatar_svg_1 = require("@assets/images/avatars/concierge-avatar.svg");
var fallback_avatar_svg_1 = require("@assets/images/avatars/fallback-avatar.svg");
var fallback_workspace_avatar_svg_1 = require("@assets/images/avatars/fallback-workspace-avatar.svg");
var notifications_avatar_svg_1 = require("@assets/images/avatars/notifications-avatar.svg");
var room_svg_1 = require("@assets/images/avatars/room.svg");
var back_left_svg_1 = require("@assets/images/back-left.svg");
var bank_svg_1 = require("@assets/images/bank.svg");
var bed_svg_1 = require("@assets/images/bed.svg");
var bell_svg_1 = require("@assets/images/bell.svg");
var bill_svg_1 = require("@assets/images/bill.svg");
var binoculars_svg_1 = require("@assets/images/binoculars.svg");
var bolt_slash_svg_1 = require("@assets/images/bolt-slash.svg");
var bolt_svg_1 = require("@assets/images/bolt.svg");
var bookmark_svg_1 = require("@assets/images/bookmark.svg");
var box_svg_1 = require("@assets/images/box.svg");
var bug_svg_1 = require("@assets/images/bug.svg");
var building_svg_1 = require("@assets/images/building.svg");
var buildings_svg_1 = require("@assets/images/buildings.svg");
var calendar_solid_svg_1 = require("@assets/images/calendar-solid.svg");
var calendar_svg_1 = require("@assets/images/calendar.svg");
var camera_svg_1 = require("@assets/images/camera.svg");
var car_with_key_svg_1 = require("@assets/images/car-with-key.svg");
var car_svg_1 = require("@assets/images/car.svg");
var caret_up_down_svg_1 = require("@assets/images/caret-up-down.svg");
var cash_svg_1 = require("@assets/images/cash.svg");
var chatbubble_counter_svg_1 = require("@assets/images/chatbubble-counter.svg");
var chatbubble_reply_svg_1 = require("@assets/images/chatbubble-reply.svg");
var chatbubble_unread_svg_1 = require("@assets/images/chatbubble-unread.svg");
var chatbubble_svg_1 = require("@assets/images/chatbubble.svg");
var chatbubbles_svg_1 = require("@assets/images/chatbubbles.svg");
var check_circle_svg_1 = require("@assets/images/check-circle.svg");
var check_square_svg_1 = require("@assets/images/check-square.svg");
var checkbox_svg_1 = require("@assets/images/checkbox.svg");
var checkmark_circle_svg_1 = require("@assets/images/checkmark-circle.svg");
var checkmark_svg_1 = require("@assets/images/checkmark.svg");
var circular_arrow_backwards_svg_1 = require("@assets/images/circular-arrow-backwards.svg");
var close_svg_1 = require("@assets/images/close.svg");
var closed_sign_svg_1 = require("@assets/images/closed-sign.svg");
var coins_svg_1 = require("@assets/images/coins.svg");
var collapse_svg_1 = require("@assets/images/collapse.svg");
var comment_bubbles_svg_1 = require("@assets/images/comment-bubbles.svg");
var concierge_svg_1 = require("@assets/images/concierge.svg");
var connect_svg_1 = require("@assets/images/connect.svg");
var connection_complete_svg_1 = require("@assets/images/connection-complete.svg");
var copy_svg_1 = require("@assets/images/copy.svg");
var credit_card_exclamation_svg_1 = require("@assets/images/credit-card-exclamation.svg");
var credit_card_hourglass_svg_1 = require("@assets/images/credit-card-hourglass.svg");
var creditcard_svg_1 = require("@assets/images/creditcard.svg");
var crosshair_svg_1 = require("@assets/images/crosshair.svg");
var document_merge_svg_1 = require("@assets/images/document-merge.svg");
var document_svg_1 = require("@assets/images/document.svg");
var dot_indicator_unfilled_svg_1 = require("@assets/images/dot-indicator-unfilled.svg");
var dot_indicator_svg_1 = require("@assets/images/dot-indicator.svg");
var down_svg_1 = require("@assets/images/down.svg");
var download_svg_1 = require("@assets/images/download.svg");
var drag_and_drop_svg_1 = require("@assets/images/drag-and-drop.svg");
var drag_handles_svg_1 = require("@assets/images/drag-handles.svg");
var emoji_svg_1 = require("@assets/images/emoji.svg");
var light_bulb_svg_1 = require("@assets/images/emojiCategoryIcons/light-bulb.svg");
var emptystate__routepending_svg_1 = require("@assets/images/emptystate__routepending.svg");
var emptystate__spy_pigeon_svg_1 = require("@assets/images/emptystate__spy-pigeon.svg");
var eReceiptIcon_svg_1 = require("@assets/images/eReceiptIcon.svg");
var exclamation_svg_1 = require("@assets/images/exclamation.svg");
var exit_svg_1 = require("@assets/images/exit.svg");
var expand_svg_1 = require("@assets/images/expand.svg");
var expensify_app_icon_svg_1 = require("@assets/images/expensify-app-icon.svg");
var expensify_card_icon_svg_1 = require("@assets/images/expensify-card-icon.svg");
var expensify_footer_logo_vertical_svg_1 = require("@assets/images/expensify-footer-logo-vertical.svg");
var expensify_footer_logo_svg_1 = require("@assets/images/expensify-footer-logo.svg");
var expensify_logo_new_svg_1 = require("@assets/images/expensify-logo-new.svg");
var expensify_wordmark_svg_1 = require("@assets/images/expensify-wordmark.svg");
var export_svg_1 = require("@assets/images/export.svg");
var eye_disabled_svg_1 = require("@assets/images/eye-disabled.svg");
var eye_svg_1 = require("@assets/images/eye.svg");
var feed_svg_1 = require("@assets/images/feed.svg");
var filter_svg_1 = require("@assets/images/filter.svg");
var filters_svg_1 = require("@assets/images/filters.svg");
var flag_svg_1 = require("@assets/images/flag.svg");
var flag_level_01_svg_1 = require("@assets/images/flag_level_01.svg");
var flag_level_02_svg_1 = require("@assets/images/flag_level_02.svg");
var flag_level_03_svg_1 = require("@assets/images/flag_level_03.svg");
var folder_svg_1 = require("@assets/images/folder.svg");
var fullscreen_svg_1 = require("@assets/images/fullscreen.svg");
var gallery_not_found_svg_1 = require("@assets/images/gallery-not-found.svg");
var gallery_svg_1 = require("@assets/images/gallery.svg");
var gear_svg_1 = require("@assets/images/gear.svg");
var globe_svg_1 = require("@assets/images/globe.svg");
var hashtag_svg_1 = require("@assets/images/hashtag.svg");
var heart_svg_1 = require("@assets/images/heart.svg");
var history_svg_1 = require("@assets/images/history.svg");
var home_svg_1 = require("@assets/images/home.svg");
var hourglass_svg_1 = require("@assets/images/hourglass.svg");
var image_crop_circle_mask_svg_1 = require("@assets/images/image-crop-circle-mask.svg");
var image_crop_square_mask_svg_1 = require("@assets/images/image-crop-square-mask.svg");
var inbox_svg_1 = require("@assets/images/inbox.svg");
var info_svg_1 = require("@assets/images/info.svg");
var circle_slash_svg_1 = require("@assets/images/integrationicons/circle-slash.svg");
var netsuite_icon_svg_1 = require("@assets/images/integrationicons/export/netsuite-icon.svg");
var qbo_icon_svg_1 = require("@assets/images/integrationicons/export/qbo-icon.svg");
var sage_intacct_icon_svg_1 = require("@assets/images/integrationicons/export/sage-intacct-icon.svg");
var xero_icon_svg_1 = require("@assets/images/integrationicons/export/xero-icon.svg");
var microsoft_dynamics_icon_square_svg_1 = require("@assets/images/integrationicons/microsoft-dynamics-icon-square.svg");
var netsuite_icon_square_svg_1 = require("@assets/images/integrationicons/netsuite-icon-square.svg");
var oracle_icon_square_svg_1 = require("@assets/images/integrationicons/oracle-icon-square.svg");
var qbd_icon_square_svg_1 = require("@assets/images/integrationicons/qbd-icon-square.svg");
var qbo_icon_circle_svg_1 = require("@assets/images/integrationicons/qbo-icon-circle.svg");
var qbo_icon_square_svg_1 = require("@assets/images/integrationicons/qbo-icon-square.svg");
var sage_intacct_icon_square_svg_1 = require("@assets/images/integrationicons/sage-intacct-icon-square.svg");
var sap_icon_square_svg_1 = require("@assets/images/integrationicons/sap-icon-square.svg");
var uber_svg_1 = require("@assets/images/integrationicons/uber.svg");
var xero_icon_circle_svg_1 = require("@assets/images/integrationicons/xero-icon-circle.svg");
var xero_icon_square_svg_1 = require("@assets/images/integrationicons/xero-icon-square.svg");
var invoice_generic_svg_1 = require("@assets/images/invoice-generic.svg");
var invoice_svg_1 = require("@assets/images/invoice.svg");
var key_svg_1 = require("@assets/images/key.svg");
var keyboard_svg_1 = require("@assets/images/keyboard.svg");
var link_copy_svg_1 = require("@assets/images/link-copy.svg");
var link_svg_1 = require("@assets/images/link.svg");
var location_svg_1 = require("@assets/images/location.svg");
var lock_svg_1 = require("@assets/images/lock.svg");
var luggage_svg_1 = require("@assets/images/luggage.svg");
var magnifying_glass_spy_mouth_closed_svg_1 = require("@assets/images/magnifying-glass-spy-mouth-closed.svg");
var magnifying_glass_svg_1 = require("@assets/images/magnifying-glass.svg");
var mail_svg_1 = require("@assets/images/mail.svg");
var make_admin_svg_1 = require("@assets/images/make-admin.svg");
var map_svg_1 = require("@assets/images/map.svg");
var megaphone_svg_1 = require("@assets/images/megaphone.svg");
var menu_svg_1 = require("@assets/images/menu.svg");
var meter_svg_1 = require("@assets/images/meter.svg");
var minus_svg_1 = require("@assets/images/minus.svg");
var money_bag_svg_1 = require("@assets/images/money-bag.svg");
var money_circle_svg_1 = require("@assets/images/money-circle.svg");
var money_hourglass_svg_1 = require("@assets/images/money-hourglass.svg");
var money_search_svg_1 = require("@assets/images/money-search.svg");
var money_waving_svg_1 = require("@assets/images/money-waving.svg");
var monitor_svg_1 = require("@assets/images/monitor.svg");
var multi_tag_svg_1 = require("@assets/images/multi-tag.svg");
var mute_svg_1 = require("@assets/images/mute.svg");
var new_window_svg_1 = require("@assets/images/new-window.svg");
var new_workspace_svg_1 = require("@assets/images/new-workspace.svg");
var offline_cloud_svg_1 = require("@assets/images/offline-cloud.svg");
var offline_svg_1 = require("@assets/images/offline.svg");
var paperclip_svg_1 = require("@assets/images/paperclip.svg");
var pause_svg_1 = require("@assets/images/pause.svg");
var pencil_svg_1 = require("@assets/images/pencil.svg");
var phone_svg_1 = require("@assets/images/phone.svg");
var pin_svg_1 = require("@assets/images/pin.svg");
var plane_svg_1 = require("@assets/images/plane.svg");
var play_svg_1 = require("@assets/images/play.svg");
var plus_svg_1 = require("@assets/images/plus.svg");
var printer_svg_1 = require("@assets/images/printer.svg");
var profile_svg_1 = require("@assets/images/profile.svg");
var qrcode_svg_1 = require("@assets/images/qrcode.svg");
var question_mark_circle_svg_1 = require("@assets/images/question-mark-circle.svg");
var receipt_body_svg_1 = require("@assets/images/receipt-body.svg");
var receipt_multiple_svg_1 = require("@assets/images/receipt-multiple.svg");
var receipt_placeholder_plus_svg_1 = require("@assets/images/receipt-placeholder-plus.svg");
var receipt_plus_svg_1 = require("@assets/images/receipt-plus.svg");
var receipt_scan_svg_1 = require("@assets/images/receipt-scan.svg");
var receipt_slash_svg_1 = require("@assets/images/receipt-slash.svg");
var receipt_svg_1 = require("@assets/images/receipt.svg");
var remove_members_svg_1 = require("@assets/images/remove-members.svg");
var rotate_image_svg_1 = require("@assets/images/rotate-image.svg");
var rotate_left_svg_1 = require("@assets/images/rotate-left.svg");
var scan_svg_1 = require("@assets/images/scan.svg");
var send_svg_1 = require("@assets/images/send.svg");
var shield_svg_1 = require("@assets/images/shield.svg");
var apple_logo_svg_1 = require("@assets/images/signIn/apple-logo.svg");
var google_logo_svg_1 = require("@assets/images/signIn/google-logo.svg");
var advanced_approvals_icon_square_svg_1 = require("@assets/images/simple-illustrations/advanced-approvals-icon-square.svg");
var simple_illustration__messageinabottle_svg_1 = require("@assets/images/simple-illustrations/simple-illustration__messageinabottle.svg");
var simple_illustration__replace_receipt_svg_1 = require("@assets/images/simple-illustrations/simple-illustration__replace-receipt.svg");
var simple_illustration__smartscan_svg_1 = require("@assets/images/simple-illustrations/simple-illustration__smartscan.svg");
var social_facebook_svg_1 = require("@assets/images/social-facebook.svg");
var social_instagram_svg_1 = require("@assets/images/social-instagram.svg");
var social_linkedin_svg_1 = require("@assets/images/social-linkedin.svg");
var social_podcast_svg_1 = require("@assets/images/social-podcast.svg");
var social_twitter_svg_1 = require("@assets/images/social-twitter.svg");
var social_youtube_svg_1 = require("@assets/images/social-youtube.svg");
var spreadsheet_computer_svg_1 = require("@assets/images/spreadsheet-computer.svg");
var Star_svg_1 = require("@assets/images/Star.svg");
var stopwatch_svg_1 = require("@assets/images/stopwatch.svg");
var suitcase_svg_1 = require("@assets/images/suitcase.svg");
var sync_svg_1 = require("@assets/images/sync.svg");
var table_svg_1 = require("@assets/images/table.svg");
var tag_svg_1 = require("@assets/images/tag.svg");
var task_svg_1 = require("@assets/images/task.svg");
var thread_svg_1 = require("@assets/images/thread.svg");
var three_dots_svg_1 = require("@assets/images/three-dots.svg");
var thumbs_down_svg_1 = require("@assets/images/thumbs-down.svg");
var thumbs_up_svg_1 = require("@assets/images/thumbs-up.svg");
var train_svg_1 = require("@assets/images/train.svg");
var transfer_svg_1 = require("@assets/images/transfer.svg");
var trashcan_svg_1 = require("@assets/images/trashcan.svg");
var treasure_chest_svg_1 = require("@assets/images/treasure-chest.svg");
var unlock_svg_1 = require("@assets/images/unlock.svg");
var upload_alt_svg_1 = require("@assets/images/upload-alt.svg");
var upload_svg_1 = require("@assets/images/upload.svg");
var user_check_svg_1 = require("@assets/images/user-check.svg");
var user_eye_svg_1 = require("@assets/images/user-eye.svg");
var user_lock_svg_1 = require("@assets/images/user-lock.svg");
var user_plus_svg_1 = require("@assets/images/user-plus.svg");
var user_svg_1 = require("@assets/images/user.svg");
var users_svg_1 = require("@assets/images/users.svg");
var video_slash_svg_1 = require("@assets/images/video-slash.svg");
var volume_high_svg_1 = require("@assets/images/volume-high.svg");
var volume_low_svg_1 = require("@assets/images/volume-low.svg");
var wallet_svg_1 = require("@assets/images/wallet.svg");
var workflows_svg_1 = require("@assets/images/workflows.svg");
var workspace_default_avatar_svg_1 = require("@assets/images/workspace-default-avatar.svg");
var x_circle_svg_1 = require("@assets/images/x-circle.svg");
var zoom_svg_1 = require("@assets/images/zoom.svg");
var Expensicons = {
    ReceiptBody: receipt_body_svg_1.default,
    ActiveRoomAvatar: room_svg_1.default,
    AddReaction: add_reaction_svg_1.default,
    All: all_svg_1.default,
    Android: android_svg_1.default,
    Apple: apple_svg_1.default,
    AppleLogo: apple_logo_svg_1.default,
    ArrowSplit: arrow_split_svg_1.default,
    ArrowCollapse: arrow_collapse_svg_1.default,
    ArrowRight: arrow_right_svg_1.default,
    ArrowRightLong: arrow_right_long_svg_1.default,
    ArrowsLeftRight: arrows_leftright_svg_1.default,
    ArrowUpLong: arrow_up_long_svg_1.default,
    ArrowDownLong: arrow_down_long_svg_1.default,
    AttachmentNotFound: attachment_not_found_svg_1.default,
    BackArrow: back_left_svg_1.default,
    Bank: bank_svg_1.default,
    CircularArrowBackwards: circular_arrow_backwards_svg_1.default,
    Bill: bill_svg_1.default,
    Bell: bell_svg_1.default,
    Binoculars: binoculars_svg_1.default,
    Bolt: bolt_svg_1.default,
    Box: box_svg_1.default,
    Bug: bug_svg_1.default,
    Building: building_svg_1.default,
    Buildings: buildings_svg_1.default,
    Calendar: calendar_svg_1.default,
    Camera: camera_svg_1.default,
    Car: car_svg_1.default,
    Cash: cash_svg_1.default,
    ChatBubble: chatbubble_svg_1.default,
    ChatBubbles: chatbubbles_svg_1.default,
    Checkbox: checkbox_svg_1.default,
    Checkmark: checkmark_svg_1.default,
    Close: close_svg_1.default,
    ClosedSign: closed_sign_svg_1.default,
    Collapse: collapse_svg_1.default,
    CommentBubbles: comment_bubbles_svg_1.default,
    Concierge: concierge_svg_1.default,
    ConciergeAvatar: concierge_avatar_svg_1.default,
    Connect: connect_svg_1.default,
    Crosshair: crosshair_svg_1.default,
    ConnectionComplete: connection_complete_svg_1.default,
    Copy: copy_svg_1.default,
    CreditCard: creditcard_svg_1.default,
    CreditCardHourglass: credit_card_hourglass_svg_1.default,
    CreditCardExclamation: credit_card_exclamation_svg_1.default,
    CircleSlash: circle_slash_svg_1.default,
    Document: document_svg_1.default,
    DocumentMerge: document_merge_svg_1.default,
    DotIndicator: dot_indicator_svg_1.default,
    DotIndicatorUnfilled: dot_indicator_unfilled_svg_1.default,
    DownArrow: down_svg_1.default,
    Download: download_svg_1.default,
    DragAndDrop: drag_and_drop_svg_1.default,
    DragHandles: drag_handles_svg_1.default,
    EReceiptIcon: eReceiptIcon_svg_1.default,
    Emoji: emoji_svg_1.default,
    EmptyStateRoutePending: emptystate__routepending_svg_1.default,
    Exclamation: exclamation_svg_1.default,
    Exit: exit_svg_1.default,
    ExpensifyAppIcon: expensify_app_icon_svg_1.default,
    ExpensifyCard: expensify_card_icon_svg_1.default,
    ExpensifyWordmark: expensify_wordmark_svg_1.default,
    ExpensifyFooterLogo: expensify_footer_logo_svg_1.default,
    ExpensifyFooterLogoVertical: expensify_footer_logo_vertical_svg_1.default,
    Expand: expand_svg_1.default,
    Export: export_svg_1.default,
    Eye: eye_svg_1.default,
    EyeDisabled: eye_disabled_svg_1.default,
    FallbackAvatar: fallback_avatar_svg_1.default,
    FallbackWorkspaceAvatar: fallback_workspace_avatar_svg_1.default,
    Flag: flag_svg_1.default,
    FlagLevelOne: flag_level_01_svg_1.default,
    FlagLevelTwo: flag_level_02_svg_1.default,
    FlagLevelThree: flag_level_03_svg_1.default,
    Fullscreen: fullscreen_svg_1.default,
    Folder: folder_svg_1.default,
    Tag: tag_svg_1.default,
    MultiTag: multi_tag_svg_1.default,
    Coins: coins_svg_1.default,
    Thread: thread_svg_1.default,
    Gallery: gallery_svg_1.default,
    Gear: gear_svg_1.default,
    Globe: globe_svg_1.default,
    GoogleLogo: google_logo_svg_1.default,
    Hashtag: hashtag_svg_1.default,
    Heart: heart_svg_1.default,
    History: history_svg_1.default,
    Home: home_svg_1.default,
    Hourglass: hourglass_svg_1.default,
    Inbox: inbox_svg_1.default,
    ImageCropCircleMask: image_crop_circle_mask_svg_1.default,
    ImageCropSquareMask: image_crop_square_mask_svg_1.default,
    Info: info_svg_1.default,
    Invoice: invoice_svg_1.default,
    InvoiceGeneric: invoice_generic_svg_1.default,
    Key: key_svg_1.default,
    Keyboard: keyboard_svg_1.default,
    Link: link_svg_1.default,
    LinkCopy: link_copy_svg_1.default,
    Location: location_svg_1.default,
    Lock: lock_svg_1.default,
    Luggage: luggage_svg_1.default,
    MagnifyingGlass: magnifying_glass_svg_1.default,
    Mail: mail_svg_1.default,
    MakeAdmin: make_admin_svg_1.default,
    Map: map_svg_1.default,
    Menu: menu_svg_1.default,
    Meter: meter_svg_1.default,
    Megaphone: megaphone_svg_1.default,
    MessageInABottle: simple_illustration__messageinabottle_svg_1.default,
    MoneyBag: money_bag_svg_1.default,
    MoneyCircle: money_circle_svg_1.default,
    MoneySearch: money_search_svg_1.default,
    MoneyWaving: money_waving_svg_1.default,
    MoneyHourglass: money_hourglass_svg_1.default,
    Monitor: monitor_svg_1.default,
    Mute: mute_svg_1.default,
    ExpensifyLogoNew: expensify_logo_new_svg_1.default,
    NewWindow: new_window_svg_1.default,
    NewWorkspace: new_workspace_svg_1.default,
    NotificationsAvatar: notifications_avatar_svg_1.default,
    Offline: offline_svg_1.default,
    OfflineCloud: offline_cloud_svg_1.default,
    Paperclip: paperclip_svg_1.default,
    Pause: pause_svg_1.default,
    Pencil: pencil_svg_1.default,
    Phone: phone_svg_1.default,
    Pin: pin_svg_1.default,
    Play: play_svg_1.default,
    Plus: plus_svg_1.default,
    Printer: printer_svg_1.default,
    Profile: profile_svg_1.default,
    QBOSquare: qbo_icon_square_svg_1.default,
    QrCode: qrcode_svg_1.default,
    QuestionMark: question_mark_circle_svg_1.default,
    TreasureChest: treasure_chest_svg_1.default,
    Receipt: receipt_svg_1.default,
    ReceiptPlaceholderPlus: receipt_placeholder_plus_svg_1.default,
    ReceiptPlus: receipt_plus_svg_1.default,
    ReceiptScan: receipt_scan_svg_1.default,
    ReceiptSlash: receipt_slash_svg_1.default,
    RemoveMembers: remove_members_svg_1.default,
    ReplaceReceipt: simple_illustration__replace_receipt_svg_1.default,
    ReceiptMultiple: receipt_multiple_svg_1.default,
    Rotate: rotate_image_svg_1.default,
    RotateLeft: rotate_left_svg_1.default,
    Scan: scan_svg_1.default,
    Send: send_svg_1.default,
    Shield: shield_svg_1.default,
    SmartScan: simple_illustration__smartscan_svg_1.default,
    Stopwatch: stopwatch_svg_1.default,
    Suitcase: suitcase_svg_1.default,
    Sync: sync_svg_1.default,
    Task: task_svg_1.default,
    ThumbsUp: thumbs_up_svg_1.default,
    ThreeDots: three_dots_svg_1.default,
    Transfer: transfer_svg_1.default,
    Trashcan: trashcan_svg_1.default,
    Uber: uber_svg_1.default,
    Unlock: unlock_svg_1.default,
    UpArrow: arrow_up_svg_1.default,
    Upload: upload_svg_1.default,
    UploadAlt: upload_alt_svg_1.default,
    User: user_svg_1.default,
    UserCheck: user_check_svg_1.default,
    Users: users_svg_1.default,
    VideoSlash: video_slash_svg_1.default,
    VolumeHigh: volume_high_svg_1.default,
    VolumeLow: volume_low_svg_1.default,
    Wallet: wallet_svg_1.default,
    Workflows: workflows_svg_1.default,
    Workspace: workspace_default_avatar_svg_1.default,
    XeroSquare: xero_icon_square_svg_1.default,
    IntacctSquare: sage_intacct_icon_square_svg_1.default,
    AdvancedApprovalsSquare: advanced_approvals_icon_square_svg_1.default,
    Zoom: zoom_svg_1.default,
    Twitter: social_twitter_svg_1.default,
    Youtube: social_youtube_svg_1.default,
    Facebook: social_facebook_svg_1.default,
    Podcast: social_podcast_svg_1.default,
    Linkedin: social_linkedin_svg_1.default,
    Instagram: social_instagram_svg_1.default,
    ChatBubbleUnread: chatbubble_unread_svg_1.default,
    ChatBubbleReply: chatbubble_reply_svg_1.default,
    ChatBubbleCounter: chatbubble_counter_svg_1.default,
    Lightbulb: light_bulb_svg_1.default,
    Plane: plane_svg_1.default,
    Bed: bed_svg_1.default,
    CarWithKey: car_with_key_svg_1.default,
    Clear: x_circle_svg_1.default,
    CheckCircle: check_circle_svg_1.default,
    CheckmarkCircle: checkmark_circle_svg_1.default,
    NetSuiteSquare: netsuite_icon_square_svg_1.default,
    XeroCircle: xero_icon_circle_svg_1.default,
    QBOCircle: qbo_icon_circle_svg_1.default,
    MicrosoftDynamicsSquare: microsoft_dynamics_icon_square_svg_1.default,
    OracleSquare: oracle_icon_square_svg_1.default,
    SapSquare: sap_icon_square_svg_1.default,
    Filters: filters_svg_1.default,
    CalendarSolid: calendar_solid_svg_1.default,
    Filter: filter_svg_1.default,
    UserEye: user_eye_svg_1.default,
    CaretUpDown: caret_up_down_svg_1.default,
    UserPlus: user_plus_svg_1.default,
    Feed: feed_svg_1.default,
    Table: table_svg_1.default,
    SpreadsheetComputer: spreadsheet_computer_svg_1.default,
    Bookmark: bookmark_svg_1.default,
    Star: Star_svg_1.default,
    QBDSquare: qbd_icon_square_svg_1.default,
    GalleryNotFound: gallery_not_found_svg_1.default,
    Train: train_svg_1.default,
    boltSlash: bolt_slash_svg_1.default,
    MagnifyingGlassSpyMouthClosed: magnifying_glass_spy_mouth_closed_svg_1.default,
    CheckSquare: check_square_svg_1.default,
    Minus: minus_svg_1.default,
    ThumbsDown: thumbs_down_svg_1.default,
    UserLock: user_lock_svg_1.default,
    EmptyStateSpyPigeon: emptystate__spy_pigeon_svg_1.default,
    NetSuiteExport: netsuite_icon_svg_1.default,
    QBOExport: qbo_icon_svg_1.default,
    SageIntacctExport: sage_intacct_icon_svg_1.default,
    XeroExport: xero_icon_svg_1.default,
    ArrowCircleClockwise: arrow_circle_clockwise_svg_1.default,
};
// Create the ExpensifyIcons object from the imported Expensicons
var ExpensifyIcons = Expensicons;
/**
 * Get an ExpensifyIcon by name
 * @param iconName - The name of the icon to retrieve
 * @returns The icon component or undefined if not found
 */
function getExpensifyIcon(iconName) {
    // Direct return for known icons to preserve React component type
    switch (iconName) {
        case 'Building':
            return building_svg_1.default;
        case 'CalendarSolid':
            return calendar_solid_svg_1.default;
        case 'Car':
            return car_svg_1.default;
        case 'Coins':
            return coins_svg_1.default;
        case 'CreditCard':
            return creditcard_svg_1.default;
        case 'Document':
            return document_svg_1.default;
        case 'ExpensifyAppIcon':
            return expensify_app_icon_svg_1.default;
        case 'ExpensifyCard':
            return expensify_card_icon_svg_1.default;
        case 'Feed':
            return feed_svg_1.default;
        case 'Folder':
            return folder_svg_1.default;
        case 'Gear':
            return gear_svg_1.default;
        case 'InvoiceGeneric':
            return invoice_generic_svg_1.default;
        case 'Receipt':
            return receipt_svg_1.default;
        case 'Sync':
            return sync_svg_1.default;
        case 'Tag':
            return tag_svg_1.default;
        case 'Users':
            return users_svg_1.default;
        case 'Workflows':
            return workflows_svg_1.default;
        case 'FallbackWorkspaceAvatar':
            return fallback_workspace_avatar_svg_1.default;
        case 'ImageCropSquareMask':
            return image_crop_square_mask_svg_1.default;
        case 'QrCode':
            return qrcode_svg_1.default;
        case 'Transfer':
            return transfer_svg_1.default;
        case 'Trashcan':
            return trashcan_svg_1.default;
        case 'UserPlus':
            return user_plus_svg_1.default;
        case 'ThreeDots':
            return three_dots_svg_1.default;
        default:
            // Fallback to object lookup for any other cases
            return ExpensifyIcons[iconName];
    }
}
/**
 * Get all available ExpensifyIcon names
 * @returns Array of available icon names
 */
var AVAILABLE_EXPENSIFY_ICONS = Object.keys(ExpensifyIcons);
exports.AVAILABLE_EXPENSIFY_ICONS = AVAILABLE_EXPENSIFY_ICONS;
exports.default = ExpensifyIcons;
