import { object as objectMessage, objectWithKeys as objectWithKeysMessage } from '../messages'
import { parseMessage } from '../utils'

const object = (value, { message = null, params = [] }) => {
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

    return parseMessage(message, defaultMessage, replacements)
}

export default object

export const tests = () => {

}