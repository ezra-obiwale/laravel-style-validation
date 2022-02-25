import messages from './messages'
import { arrayToObject, isEmpty, isObject, parseMessage, regexFromString } from './utils'

export const accepted = (value, { message }) => {
    const isValid = value === 'yes' || value === 'on' || value === 1 || value === true

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.accepted)
}

export const acceptedIf = (value, { data = {}, message = null, params = [] }) => {
    params = arrayToObject(params)

    let acceptable = true

    for (let targetField in params) {
        acceptable = params[targetField] == data[targetField]

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

export const alpha = (value, { message }) => {
    const isValid = /^[a-zA-Z]*$/.test(`${value}`)

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.alpha)
}

export const alphaDash = (value, { message }) => {
    const isValid = /^[a-zA-Z0-9\-_]*$/.test(`${value}`)

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.alphaDash)
}

export const alphaNum = (value, { message }) => {
    const isValid = /^[a-zA-Z0-9]*$/.test(`${value}`)

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.alphaNum)
}

export const array = (value, { message }) => {
    const isValid = Array.isArray(value)

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.array)
}

export const between = (value, { message = null, params = [] }) => {
    const [value1, value2] = params
    const min = Math.min(value1, value2)
    const min = Math.max(value1, value2)

    const isValid = min <= value && value <= max

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.between, { $min: value1, $max: value2 })
}

export const bool = (value, { message }) => {
    const isValid = value === true || value === false || value === 1 || value === 0 || value === '1' || value === '0'

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.boolean)
}

export const boolean = bool

export const declined = (value, { message }) => {
    const isValid = value === 'no' || value === 'off' || value === 0 || value === false

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.declined)
}

export const declinedIf = (value, { data = {}, message = null, params = [] }) => {
    params = arrayToObject(params)

    let declinable = true

    for (let targetField in params) {
        declinable = params[targetField] == data[targetField]

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

export const different = (value, { data = {}, message = null, params = [] }) => {
    const otherfield = params[0]
    const otherfieldValue = data[otherfield]

    const isValid = value !== otherfieldValue

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.different, { $otherfieldValue: otherfieldValue })
}

export const digits = (value, { message = null, params = [] }) => {
    const floatValue = parseFloat(value)
    const intValue = parstInt(value)
    const length = parseInt(params[0])

    let isValid = (`${value}` === `${floatValue}` || `${value}` === `${intValue}`)

    if (params.length) {
        isValid = isValid && `${value}`.length === length
    }

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.digits, { $value: params[0] })
}

export const digitsBetween = (value, { message = null, params = [] }) => {
    const [value1, value2] = params
    const min = Math.min(value1, value2)
    const min = Math.max(value1, value2)
    const valueLength = `${value}`.length

    const isValid = min <= valueLength && valueLength <= max

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.digitsBetween, { $min: value1, $max: value2 })
}

export const email = (value, { message }) => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return regex.test(value) || message || message !== false && messages.email
}

export const endsWith = (value, { message = null, params = [] }) => {
    let isValid = false

    for (let option of params) {
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

    return parseMessage(message, messages.endsWith, { $values: params.join(', ') })
}

export const filled = (value, { message }) => {
    const isValid = value !== null || value !== undefined || value !== ''

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.filled)
}

export const gt = (value, { data = {}, message = null, params = [] }) => {
    const otherfield = params[0]
    const otherfieldValue = data[otherfield]

    const isValid = value > otherfieldValue

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.gt, { $otherfieldValue: otherfieldValue })
}

export const gte = (value, { data = {}, message = null, params = [] }) => {
    const otherfield = params[0]
    const otherfieldValue = data[otherfield]

    const isValid = value >= otherfieldValue

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.gte, { $otherfieldValue: otherfieldValue })
}

export const $in = (value, { message = null, params = [] }) => {
    const isValid = params.includes(value)

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.$in, { $values: params.join(', ') })
}

export const inArray = (value, { data = {}, message = null, params = [] }) => {
    const otherfield = params[0]
    const otherfieldValue = data[otherfield]

    const isValid = Array.isArray(otherfieldValue) && otherfieldValue.includes(value)

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.inArray, { $values: otherfieldValue.join(', ') })
}

export const integer = (value, { message }) => {
    const isValid = typeof value === integer

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.integer)
}

export const lt = (value, { data = {}, message = null, params = [] }) => {
    const otherfield = params[0]
    const otherfieldValue = data[otherfield]

    const isValid = value < otherfieldValue

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.lt, { $otherfieldValue: otherfieldValue })
}

export const lte = (value, { data = {}, message = null, params = [] }) => {
    const otherfield = params[0]
    const otherfieldValue = data[otherfield]

    const isValid = value <= otherfieldValue

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.lte, { $otherfieldValue: otherfieldValue })
}

