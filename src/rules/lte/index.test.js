import lte from '.';
import { lte as defaultMessage } from '../../messages';
import { parseMessage } from '../../utils';

describe('lte', () => {
    const customMessage = 'This is a custom message';
    const params = ['other'];

    test('valid', () => {
        expect(lte(23, { data: { other: 23 }, params }))
            .toBe(true);
        expect(lte('33', { data: { other: 49 }, params }))
            .toBe(true);
        expect(lte(123.22, { data: { other: 123.23 }, params }))
            .toBe(true);
        expect(lte('def', { data: { other: 'def' }, params }))
            .toBe(true);
    });

    test('invalid', () => {
        expect(lte(23.5, { data: { other: 23 }, params }))
            .toBe(parseMessage(defaultMessage, { $otherfieldValue: 23 }));
        expect(lte('29', { data: { other: '19' }, message: customMessage, params }))
            .toBe(customMessage);
        expect(lte('def', { data: { other: 'abc' }, message: false, params }))
            .toBe(false);
    });
});