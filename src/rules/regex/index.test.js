import regex from '.';
import { regex as defaultMessage } from '../../messages';

describe('regex', () => {
    const customMessage = 'This is a custom message';

    test('valid', () => {
        expect(regex('123', { params: ['/[0-9]/g'] }))
            .toBe(true);
        expect(regex(1234, { params: ['[0-9]'] }))
            .toBe(true);
    });

    test('invalid', () => {
        expect(regex(1234.43, { params: ['/[a-zA-Z]/g'] }))
            .toBe(defaultMessage);
        expect(regex('1234', { message: customMessage, params: ['[a-zA-Z]'] }))
            .toBe(customMessage);
        expect(regex('abcABC', { message: false, params: ['[^a-zA-Z]'] }))
            .toBe(false);
    });
});