import { $in as defaultMessage } from '../messages'
import { parseMessage } from '../utils'

export default $in = (value, { message = null, params = [] }) => {
    const isValid = params.includes(value)

    if (isValid) {
        return true
    }

    return parseMessage(message, defaultMessage, { $values: params.join(', ') })
}

export const tests = () => {

}