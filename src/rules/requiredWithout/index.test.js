import requiredWithout from '.';
import { required as defaultMessage } from '../../messages';

describe('requiredWithout', () => {
    const customMessage = 'This is a custom message';
    const data = {
        username: 'jane.doe'
    };

    test('valid', () => {
        expect(requiredWithout(null, { data, params: ['username'] }))
            .toBe(true);
        expect(requiredWithout(123, { data, params: ['password'] }))
            .toBe(true);
        expect(requiredWithout(false, { data, params: ['password'] }))
            .toBe(true);
        expect(requiredWithout(true, { data, params: ['password'] }))
            .toBe(true);
        expect(requiredWithout(0, { data, params: ['password'] }))
            .toBe(true);
    });

    test('invalid', () => {
        expect(requiredWithout(null, { data, params: ['password'] }))
            .toBe(defaultMessage);
        expect(requiredWithout(undefined, { data, message: customMessage, params: ['password'] }))
            .toBe(customMessage);
        expect(requiredWithout(undefined, { data, message: false, params: ['password'] }))
            .toBe(false);
    });
});