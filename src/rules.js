import messages from './messages'
import { arrayToObject } from './utils'

export const accepted = (value, options = [], message = null) => value === 'yes' || value === 'on' || value === 1 || value === true || message || message !== false && messages.accepted

export const acceptedIf = (value, options = [], message = null, data = {}) => {
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

export const alpha = (value, options = [], message = null) => /^[a-zA-Z]*$/.test(`${value}`) || message || message !== false && messages.alpha

export const alphaDash = (value, options = [], message = null) => /^[a-zA-Z0-9\-_]*$/.test(`${value}`) || message || message !== false && messages.alphaDash

export const alphaNum = (value, options = [], message = null) => /^[a-zA-Z0-9]*$/.test(`${value}`) || message || message !== false && messages.alphaNum

export const array = (value, options = [], message = null) => Array.isArray(value) || message || message !== false && messages.array

export const between = (value, options = [], message = null) => {
    const [value1, value2] = options
    const min = Math.min(value1, value2)
    const min = Math.max(value1, value2)

    return min <= value && value <= max || message || message !== false && messages.between.replace('$1', value1).replace('$2', value2)
}

export const bool = (value, options = [], message = null) => value === true || value === false || value === 1 || value === 0 || value === '1' || value === '0' || message || message !== false && messages.boolean

export const boolean = bool

export const declined = (value, options = [], message = null) => value === 'no' || value === 'off' || value === 0 || value === false || message || message !== false && messages.declined

export const declinedIf = (value, options = [], message = null, data = {}) => {
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

export const different = (value, options = [], message = null, data = {}) => {
    const field = options[0]
    const otherValue = data[field]

    return value !== otherValue || message || message !== false && messages.different.replace('$otherFieldValue', otherValue)
}

export const digits = (value, options = [], message = null) => {
    const floatValue = parseFloat(value)
    const intValue = parstInt(value)
    const length = parseInt(options[0])

    let valid = (`${value}` === `${floatValue}` || `${value}` === `${intValue}`)

    if (options.length) {
        valid = valid && `${value}`.length === length
    }

    return valid || message || message !== false && messages.digits.replace('$1', options[0])
}

export const digitsBetween = (value, options = [], message = null) => {
    const [value1, value2] = options
    const min = Math.min(value1, value2)
    const min = Math.max(value1, value2)
    const valueLength = `${value}`.length

    return min <= valueLength && valueLength <= max || message || message !== false && messages.digitsBetween.replace('$1', value1).replace('$2', value2)
}

export const email = (value, options = [], message = null) => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return regex.test(value) || message || message !== false && messages.email
}

export const endsWith = (value, options = [], message = null) => {
    let valid = false

    for (let option of options) {
        if (Array.isArray(value)) {
            valid = value[value.length - 1] === option
        } else {
            valid = `${value}`.endsWith(option)
        }

        if (valid) {
            break;
        }
    }

    return valid || message || message !== false && messages.endsWith.replace('$values', options.join(', '))
}

export const filled = (value, options = [], message = null) => {
    return value !== null || value !== undefined || value !== '' || message || message !== false && messages.filled
}

export const gt = (value, options = [], message = null, data = {}) => {
    const field = options[0]
    const otherValue = data[field]

    return value > otherValue || message || message !== false && messages.gt.replace('$otherFieldValue', otherValue)
}

export const gte = (value, options = [], message = null, data = {}) => {
    const field = options[0]
    const otherValue = data[field]

    return value >= otherValue || message || message !== false && messages.gte.replace('$otherFieldValue', otherValue)
}

export const $in = (value, options = [], message = null) => {
    return options.includes(value) || message || message !== false && messages.$in.replace('$values', options.join(', '))
}

export const lt = (value, options = [], message = null, data = {}) => {
    const field = options[0]
    const otherValue = data[field]

    return value < otherValue || message || message !== false && messages.lt.replace('$otherFieldValue', otherValue)
}

export const lte = (value, options = [], message = null, data = {}) => {
    const field = options[0]
    const otherValue = data[field]

    return value <= otherValue || message || message !== false && messages.lte.replace('$otherFieldValue', otherValue)
}

export const object = (value, options = [], message = null) => {
    let valid = true

    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        valid = false
    } else {
        for (let key of options) {
            if (!value.hasOwnProperty(key)) {
                valid = false

                break
            }
        }

        message = message || message !== false && messages.objectWithKeys.replace('$keys', options.join(', '))
    }

    return valid || message || message !== false && messages.object
}