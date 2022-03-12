import { endsWith as defaultMessage } from '../../messages'
import { chooseMessage } from '../../utils'

const endsWith = (value, options = {}) => {
    const { message = null, messageParser, params = [] } = options
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

    return chooseMessage(message, defaultMessage, { $values: params.join(', ') }, messageParser)
}

export default endsWith