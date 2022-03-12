import { asFunctionArray, asFunction, customRule, rulesAsFunctionArray, validate, validateData, setMessageParser, resetMessageParser } from "../src"
import { alpha as alphaMessage, numeric as numericMessage, same as sameMessage, required as requiredMessage } from "../src/messages"
import { chooseMessage, parseMessage } from "../src/utils"

describe('public methods', () => {
    describe('asFunctionArray', () => {
        test('valid', () => {
            const stringRules = 'required|string|same:confirm_password'
            const arrayRules = ['required', 'string', 'same:confirm_password']

            expect(asFunctionArray(stringRules))
                .toHaveLength(3)
            expect(asFunctionArray(stringRules))
                .toEqual(
                    expect.arrayContaining(
                        [expect.any(Function), expect.any(Function), expect.any(Function)]
                    )
                )

            expect(asFunctionArray(arrayRules))
                .toHaveLength(3)
            expect(asFunctionArray(arrayRules))
                .toEqual(
                    expect.arrayContaining(
                        [expect.any(Function), expect.any(Function), expect.any(Function)]
                    )
                )
        })

        test('invalid', () => {
            expect(() => asFunctionArray('nonExistentRule'))
                .toThrowError('Validation rule "nonExistentRule" does not exist.')

            expect(() => asFunctionArray({}))
                .toThrowError('First parameter must be a string of rules')

            expect(() => asFunctionArray('required', false, null))
                .toThrowError('Third parameter must be a data object of field to value')
        })
    })

    describe('asFunction', () => {
        test('valid', () => {
            expect(asFunction('between:13,31'))
                .toEqual(expect.any(Function))
        })

        test('invalid', () => {
            expect(() => asFunction('nonExistentRule'))
                .toThrowError('Validation rule "nonExistentRule" does not exist.')

            expect(() => asFunction({}))
                .toThrowError('First parameter must be a string with pattern rule:comma,separated,options')

            expect(() => asFunction('required', null))
                .toThrowError('Second parameter must be a data object of field to value')

            expect(() => asFunction('required', { data: null }))
                .toThrowError('options.data must be an object')
        })
    })

    describe('rulesArray', () => {
        test('valid', () => {
            const rules1 = {
                username: 'required|string|alpha_num',
                password: 'required|string'
            }
            const rules2 = {
                username: ['required', 'string', 'alpha_num'],
                password: ['required', 'string']
            }

            expect(rulesAsFunctionArray(rules1))
                .toEqual(
                    expect.objectContaining({
                        username: expect.arrayContaining(
                            [expect.any(Function), expect.any(Function), expect.any(Function)]
                        ),
                        password: expect.arrayContaining(
                            [expect.any(Function), expect.any(Function)]
                        )
                    })

                )

            expect(rulesAsFunctionArray(rules2))
                .toEqual(
                    expect.objectContaining({
                        username: expect.arrayContaining(
                            [expect.any(Function), expect.any(Function), expect.any(Function)]
                        ),
                        password: expect.arrayContaining(
                            [expect.any(Function), expect.any(Function)]
                        )
                    })

                )

        })

        test('invalid', () => {
            expect(() => rulesAsFunctionArray('nonExistentRule'))
                .toThrowError('First parameter must be a rules object: of field to rules string')

            expect(() => rulesAsFunctionArray({}, {}, null))
                .toThrowError('Third parameter must be a data object of field to value')
        })
    })

    describe('setMessageParser', () => {
        const messageParser = jest.fn()

        setMessageParser(messageParser)

        validate(null, 'required')

        expect(messageParser.mock.calls.length)
            .toBe(1)
    })

    describe('resetMessageParser', () => {
        setMessageParser(() => { })
        resetMessageParser()

        expect(validate(null, 'required'))
            .toBe(requiredMessage)
    })

    const data = {
        username: 'janedoe123',
        password: '@random',
        terms: true,
        policy: false
    }
    const rules1 = {
        username: 'required|string|alpha_num',
        password: 'required|string',
        terms: 'required|boolean'
    }
    const rules2 = {
        username: ['required', 'string', 'alpha_num'],
        password: ['required', 'string'],
        terms: ['required', 'boolean']
    }
    const messages = {
        username: {
            required: 'Username is required',
            string: 'Username must be a string',
            alpha_num: 'Username can only contain alphanumeric characters'
        },
        password: {
            required: 'Password is required',
            string: 'Password must be a string'
        },
        terms: {
            boolean: 'You must accept the terms and conditions'
        }
    }

    const failRules = {
        username: 'required|string|alpha',
        password: 'required|numeric',
        terms: 'required|same:password'
    }
    const failMessages = {
        username: {
            alpha: 'Username can only contain alphabet characters'
        },
        password: {
            numeric: 'Password must only be numbers'
        },
        terms: {
            same: 'Terms must be the same as password'
        }
    }

    describe('validate', () => {
        test('valid', () => {
            expect(validate(data.username, rules1.username, {}, data, 'username'))
                .toBe(true)
            expect(validate(data.username, rules2.username, messages.username, data, 'username'))
                .toBe(true)
            expect(validate(data.password, rules1.password, false, data, 'password'))
                .toBe(true)
            expect(validate(data.password, rules2.password, { ...messages.username, required: false }, data, 'password'))
                .toBe(true)
        })

        test('invalid', () => {
            expect(validate(data.username, failRules.username, {}, data, 'username'))
                .toBe(alphaMessage)
            expect(validate(data.password, failRules.password, 'This is just wrong', data, 'password'))
                .toBe('This is just wrong')
            expect(validate(data.terms, failRules.terms, false, data, 'terms'))
                .toBe(false)
            expect(() => validate(null, {}))
                .toThrowError('Second parameter must a string of rules')
            expect(() => validate(null, [], false, null))
                .toThrowError('Fourth parameter must be a data object of field to value')
        })
    })

    describe('validationData', () => {
        test('valid', () => {
            expect(validateData(data, rules1))
                .toEqual(
                    expect.objectContaining({
                        username: true,
                        password: true,
                        terms: true
                    })
                )
            expect(validateData(data, rules2, false))
                .toEqual(
                    expect.objectContaining({
                        username: true,
                        password: true,
                        terms: true
                    })
                )
        })

        test('invalid', () => {
            expect(validateData(data, failRules))
                .toEqual(
                    expect.objectContaining({
                        username: alphaMessage,
                        password: numericMessage,
                        terms: parseMessage(sameMessage, { $otherfieldValue: data.password })
                    })
                )
            expect(validateData(data, failRules))
                .toEqual(
                    expect.objectContaining({
                        username: alphaMessage,
                        password: numericMessage,
                        terms: parseMessage(sameMessage, { $otherfieldValue: data.password })
                    })
                )
            expect(validateData(data, failRules, { ...failMessages, password: false }))
                .toEqual(
                    expect.objectContaining({
                        username: failMessages.username.alpha,
                        password: false,
                        terms: failMessages.terms.same
                    })
                )

            expect(() => validateData(null, null))
                .toThrowError('First parameter must be a data object of field to value')
            expect(() => validateData({}, null))
                .toThrowError('Second parameter must be a rules object of field to rules string')
        })
    })

    describe('customRule', () => {
        const defaultMessage = 'Value must be "testing"'

        customRule('just_testing', (value, options = {}) => {
            if (value === 'testing') {
                return true
            }

            return chooseMessage(options.message, defaultMessage)
        })

        expect(validate('testing', 'required|just_testing'))
            .toBe(true)
        expect(validate('tester', 'required|just_testing'))
            .toBe(defaultMessage)
        expect(validate('trial', 'required|just_testing', 'My message'))
            .toBe('My message')
        expect(validate('trial', 'required|just_testing', false ))
            .toBe(false)

        expect(() => customRule('just_testing'))
            .toThrowError('Custom rule "just_testing" already exists')
        expect(customRule('just_testing', () => true, true))
            .toBeUndefined()

        expect(() => customRule('required'))
            .toThrowError('In-built rule "required" already exists')
        expect(() => customRule('in', () => true))
            .toThrowError('In-built rule "in" already exists')

        expect(() => customRule('random'))
            .toThrowError('Second parameter must be a function')

    })
})