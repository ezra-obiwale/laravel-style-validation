import { arrayToObject, chooseMessage, eachInPath, getObjectPathValue, isEmpty, isObject, parseMessage, regexFromString, toStudly } from "../src/utils"

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

    test('eachInPath', () => {
        const data1 = {
            arr1: [
                {
                    key1: {
                        arr2: [3, 5, 11]
                    }
                },
                {
                    key1: {
                        arr2: [5, 3, 6, 9]
                    }
                }
            ]
        }

        const generator = eachInPath(data1, 'arr1.*.key1.arr2.*')

        expect(generator.next().value).toBe(3)
        expect(generator.next().value).toBe(5)
        expect(generator.next().value).toBe(11)
        expect(generator.next().value).toBe(5)
        expect(generator.next().value).toBe(3)
        expect(generator.next().value).toBe(6)
        expect(generator.next().value).toBe(9)
        expect(generator.next().value).toBe(undefined)
        // expect(() => eachInPath(data1, 'arr1.*.*.key1.arr2.*').next())
        //     .toThrowError('arr1.* must be an array')

        // expect(() => eachInPath(data1, 'arr2.*.*.key1.arr2.*'))
        //     .toThrowError('arr2 is not an array')

        const data2 = {
            arr1: [
                [
                    {
                        key1: {
                            arr2: [3, 5, 11]
                        }
                    },
                    {
                        key1: {
                            arr2: [5, 3, 6, 9]
                        }
                    }
                ],
                [
                    {
                        key1: {
                            arr2: [1, 5, 3, 32]
                        }
                    },
                    {
                        key1: {
                            arr2: [9, 3, 7, 2, 1]
                        }
                    }
                ]
            ]
        }

        const generator2 = eachInPath(data2, 'arr1.*.*.key1.arr2.*')

        expect(generator2.next().value).toBe(3)
        expect(generator2.next().value).toBe(5)
        expect(generator2.next().value).toBe(11)
        expect(generator2.next().value).toBe(5)
        expect(generator2.next().value).toBe(3)
        expect(generator2.next().value).toBe(6)
        expect(generator2.next().value).toBe(9)
        expect(generator2.next().value).toBe(1)
        expect(generator2.next().value).toBe(5)
        expect(generator2.next().value).toBe(3)
        expect(generator2.next().value).toBe(32)
        expect(generator2.next().value).toBe(9)
        expect(generator2.next().value).toBe(3)
        expect(generator2.next().value).toBe(7)
        expect(generator2.next().value).toBe(2)
        expect(generator2.next().value).toBe(1)
        expect(generator2.next().value).toBe(undefined)
    })

    test('getObjectPathValue', () => {
        const obj = { one: { two: { three: 3 } }, four: 4 }

        expect(getObjectPathValue(obj, 'one.two.three'))
            .toBe(3)

        expect(getObjectPathValue(obj, 'four'))
            .toBe(4)

        const arrObj = { one: [{ two: [{ three: 3 }] }] }

        expect(getObjectPathValue(arrObj, 'one.0.two.0.three'))
            .toBe(3)

        expect(() => getObjectPathValue(arrObj, 'one.0.three.0.three'))
            .toThrowError('one.0.three is not an object or array')

        expect(() => getObjectPathValue(arrObj, 'one.1.three.0.three'))
            .toThrowError('one.1 is not an object or array')

        expect(() => getObjectPathValue(arrObj, 'one.1.three.0.three'))
            .toThrowError('one.1 is not an object or array')
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