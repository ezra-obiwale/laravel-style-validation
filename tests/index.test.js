import { customRule, validate, validateData, setMessageParser, resetMessageParser } from "../src";
import { alpha as alphaMessage, numeric as numericMessage, same as sameMessage, required as requiredMessage } from "../src/messages";
import { chooseMessage, parseMessage } from "../src/utils";

describe('public methods', () => {
    describe('setMessageParser', () => {
        const messageParser = jest.fn();

        setMessageParser(messageParser);

        validate(null, 'required');

        expect(messageParser.mock.calls.length)
            .toBe(1);

        expect(() => setMessageParser(null))
            .toThrowError('Parameter must be a function');
    });

    describe('resetMessageParser', () => {
        setMessageParser(() => { });
        resetMessageParser();

        expect(validate(null, 'required'))
            .toBe(requiredMessage);
    });

    const data = {
        username: 'janedoe123',
        password: '@random',
        firstName: '',
        ids: [1, 2, 3, 4],
        terms: true,
        policy: false
    };
    const rules1 = {
        username: 'required|string|alpha_num',
        password: 'required|string',
        firstName: 'required|string',
        ids: 'required|array',
        'ids.*': 'required|numeric',
        terms: 'required|boolean'
    };
    const rules2 = {
        username: ['required', 'string', 'alpha_num'],
        password: ['required', 'string'],
        firstName: ['required', 'string'],
        ids: ['required', 'array'],
        'ids.*': ['required', 'numeric'],
        terms: ['required', 'boolean']
    };
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
    };

    const failRules = {
        username: 'required|string|alpha',
        password: 'required|numeric',
        firstName: 'required|same:password',
        'ids.*': 'required|alpha',
        terms: 'required|same:password'
    };
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
    };

    describe('validate', () => {
        test('valid', () => {
            expect(validate(data.username, rules1.username, {}, data, 'username'))
                .toBe(true);
            expect(validate(data.username, rules2.username, messages.username, data, 'username'))
                .toBe(true);
            expect(validate(data.password, rules1.password, false, data, 'password'))
                .toBe(true);
            expect(validate(data.password, rules2.password, { ...messages.username, required: false }, data, 'password'))
                .toBe(true);
            expect(validate(data.password, 'sometimes|string'))
                .toBe(true);
            expect(validate(undefined, 'sometimes|string'))
                .toBe(true);
        });

        test('invalid', () => {
            expect(validate(data.firstName, rules1.firstName))
                .toBe(requiredMessage);
            expect(validate(data.username, failRules.username, {}, data, 'username'))
                .toBe(alphaMessage);
            expect(validate(data.password, failRules.password, 'This is just wrong', data, 'password'))
                .toBe('This is just wrong');
            expect(validate(data.terms, failRules.terms, false, data, 'terms'))
                .toBe(false);
            expect(() => validate(null, {}))
                .toThrowError('Second parameter must a string of rules');
            expect(() => validate(null, [], false, null))
                .toThrowError('Fourth parameter must be a data object of field to value');
        });
    });

    describe('validateData', () => {
        test('valid', () => {
            expect(validateData(data, rules1))
                .toEqual(
                    expect.objectContaining({
                        username: true,
                        password: true,
                        ids: true,
                        'ids.*': true,
                        terms: true
                    })
                );
            expect(validateData(data, rules2, false))
                .toEqual(
                    expect.objectContaining({
                        username: true,
                        password: true,
                        ids: true,
                        'ids.*': true,
                        terms: true
                    })
                );

            expect(validateData(
                { testing: true },
                {
                    testing: 'sometimes|boolean',
                    debugging: 'sometimes|boolean',
                }
            ))
                .toEqual(
                    expect.objectContaining({
                        testing: true,
                        debugging: true
                    })
                );
        });

        test('invalid', () => {
            expect(validateData(data, failRules))
                .toEqual(
                    expect.objectContaining({
                        username: alphaMessage,
                        password: numericMessage,
                        terms: parseMessage(sameMessage, { $otherfieldValue: data.password })
                    })
                );
            expect(validateData(data, failRules))
                .toEqual(
                    expect.objectContaining({
                        username: alphaMessage,
                        password: numericMessage,
                        terms: parseMessage(sameMessage, { $otherfieldValue: data.password })
                    })
                );
            expect(validateData(data, failRules, { ...failMessages, password: false }))
                .toEqual(
                    expect.objectContaining({
                        username: failMessages.username.alpha,
                        password: false,
                        terms: failMessages.terms.same
                    })
                );

            expect(() => validateData(null, null))
                .toThrowError('First parameter must be a data object of field to value');
            expect(() => validateData({}, null))
                .toThrowError('Second parameter must be a rules object of field to rules string');
        });
    });

    describe('customRule', () => {
        const defaultMessage = 'Value must be "testing"';

        customRule('just_testing', (value, options = {}) => {
            if (value === 'testing') {
                return true;
            }

            return chooseMessage(options.message, defaultMessage);
        });

        expect(validate('testing', 'required|just_testing'))
            .toBe(true);
        expect(validate('tester', 'required|just_testing'))
            .toBe(defaultMessage);
        expect(validate('trial', 'required|just_testing', 'My message'))
            .toBe('My message');
        expect(validate('trial', 'required|just_testing', false))
            .toBe(false);

        expect(() => customRule('just_testing'))
            .toThrowError('Custom rule "just_testing" already exists');
        expect(customRule('just_testing', () => true, true))
            .toBeUndefined();

        expect(() => customRule('required'))
            .toThrowError('In-built rule "required" already exists');
        expect(() => customRule('in', () => true))
            .toThrowError('In-built rule "in" already exists');

        expect(() => customRule('random'))
            .toThrowError('Second parameter must be a function');

    });
});