import { digitsBetween as defaultMessage } from '../messages'
import { parseMessage } from '../utils'

const digitsBetween = (value, { message = null, params = [] }) => {
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

export default digitsBetween

export const tests = () => {

}