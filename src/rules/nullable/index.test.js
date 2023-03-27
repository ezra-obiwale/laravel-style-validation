import nullable from '.';

describe('nullable', () => {
    const data = {};

    test('valid', () => {
        expect(nullable('', { data, field: 'test' }))
            .toBe(true);
        expect(data.test)
            .toBe(null);
        expect(nullable('present', { data, field: 'test' }));
    });
});