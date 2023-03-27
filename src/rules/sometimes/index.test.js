import sometimes from '.';
import { ValidStopError } from '../../errors';

describe('sometimes', () => {
    test('valid', () => {
        expect(sometimes('doe'))
            .toBe(true);
        expect(sometimes(123))
            .toBe(true);
        expect(sometimes(0))
            .toBe(true);
    });

    test('stop execution', () => {
        expect(() => sometimes(undefined))
            .toThrow(ValidStopError);
        expect(() => sometimes(null))
            .toThrow(ValidStopError);
        expect(() => sometimes(''))
            .toThrow(ValidStopError);
    });
});