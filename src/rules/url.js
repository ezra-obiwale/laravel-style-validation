import { url as defaultMessage } from '../messages'
import { parseMessage } from '../utils'

export default url = (value, { message }) => {
    const isValid = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g.test(value)

    if (isValid) {
        return true
    }

    return parseMessage(message, defaultMessage)
}

export const tests = () => {

}