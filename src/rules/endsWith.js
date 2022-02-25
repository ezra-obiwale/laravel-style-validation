import { endsWith as defaultMessage } from '../messages'
import { parseMessage } from '../utils'

const endsWith = (value, { message = null, params = [] }) => {
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

    return parseMessage(message, defaultMessage, { $values: params.join(', ') })
}

export default endsWith

export const tests = () => {

}