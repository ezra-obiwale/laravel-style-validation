import digitsBetween from '.'
import { digitsBetween as defaultMessage } from '../../messages'
import { parseMessage } from '../../utils'

const customMessage = 'This is a custom message'

describe('digitsBetween', () => {
    test('valid', () => {
        expect(digitsBetween(123, { params: [2, 3] }))
            .toBe(true)
        expect(digitsBetween(123.456, { params: [3, 8] }))
            .toBe(true)
        expect(digitsBetween('123', { params: [2, 5] }))
            .toBe(true)
        expect(digitsBetween('123.456', { params: [2, 9] }))
            .toBe(true)
    })

    test('invalid', () => {
        expect(digitsBetween('abc', { params: [3, 7] }))
            .toBe(parseMessage(defaultMessage, { $min: 3, $max: 7 }))
        expect(digitsBetween(1234, { message: customMessage, params: [6, 9] }))
            .toBe(customMessage)
        expect(digitsBetween(true, { message: false, params: [3, 3] }))
            .toBe(false)
    })
})