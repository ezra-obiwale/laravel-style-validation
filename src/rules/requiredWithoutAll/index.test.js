import requiredWithoutAll from '.'
import { required as defaultMessage } from '../../messages'

describe('requiredWithoutAll', () => {
    const customMessage = 'This is a custom message'
    const data = {
        username: 'jane.doe',
        password: '@random'
    }

    test('valid', () => {
        expect(requiredWithoutAll(null, { data, params: ['username', 'test'] }))
            .toBe(true)
        expect(requiredWithoutAll(123, { data, params: ['username', 'password'] }))
            .toBe(true)
        expect(requiredWithoutAll(false, { data, params: ['username', 'password'] }))
            .toBe(true)
        expect(requiredWithoutAll(true, { data, params: ['username', 'password'] }))
            .toBe(true)
        expect(requiredWithoutAll(0, { data, params: ['username', 'password'] }))
            .toBe(true)
    })

    test('invalid', () => {
        expect(requiredWithoutAll(null, { data, params: ['debug', 'test'] }))
            .toBe(defaultMessage)
        expect(requiredWithoutAll(undefined, { data, message: customMessage, params: ['debug', 'test'] }))
            .toBe(customMessage)
        expect(requiredWithoutAll(undefined, { data, message: false, params: ['debug', 'test'] }))
            .toBe(false)
    })
})