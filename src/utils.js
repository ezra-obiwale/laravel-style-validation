export const arrayToObject = arr => {
    const obj = {}

    if (!Array.isArray(arr)) {
        return obj
    }

    let key = null

    arr.forEach(value => {
        if (!key) {
            key = value
        } else {
            obj[key] = value
            key = null
        }
    })

    return obj
}

export const isEmpty = val => val === undefined || val === null || val === ''

export const isObject = obj => typeof obj === 'object' && !Array.isArray(obj) && obj !== null

export const parseMessage = (customMessage, defaultMessage, replacements = {}) => {
    if (customMessage === false) {
        return false
    }

    if (customMessage === true) {
        customMessage = defaultMessage
    }

    let message = customMessage || defaultMessage

    for (let param in replacements) {
        message = message.replace(param, replacements[param])
    }

    return message
}

export const regexFromString = (str) => {
    if (!str.startsWith('/')) {
        return new RegExp(str)
    }

    const strArr = str.split('')

    strArr.splice(str.lastIndexOf('/'))
    strArr.splice(str.indexOf('/'), 1)

    const newStr = strArr.join('')
    const flags = str.substr(str.lastIndexOf('/') + 1)

    return new RegExp(newStr, flags)
}