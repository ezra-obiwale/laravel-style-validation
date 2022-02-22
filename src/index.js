import * as availableRules from './rules'

export const asArray = (rule) => rule.split('|').map(ruleGroup => {
    const [name, options = ''] = ruleGroup.split(':')

    if (!availableRules.hasOwnProperty(name)) {
        throw new Error(`Validation rule "${name}" does not exist.`)
    }

    const optionsArray = options.split(',')

    return value => availableRules[name](value, optionsArray)
})

export const rules = (fieldRules) => {
    const arrayFieldRules = {}

    for (let field in fieldRules) {
        arrayFieldRules[field] = asArray(fieldRules)
    }

    return arrayFieldRules
}

export const validateData = (data, rules) => {
    const result = {}

    for (let field in data) {
        let fieldRules = rules[field]

        if (!fieldRules) {
            continue
        }

        if (!Array.isArray(fieldRules)) {
            fieldRules = asArray(fieldRules)
        }

        result[field] = validate(data[field], fieldRules)
    }
}

export const validate = (value, fieldRules) => {
    const disposableFieldRules = [...fieldRules]

    let valid = true

    while (valid && disposableFieldRules.length) {
        const currentRule = disposableFieldRules.shift()

        valid = currentRule(value)
    }

    return valid
}
