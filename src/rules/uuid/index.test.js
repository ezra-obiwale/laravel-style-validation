import uuid from '.';
import { uuid as defaultMessage } from '../../messages';

describe('uuid', () => {
    const customMessage = 'This is a custom message';

    test('valid', () => {
        expect(uuid('ab12eB12-32da-b12C-12Eb-f9Da2C24a4E8'))
            .toBe(true);
    });

    test('invalid', () => {
        expect(uuid('ab12H2-32Za-b12Cf-12EX-J9Dam324P4k8'))
            .toBe(defaultMessage);
        expect(uuid('This is a string', { message: customMessage }))
            .toBe(customMessage);
        expect(uuid(123.34, { message: false }))
            .toBe(false);
    });
});