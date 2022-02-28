import requiredUnless from '.'
import { required as defaultMessage } from '../../messages'

describe('requiredUnless', () => {
    const customMessage = 'This is a custom message'
    const data = {
        username: 'jane.doe'
    }

    test('valid', () => {
        expect(requiredUnless(null, { data, params: ['username', 'jane.doe'] }))
            .toBe(true)
        expect(requiredUnless(123, { data, params: ['username', 'john.doe'] }))
            .toBe(true)
        expect(requiredUnless(false, { data, params: ['username', 'john.doe'] }))
            .toBe(true)
        expect(requiredUnless(true, { data, params: ['username', 'john.doe'] }))
            .toBe(true)
        expect(requiredUnless(undefined, { data, params: ['username', 'jane.doe'] }))
            .toBe(true)
    })

    test('invalid', () => {
        expect(requiredUnless(null, { data, params: ['username', 'john.doe'] }))
            .toBe(defaultMessage)
        expect(requiredUnless(undefined, { data, message: customMessage, params: ['username', 'john.doe'] }))
            .toBe(customMessage)
        expect(requiredUnless(undefined, { data, message: false, params: ['username', 'john.doe'] }))
            .toBe(false)
    })
})