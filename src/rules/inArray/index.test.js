import inArray from '.'
import { inArray as defaultMessage } from '../../messages'
import { parseMessage } from '../../utils'

describe('inArray', () => {
    const customMessage = 'This is a custom message'
    const params = ['other']

    test('valid', () => {
        expect(inArray(34, { data: { other: [34, 33, 32, 31] }, params }))
            .toBe(true)
        expect(inArray('Yes', { data: { other: ['YES', 'yes', 'Yes'] }, params }))
            .toBe(true)
    })

    test('invalid', () => {
        expect(inArray(34, { data: { other: [33.5, 33, 32, 31] }, params }))
            .toBe(parseMessage(defaultMessage, { $values: [33.5, 33, 32, 31].join(', ') }))
        expect(inArray('No', { message: customMessage, data: { other: ['YES', 'yes', 'Yes'] }, params }))
            .toBe(customMessage)
        expect(inArray('Ye', { message: false, data: { other: ['YES', 'yes', 'Yes'] }, params }))
            .toBe(false)
    })
})