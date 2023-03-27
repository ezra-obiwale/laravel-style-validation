import max from '.';
import { max as defaultMessage } from '../../messages';
import { parseMessage } from '../../utils';

describe('max', () => {
    const customMessage = 'This is a custom message';

    test('valid', () => {
        expect(max(23, { params: [30] }))
            .toBe(true);
        expect(max(23, { params: [23] }))
            .toBe(true);
        expect(max([1, 2, 3], { params: [3] }))
            .toBe(true);
        expect(max([1, 2, 3], { params: [5] }))
            .toBe(true);
    });

    test('invalid', () => {
        expect(max(23, { params: [12] }))
            .toBe(parseMessage(defaultMessage, { $value: 12 }));
        expect(max(23, { message: customMessage, params: [22.99] }))
            .toBe(customMessage);
        expect(max(23, { message: false, params: [22.99] }))
            .toBe(false);
        expect(max([1, 2, 3], { message: false, params: [2] }))
            .toBe(false);
    });
});