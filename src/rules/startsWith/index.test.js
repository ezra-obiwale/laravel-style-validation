import startsWith from '.';
import { startsWith as defaultMessage } from '../../messages';
import { parseMessage } from '../../utils';

describe('startsWith', () => {
    const customMessage = 'This is a custom message';

    test('valid', () => {
        expect(startsWith('It is done', { params: ['It'] }))
            .toBe(true);
        expect(startsWith([1, 2, 3], { params: [1] }))
            .toBe(true);
        expect(startsWith('It is a match', { params: ['done', 'It', 'match'] }))
            .toBe(true);
    });

    test('invalid', () => {
        expect(startsWith('It is done.', { params: ['done.'] }))
            .toBe(parseMessage(defaultMessage, { $values: 'done.' }));
        expect(startsWith('It is a match again', { message: customMessage, params: ['done', 'again', 'match'] }))
            .toBe(customMessage);
        expect(startsWith(['one', 'two', 'three'], { message: false, params: [1, 2, 3] }))
            .toBe(false);
    });
});