import notRegex from '.';
import { notRegex as defaultMessage } from '../../messages';

describe('notRegex', () => {
    const customMessage = 'This is a custom message';

    test('valid', () => {
        expect(notRegex('abc', { params: ['/[0-9]/g'] }))
            .toBe(true);
        expect(notRegex('abc', { params: ['[0-9]'] }))
            .toBe(true);
    });

    test('invalid', () => {
        expect(notRegex('abc', { params: ['/[a-zA-Z]/g'] }))
            .toBe(defaultMessage);
        expect(notRegex('abc', { message: customMessage, params: ['[a-zA-Z]'] }))
            .toBe(customMessage);
        expect(notRegex('abc', { message: false, params: ['[a-zA-Z]'] }))
            .toBe(false);
    });
});