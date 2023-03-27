import alphaDash from '.';
import { alphaDash as defaultMessage } from '../../messages';

describe('alphaDash', () => {
    const customMessage = 'This is a custom message';

    test('valid', () => {
        expect(alphaDash('abcdABCD123'))
            .toBe(true);
        expect(alphaDash('some-selector_1234'))
            .toBe(true);
        expect(alphaDash('some_selector-1234'))
            .toBe(true);
    });

    test('invalid', () => {
        expect(alphaDash('AD.34'))
            .toBe(defaultMessage);
        expect(alphaDash('This is a sentence', { message: customMessage }))
            .toBe(customMessage);
        expect(alphaDash('abcd@123', { message: false }))
            .toBe(false);
    });
});