import { accepted as defaultMessage } from '../../messages'
import { chooseMessage } from '../../utils'

const accepted = (value, options = {}) => {
    const { message, messageParser } = options
    const validValues = ['yes', 'on', 1, true]
    const isValid = validValues.includes(value)

    if (isValid) {
        return true
    }

    return chooseMessage(message, defaultMessage, {}, messageParser)
}

export default accepted
