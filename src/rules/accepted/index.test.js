import accepted from '.'
import { accepted as defaultMessage } from '../../messages'

const customMessage = 'This is a custom message'

describe('accepted', () => {
    test('valid', () => {
        expect(accepted('yes'))
            .toBe(true)
        expect(accepted('on'))
            .toBe(true)
        expect(accepted(1))
            .toBe(true)
        expect(accepted(true))
            .toBe(true)
    })

    test('invalid', () => {
        expect(accepted('something else'))
            .toBe(defaultMessage)
        expect(accepted('something else', { message: customMessage }))
            .toBe(customMessage)
        expect(accepted('something else', { message: false }))
            .toBe(false)
    })
})