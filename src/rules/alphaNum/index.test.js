import alphaNum from '.'
import { alphaNum as defaultMessage } from '../../messages'

describe('alphaNum', () => {
    const customMessage = 'This is a custom message'

    test('valid', () => {
        expect(alphaNum('abcdABCD'))
            .toBe(true)
        expect(alphaNum('abc123'))
            .toBe(true)
        expect(alphaNum(2345))
            .toBe(true)
    })

    test('invalid', () => {
        expect(alphaNum('This is a sentence'))
            .toBe(defaultMessage)
        expect(alphaNum('This is a sentence', { message: customMessage }))
            .toBe(customMessage)
        expect(alphaNum('abcd@123', { message: false }))
            .toBe(false)
    })
})