import { startsWith as defaultMessage } from '../../messages'
import { chooseMessage } from '../../utils'

const startsWith = (value, options = {}) => {
    const { message = null, params = [] } = options
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

    return chooseMessage(message, defaultMessage, { $values: params.join(', ') })
}

export default startsWith
