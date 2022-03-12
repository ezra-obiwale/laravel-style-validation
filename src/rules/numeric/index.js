import { numeric as defaultMessage } from '../../messages'
import { chooseMessage } from '../../utils'

const numeric = (value, options = {}) => {
    const { message, messageParser } = options
    const isValid = !isNaN(value)

    if (isValid) {
        return true
    }

    return chooseMessage(message, defaultMessage, {}, messageParser)
}

export default numeric
