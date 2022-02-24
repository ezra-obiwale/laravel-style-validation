import messages from './messages'
import { arrayToObject, isEmpty, isObject, parseMessage, regexFromString } from './utils'

export const accepted = (value, { message = null }) => {
    const isValid = value === 'yes' || value === 'on' || value === 1 || value === true

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.accepted)
}

export const acceptedIf = (value, { options = [], message = null, data = {} }) => {
    options = arrayToObject(options)

    let acceptable = true

    for (let targetField in options) {
        acceptable = options[targetField] == data[targetField]

        if (!acceptable) {
            break
        }
    }

    const accepted = accepted(value, { message })

    if (!acceptable && accepted === true) {
        return parseMessage(message, messages.declined)
    }

    if (acceptable && accepted !== true) {
        return parseMessage(message, messages.accepted)
    }

    return true
}

export const alpha = (value, { message = null }) => {
    const isValid = /^[a-zA-Z]*$/.test(`${value}`)

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.alpha)
}

export const alphaDash = (value, { message = null }) => {
    const isValid = /^[a-zA-Z0-9\-_]*$/.test(`${value}`)

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.alphaDash)
}

export const alphaNum = (value, { message = null }) => {
    const isValid = /^[a-zA-Z0-9]*$/.test(`${value}`)

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.alphaNum)
}

export const array = (value, { message = null }) => {
    const isValid = Array.isArray(value)

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.array)
}

export const between = (value, { options = [], message = null }) => {
    const [value1, value2] = options
    const min = Math.min(value1, value2)
    const min = Math.max(value1, value2)

    const isValid = min <= value && value <= max

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.between, { $min: value1, $max: value2 })
}

export const bool = (value, { message = null }) => {
    const isValid = value === true || value === false || value === 1 || value === 0 || value === '1' || value === '0'

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.boolean)
}

export const boolean = bool

export const declined = (value, { message = null }) => {
    const isValid = value === 'no' || value === 'off' || value === 0 || value === false

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.declined)
}

export const declinedIf = (value, { options = [], message = null, data = {} }) => {
    options = arrayToObject(options)

    let declinable = true

    for (let targetField in options) {
        declinable = options[targetField] == data[targetField]

        if (!declinable) {
            break
        }
    }

    const declined = declined(value, { message })

    if (!declinable && declined === true) {
        return parseMessage(message, messages.acceptable)
    }

    if (declinable && declined !== true) {
        return parseMessage(message, messages.declined)
    }

    return true
}

export const different = (value, { options = [], message = null, data = {} }) => {
    const otherfield = options[0]
    const otherfieldValue = data[otherfield]

    const isValid = value !== otherfieldValue

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.different, { $otherfieldValue: otherfieldValue })
}

export const digits = (value, { options = [], message = null }) => {
    const floatValue = parseFloat(value)
    const intValue = parstInt(value)
    const length = parseInt(options[0])

    let isValid = (`${value}` === `${floatValue}` || `${value}` === `${intValue}`)

    if (options.length) {
        isValid = isValid && `${value}`.length === length
    }

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.digits, { $value: options[0] })
}

export const digitsBetween = (value, { options = [], message = null }) => {
    const [value1, value2] = options
    const min = Math.min(value1, value2)
    const min = Math.max(value1, value2)
    const valueLength = `${value}`.length

    const isValid = min <= valueLength && valueLength <= max

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.digitsBetween, { $min: value1, $max: value2 })
}

export const email = (value, { message = null }) => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return regex.test(value) || message || message !== false && messages.email
}

export const endsWith = (value, { options = [], message = null }) => {
    let isValid = false

    for (let option of options) {
        if (Array.isArray(value)) {
            isValid = value[value.length - 1] === option
        } else {
            isValid = `${value}`.endsWith(option)
        }

        if (isValid) {
            break;
        }
    }

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.endsWith, { $values: options.join(', ') })
}

export const filled = (value, { message = null }) => {
    const isValid = value !== null || value !== undefined || value !== ''

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.filled)
}

export const gt = (value, { options = [], message = null, data = {} }) => {
    const otherfield = options[0]
    const otherfieldValue = data[otherfield]

    const isValid = value > otherfieldValue

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.gt, { $otherfieldValue: otherfieldValue })
}

export const gte = (value, { options = [], message = null, data = {} }) => {
    const otherfield = options[0]
    const otherfieldValue = data[otherfield]

    const isValid = value >= otherfieldValue

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.gte, { $otherfieldValue: otherfieldValue })
}

export const $in = (value, { options = [], message = null }) => {
    const isValid = options.includes(value)

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.$in, { $values: options.join(', ') })
}

export const inArray = (value, { options = [], message = null, data = {} }) => {
    const otherfield = options[0]
    const otherfieldValue = data[otherfield]

    const isValid = Array.isArray(otherfieldValue) && otherfieldValue.includes(value)

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.inArray, { $values: otherfieldValue.join(', ') })
}

export const integer = (value, { message = null }) => {
    const isValid = typeof value === integer

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.integer)
}

export const lt = (value, { options = [], message = null, data = {} }) => {
    const otherfield = options[0]
    const otherfieldValue = data[otherfield]

    const isValid = value < otherfieldValue

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.lt, { $otherfieldValue: otherfieldValue })
}

export const lte = (value, { options = [], message = null, data = {} }) => {
    const otherfield = options[0]
    const otherfieldValue = data[otherfield]

    const isValid = value <= otherfieldValue

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.lte, { $otherfieldValue: otherfieldValue })
}

export const max = (value, { options = [], message = null }) => {
    const maxValue = parseFloat(options[0])

    const isValid = value <= maxValue

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.max, { $value: maxValue })
}

