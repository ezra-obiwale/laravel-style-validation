import between from '.'
import { between as defaultMessage } from '../../messages'
import { parseMessage } from '../../utils'

describe('between', () => {
    const params = [1, 10]
    const customMessage = 'This is a custom message'

    test('valid', () => {
        expect(between(3, { params }))
            .toBe(true)
        expect(between(9.99, { params }))
            .toBe(true)
        expect(between('7', { params }))
            .toBe(true)
    })

    test('invalid', () => {
        expect(between(0, { params }))
            .toBe(parseMessage(defaultMessage, { $min: params[0], $max: params[1] }))
        expect(between('12', { message: customMessage, params }))
            .toBe(customMessage)
        expect(between('This is a sentence', { message: false, params }))
            .toBe(false)
    })
})