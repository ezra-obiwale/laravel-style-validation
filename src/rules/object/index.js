import { object as objectMessage, objectWithKeys as objectWithKeysMessage } from '../../messages'
import { chooseMessage, isObject } from '../../utils'

const object = (value, options = {}) => {
    const { message = null, params = [] } = options
    let isValid = true
    let defaultMessage = objectMessage
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

        defaultMessage = objectWithKeysMessage
        replacements = { $keys: params.join(', ') }
    }

    if (isValid) {
        return true
    }

    return chooseMessage(message, defaultMessage, replacements)
}

export default object