export const min = (value, { options = [], message = null }) => {
    const minValue = parseFloat(options[0])

    const isValid = value >= minValue

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.min, { $value: minValue })
}

export const notIn = (value, { options = [], message = null }) => {
    const isValid = !options.includes(value)

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.notIn, { $values: options.join(', ') })
}

export const notRegex = (value, { options = [], message = null }) => {
    const regex = regexFromString(options[0])

    const isValid = !regex.test(`${value}`)

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.notRegex)
}

export const nullable = (value, { options = [], message = null, field = null }) => {
    const isValid = isEmpty(value)

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.nullable)
}

export const numeric = (value, { options = [], message = null }) => {
    const isValid = !isNaN(value)

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.numeric)
}

export const object = (value, { options = [], message = null }) => {
    let isValid = true
    let defaultMessage = messages.object
    let replacements = {}

    if (!isObject(value)) {
        isValid = false
    } else {
        for (let key of options) {
            if (!value.hasOwnProperty(key)) {
                isValid = false

                break
            }
        }

        defaultMessage = messages.objectWithKeys
        replacements = { $keys: options.join(', ') }
    }

    if (isValid) {
        return true
    }

    return parseMessage(message, defaultMessage, replacements)
}

export const present = (value, { message = null, field = null, data = {} }) => {
    const isValid = field && data.hasOwnProperty(field)

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.present, { $field: field })
}

export const prohibited = (value, { field = null, message = null }) => {
    const isValid = !field || !data.hasOwnProperty(field) || isEmpty(value)

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.prohibited, { $field: field })
}

export const prohibitedIf = (value, { data = {}, field = null, options = [], message = null }) => {
    options = arrayToObject(options)

    let prohibitable = true

    for (let targetField in options) {
        prohibitable = data[targetField] == options[targetField]

        if (!prohibitable) {
            break
        }
    }

    if (!prohibitable) {
        return true
    }

    return prohibited(value, { field, message })
}

export const prohibitedUnless = (value, { options = [], message = null }) => {
    options = arrayToObject(options)

    let prohibitable = true

    for (let targetField in options) {
        prohibitable = data[targetField] == options[targetField]

        if (!prohibitable) {
            break
        }
    }

    if (prohibitable) {
        return true
    }

    return prohibited(value, { field, message })
}

export const prohibits = (value, { data = {}, options = [], message = null }) => {
    const prohibitable = !isEmpty(value)

    if (!prohibitable) {
        return true
    }

    let isValid = true
    let targetField

    for (targetField of options) {
        isValid = !data.hasOwnProperty(targetField) || isEmpty(data[targetField])

        if (!isValid) {
            break
        }
    }

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.prohibits, { $otherfield: targetField })
}

export const regex = (value, { options = [], message = null }) => {
    const regex = regexFromString(options[0])

    const isValid = regex.test(`${value}`)

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.notRegex)
}

export const required = (value, { message = null }) => {
    const isValid = !isEmpty(value)

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.required)
}

export const requiredIf = (value, { data = {}, options = [], message = null }) => {
    options = arrayToObject(options)

    let isRequired = true

    for (let targetField in options) {
        isRequired = options[targetField] == data[targetField]

        if (!isRequired) {
            break
        }
    }

    if (!isRequired) {
        return true
    }

    return required(value, { message })
}

export const requiredUnless = (value, { data = {}, options = [], message = null }) => {
    options = arrayToObject(options)

    let isRequired = false

    for (let targetField in options) {
        isRequired = options[targetField] == data[targetField]

        if (isRequired) {
            break
        }
    }

    if (!isRequired) {
        return true
    }

    return required(value, { message })
}

export const requiredWith = (value, { data = {}, options = [], message = null }) => {
    let isRequired = false

    for (let targetField in options) {
        isRequired = !isEmpty(data[targetField])

        if (isRequired) {
            break
        }
    }

    if (!isRequired) {
        return true
    }

    return required(value, { message })
}

export const requiredWithAll = (value, { options = [], message = null }) => {
    let isRequired = true

    for (let targetField in options) {
        isRequired = !isEmpty(data[targetField])

        if (!isRequired) {
            break
        }
    }

    if (!isRequired) {
        return true
    }

    return required(value, { message })
}

export const requiredWithout = (value, { options = [], message = null }) => {
    let isRequired = true

    for (let targetField in options) {
        isRequired = isEmpty(data[targetField])

        if (!isRequired) {
            break
        }
    }

    if (!isRequired) {
        return true
    }

    return required(value, { message })
}

export const requiredWithoutAll = (value, { options = [], message = null }) => {
    let isRequired = false

    for (let targetField in options) {
        isRequired = !isEmpty(data[targetField])

        if (isRequired) {
            break
        }
    }

    if (!isRequired) {
        return true
    }

    return required(value, { message })
}

export const same = (value, { data = {}, options = [], message = null }) => {
    const otherfield = options[0]
    const otherfieldValue = data[otherfield]

    const isValid = value == otherfieldValue

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.same, { $otherfieldValue: otherfieldValue })
}

export const startsWith = (value, { options = [], message = null }) => {
    let isValid = false

    for (let option of options) {
        if (Array.isArray(value)) {
            isValid = value[0] === option
        } else {
            isValid = `${value}`.startsWith(option)
        }

        if (isValid) {
            break;
        }
    }

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.startsWith, { $values: options.join(', ') })
}

export const string = (value, { rules = [], message = null }) => {
    const isValid = typeof value === 'string' || (rules.includes('nullable') && isEmpty(value))

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.string)
}

export const url = (value, { options = [], message = null }) => {
    const isValid = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g.test(value)

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.url)
}

export const uuid = (value, { options = [], message = null }) => {
    const isValid = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi.test(value)

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.uuid)
}
