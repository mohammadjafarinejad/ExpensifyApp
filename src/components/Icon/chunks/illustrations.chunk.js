"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AVAILABLE_ILLUSTRATIONS = void 0;
exports.getIllustration = getIllustration;
// This file contains all the SVG imports for illustrations used in the app
// Company Cards
var emptystate__card_pos_svg_1 = require("@assets/images/companyCards/emptystate__card-pos.svg");
// Other assets
var computer_svg_1 = require("@assets/images/computer.svg");
var expensify_card_svg_1 = require("@assets/images/expensify-card.svg");
// Expensify Card
var cardIllustration_svg_1 = require("@assets/images/expensifyCard/cardIllustration.svg");
var laptop_with_second_screen_sync_svg_1 = require("@assets/images/laptop-with-second-screen-sync.svg");
var laptop_with_second_screen_x_svg_1 = require("@assets/images/laptop-with-second-screen-x.svg");
// Product Illustrations
var telescope_svg_1 = require("@assets/images/product-illustrations/telescope.svg");
// Simple Illustrations - Core ones that are actually used
var simple_illustration__accounting_svg_1 = require("@assets/images/simple-illustrations/simple-illustration__accounting.svg");
var simple_illustration__blueshield_svg_1 = require("@assets/images/simple-illustrations/simple-illustration__blueshield.svg");
var simple_illustration__building_svg_1 = require("@assets/images/simple-illustrations/simple-illustration__building.svg");
var simple_illustration__car_ice_svg_1 = require("@assets/images/simple-illustrations/simple-illustration__car-ice.svg");
var simple_illustration__coins_svg_1 = require("@assets/images/simple-illustrations/simple-illustration__coins.svg");
var simple_illustration__credit_cards_svg_1 = require("@assets/images/simple-illustrations/simple-illustration__credit-cards.svg");
var simple_illustration__folder_open_svg_1 = require("@assets/images/simple-illustrations/simple-illustration__folder-open.svg");
var simple_illustration__handcard_svg_1 = require("@assets/images/simple-illustrations/simple-illustration__handcard.svg");
var simple_illustration__invoice_svg_1 = require("@assets/images/simple-illustrations/simple-illustration__invoice.svg");
var simple_illustration__magnifyingglass_money_svg_1 = require("@assets/images/simple-illustrations/simple-illustration__magnifyingglass-money.svg");
var simple_illustration__money_receipts_svg_1 = require("@assets/images/simple-illustrations/simple-illustration__money-receipts.svg");
var simple_illustration__moneywings_svg_1 = require("@assets/images/simple-illustrations/simple-illustration__moneywings.svg");
var simple_illustration__pencil_svg_1 = require("@assets/images/simple-illustrations/simple-illustration__pencil.svg");
var simple_illustration__perdiem_svg_1 = require("@assets/images/simple-illustrations/simple-illustration__perdiem.svg");
var simple_illustration__receipt_wrangler_svg_1 = require("@assets/images/simple-illustrations/simple-illustration__receipt-wrangler.svg");
var simple_illustration__report_receipt_svg_1 = require("@assets/images/simple-illustrations/simple-illustration__report-receipt.svg");
var simple_illustration__rules_svg_1 = require("@assets/images/simple-illustrations/simple-illustration__rules.svg");
var simple_illustration__tag_svg_1 = require("@assets/images/simple-illustrations/simple-illustration__tag.svg");
var simple_illustration__twocards_horizontal_svg_1 = require("@assets/images/simple-illustrations/simple-illustration__twocards-horizontal.svg");
var simple_illustration__workflows_svg_1 = require("@assets/images/simple-illustrations/simple-illustration__workflows.svg");
// Create the illustrations object with all imported illustrations
var Illustrations = {
    // Company Cards
    CompanyCardsEmptyState: emptystate__card_pos_svg_1.default,
    // Other assets
    Computer: computer_svg_1.default,
    ExpensifyCardImage: expensify_card_svg_1.default,
    LaptopWithSecondScreenSync: laptop_with_second_screen_sync_svg_1.default,
    LaptopWithSecondScreenX: laptop_with_second_screen_x_svg_1.default,
    // Expensify Card
    ExpensifyCardIllustration: cardIllustration_svg_1.default,
    // Product Illustrations
    TeleScope: telescope_svg_1.default,
    Telescope: telescope_svg_1.default, // Alias for consistency
    // Simple Illustrations
    Accounting: simple_illustration__accounting_svg_1.default,
    Building: simple_illustration__building_svg_1.default,
    Coins: simple_illustration__coins_svg_1.default,
    CreditCardsNew: simple_illustration__credit_cards_svg_1.default,
    FolderOpen: simple_illustration__folder_open_svg_1.default,
    HandCard: simple_illustration__handcard_svg_1.default,
    InvoiceBlue: simple_illustration__invoice_svg_1.default,
    MagnifyingGlassMoney: simple_illustration__magnifyingglass_money_svg_1.default,
    MoneyReceipts: simple_illustration__money_receipts_svg_1.default,
    MoneyWings: simple_illustration__moneywings_svg_1.default,
    PerDiem: simple_illustration__perdiem_svg_1.default,
    ReceiptWrangler: simple_illustration__receipt_wrangler_svg_1.default,
    ReportReceipt: simple_illustration__report_receipt_svg_1.default,
    Rules: simple_illustration__rules_svg_1.default,
    Tag: simple_illustration__tag_svg_1.default,
    CompanyCard: simple_illustration__twocards_horizontal_svg_1.default,
    Workflows: simple_illustration__workflows_svg_1.default,
    CarIce: simple_illustration__car_ice_svg_1.default,
    BlueShield: simple_illustration__blueshield_svg_1.default,
    Pencil: simple_illustration__pencil_svg_1.default,
    // Legacy aliases for compatibility
    Car: simple_illustration__twocards_horizontal_svg_1.default, // Fallback for Car illustration requests
};
/**
 * Get an illustration by name
 * @param illustrationName - The name of the illustration to retrieve
 * @returns The illustration component or undefined if not found
 */
