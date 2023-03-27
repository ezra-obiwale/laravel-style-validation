import requiredWithAll from '.';
import { required as defaultMessage } from '../../messages';

describe('requiredWithAll', () => {
    const customMessage = 'This is a custom message';
    const data = {
        username: 'jane.doe',
        password: '@random'
    };

    test('valid', () => {
        expect(requiredWithAll(null, { data, params: ['username', 'test'] }))
            .toBe(true);
        expect(requiredWithAll(123, { data, params: ['username', 'password'] }))
            .toBe(true);
        expect(requiredWithAll(false, { data, params: ['username', 'password'] }))
            .toBe(true);
        expect(requiredWithAll(true, { data, params: ['username', 'password'] }))
            .toBe(true);
        expect(requiredWithAll(0, { data, params: ['username', 'password'] }))
            .toBe(true);
    });

    test('invalid', () => {
        expect(requiredWithAll(null, { data, params: ['username', 'password'] }))
            .toBe(defaultMessage);
        expect(requiredWithAll(undefined, { data, message: customMessage, params: ['username', 'password'] }))
            .toBe(customMessage);
        expect(requiredWithAll(undefined, { data, message: false, params: ['username', 'password'] }))
            .toBe(false);
    });
});