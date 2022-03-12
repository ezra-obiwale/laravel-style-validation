import * as availableRules from './rules'
import { isObject, toStudly } from './utils'

const customRules = {}
let messageParser = null

const getAvailableRuleFunction = (name) => {
    const studlyName = toStudly(name)

    if (availableRules.hasOwnProperty(studlyName)) {
        return availableRules[studlyName]
    }

    const otherStudlyName = `$${studlyName}`

    if (availableRules.hasOwnProperty(otherStudlyName)) {
        return availableRules[otherStudlyName]
    }

    return
}

const getRuleFunction = (name) => {
    const availableRuleFn = getAvailableRuleFunction(name)

    if (availableRuleFn) {
        return availableRuleFn
    }

    if (customRules.hasOwnProperty(name)) {
        return customRules[name]
    }

    throw new Error(`Validation rule "${name}" does not exist.`)
}

export const asFunctionArray = (rules, messages = {}, data = {}, field = null) => {
    if (typeof rules !== 'string' && !Array.isArray(rules)) {
        throw new Error('First parameter must be a string of rules')
    }

    if (!isObject(data)) {
        throw new Error('Third parameter must be a data object of field to value')
    }

    const rulesArray = Array.isArray(rules) ? rules : rules.split('|')
    const ruleNames = [...rulesArray].map(rule => rule.split(':')[0])

    return rulesArray.map(ruleGroup => {
        const [name] = ruleGroup.split(':')
        const message = isObject(messages) ? messages[name] : messages

        return asFunction(ruleGroup, { data, field, message: message, rules: ruleNames })
    })
}

export const asFunction = (ruleGroup, options = {}) => {
    if (typeof ruleGroup !== 'string') {
        throw new Error('First parameter must be a string with pattern rule:comma,separated,options')
    }

    if (!isObject(options)) {
        throw new Error('Second parameter must be a data object of field to value')
    }

    if (options.hasOwnProperty('data') && !isObject(options.data)) {
        throw new Error('options.data must be an object')
    }

    const [name, params = ''] = ruleGroup.split(':')
    const ruleFunc = getRuleFunction(name)
    const paramsArray = params.split(',').filter(val => !!val.length)

    return value => ruleFunc(value, { ...options, messageParser, params: paramsArray })
}

export const customRule = (name, func, override = false) => {
    if (getAvailableRuleFunction(name)) {
        throw new Error(`In-built rule "${name}" already exists`)
    }

    if (customRules.hasOwnProperty(name) && !override) {
        throw new Error(`Custom rule "${name}" already exists`)
    }

    if (typeof func !== 'function') {
        throw new Error('Second parameter must be a function')
    }

    customRules[name] = func
}

export const rulesAsFunctionArray = (rules, messages = {}, data = {}) => {
    if (!isObject(rules)) {
        throw new Error('First parameter must be a rules object: of field to rules string')
    }

    if (!isObject(data)) {
        throw new Error('Third parameter must be a data object of field to value')
    }

    const arrayRules = {}

    for (let field in rules) {
        arrayRules[field] = asFunctionArray(rules[field], (messages && messages[field]) || {}, data, field)
    }

    return arrayRules
}

export const resetMessageParser = () => {
    messageParser = null
}

export const setMessageParser = (func) => {
    if (typeof func !== 'function') {
        throw new Error('Parameter must be a function')
    }

    messageParser = func
}

export const validate = (value, rules, messages = {}, data = {}, field = null) => {
    if (typeof rules !== 'string' && !Array.isArray(rules)) {
        throw new Error('Second parameter must a string of rules')
    }

    if (!isObject(data)) {
        throw new Error('Fourth parameter must be a data object of field to value')
    }

    const disposableFieldRules = asFunctionArray(rules, messages, data, field)
    let valid = true

    while (valid && disposableFieldRules.length) {
        const currentRule = disposableFieldRules.shift()

        valid = currentRule(value)
    }

    return valid
}

export const validateData = (data, rules, messages = {}) => {
    if (!isObject(data)) {
        throw new Error('First parameter must be a data object of field to value')
    }

    if (!isObject(rules)) {
        throw new Error('Second parameter must be a rules object of field to rules string')
    }

    const result = {}

    for (let field in data) {
        let fieldRules = rules[field]

        if (!fieldRules) {
            continue
        }

        let fieldMessages = {}

        if (messages === false) {
            fieldMessages = false
        } else if (messages.hasOwnProperty(field)) {
            fieldMessages = messages[field]
        }

        result[field] = validate(data[field], fieldRules, fieldMessages, data, field)
    }

    return result
}
