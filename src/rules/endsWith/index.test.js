import endsWith from '.';
import { endsWith as defaultMessage } from '../../messages';
import { parseMessage } from '../../utils';

describe('endsWith', () => {
    const customMessage = 'This is a custom message';

    test('valid', () => {
        expect(endsWith('It is done', { params: ['done'] }))
            .toBe(true);
        expect(endsWith([1, 2, 3], { params: [3] }))
            .toBe(true);
        expect(endsWith('It is a match', { params: ['done', 'it', 'match'] }))
            .toBe(true);
    });

    test('invalid', () => {
        expect(endsWith('It is done.', { params: ['done'] }))
            .toBe(parseMessage(defaultMessage, { $values: 'done' }));
        expect(endsWith('It is a match again', { message: customMessage, params: ['done', 'it', 'match'] }))
            .toBe(customMessage);
        expect(endsWith(['one', 'two', 'three'], { message: false, params: [1, 2, 3] }))
            .toBe(false);
    });
});