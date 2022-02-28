import { notRegex as defaultMessage } from '../../messages'
import { chooseMessage, regexFromString } from '../../utils'

const notRegex = (value, options = {}) => {
    const { message = null, params = [] } = options
    const regex = regexFromString(params[0])

    const isValid = !regex.test(`${value}`)

    if (isValid) {
        return true
    }

    return chooseMessage(message, defaultMessage)
}

export default notRegex
