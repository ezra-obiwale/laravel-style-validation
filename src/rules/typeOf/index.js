import { typeOf as defaultMessage } from '../../messages'
import { chooseMessage } from '../../utils'

const typeOf = (value, options = {}) => {
    const { message = null, messageParser, params = [] } = options
    const type = params[0]
    const isValid = typeof value === type

    if (isValid) {
        return true
    }

    return chooseMessage(message, defaultMessage, { $type: type }, messageParser)
}

export default typeOf
