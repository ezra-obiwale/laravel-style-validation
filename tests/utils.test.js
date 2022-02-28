import { arrayToObject, chooseMessage, isEmpty, parseMessage, regexFromString } from "../src/utils"

describe('utils', () => {
    test('arrayToObject', () => {
        expect(arrayToObject(['username', 'jane.doe', 'password', '@random']))
            .toStrictEqual({ username: 'jane.doe', password: '@random' })
        expect(arrayToObject('something else'))
            .toStrictEqual({})
    })

    test('chooseMessage', () => {
        const defaultMessage = 'This is the default message with $1 and $2'

        expect(chooseMessage(undefined, defaultMessage, { $1: 'one', $2: 'two' }))
            .toBe('This is the default message with one and two')
        expect(chooseMessage(true, defaultMessage, { $1: 'one', $2: 'two' }))
            .toBe('This is the default message with one and two')
        expect(chooseMessage('Only the custom message with $1 and $2', defaultMessage, { $1: 'one', $2: 'two' }))
            .toBe('Only the custom message with one and two')
    })

    test('isEmpty', () => {
        expect(isEmpty(''))
            .toBe(true)
        expect(isEmpty(undefined))
            .toBe(true)
        expect(isEmpty(null))
            .toBe(true)
        expect(isEmpty(0))
            .toBe(false)
        expect(isEmpty(false))
            .toBe(false)
    })

    test('regexFromString', () => {
        expect(regexFromString('/[a-zA-Z]/gi'))
            .toStrictEqual(/[a-zA-Z]/gi)
        expect(regexFromString('[a-zA-Z]'))
            .toStrictEqual(/[a-zA-Z]/)
    })

    test('parseMessage', () => {
        expect(parseMessage('Some message with $1 and $two', { $1: 'one', $two: 'two' }))
            .toBe('Some message with one and two')
    })
})