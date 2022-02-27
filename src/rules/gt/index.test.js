import gt from "."
import { gt as defaultMessage } from "../../messages"
import { parseMessage } from "../../utils"

describe('gt', () => {
    const customMessage = 'This is a custom message'
    const params = ['other']

    test('valid', () => {
        expect(gt(23, { data: { other: 18 }, params }))
            .toBe(true)
        expect(gt('49', { data: { other: 33 }, params }))
            .toBe(true)
        expect(gt(123.23, { data: { other: 123.22 }, params }))
            .toBe(true)
        expect(gt('def', { data: { other: 'abc' }, params }))
            .toBe(true)
    })

    test('invalid', () => {
        expect(gt(23, { data: { other: 23 }, params }))
            .toBe(parseMessage(defaultMessage, { $otherfieldValue: 23 }))
        expect(gt('19', { data: { other: '29' }, message: customMessage, params }))
            .toBe(customMessage)
        expect(gt('abc', { data: { other: 'def' }, message: false, params }))
            .toBe(false)
    })
})