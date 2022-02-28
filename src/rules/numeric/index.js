import { numeric as defaultMessage } from '../../messages'
import { chooseMessage } from '../../utils'

const numeric = (value, options = {}) => {
    const { message } = options
    const isValid = !isNaN(value)

    if (isValid) {
        return true
    }

    return chooseMessage(message, defaultMessage)
}

export default numeric
