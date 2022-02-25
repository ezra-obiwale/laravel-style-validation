import { array as defaultMessage } from '../messages'
import { parseMessage } from '../utils'

const array = (value, { message }) => {
    const isValid = Array.isArray(value)

    if (isValid) {
        return true
    }

    return parseMessage(message, defaultMessage)
}

export default array

export const tests = () => {

}