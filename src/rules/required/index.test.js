import required from '.';
import { required as defaultMessage } from '../../messages';

describe('required', () => {
    const customMessage = 'This is a custom message';

    test('valid', () => {
        expect(required('abc'))
            .toBe(true);
        expect(required(123))
            .toBe(true);
        expect(required(false))
            .toBe(true);
        expect(required(true))
            .toBe(true);
        expect(required(0))
            .toBe(true);
    });

    test('invalid', () => {
        expect(required(null))
            .toBe(defaultMessage);
        expect(required(undefined, { message: customMessage }))
            .toBe(customMessage);
        expect(required(undefined, { message: false }))
            .toBe(false);
    });
});