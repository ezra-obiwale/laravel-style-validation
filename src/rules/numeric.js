import { nullable as defaultMessage } from '../messages'
import { parseMessage } from '../utils'

const numeric = (value, { message }) => {
    const isValid = !isNaN(value)

    if (isValid) {
        return true
    }

    return parseMessage(message, defaultMessage)
}

export default numeric

export const tests = () => {

}