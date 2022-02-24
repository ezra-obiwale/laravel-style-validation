import * as availableRules from './rules'

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

export const asArray = (rules, messages = {}, data = {}) => rules.split('|').map(ruleGroup => {
    const [name] = ruleGroup.split(':')

    return asFunction(ruleGroup, messages[name], data)
})

export const asFunction = (ruleGroup, message, data) => {
    const [name, options = ''] = ruleGroup.split(':')
    const ruleFunc = getRuleFunction(name)
    const optionsArray = options.split(',')

    return value => ruleFunc(value, optionsArray, message, data)
}

export const customRule = (name, func) => {
    if (typeof func !== 'function') {
        throw new Error('Second parameter must be a function')
    }

    customRules[name] = func
}

export const rulesAsArray = (rules, messages = {}, data = {}) => {
    const arrayFieldRules = {}

    for (let field in fieldRules) {
        arrayFieldRules[field] = asArray(fieldRules, messages[field] || {}, data)
    }

    return arrayFieldRules
}

export const validateData = (data, rules, messages = {}) => {
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

        result[field] = validate(data[field], fieldRules, fieldMessages, data)
    }

    return result
}

export const validate = (value, rules, messages, data) => {
    if (typeof rules === 'string') {
        throw new Error('Invalid rules')
    }

    const disposableFieldRules = asArray(rules, data, messages)
    let valid = true

    while (valid && disposableFieldRules.length) {
        const currentRule = disposableFieldRules.shift()

        valid = currentRule(value)
    }

    return valid
}
