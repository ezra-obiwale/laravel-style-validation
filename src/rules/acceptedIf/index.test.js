import acceptedIf from '.'
import { accepted as defaultMessage } from '../../messages'

describe('acceptedIf', () => {
    const data = {
        username: 'jane.doe',
        password: '@random',
        term: true,
        policy: false
    }

    const customMessage = 'This is a custom message'

    test('condition passes and value is accepted', () => {
        expect(acceptedIf('yes', { data, params: ['username', 'jane.doe'] }))
            .toBe(true)
        expect(acceptedIf('on', { data, params: ['username', 'jane.doe'] }))
            .toBe(true)
        expect(acceptedIf(1, { data, params: ['username', 'jane.doe'] }))
            .toBe(true)
        expect(acceptedIf(true, { data, params: ['username', 'jane.doe'] }))
            .toBe(true)
    })

    test('condition passes but value is NOT accepted', () => {
        expect(acceptedIf('something else', { data, params: ['username', 'jane.doe'] }))
            .toBe(defaultMessage)
        expect(acceptedIf('something else', { data, message: customMessage, params: ['username', 'jane.doe'] }))
            .toBe(customMessage)
        expect(acceptedIf('something else', { data, message: false, params: ['username', 'jane.doe'] }))
            .toBe(false)
    })

    test('condition fails but value is accepted', () => {
        expect(acceptedIf('yes', { data, params: ['username', 'john.doe'] }))
            .toBe(true)
        expect(acceptedIf('on', { data, params: ['username', 'john.doe'] }))
            .toBe(true)
        expect(acceptedIf(true, { data, message: customMessage, params: ['username', 'john.doe'] }))
            .toBe(true)
        expect(acceptedIf(1, { data, message: false, params: ['username', 'john.doe'] }))
            .toBe(true)
    })

    test('condition fails and value is NOT accepted', () => {
        expect(acceptedIf('something', { data, params: ['username', 'john.doe'] }))
            .toBe(true)
        expect(acceptedIf('off', { data, params: ['username', 'john.doe'] }))
            .toBe(true)
    })
})