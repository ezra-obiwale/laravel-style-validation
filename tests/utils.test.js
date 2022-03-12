import { arrayToObject, chooseMessage, isEmpty, isObject, parseMessage, regexFromString, toStudly } from "../src/utils"

describe('utils', () => {
    test('arrayToObject', () => {
        expect(arrayToObject(['username', 'jane.doe', 'password', '@random']))
            .toStrictEqual({ username: 'jane.doe', password: '@random' })
        expect(arrayToObject('something else'))
            .toStrictEqual({})
    })

    test('chooseMessage', () => {
        const defaultMessage = 'This is the default message with $1 and $2'
        const messageParser = () => defaultMessage

        expect(chooseMessage(undefined, defaultMessage, { $1: 'one', $2: 'two' }))
            .toBe('This is the default message with one and two')
        expect(chooseMessage(true, defaultMessage, { $1: 'one', $2: 'two' }))
            .toBe('This is the default message with one and two')
        expect(chooseMessage('Only the custom message with $1 and $2', defaultMessage, { $1: 'one', $2: 'two' }))
            .toBe('Only the custom message with one and two')
        expect(chooseMessage('Nothing to do', 'Another message', {}, messageParser))
            .toBe(defaultMessage)
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

    test('isObject', () => {
        expect(isObject(''))
            .toBe(false)
        expect(isObject(undefined))
            .toBe(false)
        expect(isObject(null))
            .toBe(false)
        expect(isObject(0))
            .toBe(false)
        expect(isObject(false))
            .toBe(false)
        expect(isObject([]))
            .toBe(false)
        expect(isObject({}))
            .toBe(true)
    })

    test('toStudly', () => {
        expect(toStudly('abcDefGhi'))
            .toBe('abcDefGhi')
        expect(toStudly('AbcDefGhi'))
            .toBe('abcDefGhi')
        expect(toStudly('abc_def_ghi'))
            .toBe('abcDefGhi')
        expect(toStudly('abc-def-ghi'))
            .toBe('abcDefGhi')
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