import prohibitedIf from '.'
import { prohibited as defaultMessage } from '../../messages'
import { parseMessage } from '../../utils'

describe('prohibitedIf', () => {
    const customMessage = 'This is a custom message'
    const data = {
        username: 'jane.doe',
        test: 'yes'
    }

    test('valid', () => {
        expect(prohibitedIf('@random', { data, field: 'password', params: ['username', 'jane.doe'] }))
            .toBe(true)
        expect(prohibitedIf('jane.doe', { data, field: 'username', params: ['test', 'no'] }))
            .toBe(true)
    })

    test('invalid', () => {
        expect(prohibitedIf('jane.doe', { data, field: 'username', params: ['test', 'yes'] }))
            .toBe(parseMessage(defaultMessage, { $field: 'username' }))
        expect(prohibitedIf('', { data, field: 'username', message: customMessage, field: 'username', params: ['test', 'yes'] }))
            .toBe(customMessage)
        expect(prohibitedIf('', { data, field: 'username', message: false, field: 'username', params: ['test', 'yes'] }))
            .toBe(false)
    })
})