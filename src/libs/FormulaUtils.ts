import {FORMULA_PART_TYPES, parse} from './Formula';

function hasFormulaPart(value: string) {
    const parts = parse(value);
    return parts.some((part) => part.type === FORMULA_PART_TYPES.FIELD || part.type === FORMULA_PART_TYPES.REPORT || part.type === FORMULA_PART_TYPES.USER);
}

// eslint-disable-next-line import/prefer-default-export
export {hasFormulaPart};
