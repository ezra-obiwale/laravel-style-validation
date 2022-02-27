import boolean from '.'
import { boolean as defaultMessage } from '../../messages'

describe('boolean', () => {
    const customMessage = 'This is a custom message'

    test('valid', () => {
        expect(boolean(true))
            .toBe(true)
        expect(boolean(false))
            .toBe(true)
        expect(boolean(1))
            .toBe(true)
        expect(boolean(0))
            .toBe(true)
        expect(boolean('1'))
            .toBe(true)
        expect(boolean('0'))
            .toBe(true)
    })

    test('invalid', () => {
        expect(boolean(12))
            .toBe(defaultMessage)
        expect(boolean('12', { message: customMessage }))
            .toBe(customMessage)
        expect(boolean('This is a sentence', { message: false }))
            .toBe(false)
    })
})