import { min as defaultMessage } from '../messages'
import { parseMessage } from '../utils'

const min = (value, { message = null, params = [] }) => {
    const maxValue = parseFloat(params[0])

    const isValid = value >= maxValue

    if (isValid) {
        return true
    }

    return parseMessage(message, defaultMessage, { $value: maxValue })
}

export default min

export const tests = () => {

}