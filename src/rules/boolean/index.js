import { boolean as defaultMessage } from '../../messages'
import { chooseMessage } from '../../utils'

const boolean = (value, options = {}) => {
    const { message, messageParser } = options
    const validValues = [true, false, 1, 0, '1', '0']
    const isValid = validValues.includes(value)

    if (isValid) {
        return true
    }

    return chooseMessage(message, defaultMessage, {}, messageParser)
}

export default boolean
