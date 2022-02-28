import same from '.'
import { same as defaultMessage } from '../../messages'
import { parseMessage } from '../../utils'

describe('same', () => {
    const customMessage = 'This is a custom message'
    const data = {
        firstName: 'doe',
        lastName: 'doe'
    }
    const params = ['lastName']

    test('valid', () => {
        expect(same('doe', { data, params }))
            .toBe(true)
        expect(same('doe', { data, field: 'firstName', params }))
            .toBe(true)
    })

    test('invalid', () => {
        expect(same('sugar', { data, params }))
            .toBe(parseMessage(defaultMessage, { $otherfieldValue: 'doe' }))
        expect(same(true, { data, message: customMessage, params }))
            .toBe(customMessage)
        expect(same('1', { data, message: false, params }))
            .toBe(false)
    })
})