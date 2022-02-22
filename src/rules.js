import messages from './messages'
import { arrayToObject } from './utils'

export const accepted = (value, message) => value === 'yes' || value === 'on' || value === 1 || value === true || message || messages.accepted

export const acceptedIf = (value, options, message, data = {}) => {
    options = arrayToObject(options)

    let valid = true

    for (let field in options) {
        valid = options[field] == data[field]

        if (!valid) {
            break
        }
    }

    if (!valid) {
        return true
    }

    return accepted(value, message)
}

export const alpha = (value, message) => /^[a-zA-Z]*$/.test(`${value}`) || message || messages.alpha

export const alphaDash = (value, message) => /^[a-zA-Z0-9\-_]*$/.test(`${value}`) || message || messages.alphaDash

export const alphaNum = (value, message) => /^[a-zA-Z0-9]*$/.test(`${value}`) || message || messages.alphaNum

export const array = (value, message) => Array.isArray(value) || message || messages.array

export const between = (value, options, message) => {
    const [value1, value2] = options
    const min = Math.min(value1, value2)
    const min = Math.max(value1, value2)

    return min <= value && value <= max || message || messages.between.replace('$1', value1).replace('$2', value2)
}

export const bool = (value, message) => value === true || value === false || value === 1 || value === 0 || value === '1' || value === '0' || message || messages.boolean

export const boolean = bool

export const declined = (value, message) => value === 'no' || value === 'off' || value === 0 || value === false || message || messages.declined

export const declinedIf = (value, options, message, data = {}) => {
    options = arrayToObject(options)

    let valid = true

    for (let field in options) {
        valid = options[field] == data[field]

        if (!valid) {
            break
        }
    }

    if (!valid) {
        return true
    }

    return declined(value, message)
}

export const different = (value, options, message, data = {}) => {
    const field = options[0]

    return value !== data[field] || message || messages.different.replace('$1', field)
}

export const digits = (value, options, message) => {
    const floatValue = parseFloat(value)
    const intValue = parstInt(value)
    const length = parseInt(options[0])

    let valid = (`${value}` === `${floatValue}` || `${value}` === `${intValue}`)

    if (options.length) {
        valid = valid && `${value}`.length === length
    }

    return valid || message || messages.digits.replace('$1', options[0])
}

export const object = (value, expectedKeys = [], message) => {
    let valid = true

    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        valid = false
    } else {
        for (const key of expectedKeys) {
            if (!value.hasOwnProperty(key)) {
                valid = false

                break
            }
        }

        message = message || messages.objectWithKeys.replace('$keys', expectedKeys.join(', '))
    }

    return valid || message || messages.object
}