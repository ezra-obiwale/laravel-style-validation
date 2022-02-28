import string from '.'
import { string as defaultMessage } from '../../messages'

describe('string', () => {
    const customMessage = 'This is a custom message'

    test('valid', () => {
        expect(string('abc'))
            .toBe(true)
        expect(string('123'))
            .toBe(true)
        expect(string(null, { rules: ['nullable'] }))
            .toBe(true)
        expect(string('false'))
            .toBe(true)
        expect(string('true'))
            .toBe(true)
        expect(string(JSON.stringify([1, 2, 3])))
            .toBe(true)
    })

    test('invalid', () => {
        expect(string(123))
            .toBe(defaultMessage)
        expect(string(123, { message: customMessage }))
            .toBe(customMessage)
        expect(string(123, { message: false }))
            .toBe(false)
    })
})