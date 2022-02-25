import { nullable as defaultMessage } from '../messages'
import { parseMessage, isEmpty } from '../utils'

const nullable = (value, { message }) => {
    const isValid = isEmpty(value)

    if (isValid) {
        return true
    }

    return parseMessage(message, defaultMessage)
}

export default nullable

export const tests = () => {

}