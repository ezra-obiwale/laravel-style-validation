import { array as defaultMessage } from '../../messages'
import { chooseMessage } from '../../utils'

const array = (value, options = {}) => {
    const { message, messageParser } = options
    const isValid = Array.isArray(value)

    if (isValid) {
        return true
    }

    return chooseMessage(message, defaultMessage, {}, messageParser)
}

export default array
