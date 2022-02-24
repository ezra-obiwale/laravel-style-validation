import * as availableRules from './rules'
import { isObject } from './utils'

const customRules = {}

const getRuleFunction = (name) => {
    const studlyName = toStudly(name)

    if (availableRules.hasOwnProperty(studlyName)) {
        return availableRules[studlyName]
    }

    const otherStudlyName = `$${studlyName}`

    if (availableRules.hasOwnProperty(otherStudlyName)) {
        return availableRules[otherStudlyName]
    }

    if (customRules.hasOwnProperty(name)) {
        return customRules[name]
    }

    throw new Error(`Validation rule "${name}" does not exist.`)
}

const toStudly = (str) => str.replace(/(_|-)+[a-z]/gi, chr => chr[1].toUpperCase())

export const asArray = (rules, messages = {}, data = {}, field = null) => {
    if (typeof rules !== 'string') {
        throw new Error('First parameter must be a string of rules')
    }

    if (!isObject(data)) {
        throw new Error('Third parameter must be a data object of field to value')
    }

    rules.split('|').map(ruleGroup => {
        const [name] = ruleGroup.split(':')

        return asFunction(ruleGroup, messages[name], data, field)
    })
}

export const asFunction = (ruleGroup, message, data = {}, field = null) => {
    if (typeof ruleGroup !== 'string') {
        throw new Error('First parameter must be a string with pattern rule:comma,separated,options')
    }

    if (!isObject(data)) {
        throw new Error('Third parameter must be a data object of field to value')
    }

    const [name, options = ''] = ruleGroup.split(':')
    const ruleFunc = getRuleFunction(name)
    const optionsArray = options.split(',')

    return value => ruleFunc(value, { data, field, message, options: optionsArray })
}

export const customRule = (name, func) => {
    if (typeof func !== 'function') {
        throw new Error('Second parameter must be a function')
    }

    customRules[name] = func
}

export const rulesAsArray = (rules, messages = {}, data = {}) => {
    if (!isObject(rules)) {
        throw new Error('First parameter must be a rules object of field to rules string')
    }

    if (!isObject(data)) {
        throw new Error('Third parameter must be a data object of field to value')
    }

    const arrayRules = {}

    for (let field in rules) {
        arrayRules[field] = asArray(rules, messages[field] || {}, data, field)
    }

    return arrayRules
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

export const validate = (value, rules, messages = {}, data = {}, field = null) => {
    if (typeof rules !== 'string') {
        throw new Error('Second parameter must a string of rules')
    }

    if (!isObject(data)) {
        throw new Error('Fourth parameter must be a data object of field to value')
    }

    const disposableFieldRules = asArray(rules, data, messages, field)
    let valid = true

    while (valid && disposableFieldRules.length) {
        const currentRule = disposableFieldRules.shift()

        valid = currentRule(value)
    }

    return valid
}
