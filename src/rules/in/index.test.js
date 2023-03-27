import $in from '.';
import { $in as defaultMessage } from '../../messages';
import { parseMessage } from '../../utils';

describe('in', () => {
    const customMessage = 'This is a custom message';

    test('valid', () => {
        expect($in(34, { params: [34, 33, 32, 31] }))
            .toBe(true);
        expect($in('Yes', { params: ['YES', 'yes', 'Yes'] }))
            .toBe(true);
    });

    test('invalid', () => {
        expect($in(34, { params: [33.5, 33, 32, 31] }))
            .toBe(parseMessage(defaultMessage, { $values: [33.5, 33, 32, 31].join(', ') }));
        expect($in('No', { message: customMessage, params: ['YES', 'yes', 'Yes'] }))
            .toBe(customMessage);
        expect($in('Ye', { message: false, params: ['YES', 'yes', 'Yes'] }))
            .toBe(false);
    });
});