import { startsWith as defaultMessage } from '../../messages'
import { chooseMessage } from '../../utils'

const string = (value, { rules = [], message = null }) => {
    const isValid = typeof value === 'string' || (rules.includes('nullable') && isEmpty(value))

    if (isValid) {
        return true
    }

    return chooseMessage(message, defaultMessage)
}

export default string

export const tests = () => {

}