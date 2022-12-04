import min from '.'
import { min as defaultMessage } from '../../messages'
import { parseMessage } from '../../utils'

describe('min', () => {
    const customMessage = 'This is a custom message'

    test('valid', () => {
        expect(min(30, { params: [23] }))
            .toBe(true)
        expect(min(23, { params: [23] }))
            .toBe(true)
        expect(min([1, 2, 3], { params: [2] }))
            .toBe(true)
    })

    test('invalid', () => {
        expect(min(12, { params: [23] }))
            .toBe(parseMessage(defaultMessage, { $value: 23 }))
        expect(min(22.99, { message: customMessage, params: [23] }))
            .toBe(customMessage)
        expect(min(22.99, { message: false, params: [23] }))
            .toBe(false)
        expect(min([1, 2, 3], { message: false, params: [5] }))
            .toBe(false)
    })
})