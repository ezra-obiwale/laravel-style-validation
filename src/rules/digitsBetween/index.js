import { digitsBetween as defaultMessage } from '../../messages'
import { chooseMessage } from '../../utils'

const digitsBetween = (value, options = {}) => {
    const { message = null, messageParser, params = [] } = options
    const [value1, value2] = params
    const floatValue = parseFloat(value)
    const intValue = parseInt(value)
    const min = Math.min(value1, value2)
    const max = Math.max(value1, value2)
    const valueLength = `${value}`.length

    const isValid = (`${value}` === `${floatValue}` || `${value}` === `${intValue}`) &&
        min <= valueLength && valueLength <= max

    if (isValid) {
        return true
    }

    return chooseMessage(message, defaultMessage, { $min: value1, $max: value2 }, messageParser)
}

export default digitsBetween