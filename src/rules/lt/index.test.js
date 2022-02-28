import lt from '.'
import { lt as defaultMessage } from '../../messages'
import { parseMessage } from '../../utils'

describe('lt', () => {
    const customMessage = 'This is a custom message'
    const params = ['other']

    test('valid', () => {
        expect(lt(23, { data: { other: 32 }, params }))
            .toBe(true)
        expect(lt('49', { data: { other: 66 }, params }))
            .toBe(true)
        expect(lt(123.23, { data: { other: 123.24 }, params }))
            .toBe(true)
        expect(lt('abc', { data: { other: 'def' }, params }))
            .toBe(true)
    })

    test('invalid', () => {
        expect(lt(23, { data: { other: 23 }, params }))
            .toBe(parseMessage(defaultMessage, { $otherfieldValue: 23 }))
        expect(lt('29', { data: { other: '19' }, message: customMessage, params }))
            .toBe(customMessage)
        expect(lt('def', { data: { other: 'abc' }, message: false, params }))
            .toBe(false)
    })
})