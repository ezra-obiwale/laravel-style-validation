import gte from "."
import { gte as defaultMessage } from "../../messages"
import { parseMessage } from "../../utils"

describe('gte', () => {
    const customMessage = 'This is a custom message'
    const params = ['other']

    test('valid', () => {
        expect(gte(23, { data: { other: 23 }, params }))
            .toBe(true)
        expect(gte('49', { data: { other: 33 }, params }))
            .toBe(true)
        expect(gte(123.23, { data: { other: 123.22 }, params }))
            .toBe(true)
        expect(gte('def', { data: { other: 'def' }, params }))
            .toBe(true)
    })

    test('invalid', () => {
        expect(gte(23, { data: { other: 23.5 }, params }))
            .toBe(parseMessage(defaultMessage, { $otherfieldValue: 23.5 }))
        expect(gte('19', { data: { other: '29' }, message: customMessage, params }))
            .toBe(customMessage)
        expect(gte('abc', { data: { other: 'def' }, message: false, params }))
            .toBe(false)
    })
})