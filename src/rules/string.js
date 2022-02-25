import { startsWith as defaultMessage } from '../messages'
import { parseMessage } from '../utils'

const string = (value, { rules = [], message = null }) => {
    const isValid = typeof value === 'string' || (rules.includes('nullable') && isEmpty(value))

    if (isValid) {
        return true
    }

    return parseMessage(message, defaultMessage)
}

export default string

export const tests = () => {

}