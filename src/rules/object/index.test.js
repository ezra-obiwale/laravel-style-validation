import object from '.';
import { object as defaultMessage } from '../../messages';

describe('object', () => {
    const customMessage = 'This is a custom message';

    test('valid', () => {
        expect(object({ one: 1, two: 2 }))
            .toBe(true);
        expect(object({ one: 1, two: 2, test: true }, { params: ['one', 'test'] }))
            .toBe(true);
    });

    test('invalid', () => {
        expect(object(1234))
            .toBe(defaultMessage);
        expect(object({ one: 1, two: 2 }, { message: customMessage, params: ['test'] }))
            .toBe(customMessage);
        expect(object({ one: 1, two: 2 }, { message: false, params: ['test'] }))
            .toBe(false);
    });
});