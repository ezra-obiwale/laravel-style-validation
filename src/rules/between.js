import { between as defaultMessage } from '../messages'
import { parseMessage } from '../utils'

export default between = (value, { message = null, params = [] }) => {
    const [value1, value2] = params
    const min = Math.min(value1, value2)
    const max = Math.max(value1, value2)

    const isValid = min <= value && value <= max

    if (isValid) {
        return true
    }

    return parseMessage(message, defaultMessage, { $min: value1, $max: value2 })
}

export const tests = () => {

}