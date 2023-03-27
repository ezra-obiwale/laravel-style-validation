import notIn from '.';
import { notIn as defaultMessage } from '../../messages';
import { parseMessage } from '../../utils';

describe('notIn', () => {
    const customMessage = 'This is a custom message';

    test('valid', () => {
        expect(notIn(36, { params: [34, 33, 32, 31] }))
            .toBe(true);
        expect(notIn('No', { params: ['YES', 'yes', 'Yes'] }))
            .toBe(true);
    });

    test('invalid', () => {
        expect(notIn(32, { params: [33.5, 33, 32, 31] }))
            .toBe(parseMessage(defaultMessage, { $values: [33.5, 33, 32, 31].join(', ') }));
        expect(notIn('yes', { message: customMessage, params: ['YES', 'yes', 'Yes'] }))
            .toBe(customMessage);
        expect(notIn('YES', { message: false, params: ['YES', 'yes', 'Yes'] }))
            .toBe(false);
    });
});