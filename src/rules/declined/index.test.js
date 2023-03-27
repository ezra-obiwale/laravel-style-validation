import declined from '.';
import { declined as defaultMessage } from '../../messages';

describe('declined', () => {
    const customMessage = 'This is a custom message';

    test('valid', () => {
        expect(declined('no'))
            .toBe(true);
        expect(declined('off'))
            .toBe(true);
        expect(declined(0))
            .toBe(true);
        expect(declined(false))
            .toBe(true);
    });

    test('invalid', () => {
        expect(declined(''))
            .toBe(defaultMessage);
        expect(declined(true))
            .toBe(defaultMessage);
        expect(declined(12))
            .toBe(defaultMessage);
        expect(declined('12', { message: customMessage }))
            .toBe(customMessage);
        expect(declined('This is a sentence', { message: false }))
            .toBe(false);
    });
});