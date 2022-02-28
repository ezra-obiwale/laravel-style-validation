import prohibited from '.'
import { prohibited as defaultMessage } from '../../messages'
import { parseMessage } from '../../utils'

describe('prohibited', () => {
    const customMessage = 'This is a custom message'
    const data = {
        username: 'jane.doe'
    }

    test('valid', () => {
        expect(prohibited('jane.doe', { data, field: 'password' }))
            .toBe(true)
    })

    test('invalid', () => {
        expect(prohibited('jane.doe', { data, field: 'username' }))
            .toBe(parseMessage(defaultMessage, { $field: 'username' }))
        expect(prohibited('', { data, message: customMessage, field: 'username' }))
            .toBe(customMessage)
        expect(prohibited(false, { data, message: false, field: 'username' }))
            .toBe(false)
    })
})