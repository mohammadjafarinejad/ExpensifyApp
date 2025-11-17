"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OnboardingFlow_1 = require("@libs/actions/Welcome/OnboardingFlow");
var CONST_1 = require("@src/CONST");
describe('OnboardingFlow', function () {
    describe('getOnboardingInitialPath', function () {
        it('should return the correct path for personal spend', function () {
            var params = {
                isUserFromPublicDomain: false,
                hasAccessiblePolicies: true,
                onboardingValuesParam: {
                    hasCompletedGuidedSetupFlow: false,
                    shouldRedirectToClassicAfterMerge: false,
                    shouldValidate: false,
                    isMergingAccountBlocked: false,
                    isMergeAccountStepCompleted: false,
                    signupQualifier: CONST_1.default.ONBOARDING_SIGNUP_QUALIFIERS.INDIVIDUAL,
                },
                currentOnboardingPurposeSelected: CONST_1.default.ONBOARDING_CHOICES.PERSONAL_SPEND,
                currentOnboardingCompanySize: CONST_1.default.ONBOARDING_COMPANY_SIZE.SMALL,
                onboardingInitialPath: '/',
                onboardingValues: undefined,
            };
            var path = (0, OnboardingFlow_1.getOnboardingInitialPath)(params);
            expect(path).toBe('/onboarding/personal-details');
        });
        it('should return the correct path for SMB', function () {
            var params = {
                isUserFromPublicDomain: true,
                hasAccessiblePolicies: true,
                onboardingValuesParam: {
                    hasCompletedGuidedSetupFlow: false,
                    shouldRedirectToClassicAfterMerge: false,
                    shouldValidate: false,
                    isMergingAccountBlocked: false,
                    isMergeAccountStepCompleted: false,
                    signupQualifier: CONST_1.default.ONBOARDING_SIGNUP_QUALIFIERS.SMB,
                },
                currentOnboardingPurposeSelected: CONST_1.default.ONBOARDING_CHOICES.EMPLOYER,
                currentOnboardingCompanySize: CONST_1.default.ONBOARDING_COMPANY_SIZE.SMALL,
                onboardingInitialPath: '/',
                onboardingValues: undefined,
            };
            var path = (0, OnboardingFlow_1.getOnboardingInitialPath)(params);
            expect(path).toBe('/onboarding/work-email');
        });
        it('should return the correct path for VSB', function () {
            var params = {
                isUserFromPublicDomain: false,
                hasAccessiblePolicies: false,
                onboardingValuesParam: {
                    hasCompletedGuidedSetupFlow: false,
                    shouldRedirectToClassicAfterMerge: false,
                    shouldValidate: false,
                    isMergingAccountBlocked: false,
                    isMergeAccountStepCompleted: false,
                    signupQualifier: CONST_1.default.ONBOARDING_SIGNUP_QUALIFIERS.VSB,
                },
                currentOnboardingPurposeSelected: CONST_1.default.ONBOARDING_CHOICES.EMPLOYER,
                currentOnboardingCompanySize: CONST_1.default.ONBOARDING_COMPANY_SIZE.SMALL,
                onboardingInitialPath: '/',
                onboardingValues: undefined,
            };
            var path = (0, OnboardingFlow_1.getOnboardingInitialPath)(params);
            expect(path).toBe('/onboarding/accounting');
        });
        it('should return the correct path for SMB and is not from public domain', function () {
            var params = {
                isUserFromPublicDomain: false,
                hasAccessiblePolicies: false,
                onboardingValuesParam: {
                    hasCompletedGuidedSetupFlow: false,
                    shouldRedirectToClassicAfterMerge: false,
                    shouldValidate: false,
                    isMergingAccountBlocked: false,
                    isMergeAccountStepCompleted: false,
                    signupQualifier: CONST_1.default.ONBOARDING_SIGNUP_QUALIFIERS.SMB,
                },
                currentOnboardingPurposeSelected: CONST_1.default.ONBOARDING_CHOICES.SUBMIT,
                currentOnboardingCompanySize: CONST_1.default.ONBOARDING_COMPANY_SIZE.SMALL,
                onboardingInitialPath: '/',
                onboardingValues: undefined,
            };
            var path = (0, OnboardingFlow_1.getOnboardingInitialPath)(params);
            expect(path).toBe('/onboarding/employees');
        });
    });
});
