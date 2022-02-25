import { nullable as defaultMessage } from '../messages'
import { parseMessage, isEmpty } from '../utils'

export default nullable = (value, { message }) => {
    const isValid = isEmpty(value)

    if (isValid) {
        return true
    }

    return parseMessage(message, defaultMessage)
}

export const tests = () => {

}