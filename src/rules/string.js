import { startsWith as defaultMessage } from '../messages'
import { parseMessage } from '../utils'

export default string = (value, { rules = [], message = null }) => {
    const isValid = typeof value === 'string' || (rules.includes('nullable') && isEmpty(value))

    if (isValid) {
        return true
    }

    return parseMessage(message, defaultMessage)
}

export const tests = () => {

}