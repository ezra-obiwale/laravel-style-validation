import numeric from '.'
import { numeric as defaultMessage } from '../../messages'

describe('numeric', () => {
    const customMessage = 'This is a custom message'

    test('valid', () => {
        expect(numeric(123))
            .toBe(true)
        expect(numeric('123'))
            .toBe(true)
        expect(numeric(123.456))
            .toBe(true)
        expect(numeric('123.456'))
            .toBe(true)
    })

    test('invalid', () => {
        expect(numeric('abc'))
            .toBe(defaultMessage)
        expect(numeric('123abc', { message: customMessage }))
            .toBe(customMessage)
        expect(numeric('abc123', { message: false }))
            .toBe(false)
    })
})