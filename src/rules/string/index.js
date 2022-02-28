import { string as defaultMessage } from '../../messages'
import { chooseMessage, isEmpty } from '../../utils'

const string = (value, options = {}) => {
    const { rules = [], message = null } = options
    const isValid = typeof value === 'string' || (rules.includes('nullable') && isEmpty(value))

    if (isValid) {
        return true
    }

    return chooseMessage(message, defaultMessage)
}

export default string
