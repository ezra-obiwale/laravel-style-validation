import url from '.';
import { url as defaultMessage } from '../../messages';

describe('url', () => {
    const customMessage = 'This is a custom message';

    test('valid', () => {
        expect(url('example.com'))
            .toBe(true);
        expect(url('www.example.com'))
            .toBe(true);
        expect(url('http://example.com'))
            .toBe(true);
        expect(url('http://example-test.com'))
            .toBe(true);
        expect(url('http://example_test.com'))
            .toBe(true);
        expect(url('http://www.example.com'))
            .toBe(true);
        expect(url('https://example.com'))
            .toBe(true);
        expect(url('https://www.example.com'))
            .toBe(true);
        expect(url('https://subdomain.example.com'))
            .toBe(true);
        expect(url('https://sub.domain.example.com'))
            .toBe(true);
        expect(url('https://example.com/some/sub-path'))
            .toBe(true);
    });

    test('invalid', () => {
        expect(url('file//some/file/apth'))
            .toBe(defaultMessage);
        expect(url('file//some/file/apth', { message: customMessage }))
            .toBe(customMessage);
        expect(url('file//some/file/apth', { message: false }))
            .toBe(false);
    });
});