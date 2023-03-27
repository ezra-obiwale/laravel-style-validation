import different from '.';
import { different as defaultMessage } from '../../messages';
import { parseMessage } from '../../utils';

describe('different', () => {
    const customMessage = 'This is a custom message';
    const data = {
        username: 'jane.doe'
    };
    const params = ['username'];

    test('valid', () => {
        expect(different('john.doe', { data, params }))
            .toBe(true);
    });

    test('invalid', () => {
        expect(different('jane.doe', { data, params }))
            .toBe(parseMessage(defaultMessage, { $otherfieldValue: data.username }));
        expect(different('jane.doe', { data, message: customMessage, params }))
            .toBe(customMessage);
        expect(different('jane.doe', { data, message: false, params }))
            .toBe(false);
    });
});