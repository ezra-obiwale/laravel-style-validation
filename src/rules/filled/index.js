import { filled as defaultMessage } from '../../messages'
import { chooseMessage } from '../../utils'

const filled = (value, options = {}) => {
    const { message, messageParser } = options

    const invalidValues = [null, undefined, '']

    if (Array.isArray(value) && !!value.length) {
        return true
    }

    if (!Array.isArray(value) && !invalidValues.includes(value)) {
        return true
    }

    return chooseMessage(message, defaultMessage, {}, messageParser)
}

export default filled
