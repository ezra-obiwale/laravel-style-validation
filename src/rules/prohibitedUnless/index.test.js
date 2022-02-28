import prohibitedUnless from '.'
import { prohibited as defaultMessage } from '../../messages'
import { parseMessage } from '../../utils'

describe('prohibitedUnless', () => {
    const customMessage = 'This is a custom message'
    const data = {
        username: 'jane.doe',
        test: 'yes'
    }

    test('valid', () => {
        expect(prohibitedUnless('yes', { data, field: 'test', params: ['username', 'john.doe'] }))
            .toBe(true)
        expect(prohibitedUnless('@random', { data, field: 'password', params: ['test', 'yes'] }))
            .toBe(true)
    })

    test('invalid', () => {
        expect(prohibitedUnless('jane.doe', { data, field: 'username', params: ['test', 'yes'] }))
            .toBe(parseMessage(defaultMessage, { $field: 'username' }))
        expect(prohibitedUnless('', { data, field: 'username', message: customMessage, params: ['test', 'yes'] }))
            .toBe(customMessage)
        expect(prohibitedUnless('', { data, field: 'username', message: false, params: ['test', 'yes'] }))
            .toBe(false)
    })
})