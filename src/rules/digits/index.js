import { digits as defaultMessage } from '../../messages'
import { chooseMessage } from '../../utils'

const digits = (value, options = {}) => {
    const { message = null, messageParser, params = [] } = options
    const floatValue = parseFloat(value)
    const intValue = parseInt(value)
    const length = parseInt(params[0])

    const isValid = (`${value}` === `${floatValue}` || `${value}` === `${intValue}`) &&
        `${value}`.length === length

    if (isValid) {
        return true
    }

    return chooseMessage(message, defaultMessage, { $value: params[0] }, messageParser)
}

export default digits
