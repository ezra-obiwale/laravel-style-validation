import { min as defaultMessage } from '../../messages'
import { chooseMessage } from '../../utils'

const min = (value, options = {}) => {
    const { message = null, messageParser, params = [] } = options
    const maxValue = parseFloat(params[0])

    const isValid = value >= maxValue

    if (isValid) {
        return true
    }

    return chooseMessage(message, defaultMessage, { $value: maxValue }, messageParser)
}

export default min
