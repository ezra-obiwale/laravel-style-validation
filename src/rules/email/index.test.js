import email from '.';
import { email as defaultMessage } from '../../messages';

describe('email', () => {
    const customMessage = 'This is a custom message';

    test('valid', () => {
        expect(email('test@user.com'))
            .toBe(true);
        expect(email('one.two@this.that.co'))
            .toBe(true);
        expect(email('this.user+variable@gmail.com'));
    });

    test('invalid', () => {
        expect(email('test@user'))
            .toBe(defaultMessage);
        expect(email('just.some.text', { message: customMessage }))
            .toBe(customMessage);
        expect(email(12345, { message: false }))
            .toBe(false);
    });
});