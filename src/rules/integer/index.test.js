import integer from '.';
import { integer as defaultMessage } from '../../messages';

describe('integer', () => {
    const customMessage = 'This is a custom message';

    test('valid', () => {
        expect(integer(123))
            .toBe(true);
        expect(integer('123'))
            .toBe(true);
    });

    test('invalid', () => {
        expect(integer(true))
            .toBe(defaultMessage);
        expect(integer(false, { message: customMessage }))
            .toBe(customMessage);
        expect(integer([], { message: false }))
            .toBe(false);
    });
});