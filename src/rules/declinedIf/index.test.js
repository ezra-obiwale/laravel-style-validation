import declinedIf from '.'
import { declined as defaultMessage } from '../../messages'

describe('declinedIf', () => {
    const data = {
        username: 'jane.doe',
        password: '@random'
    }

    const customMessage = 'This is a custom message'

    test('condition passes and value is declined', () => {
        expect(declinedIf('no', { data, params: ['username', 'jane.doe'] }))
            .toBe(true)
        expect(declinedIf('off', { data, params: ['username', 'jane.doe'] }))
            .toBe(true)
        expect(declinedIf(0, { data, params: ['username', 'jane.doe'] }))
            .toBe(true)
        expect(declinedIf(false, { data, params: ['username', 'jane.doe'] }))
            .toBe(true)
    })

    test('condition passes but value is NOT declined', () => {
        expect(declinedIf('something else', { data, params: ['username', 'jane.doe'] }))
            .toBe(defaultMessage)
        expect(declinedIf(true, { data, message: customMessage, params: ['username', 'jane.doe'] }))
            .toBe(customMessage)
        expect(declinedIf(1, { data, message: false, params: ['username', 'jane.doe'] }))
            .toBe(false)
    })

    test('condition fails but value is declined', () => {
        expect(declinedIf('no', { data, params: ['username', 'john.doe'] }))
            .toBe(true)
        expect(declinedIf('off', { data, params: ['username', 'john.doe'] }))
            .toBe(true)
        expect(declinedIf(false, { data, message: customMessage, params: ['username', 'john.doe'] }))
            .toBe(true)
        expect(declinedIf(0, { data, message: false, params: ['username', 'john.doe'] }))
            .toBe(true)
    })

    test('condition fails and value is NOT declined', () => {
        expect(declinedIf('something', { data, params: ['username', 'john.doe'] }))
            .toBe(true)
        expect(declinedIf('on', { data, params: ['username', 'john.doe'] }))
            .toBe(true)
    })
})