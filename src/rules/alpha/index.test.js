import alpha from '.';
import { alpha as defaultMessage } from '../../messages';

describe('alpha', () => {
    const customMessage = 'This is a custom message';

    test('valid', () => {
        expect(alpha('abcdABCD'))
            .toBe(true);
    });

    test('invalid', () => {
        expect(alpha(123))
            .toBe(defaultMessage);
        expect(alpha('This is a sentence', { message: customMessage }))
            .toBe(customMessage);
        expect(alpha('abcd@123', { message: false }))
            .toBe(false);
    });
});