import prohibits from '.'
import { prohibits as defaultMessage } from '../../messages'
import { parseMessage } from '../../utils'

describe('prohibits', () => {
    const customMessage = 'This is a custom message'
    const data = {
        username: 'jane.doe',
        test: 'yes'
    }

    test('valid', () => {
        expect(prohibits('jane.doe', { data, field: 'username', params: ['password'] }))
            .toBe(true)
        expect(prohibits(null, { data, field: 'password', params: ['username'] }))
            .toBe(true)
    })

    test('invalid', () => {
        expect(prohibits('jane.doe', { data, field: 'username', params: ['test'] }))
            .toBe(parseMessage(defaultMessage, { $otherfield: 'test' }))
        expect(prohibits('jane.doe', { data, field: 'username', message: customMessage, params: ['test'] }))
            .toBe(customMessage)
        expect(prohibits('jane.doe', { data, field: 'username', message: false, params: ['test'] }))
            .toBe(false)
    })
})