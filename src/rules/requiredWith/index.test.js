import requiredWith from '.'
import { required as defaultMessage } from '../../messages'

describe('requiredWith', () => {
    const customMessage = 'This is a custom message'
    const data = {
        username: 'jane.doe'
    }

    test('valid', () => {
        expect(requiredWith(null, { data, params: ['password'] }))
            .toBe(true)
        expect(requiredWith('abcd', { data, params: ['username'] }))
            .toBe(true)
        expect(requiredWith(123, { data, params: ['username'] }))
            .toBe(true)
        expect(requiredWith(false, { data, params: ['username'] }))
            .toBe(true)
        expect(requiredWith(true, { data, params: ['username'] }))
            .toBe(true)
        expect(requiredWith(0, { data, params: ['username'] }))
            .toBe(true)
    })

    test('invalid', () => {
        expect(requiredWith(null, { data, params: ['username'] }))
            .toBe(defaultMessage)
        expect(requiredWith(undefined, { data, message: customMessage, params: ['username'] }))
            .toBe(customMessage)
        expect(requiredWith(undefined, { data, message: false, params: ['username'] }))
            .toBe(false)
    })
})