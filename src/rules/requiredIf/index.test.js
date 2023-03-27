import requiredIf from '.';
import { required as defaultMessage } from '../../messages';

describe('requiredIf', () => {
    const customMessage = 'This is a custom message';
    const data = {
        username: 'jane.doe'
    };

    test('valid', () => {
        expect(requiredIf(null, { data, params: ['username', 'john.doe'] }))
            .toBe(true);
        expect(requiredIf(123, { data, params: ['username', 'jane.doe'] }))
            .toBe(true);
        expect(requiredIf(false, { data, params: ['username', 'jane.doe'] }))
            .toBe(true);
        expect(requiredIf(true, { data, params: ['username', 'jane.doe'] }))
            .toBe(true);
        expect(requiredIf('0', { data, params: ['username', 'jane.doe'] }))
            .toBe(true);
    });

    test('invalid', () => {
        expect(requiredIf(null, { data, params: ['username', 'jane.doe'] }))
            .toBe(defaultMessage);
        expect(requiredIf(undefined, { data, message: customMessage, params: ['username', 'jane.doe'] }))
            .toBe(customMessage);
        expect(requiredIf(undefined, { data, message: false, params: ['username', 'jane.doe'] }))
            .toBe(false);
    });
});