function getIllustration(illustrationName) {
    // Direct return for known illustrations to preserve React component type
    switch (illustrationName) {
        case 'Building':
            return simple_illustration__building_svg_1.default;
        case 'FolderOpen':
            return simple_illustration__folder_open_svg_1.default;
        case 'Accounting':
            return simple_illustration__accounting_svg_1.default;
        case 'CompanyCard':
            return simple_illustration__twocards_horizontal_svg_1.default;
        case 'Workflows':
            return simple_illustration__workflows_svg_1.default;
        case 'InvoiceBlue':
            return simple_illustration__invoice_svg_1.default;
        case 'Rules':
            return simple_illustration__rules_svg_1.default;
        case 'HandCard':
            return simple_illustration__handcard_svg_1.default;
        case 'Tag':
            return simple_illustration__tag_svg_1.default;
        case 'PerDiem':
            return simple_illustration__perdiem_svg_1.default;
        case 'Coins':
            return simple_illustration__coins_svg_1.default;
        case 'TeleScope':
        case 'Telescope':
            return telescope_svg_1.default;
        case 'CreditCardsNew':
            return simple_illustration__credit_cards_svg_1.default;
        case 'MoneyWings':
            return simple_illustration__moneywings_svg_1.default;
        case 'MoneyReceipts':
            return simple_illustration__money_receipts_svg_1.default;
        case 'ExpensifyCardIllustration':
            return cardIllustration_svg_1.default;
        case 'ReceiptWrangler':
            return simple_illustration__receipt_wrangler_svg_1.default;
        case 'ReportReceipt':
            return simple_illustration__report_receipt_svg_1.default;
        case 'MagnifyingGlassMoney':
            return simple_illustration__magnifyingglass_money_svg_1.default;
        case 'CompanyCardsEmptyState':
            return emptystate__card_pos_svg_1.default;
        case 'Car': // Legacy fallback
            return simple_illustration__twocards_horizontal_svg_1.default;
        case 'CarIce':
            return simple_illustration__car_ice_svg_1.default;
        case 'BlueShield':
            return simple_illustration__blueshield_svg_1.default;
        case 'Pencil':
            return simple_illustration__pencil_svg_1.default;
        default:
            // Fallback to object lookup for any other cases
            return Illustrations[illustrationName];
    }
}
/**
 * Get all available illustration names
 * @returns Array of available illustration names
 */
var AVAILABLE_ILLUSTRATIONS = Object.keys(Illustrations);
exports.AVAILABLE_ILLUSTRATIONS = AVAILABLE_ILLUSTRATIONS;
exports.default = Illustrations;
