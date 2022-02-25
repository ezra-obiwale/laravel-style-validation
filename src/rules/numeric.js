import { nullable as defaultMessage } from '../messages'
import { parseMessage } from '../utils'

export default numeric = (value, { message }) => {
    const isValid = !isNaN(value)

    if (isValid) {
        return true
    }

    return parseMessage(message, defaultMessage)
}

export const tests = () => {

}