import { accepted as defaultMessage } from '../messages'
import { parseMessage } from '../utils'

const accepted = (value, options = {}) => {
    const { message } = options
    const validValues = ['yes', 'on', 1, true]
    const isValid = validValues.includes(value)

    if (isValid) {
        return true
    }

    return parseMessage(message, defaultMessage)
}

export default accepted

export const tests = (customMessage) => {
    test('accepted: valid', () => {
        expect(accepted('yes'))
            .toBe(true)
        expect(accepted('on'))
            .toBe(true)
        expect(accepted(1))
            .toBe(true)
        expect(accepted(true))
            .toBe(true)
    })

    test('accepted: invalid', () => {
        expect(accepted('something else'))
            .toBe(defaultMessage)
        expect(accepted('something else', { message: customMessage }))
            .toBe(customMessage)
        expect(accepted('something else', { message: false }))
            .toBe(false)
    })
}