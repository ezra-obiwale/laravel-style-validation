import { between as defaultMessage } from '../../messages'
import { chooseMessage } from '../../utils'

const between = (value, options = {}) => {
    const { message = null, messageParser, params = [] } = options
    const [value1, value2] = params
    const min = Math.min(value1, value2)
    const max = Math.max(value1, value2)

    const isValid = min <= value && value <= max

    if (isValid) {
        return true
    }

    return chooseMessage(message, defaultMessage, { $min: value1, $max: value2 }, messageParser)
}

export default between
