import { inArray as defaultMessage } from '../messages'
import { parseMessage } from '../utils'

export default inArray = (value, { data = {}, message = null, params = [] }) => {
    const otherfield = params[0]
    const otherfieldValue = data[otherfield]

    const isValid = Array.isArray(otherfieldValue) && otherfieldValue.includes(value)

    if (isValid) {
        return true
    }

    return parseMessage(message, defaultMessage, { $values: otherfieldValue.join(', ') })
}

export const tests = () => {

}