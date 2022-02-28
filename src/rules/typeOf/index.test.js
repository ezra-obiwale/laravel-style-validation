import typeOf from '.'
import { typeOf as defaultMessage } from '../../messages'
import { parseMessage } from '../../utils'

describe('typeOf', () => {
    const customMessage = 'This is a custom message'

    test('valid', () => {
        expect(typeOf({ one: 1 }, { params: ['object'] }))
            .toBe(true)
        expect(typeOf(() => { }, { params: ['function'] }))
            .toBe(true)
        expect(typeOf(123, { params: ['number'] }))
            .toBe(true)
    })

    test('invalid', () => {
        expect(typeOf({ one: 1 }, { params: ['array'] }))
            .toBe(parseMessage(defaultMessage, { $type: 'array' }))
        expect(typeOf(() => { }, { message: customMessage, params: ['string'] }))
            .toBe(customMessage)
        expect(typeOf(123, { message: false, params: ['object'] }))
            .toBe(false)
    })
})