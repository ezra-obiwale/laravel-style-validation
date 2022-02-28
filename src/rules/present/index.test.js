import present from '.'
import { present as defaultMessage } from '../../messages'
import { parseMessage } from '../../utils'

describe('present', () => {
    const customMessage = 'This is a custom message'

    test('valid', () => {
        expect(present('', { data: { test: null }, field: 'test' }))
            .toBe(true)
    })

    test('invalid', () => {
        expect(present('', { data: { test: null }, field: 'check' }))
            .toBe(parseMessage(defaultMessage, { $field: 'check' }))
        expect(present('', { data: { test: null }, field: 'check', message: customMessage }))
            .toBe(customMessage)
        expect(present('', { data: { test: null }, field: 'check', message: false }))
            .toBe(false)
    })
})