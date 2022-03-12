import { required as defaultMessage } from '../../messages'
import { chooseMessage, isEmpty } from '../../utils'

const required = (value, options = {}) => {
    const { message, messageParser } = options
    const isValid = !isEmpty(value)

    if (isValid) {
        return true
    }

    return chooseMessage(message, defaultMessage, {}, messageParser)
}

export default required
