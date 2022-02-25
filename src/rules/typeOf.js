import { typeOf as defaultMessage } from '../messages'
import { parseMessage } from '../utils'

const typeOf = (value, { message = null, params = [] }) => {
    const type = params[0]
    const isValid = typeof value === type

    if (isValid) {
        return true
    }

    return parseMessage(message, defaultMessage, { $type: type })
}

export default typeOf

export const tests = () => {

}