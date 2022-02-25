import { startsWith as defaultMessage } from '../messages'
import { parseMessage } from '../utils'

const startsWith = (value, { message = null, params = [] }) => {
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

    return parseMessage(message, defaultMessage, { $values: params.join(', ') })
}

export default startsWith

export const tests = () => {

}