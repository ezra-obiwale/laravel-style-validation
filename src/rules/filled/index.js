import { filled as defaultMessage } from '../../messages'
import { chooseMessage } from '../../utils'

const filled = (value, options = {}) => {
    const { message, messageParser } = options
    const invalidValues = [null, undefined, '']
    const isValid = !invalidValues.includes(value)

    if (isValid) {
        return true
    }

    return chooseMessage(message, defaultMessage, {}, messageParser)
}

export default filled