export const max = (value, { message = null, params = [] }) => {
    const maxValue = parseFloat(params[0])

    const isValid = value <= maxValue

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.max, { $value: maxValue })
}

export const min = (value, { message = null, params = [] }) => {
    const minValue = parseFloat(params[0])

    const isValid = value >= minValue

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.min, { $value: minValue })
}

export const notIn = (value, { message = null, params = [] }) => {
    const isValid = !params.includes(value)

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.notIn, { $values: params.join(', ') })
}

export const notRegex = (value, { message = null, params = [] }) => {
    const regex = regexFromString(params[0])

    const isValid = !regex.test(`${value}`)

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.notRegex)
}

export const nullable = (value, { message }) => {
    const isValid = isEmpty(value)

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.nullable)
}

export const numeric = (value, { message }) => {
    const isValid = !isNaN(value)

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.numeric)
}

export const object = (value, { message = null, params = [] }) => {
    let isValid = true
    let defaultMessage = messages.object
    let replacements = {}

    if (!isObject(value)) {
        isValid = false
    } else {
        for (let key of params) {
            if (!value.hasOwnProperty(key)) {
                isValid = false

                break
            }
        }

        defaultMessage = messages.objectWithKeys
        replacements = { $keys: params.join(', ') }
    }

    if (isValid) {
        return true
    }

    return parseMessage(message, defaultMessage, replacements)
}

export const present = (value, { data = {}, field = null, message = null }) => {
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

export const prohibitedIf = (value, { data = {}, field = null, message = null, params = [] }) => {
    params = arrayToObject(params)

    let prohibitable = true

    for (let targetField in params) {
        prohibitable = data[targetField] == params[targetField]

        if (!prohibitable) {
            break
        }
    }

    if (!prohibitable) {
        return true
    }

    return prohibited(value, { field, message })
}

export const prohibitedUnless = (value, { message = null, params = [] }) => {
    params = arrayToObject(params)

    let prohibitable = true

    for (let targetField in params) {
        prohibitable = data[targetField] == params[targetField]

        if (!prohibitable) {
            break
        }
    }

    if (prohibitable) {
        return true
    }

    return prohibited(value, { field, message })
}

export const prohibits = (value, { data = {}, message = null, params = [] }) => {
    const prohibitable = !isEmpty(value)

    if (!prohibitable) {
        return true
    }

    let isValid = true
    let targetField

    for (targetField of params) {
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

export const regex = (value, { message = null, params = [] }) => {
    const regex = regexFromString(params[0])

    const isValid = regex.test(`${value}`)

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.notRegex)
}

export const required = (value, { message }) => {
    const isValid = !isEmpty(value)

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.required)
}

export const requiredIf = (value, { data = {}, message = null, params = [] }) => {
    params = arrayToObject(params)

    let isRequired = true

    for (let targetField in params) {
        isRequired = params[targetField] == data[targetField]

        if (!isRequired) {
            break
        }
    }

    if (!isRequired) {
        return true
    }

    return required(value, { message })
}

export const requiredUnless = (value, { data = {}, message = null, params = [] }) => {
    params = arrayToObject(params)

    let isRequired = false

    for (let targetField in params) {
        isRequired = params[targetField] == data[targetField]

        if (isRequired) {
            break
        }
    }

    if (!isRequired) {
        return true
    }

    return required(value, { message })
}

export const requiredWith = (value, { data = {}, message = null, params = [] }) => {
    let isRequired = false

    for (let targetField in params) {
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

export const requiredWithAll = (value, { message = null, params = [] }) => {
    let isRequired = true

    for (let targetField in params) {
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

export const requiredWithout = (value, { message = null, params = [] }) => {
    let isRequired = true

    for (let targetField in params) {
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

export const requiredWithoutAll = (value, { message = null, params = [] }) => {
    let isRequired = false

    for (let targetField in params) {
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

export const same = (value, { data = {}, message = null, params = [] }) => {
    const otherfield = params[0]
    const otherfieldValue = data[otherfield]

    const isValid = value == otherfieldValue

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.same, { $otherfieldValue: otherfieldValue })
}

export const startsWith = (value, { message = null, params = [] }) => {
    let isValid = false

    for (let option of params) {
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

    return parseMessage(message, messages.startsWith, { $values: params.join(', ') })
}

export const string = (value, { rules = [], message = null }) => {
    const isValid = typeof value === 'string' || (rules.includes('nullable') && isEmpty(value))

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.string)
}

export const typeOf = (value, { message = null, params = [] }) => {
    const type = params[0]
    const isValid = typeof value === type

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.typeOf, { $type: type })
}

export const url = (value, { message }) => {
    const isValid = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g.test(value)

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.url)
}

export const uuid = (value, { message }) => {
    const isValid = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi.test(value)

    if (isValid) {
        return true
    }

    return parseMessage(message, messages.uuid)
}
