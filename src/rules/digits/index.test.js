import digits from '.';
import { digits as defaultMessage } from '../../messages';
import { parseMessage } from '../../utils';

const customMessage = 'This is a custom message';

describe('digits', () => {
    test('valid', () => {
        expect(digits(123, { params: [3] }))
            .toBe(true);
        expect(digits(123.456, { params: [7] }))
            .toBe(true);
        expect(digits('123', { params: [3] }))
            .toBe(true);
        expect(digits('123.456', { params: [7] }))
            .toBe(true);
    });

    test('invalid', () => {
        expect(digits('abc', { params: [3] }))
            .toBe(parseMessage(defaultMessage, { $value: 3 }));
        expect(digits(1234, { message: customMessage, params: [3] }))
            .toBe(customMessage);
        expect(digits(true, { message: false, params: [3] }))
            .toBe(false);
    });
});