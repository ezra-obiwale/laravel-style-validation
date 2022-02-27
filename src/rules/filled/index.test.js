import filled from "."
import { filled as defaultMessage } from "../../messages"

describe('filled', () => {
    const customMessage = 'This is a custom message'

    test('valid', () => {
        expect(filled('abc'))
            .toBe(true)
        expect(filled(123))
            .toBe(true)
        expect(filled(true))
            .toBe(true)
        expect(filled(0))
            .toBe(true)
        expect(filled(false))
            .toBe(true)
    })

    test('invalid', () => {
        expect(filled(''))
            .toBe(defaultMessage)
        expect(filled(null, { message: customMessage }))
            .toBe(customMessage)
        expect(filled(undefined, { message: false }))
            .toBe(false)
    })
})