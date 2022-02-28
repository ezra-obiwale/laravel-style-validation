import { integer as defaultMessage } from '../../messages'
import { chooseMessage } from '../../utils'

const integer = (value, options = {}) => {
    const { message } = options
    const isValid = parseInt(value) === value

    if (isValid) {
        return true
    }

    return chooseMessage(message, defaultMessage)
}

export default integer
