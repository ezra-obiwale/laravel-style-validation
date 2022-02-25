import { digitsBetween as defaultMessage } from '../messages'
import { parseMessage } from '../utils'

export default digitsBetween = (value, { message = null, params = [] }) => {
    const [value1, value2] = params
    const min = Math.min(value1, value2)
    const max = Math.max(value1, value2)
    const valueLength = `${value}`.length

    const isValid = min <= valueLength && valueLength <= max

    if (isValid) {
        return true
    }

    return parseMessage(message, defaultMessage, { $min: value1, $max: value2 })
}

export const tests = () => {

}