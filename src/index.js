import * as availableRules from './rules'
import { isObject, toStudly } from './utils'

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

export default class {
    #customRules = {}
    #data = {}
    #onErrorCallback = message => message
    #result = {}

    constructor(data) {
        if (!isObject(data)) {
            throw new Error('Parameter must be a data object of field to value')
        }

        this.#data = { ...data }
    }

    addCustomRule (name, func, override = false) {
        if (getAvailableRuleFunction(name)) {
            throw new Error(`In-built rule "${name}" already exists`)
        }

        if (this.#customRules.hasOwnProperty(name) && !override) {
            throw new Error(`Custom rule "${name}" already exists`)
        }

        if (typeof func !== 'function') {
            throw new Error('Second parameter must be a function')
        }

        this.#customRules[name] = func

        return this
    }

    getFunction (ruleGroup, options = {}) {
        if (typeof ruleGroup !== 'string') {
            throw new Error('First parameter must be a string with pattern rule:comma,separated,options')
        }

        if (!isObject(options)) {
            throw new Error('Second parameter must be a object of field to value')
        }

        const [name, params = ''] = ruleGroup.split(':')
        const ruleFunc = getRuleFunction(name)
        const paramsArray = params.split(',').filter(val => !!val.length)

        return value => ruleFunc(value, { ...options, data: this.#data, onError: this.#onErrorCallback, params: paramsArray })
    }

    getFunctions (rules, messages = {}, field = null) {
        if (typeof rules !== 'string' && !Array.isArray(rules)) {
            throw new Error('First parameter must be a string of rules')
        }

        const rulesArray = Array.isArray(rules) ? rules : rules.split('|')
        const ruleNames = [...rulesArray].map(rule => rule.split(':')[0])

        return rulesArray.map(ruleGroup => {
            const [name] = ruleGroup.split(':')
            const message = isObject(messages) ? messages[name] : messages

            return this.getFunction(ruleGroup, { field, message: message, rules: ruleNames })
        })
    }

    onError (callback) {
        if (typeof callback !== 'function') {
            throw new Error('Parameter must be a function')
        }

        this.#onErrorCallback = callback

        return this
    }

    validate (rules, messages = {}) {
        if (!isObject(rules)) {
            throw new Error('First parameter must be a rules object of field to rules string')
        }

        for (let field in this.#data) {
            let fieldRules = rules[field]

            if (!fieldRules) {
                continue
            }

            if (typeof fieldRules !== 'string' && !Array.isArray(fieldRules)) {
                throw new Error(`Value of ${field} in first parameter must a string of rules`)
            }

            let fieldMessages = {}

            if (messages === false) {
                fieldMessages = false
            } else if (messages.hasOwnProperty(field)) {
                fieldMessages = messages[field]
            }

            this.#result[field] = this.#validate(this.#data[field], fieldRules, fieldMessages, field)
        }

        return this.#result
    }

    #validate (value, rules, messages = {}, field = null) {
        const disposableFieldRules = this.getFunctions(rules, messages, field)
        let valid = true

        while (valid && disposableFieldRules.length) {
            const currentRule = disposableFieldRules.shift()

            valid = currentRule(value)
        }

        return valid
    }
}