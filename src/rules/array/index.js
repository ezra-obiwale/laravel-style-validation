import { array as defaultMessage } from '../../messages'
import { chooseMessage } from '../../utils'

const array = (value, options = {}) => {
    const { message } = options
    const isValid = Array.isArray(value)

    if (isValid) {
        return true
    }

    return chooseMessage(message, defaultMessage)
}

export default array
